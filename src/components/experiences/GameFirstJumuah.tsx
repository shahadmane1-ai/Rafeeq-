import React, { useState } from 'react';
import { Sparkles, Compass, Volume2, ArrowRight } from 'lucide-react';
import { Experience, Language } from '../../types';
import { playPeaceChime, playSoftTap } from '../../utils/audio';

interface DispatcherProps {
  experience: Experience;
  lang: Language;
  onFinish: () => void;
}

export const GameFirstJumuah: React.FC<DispatcherProps> = ({ experience, lang, onFinish }) => {
  const [stage, setStage] = useState<'courtyard' | 'hall'>('courtyard');
  const [shoesStored, setShoesStored] = useState(false);
  const [satInKhutbah, setSatInKhutbah] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleEnterHall = () => {
    playSoftTap();
    setStage('hall');
  };

  const handlePrayCongregation = () => {
    playPeaceChime();
    setIsCompleted(true);
    onFinish();
  };

  return (
    <div className="space-y-4">
      {/* 2D Interactive Friday Prayer Experience Canvas */}
      <div className="relative w-full h-84 sm:h-96 rounded-3xl overflow-hidden border-2 border-[#D4A373]/40 bg-gradient-to-b from-[#FBF8F2] via-[#EFE6D5] to-[#DFD0BA] shadow-2xl select-none">
        
        {/* ============================================================== */}
        {/* STAGE 1: FRIDAY MOSQUE COURTYARD */}
        {/* ============================================================== */}
        {stage === 'courtyard' && (
          <div className="relative w-full h-full p-4 flex flex-col justify-between animate-fade-in bg-gradient-to-b from-sky-200 via-stone-100 to-[#E8DDD0]">
            {/* Friday Bright Daylight & Arches */}
            <div className="flex items-center justify-between pb-2 border-b border-[#D4A373]/30">
              <div className="flex items-center gap-2">
                <span className="text-xl">🕌</span>
                <div className="text-start">
                  <span className="text-xs font-black text-[#2C483F] block">
                    {lang === 'ar' ? 'رحاب المسجد الجامع — يوم الجمعة المبارك' : 'Grand Mosque Courtyard — Blessed Friday'}
                  </span>
                  <span className="text-[9px] text-stone-600 font-mono">
                    {lang === 'ar' ? 'الوصول قبل الأذان والسكينة في الخطى' : 'Early arrival before Adhan'}
                  </span>
                </div>
              </div>

              <div className="text-[9px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                {lang === 'ar' ? 'يوم الجمعة' : 'Friday Jumu’ah'}
              </div>
            </div>

            {/* Courtyard Center: Entrance & Shoe Racks */}
            <div className="relative flex-1 flex flex-col items-center justify-center my-1">
              <div className="relative w-64 sm:w-80 h-44 bg-[#F7F2EA] rounded-t-3xl border-4 border-[#C8B89E] shadow-xl p-3 flex flex-col items-center justify-between">
                
                {/* Worshippers in White entering */}
                <div className="flex items-center gap-2 text-stone-600 text-xs">
                  <span>👥 👥 👥</span>
                  <span className="text-[9px] font-bold text-[#2C483F]">
                    {lang === 'ar' ? 'جموع المصلين يتوافدون بوقار' : 'Worshippers arriving in dignity'}
                  </span>
                </div>

                {/* Grand Entrance Doors */}
                <div
                  onClick={shoesStored ? handleEnterHall : undefined}
                  className={`p-3 rounded-2xl border-4 transition-all flex flex-col items-center gap-1 shadow-lg ${
                    shoesStored
                      ? 'bg-gradient-to-b from-[#7A4B29] to-[#4A2D17] border-[#D4A373] hover:scale-105 cursor-pointer ring-4 ring-[#88C947]/50 animate-pulse'
                      : 'bg-stone-300 border-stone-400 opacity-70'
                  }`}
                  title={shoesStored ? (lang === 'ar' ? 'انقر للدخول للمصلى' : 'Click to enter') : (lang === 'ar' ? 'ضع حذاءك أولاً في الرف' : 'Place shoes on rack first')}
                >
                  <span className="text-2xl text-amber-200">🚪</span>
                  <span className="text-[9px] font-bold text-white whitespace-nowrap">
                    {shoesStored
                      ? (lang === 'ar' ? 'انقر لدخول المصلى الجامع ↵' : 'Enter Prayer Hall ↵')
                      : (lang === 'ar' ? 'ضع حذاءك في الرف أولاً' : 'Store shoes first')}
                  </span>
                </div>

                {/* Shoe Rack Area (Interactive) */}
                <div
                  onClick={() => {
                    playSoftTap();
                    setShoesStored(true);
                  }}
                  className={`p-1.5 px-3 rounded-xl border-2 transition-all cursor-pointer shadow-sm flex items-center gap-2 ${
                    shoesStored
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : 'bg-white border-[#D4A373] text-stone-700 hover:scale-105'
                  }`}
                  title={lang === 'ar' ? 'انقر لوضع الحذاء في الرف بهدوء' : 'Click to place shoes on rack'}
                >
                  <span className="text-sm">👟</span>
                  <span className="text-[9px] font-bold">
                    {shoesStored
                      ? (lang === 'ar' ? '✓ الحذاء في الرف المخصص' : '✓ Shoes in rack')
                      : (lang === 'ar' ? 'انقر لوضع الحذاء في الرف' : 'Store shoes on rack')}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Guidance */}
            <div className="pt-2 text-center text-[10px] text-stone-600 font-medium">
              {shoesStored
                ? (lang === 'ar' ? '✓ الحذاء مرتب، يمكنك الآن دخول المصلى بسكينة' : '✓ Shoes placed neatly, enter with serenity')
                : (lang === 'ar' ? 'انقر على رف الأحذية لترتيب حذائك ثم ادخل' : 'Place shoes neatly before entering')}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STAGE 2: INSIDE THE FRIDAY PRAYER HALL */}
        {/* ============================================================== */}
        {stage === 'hall' && (
          <div className="relative w-full h-full p-4 flex flex-col justify-between animate-fade-in bg-gradient-to-b from-[#FAF6EE] via-[#EFE7D8] to-[#DFCDB4]">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#D4A373]/30">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#88C947]" />
                <span className="text-xs font-black text-[#2C483F]">
                  {lang === 'ar' ? 'صلاة الجمعة: خطبة الإمام وصفوف الجماعة' : 'Friday Prayer: Khutbah & Congregation'}
                </span>
              </div>
              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                {lang === 'ar' ? 'إنصات وسكينة' : 'Attentive Silence'}
              </span>
            </div>

            {/* Minbar & Khutbah Speech Bubble */}
            <div className="relative flex-1 flex flex-col items-center justify-center my-1 space-y-2">
              {/* Wooden Minbar with Imam */}
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#8B5A2B] border-2 border-[#654321] text-white flex flex-col items-center shadow-md">
                  <span className="text-base">🕌</span>
                  <span className="text-[7px] font-bold text-amber-200 mt-0.5">
                    {lang === 'ar' ? 'منبر الجمعة' : 'Minbar'}
                  </span>
                </div>

                {/* Khutbah Wisdom Message Box */}
                <div className="flex-1 p-2.5 rounded-2xl bg-white/95 border-2 border-[#D4A373] shadow-md text-start">
                  <div className="flex items-center gap-1.5 text-[#2C483F] font-bold text-[10px] mb-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#88C947]" />
                    <span>{lang === 'ar' ? 'موعظة الجمعة (إنصات وتأمل):' : 'Friday Sermon:'}</span>
                  </div>
                  <p className="text-[10px] text-stone-700 italic leading-snug">
                    {lang === 'ar'
                      ? '«عباد الله.. إنما بُعث النبي ﷺ ليتمم مكارم الأخلاق؛ فليكن المسلم سمحاً إذا باع، سمحاً إذا اشترى، بارّاً بأهله، عوناً لضعفائهم..»'
                      : '"The Prophet was sent to perfect noble character; let the believer be generous, kind to parents, and a helper to the vulnerable.."'}
                  </p>
                </div>
              </div>

              {/* Rows of Congregation Seated Listening */}
              <div
                onClick={() => {
                  playSoftTap();
                  setSatInKhutbah(true);
                }}
                className={`w-full p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                  satInKhutbah
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400'
                    : 'bg-white/80 border-stone-200 hover:border-emerald-400'
                }`}
                title={lang === 'ar' ? 'انقر للجلوس والإنصات للخطبة' : 'Click to sit attentively'}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">👥 👥 👥</span>
                  <span className="text-[10px] font-bold">
                    {satInKhutbah
                      ? (lang === 'ar' ? '✓ جالس في صف المصلين بإنصات وخشوع' : '✓ Seated in row listening attentively')
                      : (lang === 'ar' ? 'انقر للجلوس في الصف والإنصات' : 'Tap to sit in row attentively')}
                  </span>
                </div>
                {satInKhutbah ? (
                  <span className="text-xs text-emerald-600 font-bold">✓</span>
                ) : (
                  <span className="text-[9px] font-bold text-[#2C483F] bg-stone-100 px-2 py-0.5 rounded">
                    {lang === 'ar' ? 'جلوس' : 'Sit'}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Action: Stand for Congregation Prayer */}
            <div className="pt-2 border-t border-[#D4A373]/20 flex items-center justify-between">
              <span className="text-[10px] text-stone-600">
                {satInKhutbah
                  ? (lang === 'ar' ? 'انتهت الموعظة، أقيمت الصلاة' : 'Sermon ended, prayer called')
                  : (lang === 'ar' ? 'اجلس واستمع للخطبة أولاً' : 'Listen to sermon first')}
              </span>

              {satInKhutbah && !isCompleted && (
                <button
                  type="button"
                  onClick={handlePrayCongregation}
                  className="px-6 py-2 rounded-xl bg-[#2C483F] hover:bg-[#1e342d] text-white text-xs font-black shadow-soft hover:scale-105 transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'أداء صلاة الجمعة مع الجماعة' : 'Perform Friday Prayer with Congregation'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gentle Explanation (Secondary - Appears After Interaction) */}
      {isCompleted && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 animate-fade-in text-start">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'معنى الجمعة ورسالة المسجد:' : 'Significance of Friday & the Mosque:'}</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {lang === 'ar'
              ? 'صلاة الجمعة هي العيد الأسبوعي للمسلمين، تجمع القلوب على التذكير بالقيم النبيلة والتعارف الأخوي بين أفراد المجتمع في رحاب بيت الله.'
              : 'Friday prayer is a weekly spiritual reunion for the community, uniting hearts in mutual care and gentle remembrance.'}
          </p>
        </div>
      )}
    </div>
  );
};
