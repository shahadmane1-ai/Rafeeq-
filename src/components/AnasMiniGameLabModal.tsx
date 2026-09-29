import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Gamepad2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Loader2,
  Heart,
  Droplets,
  Compass,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { Language, UserPersonalizationProfile } from '../types';
import {
  RAFIC_INTERNAL_CATALOGUE,
  matchScenarioLocallyWithConfidence,
  InternalCatalogueScenario,
} from '../services/raficInternalCatalogue';
import { MasterKineticScenarioCanvas } from './ProceduralTactileEngines';
import { recordScenarioCompletion } from '../services/visualUserMemory';
import { updateSessionTranquility } from '../services/sessionStore';
import { playPeaceChime, playSoftTap } from '../utils/audio';

interface AnasMiniGameLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialTopic?: string;
  initialQuery?: string;
  userProfile?: UserPersonalizationProfile;
  onAdjustScore?: (delta: number, label: string, type: 'peace' | 'stress') => void;
}

export interface DynamicLabPayload {
  numericId: number;
  scenarioId: string;
  targetEngine: string;
  conceptTitle: string;
  conceptTitleEn?: string;
  fiqhSource: string;
  shortGuidance: string;
  shortGuidanceEn?: string;
  interactiveSteps: string[];
  remedialButtonText: string;
  tranquilityDelta: number;
  baselineDropScore?: number;
  recoveryBoostScore?: number;
  confidence?: number;
  hadithReference?: {
    textAr: string;
    sourceAr: string;
  };
  rafiqMessage?: {
    maleAr: string;
    femaleAr: string;
    activeText?: string;
  };
}

