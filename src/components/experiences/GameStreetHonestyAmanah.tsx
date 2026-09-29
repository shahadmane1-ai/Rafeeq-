import React, { useState } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { Experience, Language } from '../../types';
import { playPeaceChime, playSoftTap } from '../../utils/audio';

interface DispatcherProps {
  experience: Experience;
  lang: Language;
  onFinish: () => void;
}

export const GameStreetHonestyAmanah: React.FC<DispatcherProps> = ({ experience, lang, onFinish }) => {
  const [walletPicked, setWalletPicked] = useState(false);
  const [actionDone, setActionDone] = useState<'returned_directly' | 'lost_and_found' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleReturnDirectly = () => {
    playPeaceChime();
    setWalletPicked(true);
    setActionDone('returned_directly');
    setIsCompleted(true);
    onFinish();
  };

  const handleLostAndFound = () => {
    playPeaceChime();
    setWalletPicked(true);
    setActionDone('lost_and_found');
    setIsCompleted(true);
    onFinish();
  };

  return (
    <div className="space-y-4">
      {/* 2D Interactive City Street Sidewalk Canvas */}
      <div className="relative w-full h-84 sm:h-96 rounded-3xl overflow-hidden border-2 border-[#D4A373]/40 bg-gradient-to-b from-sky-200 via-stone-100 to-[#D4C4AE] shadow-2xl p-4 flex flex-col justify-between select-none">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-[#D4A373]/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <div className="text-start">
              <span className="text-xs font-black text-[#2C483F] block">
                {lang === 'ar' ? 'رصيف الشارع العام: موقف أخلاقي وأمانة' : 'City Sidewalk: Integrity & Amanah'}
              </span>
              <span className="text-[9px] text-stone-500 font-mono">
                {lang === 'ar' ? 'سقوط محفظة من أحد المارة المنشغلين' : 'A distracted pedestrian drops their wallet'}
              </span>
            </div>
          </div>

          <div className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
            {lang === 'ar' ? 'أمانة وصدق' : 'Amanah'}
          </div>
        </div>

        {/* Central Street Scene: Walking Pedestrian + Dropped Wallet */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-gradient-to-b from-stone-100 via-[#EAE1D2] to-[#C9B9A2] border border-stone-300 p-3 my-1">
          
          {/* Street Trees & Shop Windows in Background */}
          <div className="absolute top-2 inset-x-4 flex justify-between items-center opacity-70">
            <span className="text-2xl">🌳</span>
            <div className="px-3 py-1 rounded bg-white/70 border border-stone-300 text-[8px] font-mono text-stone-600">
              BOOKSTORE & CAFÉ
            </div>
            <span className="text-2xl">🏬</span>
          </div>

          {/* Distracted Pedestrian Ahead Walking */}
          <div className="absolute top-14 left-1/3 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#E5D2BA] border-2 border-stone-400 shadow-sm flex items-center justify-center text-xs">
              🚶
            </div>
            <div className="w-10 h-12 rounded-t-xl bg-[#4A635D] -mt-1 shadow-sm flex items-center justify-center">
              <span className="text-[7px] text-white font-mono">Busy</span>
            </div>
            {actionDone && (
              <span className="text-[8px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded mt-1 shadow-xs">
                {lang === 'ar' ? 'استدار شاكراً' : 'Turned gratefully'}
              </span>
            )}
          </div>

          {/* The Dropped Leather Wallet on the Sidewalk (Interactive) */}
          {!actionDone ? (
            <div
              onClick={() => {
                playSoftTap();
                setWalletPicked(true);
              }}
              className="absolute bottom-10 right-1/4 p-2.5 rounded-2xl bg-amber-900 border-2 border-amber-500 shadow-xl cursor-pointer hover:scale-125 transition-transform flex items-center gap-1.5 animate-bounce"
              title={lang === 'ar' ? 'انقر لالتقاط المحفظة' : 'Click to pick up wallet'}
            >
              <span className="text-2xl">👛</span>
              <div className="text-start">
                <span className="text-[8px] font-bold text-amber-200 block">
                  {lang === 'ar' ? 'محفظة ساقطة' : 'Dropped Wallet'}
                </span>
                <span className="text-[6px] text-stone-300 font-mono">
                  {walletPicked ? (lang === 'ar' ? 'ملتقطة' : 'Picked') : (lang === 'ar' ? 'انقر' : 'Tap')}
                </span>
              </div>
            </div>
          ) : (
            <div className="absolute bottom-10 right-1/4 flex items-center gap-1 text-xs text-emerald-800 font-bold bg-white/90 p-2 rounded-xl shadow">
              <span>🤝</span>
              <span>{lang === 'ar' ? 'تمت إعادة الأمانة' : 'Returned safely'}</span>
            </div>
          )}

          {/* Speech Bubble / Dialog */}
          <div className="absolute bottom-2 inset-x-4 py-1.5 px-3 bg-white/95 rounded-2xl border border-[#D4A373] shadow-md text-center">
            {actionDone === 'returned_directly' ? (
              <p className="text-[11px] font-bold text-emerald-900 leading-snug">
                {lang === 'ar'
                  ? '«الحمد لله! جزاك الله خيراً يا أخي على صدقك وأمانتك النبيلة، كادت تضيع مني بطاقاتي وأوراقي المهمة!»'
                  : '"Thank God! May God reward your noble honesty, my critical cards were inside!"'}
              </p>
            ) : actionDone === 'lost_and_found' ? (
              <p className="text-[11px] font-bold text-emerald-900 leading-snug">
                {lang === 'ar'
                  ? '«تم تسليم المحفظة للمتجر الموثوق ليتمكن صاحبها من استرجاعها فور عودته.»'
                  : '"Handed to trusted front desk so the owner retrieves it safely."'}
              </p>
            ) : (
              <p className="text-[10px] text-stone-600 font-medium">
                {lang === 'ar'
                  ? 'سقطت المحفظة أمامك ولا أحد يراك.. كيف تتصرف بأمانة ومسؤولية؟'
                  : 'A wallet dropped and no one sees you.. how do you act with integrity?'}
              </p>
            )}
          </div>
        </div>

        {/* Action Decision Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#D4A373]/30">
          <button
            type="button"
            onClick={handleReturnDirectly}
            className={`p-3 rounded-2xl border-2 text-start transition-all cursor-pointer flex items-center justify-between ${
              actionDone === 'returned_directly'
                ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-400'
                : 'bg-white/90 border-[#2C483F]/30 hover:border-emerald-500 hover:bg-white'
            }`}
          >
            <div>
              <span className="text-xs font-black text-emerald-950 block">
                {lang === 'ar' ? 'النداء على صاحبها وإعادتها فوراً' : 'Call Out & Return Immediately'}
              </span>
              <span className="text-[10px] text-stone-600 block mt-0.5">
                {lang === 'ar' ? '«يا أخي، سقطت محفظتك!»' : '"Excuse me, you dropped your wallet!"'}
              </span>
            </div>
            <span className="text-xl">🏃</span>
          </button>

          <button
            type="button"
            onClick={handleLostAndFound}
            className={`p-3 rounded-2xl border-2 text-start transition-all cursor-pointer flex items-center justify-between ${
              actionDone === 'lost_and_found'
                ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-400'
                : 'bg-white/80 border-stone-200 hover:bg-white'
            }`}
          >
            <div>
              <span className="text-xs font-bold text-stone-700 block">
                {lang === 'ar' ? 'تسليمها لنقطة الأمانات أو أقرب متجر' : 'Hand to Lost & Found / Shop'}
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">
                {lang === 'ar' ? 'حفظ الأمانة ريثما يعود للبحث عنها' : 'Safeguard until owner returns'}
              </span>
            </div>
            <span className="text-xl">🏬</span>
          </button>
        </div>
      </div>

      {/* Gentle Explanation (Secondary - Appears After Interaction) */}
      {isCompleted && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 animate-fade-in text-start">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'الأمانة والصدق في الخلوة والجلوة:' : 'Amanah: Integrity When Unobserved:'}</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {lang === 'ar'
              ? 'الأمانة من أسمى قيم الإسلام؛ والمسلم يفعل الصواب بدافع ذاتي ومراقبة لله حتى وإن لم يره أحد. إرجاع حقوق الناس يورث القلب راحة وضميراً مطمئناً.'
              : 'Trustworthiness (Amanah) is a crown of Muslim character. Doing what is right when unobserved brings deep dignity and lasting peace of conscience.'}
          </p>
        </div>
      )}
    </div>
  );
};
