import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { Experience, Language } from '../../types';
import { playPeaceChime, playSoftTap } from '../../utils/audio';

interface DispatcherProps {
  experience: Experience;
  lang: Language;
  onFinish: () => void;
}

export const GameHomePrayerRoom: React.FC<DispatcherProps> = ({ experience, lang, onFinish }) => {
  const [doorClosed, setDoorClosed] = useState(false);
  const [matUnrolled, setMatUnrolled] = useState(false);
  const [phoneSilenced, setPhoneSilenced] = useState(false);
  const [isPraying, setIsPraying] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const readyToPray = doorClosed && matUnrolled && phoneSilenced;

  const handleStartPrayer = () => {
    playPeaceChime();
    setIsPraying(true);
    onFinish();
  };

  return (
    <div className="space-y-4">
      {/* 2D Interactive Bedroom Canvas */}
      <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-[#D4A373]/40 bg-gradient-to-b from-[#F7F3EB] via-[#EFE7D8] to-[#DFD4BF] shadow-inner select-none">
        {/* Wall Architecture & Trim */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#FAF7F0] to-[#EAE0CF] border-b-4 border-[#C8B89C]" />
        
        {/* Floor Wood Planks */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-[#D8C7A8] overflow-hidden opacity-90">
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,#8C6D47,#8C6D47_1px,transparent_1px,transparent_60px)]" />
          <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(0deg,#000,#000_1px,transparent_1px,transparent_24px)]" />
        </div>

        {/* Window with Daylight & Sunlight Stream */}
        <div className="absolute top-6 left-6 w-24 sm:w-28 h-32 rounded-t-2xl border-4 border-[#8B7355] bg-gradient-to-b from-sky-200 to-sky-100 shadow-md flex flex-col overflow-hidden">
          <div className="relative flex-1">
            {/* Sun & Clouds */}
            <div className="absolute top-2 right-2 text-amber-400 text-lg animate-pulse">☀️</div>
            <div className="absolute bottom-1 left-2 text-stone-300 text-xs opacity-75">☁️</div>
            {/* Sunlight rays casting across wall */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200/40 via-transparent to-transparent pointer-events-none" />
            {/* Window Pane Divider */}
            <div className="absolute inset-y-0 left-1/2 w-1 bg-[#8B7355] -translate-x-1/2" />
            <div className="absolute inset-x-0 top-1/2 h-1 bg-[#8B7355] -translate-y-1/2" />
          </div>
          <div className="h-4 bg-[#6F5B43] flex items-center justify-center">
            <span className="text-[9px] text-amber-100 font-bold">
              {lang === 'ar' ? 'وقت الظهر' : 'Dhuhr Time'}
            </span>
          </div>
        </div>

        {/* Wall Clock */}
        <div className="absolute top-8 left-36 sm:left-40 w-11 h-11 rounded-full border-2 border-[#2C483F] bg-white shadow flex flex-col items-center justify-center font-mono text-[9px] text-[#2C483F] font-black">
          <span>12:45</span>
          <span className="text-[7px] text-stone-400 -mt-0.5">PM</span>
        </div>

        {/* Bedroom Door (Interactive) */}
        <div
          onClick={() => {
            playSoftTap();
            setDoorClosed(!doorClosed);
            setActiveItem('door');
          }}
          className={`absolute top-4 right-6 w-20 sm:w-24 h-48 rounded-t-xl border-4 cursor-pointer transition-all duration-500 shadow-lg flex flex-col justify-between p-2 ${
            doorClosed
              ? 'bg-[#7A4B29] border-[#4E2F19] text-amber-100'
              : 'bg-[#B07849] border-[#663F20] text-amber-950 translate-x-3 -skew-y-1'
          }`}
          title={lang === 'ar' ? 'انقر لفتح أو إغلاق الباب' : 'Click to toggle door'}
        >
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span>🚪</span>
            <span className="text-[8px] bg-black/30 px-1 rounded text-white font-mono">
              {doorClosed ? (lang === 'ar' ? 'مغلق بهدوء' : 'Closed') : (lang === 'ar' ? 'مفتوح' : 'Open')}
            </span>
          </div>
          <div className="space-y-2 opacity-50">
            <div className="w-full h-8 border border-white/20 rounded" />
            <div className="w-full h-8 border border-white/20 rounded" />
          </div>
          {/* Doorknob */}
          <div className="w-3 h-3 rounded-full bg-amber-300 border border-amber-600 shadow self-start m-1 animate-pulse" />
        </div>

        {/* Bed & Bedside Table with Interactive Phone */}
        <div className="absolute bottom-6 left-4 flex items-end gap-2">
          {/* Bed */}
          <div className="w-32 sm:w-36 h-24 rounded-t-xl bg-[#4A6B82] border-2 border-[#2E485B] shadow-md relative overflow-hidden flex flex-col justify-between p-1.5">
            {/* Pillows */}
            <div className="flex gap-1">
              <div className="w-12 h-6 bg-white rounded-md shadow-xs border border-stone-200" />
              <div className="w-12 h-6 bg-white rounded-md shadow-xs border border-stone-200" />
            </div>
            {/* Blanket Pattern */}
            <div className="w-full h-12 bg-[#3A566A] rounded-t-md border-t border-sky-300/30 flex items-center justify-center">
              <span className="text-[9px] text-sky-100/70 font-sans">
                {lang === 'ar' ? 'السرير مرتّب' : 'Neat Bed'}
              </span>
            </div>
          </div>

          {/* Nightstand & Phone */}
          <div
            onClick={() => {
              playSoftTap();
              setPhoneSilenced(!phoneSilenced);
              setActiveItem('phone');
            }}
            className="w-14 h-16 bg-[#936639] border-2 border-[#583D21] rounded-t-md shadow-md p-1 flex flex-col items-center justify-between cursor-pointer hover:brightness-110 transition-all"
            title={lang === 'ar' ? 'انقر لجعل الهاتف صامتاً' : 'Tap to silence phone'}
          >
            <div className="w-6 h-1 bg-amber-200/50 rounded-full" />
            {/* Phone device */}
            <div
              className={`w-7 h-10 rounded-md border flex flex-col items-center justify-center shadow-xs transition-all ${
                phoneSilenced
                  ? 'bg-stone-900 border-emerald-400 text-emerald-400 ring-2 ring-emerald-400/50'
                  : 'bg-stone-800 border-stone-400 text-stone-200'
              }`}
            >
              <span className="text-[10px]">{phoneSilenced ? '🔕' : '📱'}</span>
              <span className="text-[6px] font-mono font-bold mt-0.5">
                {phoneSilenced ? (lang === 'ar' ? 'صامت' : 'Silent') : (lang === 'ar' ? 'رنين' : 'Ring')}
              </span>
            </div>
            <div className="w-8 h-1 bg-amber-950 rounded-xs" />
          </div>
        </div>

        {/* Center Floor Area: Interactive Prayer Mat */}
        <div className="absolute bottom-6 right-24 sm:right-32 flex flex-col items-center">
          {matUnrolled ? (
            <div
              onClick={() => {
                playSoftTap();
                setActiveItem('mat');
              }}
              className="relative w-28 sm:w-32 h-44 rounded-t-2xl bg-gradient-to-b from-[#1C4135] via-[#245243] to-[#122A22] border-2 border-[#D4A373] p-2 flex flex-col items-center justify-between text-white shadow-xl cursor-pointer hover:scale-[1.02] transition-transform animate-scale-up"
            >
              {/* Islamic Arch Pattern on Mat */}
              <div className="w-16 h-20 border-2 border-[#D4A373]/80 rounded-t-full flex flex-col items-center justify-center bg-black/20">
                <div className="text-sm">🕌</div>
                <div className="w-8 h-0.5 bg-[#D4A373]/60 my-1" />
                <span className="text-[8px] text-[#D4A373] font-bold">
                  {lang === 'ar' ? 'اتجاه القبلة' : 'Qibla'}
                </span>
              </div>

              {/* Character in Prayer if started */}
              {isPraying ? (
                <div className="flex flex-col items-center animate-fade-in my-auto">
                  <div className="w-6 h-6 rounded-full bg-amber-100 border border-[#2C483F] shadow flex items-center justify-center text-xs">
                    🤲
                  </div>
                  <div className="w-10 h-10 bg-white/90 rounded-t-xl border border-stone-300 mt-0.5 shadow-sm" />
                  <span className="text-[8px] font-bold text-emerald-300 mt-1">
                    {lang === 'ar' ? 'في خشوع وسكينة' : 'In Serenity'}
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-[9px] font-bold text-[#E6C594] block">
                    {lang === 'ar' ? 'سجادة طاهرة مهيأة' : 'Clean Mat Ready'}
                  </span>
                  <span className="text-[7px] text-stone-300">
                    {lang === 'ar' ? 'انقر للبدء' : 'Ready to Pray'}
                  </span>
                </div>
              )}

              {/* Mat Tassels */}
              <div className="w-full flex justify-between px-1 opacity-70">
                <span className="text-[6px] tracking-widest text-[#D4A373]">||||||||</span>
                <span className="text-[6px] tracking-widest text-[#D4A373]">||||||||</span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                playSoftTap();
                setMatUnrolled(true);
                setActiveItem('mat');
              }}
              className="group relative px-4 py-3 rounded-2xl border-2 border-dashed border-[#2C483F] bg-white/85 hover:bg-white text-[#2C483F] text-xs font-bold transition-all shadow-md flex flex-col items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg group-hover:rotate-12 transition-transform">
                🌿
              </div>
              <span>{lang === 'ar' ? 'انقر لبسط سجادة الصلاة' : 'Tap to lay prayer mat'}</span>
              <span className="text-[9px] text-stone-500 font-normal">
                {lang === 'ar' ? 'مكان طاهر وهادئ' : 'Clean & tranquil spot'}
              </span>
            </button>
          )}
        </div>

        {/* Ambient Floating Guidance Overlay on Active Object */}
        {activeItem && !isPraying && (
          <div className="absolute top-3 inset-x-6 sm:inset-x-12 py-1.5 px-3 bg-[#2C483F]/90 backdrop-blur-sm rounded-xl text-white text-[11px] font-medium flex items-center justify-between border border-[#D4A373]/50 animate-fade-in shadow-md">
            <span>
              {activeItem === 'door' && (doorClosed
                ? (lang === 'ar' ? '✓ أغلقت الباب بهدوء لمزيد من الخشوع والخصوصية.' : '✓ Door closed quietly for peace and focus.')
                : (lang === 'ar' ? 'الباب مفتوح — يمكنك إغلاقه بهدوء.' : 'Door is open — you can close it quietly.'))}
              {activeItem === 'phone' && (phoneSilenced
                ? (lang === 'ar' ? '✓ تم تفعيل الوضع الصامت لإبعاد المشتتات.' : '✓ Phone silenced to avoid distractions.')
                : (lang === 'ar' ? 'الهاتف في وضع الرنين — انقر لكتم الإشعارات.' : 'Phone is ringing — tap to mute.'))}
              {activeItem === 'mat' && (matUnrolled
                ? (lang === 'ar' ? '✓ سُطت سجادة الصلاة في اتجاه القبلة بطمأنينة.' : '✓ Prayer mat unrolled facing the Qibla.')
                : '')}
            </span>
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="text-stone-300 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Real-Life Action Decision */}
      <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[#2C483F]">
            {lang === 'ar' ? 'حالة الاستعداد:' : 'Readiness:'}
          </span>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${doorClosed ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
              {lang === 'ar' ? 'الباب' : 'Door'} {doorClosed ? '✓' : ''}
            </span>
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${matUnrolled ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
              {lang === 'ar' ? 'السجادة' : 'Mat'} {matUnrolled ? '✓' : ''}
            </span>
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${phoneSilenced ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
              {lang === 'ar' ? 'الصامت' : 'Silence'} {phoneSilenced ? '✓' : ''}
            </span>
          </div>
        </div>

        {readyToPray && !isPraying && (
          <button
            type="button"
            onClick={handleStartPrayer}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#2C483F] to-[#1C4135] text-white text-xs font-black shadow-soft hover:shadow-gold transition-all hover:scale-105 active:scale-95 animate-pulse cursor-pointer"
          >
            {lang === 'ar' ? 'بدء الصلاة بسكينة وطمأنينة' : 'Begin Prayer in Serenity'}
          </button>
        )}
      </div>

      {/* Gentle Explanation (Secondary - Appears After Interaction) */}
      {isPraying && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 animate-fade-in text-start">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'الحكمة والسكينة:' : 'Wisdom & Serenity:'}</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {lang === 'ar'
              ? 'الصلاة ركن طبيعي من أركان يوم المسلم؛ لا تحتاج لإخفائها أو الشعور بالخجل منها، كما لا تحتاج لافتعال صدام مع أسرتك. صلاتك في غرفتك بهدوء تصنع سكينة في قلبك وتعكس برّك بأهلك.'
              : 'Prayer is an organic part of daily life. There is no need to hide or feel embarrassed, nor to create family friction. Praying in your room quietly brings peace to your heart and reflects kindness at home.'}
          </p>
        </div>
      )}
    </div>
  );
};