export const AnasMiniGameLabModal: React.FC<AnasMiniGameLabModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialTopic,
  initialQuery,
  userProfile,
  onAdjustScore,
}) => {
  const [userQuery, setUserQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePayload, setActivePayload] = useState<DynamicLabPayload | null>(null);
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [selectedGroupTab, setSelectedGroupTab] = useState<number>(1);

  const isFemale =
    userProfile?.preferredAddressing === 'female' || (userProfile as any)?.gender === 'female';

  // Auto-generate if initialQuery is provided
  useEffect(() => {
    if (isOpen && initialQuery && initialQuery.trim()) {
      setUserQuery(initialQuery);
      handleGenerate(initialQuery);
    } else if (isOpen && initialTopic && initialTopic.trim()) {
      handleGenerate(initialTopic);
    }
  }, [isOpen, initialQuery, initialTopic]);

  if (!isOpen) return null;

  const loadScenarioDirectly = (scen: InternalCatalogueScenario) => {
    playSoftTap();
    const rafiqVoice = isFemale ? scen.rafiqMessage.femaleAr : scen.rafiqMessage.maleAr;
    setActivePayload({
      numericId: scen.numericId,
      scenarioId: scen.id,
      targetEngine: scen.targetEngine,
      conceptTitle: scen.conceptTitle,
      conceptTitleEn: scen.conceptTitleEn,
      fiqhSource: scen.fiqhSource,
      shortGuidance: scen.shortGuidance,
      shortGuidanceEn: scen.shortGuidanceEn,
      interactiveSteps: scen.interactiveSteps,
      remedialButtonText: scen.remedialButtonText,
      tranquilityDelta: scen.tranquilityDelta,
      baselineDropScore: 45,
      recoveryBoostScore: 20,
      hadithReference: scen.hadithReference,
      rafiqMessage: {
        maleAr: scen.rafiqMessage.maleAr,
        femaleAr: scen.rafiqMessage.femaleAr,
        activeText: rafiqVoice,
      },
    });
    setShowTopicSelector(false);
  };

  const handleGenerate = async (queryToUse?: string) => {
    const text = queryToUse || userQuery;
    if (!text.trim() || isGenerating) return;

    playSoftTap();
    setIsGenerating(true);
    setShowTopicSelector(false);

    try {
      // 1. Primary Layer: Gemini 2.5 Flash Structured NLU via Server
      const response = await fetch('/api/anas/generate-tactile-lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, userProfile }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.requiresSelection) {
          setShowTopicSelector(true);
          setIsGenerating(false);
          return;
        }

        if (data && data.conceptTitle) {
          setActivePayload(data);
          // Dynamically adjust emotional stress baseline if supplied
          if (data.baselineDropScore && onAdjustScore) {
            onAdjustScore(-10, lang === 'ar' ? `استشعار حيرة الموقف` : 'Processing situation ambiguity', 'stress');
          }
          setIsGenerating(false);
          return;
        }
      }
    } catch {
      // Secondary Root Regex Layer Fallback
    }

    // 2. Secondary Layer Root Semantic Regex Matcher
    const { scenario: matchedScen, confidence } = matchScenarioLocallyWithConfidence(text);

    if (matchedScen && confidence >= 0.35) {
      loadScenarioDirectly(matchedScen);
    } else {
      // Fail-Safe Guarantee: Render the polite 30-scenario visual topic selector grid (DO NOT default to 1 or 26)
      setShowTopicSelector(true);
    }
    setIsGenerating(false);
  };

  const handleActionComplete = (delta: number, label: string) => {
    playPeaceChime();

    if (activePayload) {
      recordScenarioCompletion({
        id: `gen_${Date.now()}`,
        titleAr: activePayload.conceptTitle,
        engineType: activePayload.targetEngine,
        category: 'مختبر رفيق الحركي',
        scoreDelta: delta,
        keyLearningAr: activePayload.shortGuidance,
      });

      updateSessionTranquility(delta, label || activePayload.conceptTitle, {
        titleAr: activePayload.conceptTitle,
        engineTarget: activePayload.targetEngine,
        verifiedSource: activePayload.fiqhSource,
      });
    }

    if (onAdjustScore) {
      const uplift = activePayload?.recoveryBoostScore || delta || 20;
      onAdjustScore(
        uplift,
        lang === 'ar' ? `+${uplift}% طمأنينة وسكينة إتمام الموقف` : `+${uplift}% Tranquility restored`,
        'peace'
      );
    }
  };

  const handleReset = () => {
    playSoftTap();
    setActivePayload(null);
    setShowTopicSelector(false);
    setUserQuery('');
  };

  const groups = [
    { id: 1, titleAr: 'عوارض وأخطاء الصلاة (1-5)', titleEn: 'Prayer Mistakes (1-5)' },
    { id: 2, titleAr: 'طوارئ ورخص الطهارة (6-10)', titleEn: 'Purity & Wudu (6-10)' },
    { id: 3, titleAr: 'التنقل والأماكن العامة (11-15)', titleEn: 'Transit & Public (11-15)' },
    { id: 4, titleAr: 'المعاملات والأغذية (16-20)', titleEn: 'Transactions & Food (16-20)' },
    { id: 5, titleAr: 'الأسرة والعلاقات (21-25)', titleEn: 'Family & Social (21-25)' },
    { id: 6, titleAr: 'السكينة والتأقلم الفكري (26-30)', titleEn: 'Peace & Mind (26-30)' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#D4A373]/40 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#12183F] via-[#1a2355] to-[#0B102B] text-white flex items-start justify-between relative">
          <div className="space-y-1.5 pe-8 text-start">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                <Gamepad2 className="w-3 h-3 text-amber-300" />
                <span>{lang === 'ar' ? 'مختبر رفيق للتجارب الحركية 2.5D' : 'Rafiq 2.5D Tactile Lab'}</span>
              </span>
              <span className="text-[11px] text-amber-200 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{lang === 'ar' ? '30 مشهداً حركياً معتمداً' : '30 Accredited Kinetic Scenes'}</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>{lang === 'ar' ? 'المحاكي الحركي للتأقلم والشعائر' : 'Tactile Adaptation Simulator'}</span>
            </h3>

            <p className="text-xs text-white/80 leading-relaxed hidden">
              {lang === 'ar'
                ? 'فهم عميق بالسياق والذكاء الاصطناعي لحل مواقف الصلاة، الطهارة، السفر، والأغذية بمشاهد تفاعلية حركية دقيقة.'
                : 'Contextual AI NLU simulator teaching the exact tactile actions across all 30 accredited scenarios.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playSoftTap();
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-start">
          {/* ZERO INITIAL STATE / INPUT BAR */}
          {!activePayload && !showTopicSelector && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center py-4 space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-[#12183F]/10 text-[#12183F] mx-auto flex items-center justify-center text-3xl shadow-soft">
                  🎯
                </div>
                <h4 className="text-base sm:text-lg font-black text-[#12183F]">
                  {lang === 'ar'
                    ? 'ما التحدي أو الموقف الذي تريد التدرب عليه عملياً اليوم؟'
                    : 'What practical challenge or situation do you want to train for today?'}
                </h4>
                <p className="text-xs text-stone-500 max-w-lg mx-auto">
                  {lang === 'ar'
                    ? isFemale
                    : 'اكتب بحرية بأي لهجة: "كيف اصلي بالطيارة"، "كم اطلع رز بزكاة الفطر"، "رجلي فيها جبس"، "حاسس بذنب من ماضيي"...'}
                </p>
              </div>

              {/* Text Input & Generate Button */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGenerate();
                }}
                className="space-y-3"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'مثال: جالس بالكرسي والطيارة تطير كيف اسجد؟ أو كم اطلع رز بزكاة الفطر...'
                        : 'e.g., How to pray in an airplane seat, or how much rice for Zakat al-Fitr...'
                    }
                    className="w-full px-4 py-3.5 pe-12 bg-stone-50 border border-[#D4A373]/40 rounded-2xl text-xs sm:text-sm text-[#12183F] placeholder-[#12183F]/50 focus:outline-none focus:ring-2 focus:ring-[#12183F]/30 shadow-inner"
                    disabled={isGenerating}
                  />
                  {userQuery && (
                    <button
                      type="button"
                      onClick={() => setUserQuery('')}
                      className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="submit"
                    disabled={isGenerating || !userQuery.trim()}
                    className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#12183F] via-[#1a2355] to-[#0B102B] hover:opacity-95 text-white text-xs sm:text-sm font-black shadow-soft flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                        <span>{lang === 'ar' ? 'تحليل النية بالذكاء الاصطناعي وتجهيز المشهد...' : 'Analyzing semantic intent...'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>{lang === 'ar' ? 'توليد التجربة الحركية 🎯' : 'Generate Tactile Scene 🎯'}</span>
                      </>
                    )}
                  </button>

                  {/* UI-Only Hiding Directive: Retain handler & element in code tree without visual display */}
                  <button
                    type="button"
                    onClick={() => setShowTopicSelector(true)}
                    className="hidden py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold items-center justify-center gap-1.5 cursor-pointer transition-all"
                    style={{ display: 'none' }}
                  >
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'ar' ? 'دليل الـ 30 مشهداً' : '30 Scenes Directory'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* FAIL-SAFE GUARANTEE: Visual Topic Selector Grid (when query ambiguous or requested) */}
          {showTopicSelector && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-black text-[#12183F] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'ar' ? 'دليل المواقف الـ 30 المعتمدة' : 'Accredited 30 Scenarios Directory'}</span>
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {lang === 'ar' ? 'اختر الموقف الأنسب لبدء المحاكاة الحركية فوراً:' : 'Pick a scenario to launch the kinetic simulation:'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTopicSelector(false)}
                  className="px-3 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold cursor-pointer"
                >
                  {lang === 'ar' ? 'رجوع للبحث' : 'Back to Search'}
                </button>
              </div>

              {/* Group Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {groups.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      playSoftTap();
                      setSelectedGroupTab(g.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedGroupTab === g.id
                        ? 'bg-[#12183F] text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                    }`}
                  >
                    {lang === 'ar' ? g.titleAr : g.titleEn}
                  </button>
                ))}
              </div>

              {/* Scenarios Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {RAFIC_INTERNAL_CATALOGUE.filter((s) => s.group === selectedGroupTab).map((scen) => (
                  <div
                    key={scen.numericId}
                    onClick={() => loadScenarioDirectly(scen)}
                    className="p-3.5 rounded-2xl bg-stone-50 hover:bg-emerald-50/70 border border-stone-200 hover:border-emerald-300 transition-all cursor-pointer space-y-1.5 group hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#12183F]/10 text-[#12183F] group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        المشهد {scen.numericId}
                      </span>
                      <span className="text-[9px] text-stone-400 font-mono">{scen.fiqhSource}</span>
                    </div>

                    <h5 className="text-xs font-bold text-[#12183F] group-hover:text-emerald-900 transition-colors">
                      {lang === 'ar' ? scen.conceptTitle : scen.conceptTitleEn}
                    </h5>

                    <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                      {lang === 'ar' ? scen.shortGuidance : scen.shortGuidanceEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVE KINETIC BLUEPRINT VIEWPORT */}
          {activePayload && (
            <div className="space-y-4 animate-fade-in">
              {/* Back / Reset Controls */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'توليد موقف آخر' : 'Change Scenario'}</span>
                </button>

                <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  المشهد رقم {activePayload.numericId}
                </span>
              </div>

              {/* Master 2.5D SVG Kinetic Viewport Card */}
              <MasterKineticScenarioCanvas
                scenarioId={activePayload.numericId}
                conceptTitle={activePayload.conceptTitle}
                conceptTitleEn={activePayload.conceptTitleEn}
                fiqhSource={activePayload.fiqhSource}
                shortGuidance={activePayload.shortGuidance}
                shortGuidanceEn={activePayload.shortGuidanceEn}
                interactiveSteps={activePayload.interactiveSteps}
                remedialButtonText={activePayload.remedialButtonText}
                tranquilityDelta={activePayload.tranquilityDelta}
                lang={lang}
                onComplete={handleActionComplete}
                hadithReference={activePayload.hadithReference}
                rafiqMessage={activePayload.rafiqMessage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
