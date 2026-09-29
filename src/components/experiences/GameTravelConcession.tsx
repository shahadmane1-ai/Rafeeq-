import React, { useState } from 'react';
import { Sparkles, Plane, Clock, CheckCircle2, Ticket } from 'lucide-react';
import { Experience, Language } from '../../types';
import { playPeaceChime, playSoftTap } from '../../utils/audio';

interface DispatcherProps {
  experience: Experience;
  lang: Language;
  onFinish: () => void;
}

export const GameTravelConcession: React.FC<DispatcherProps> = ({ experience, lang, onFinish }) => {
  const [shortened, setShortened] = useState(true);
  const [combined, setCombined] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePrayAndBoard = () => {
    playPeaceChime();
    setIsCompleted(true);
    onFinish();
  };

  return (
    <div className="space-y-4">
      {/* 2D Interactive Airport Terminal Canvas */}
      <div className="relative w-full h-84 sm:h-96 rounded-3xl overflow-hidden border-2 border-[#D4A373]/40 bg-gradient-to-b from-[#1C2833] via-[#243342] to-[#121B24] shadow-2xl p-4 flex flex-col justify-between select-none">
        
        {/* Departure Board Header */}
        <div className="flex items-center justify-between pb-2 border-b border-sky-500/30">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#D4A373] -rotate-45" />
            <div className="text-start">
              <span className="text-xs font-black text-white block">
                {lang === 'ar' ? 'صالة المغادرة ومحطة السفر بالمطار' : 'Airport Transit Departure Lounge'}
              </span>
              <span className="text-[9px] text-sky-200 font-mono">
                {lang === 'ar' ? 'رحلة طويلة (480 كم) — تنطبق رخصة السفر الشرعية' : 'Long Flight (480 km) — Travel Concessions Apply'}
              </span>
            </div>
          </div>

          <div className="text-[9px] font-mono text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
            GATE 14B • 1:20 PM
          </div>
        </div>

        {/* Central Terminal Scene: Panoramic Window & Prayer Pod */}
        <div className="relative flex-1 rounded-2xl overflow-hidden border border-sky-600/30 p-3 my-1 flex items-center justify-between">
          
          {/* Panoramic Window with Airplane */}
          <div className="flex flex-col items-center">
            <div className="w-32 sm:w-40 h-28 rounded-2xl bg-gradient-to-b from-sky-400/20 via-sky-300/10 to-transparent border border-sky-400/40 p-2 flex flex-col justify-between shadow-inner">
              <div className="flex justify-between items-center text-[8px] text-sky-200 font-mono">
                <span>TARMAC</span>
                <span>☀️ CLEAR</span>
              </div>
              <div className="text-3xl sm:text-4xl text-center filter drop-shadow">
                🛫
              </div>
              <span className="text-[7px] text-stone-300 text-center font-mono">
                {lang === 'ar' ? 'موعد الصعود بعد 40 دقيقة' : 'Boarding in 40 mins'}
              </span>
            </div>
          </div>

          {/* Interactive Boarding Ticket */}
          <div
            onClick={() => playSoftTap()}
            className="p-3 rounded-2xl bg-white/95 border-2 border-[#D4A373] shadow-xl flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
            title={lang === 'ar' ? 'تذكرة السفر' : 'Travel Ticket'}
          >
            <div className="flex items-center gap-1 text-[#2C483F] font-bold text-[10px]">
              <Ticket className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{lang === 'ar' ? 'تذكرة المسافر' : 'Traveler Ticket'}</span>
            </div>
            <div className="w-full border-t border-dashed border-stone-300 my-0.5" />
            <span className="text-[8px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              {lang === 'ar' ? '✓ مؤهل لرخصة القصر والجمع' : '✓ Eligible for Concessions'}
            </span>
          </div>

          {/* Quiet Terminal Prayer Pod */}
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-2xl bg-emerald-950/70 border-2 border-emerald-400 shadow-xl flex flex-col items-center text-center">
              <span className="text-2xl">🕌</span>
              <span className="text-[9px] font-black text-emerald-200 mt-1">
                {lang === 'ar' ? 'مصلّى الصالة' : 'Terminal Prayer Pod'}
              </span>
              <span className="text-[7px] text-stone-300 mt-0.5">
                {lang === 'ar' ? 'هادئ ومتاح للمسافرين' : 'Quiet & Accessible'}
              </span>
            </div>
          </div>
        </div>

        {/* Real-Life Decision Toggles on Travel Concessions */}
        <div className="space-y-2 pt-2 border-t border-sky-500/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            
            {/* Toggle 1: Qasr (Shortening 4 rakat to 2) */}
            <div
              onClick={() => {
                playSoftTap();
                setShortened(!shortened);
              }}
              className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                shortened
                  ? 'bg-emerald-900/80 border-emerald-400 text-white shadow-md'
                  : 'bg-stone-900/80 border-stone-600 text-stone-400'
              }`}
            >
              <div className="text-start">
                <span className="text-xs font-black block">
                  {lang === 'ar' ? 'قصر الصلاة الرباعية' : 'Shorten 4-Rakat Prayers'}
                </span>
                <span className="text-[9px] opacity-80 block">
                  {lang === 'ar' ? 'أداء الظهر ركعتين والعصر ركعتين' : 'Pray 2 units for Dhuhr & Asr'}
                </span>
              </div>
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${shortened ? 'text-emerald-400' : 'text-stone-600'}`} />
            </div>

            {/* Toggle 2: Jam' (Combining Prayers) */}
            <div
              onClick={() => {
                playSoftTap();
                setCombined(!combined);
              }}
              className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                combined
                  ? 'bg-emerald-900/80 border-emerald-400 text-white shadow-md'
                  : 'bg-stone-900/80 border-stone-600 text-stone-400'
              }`}
            >
              <div className="text-start">
                <span className="text-xs font-black block">
                  {lang === 'ar' ? 'الجمع بين الصلاتين' : 'Combine Prayers'}
                </span>
                <span className="text-[9px] opacity-80 block">
                  {lang === 'ar' ? 'صلاة العصر مع الظهر تقديماً بالمطار' : 'Combine Asr with Dhuhr in airport'}
                </span>
              </div>
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${combined ? 'text-emerald-400' : 'text-stone-600'}`} />
            </div>
          </div>

          {/* Action / Boarding Button */}
          {!isCompleted && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={handlePrayAndBoard}
                className="w-full sm:w-auto px-8 py-2.5 rounded-2xl bg-gradient-to-r from-[#2C483F] to-[#1C4135] text-white text-xs font-black shadow-soft hover:scale-105 transition-all cursor-pointer"
              >
                {lang === 'ar' ? 'أداء الصلاة برخصة السفر وصعود الطائرة باطمئنان' : 'Pray with Concessions & Board in Peace'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gentle Explanation (Secondary - Appears After Interaction) */}
      {isCompleted && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 animate-fade-in text-start">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'رخصة السفر هدية وتيسير:' : 'Travel Concessions: A Gift of Ease:'}</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {lang === 'ar'
              ? 'القصر والجمع في السفر تخفيف ورحمة بالغة للمسافر حتى لا ينقطع عن صلاته؛ تفاصيل المذاهب تتسع لاختلاف ظروف الناس ومسافاتهم، والمقصد هو اليسر وحفظ العبادة.'
              : 'Shortening and combining prayers during travel eases the journey, preserving worship without exhaustion or anxiety.'}
          </p>
        </div>
      )}
    </div>
  );
};
