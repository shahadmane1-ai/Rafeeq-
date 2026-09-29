import React, { useState } from 'react';
import { Sparkles, Clock, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Experience, Language } from '../../types';
import { playPeaceChime, playSoftTap } from '../../utils/audio';

interface DispatcherProps {
  experience: Experience;
  lang: Language;
  onFinish: () => void;
}

export const GameUniversityPrayer: React.FC<DispatcherProps> = ({ experience, lang, onFinish }) => {
  const [currentView, setCurrentView] = useState<'hallway' | 'quiet_room'>('hallway');
  const [peekingDoor, setPeekingDoor] = useState<'lecture' | 'lounge' | null>(null);
  const [scheduleChecked, setScheduleChecked] = useState(false);
  const [matUnrolled, setMatUnrolled] = useState(false);
  const [bagPlaced, setBagPlaced] = useState(false);
  const [isPraying, setIsPraying] = useState(false);

  const handleEnterQuietRoom = () => {
    playSoftTap();
    setCurrentView('quiet_room');
  };

  const handleStartPrayer = () => {
    playPeaceChime();
    setIsPraying(true);
    onFinish();
  };

  return (
    <div className="space-y-4">
      {/* 2D Interactive Scene Canvas */}
      <div className="relative w-full h-84 sm:h-96 rounded-3xl overflow-hidden border-2 border-[#D4A373]/40 bg-[#E8EDE8] shadow-inner select-none">
        
        {/* ============================================================== */}
        {/* VIEW 1: THE UNIVERSITY HALLWAY */}
        {/* ============================================================== */}
        {currentView === 'hallway' && (
          <div className="relative w-full h-full bg-gradient-to-b from-[#F2F6F3] via-[#E2EAE3] to-[#CBD8CC] animate-fade-in">
            {/* Ceiling Lights */}
            <div className="absolute top-0 inset-x-0 h-8 bg-stone-200 border-b border-stone-300 flex justify-around items-center px-8">
              <div className="w-16 h-2 bg-white rounded-full shadow-xs" />
              <div className="w-16 h-2 bg-white rounded-full shadow-xs" />
              <div className="w-16 h-2 bg-white rounded-full shadow-xs" />
            </div>

            {/* Wall Schedule & Clock */}
            <div className="absolute top-12 left-6 flex items-center gap-3">
              {/* University Clock */}
              <div className="w-11 h-11 rounded-full border-2 border-[#2C483F] bg-white shadow flex flex-col items-center justify-center font-mono text-[9px] text-[#2C483F] font-bold">
                <span>1:15</span>
                <span className="text-[7px] text-stone-400 -mt-0.5">PM</span>
              </div>

              {/* Schedule Board on the wall */}
              <div
                onClick={() => {
                  playSoftTap();
                  setScheduleChecked(!scheduleChecked);
                }}
                className="px-3 py-1.5 rounded-xl bg-white border-2 border-stone-300 hover:border-[#2C483F] shadow-sm cursor-pointer transition-all flex items-center gap-2"
                title={lang === 'ar' ? 'فحص جدول المحاضرات' : 'Check Lecture Schedule'}
              >
                <GraduationCap className="w-4 h-4 text-[#88C947]" />
                <div className="text-start">
                  <div className="text-[9px] font-bold text-[#2C483F]">
                    {lang === 'ar' ? 'لوحة المواعيد الدراسية' : 'Class Schedule'}
                  </div>
                  <div className="text-[8px] text-stone-500 font-mono">
                    {lang === 'ar' ? 'استراحة 45 دقيقة قبل المحاضرة' : '45 min break before next class'}
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Hallway Doors in Perspective */}
            <div className="absolute bottom-8 inset-x-4 sm:inset-x-8 flex items-end justify-between gap-3">
              
              {/* Door 1: Lecture Hall (Interactive) */}
              <div
                onClick={() => {
                  playSoftTap();
                  setPeekingDoor(peekingDoor === 'lecture' ? null : 'lecture');
                }}
                className="flex-1 h-52 sm:h-56 bg-stone-100 rounded-t-2xl border-4 border-stone-400 relative cursor-pointer hover:border-stone-500 shadow-md transition-all flex flex-col justify-between p-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-stone-700 bg-stone-200 px-1.5 py-0.5 rounded">
                    Room 101
                  </span>
                  <span className="text-xs">📚</span>
                </div>
                
                {/* Door Glass Window */}
                <div className="w-full h-16 rounded-lg bg-sky-100 border-2 border-stone-300 flex items-center justify-center overflow-hidden">
                  {peekingDoor === 'lecture' ? (
                    <span className="text-[9px] text-stone-600 font-bold p-1 text-center bg-white/90">
                      {lang === 'ar' ? 'محاضرة مستمرة' : 'Class in session'}
                    </span>
                  ) : (
                    <span className="text-stone-400 text-xs">👥</span>
                  )}
                </div>

                <div className="text-center pb-1">
                  <span className="text-[9px] font-bold text-stone-600 group-hover:text-stone-900 block">
                    {lang === 'ar' ? 'قاعة المحاضرات' : 'Lecture Hall'}
                  </span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-stone-400 absolute bottom-16 right-2" />
              </div>

              {/* Door 2: Student Lounge (Interactive) */}
              <div
                onClick={() => {
                  playSoftTap();
                  setPeekingDoor(peekingDoor === 'lounge' ? null : 'lounge');
                }}
                className="flex-1 h-52 sm:h-56 bg-amber-50 rounded-t-2xl border-4 border-amber-300 relative cursor-pointer hover:border-amber-400 shadow-md transition-all flex flex-col justify-between p-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                    Lounge
                  </span>
                  <span className="text-xs">🎮</span>
                </div>

                <div className="w-full h-16 rounded-lg bg-amber-100/60 border-2 border-amber-200 flex items-center justify-center overflow-hidden">
                  {peekingDoor === 'lounge' ? (
                    <span className="text-[9px] text-amber-900 font-bold p-1 text-center bg-white/90">
                      {lang === 'ar' ? 'أصوات ضجيج ومحادثات' : 'Loud chatter & games'}
                    </span>
                  ) : (
                    <span className="text-amber-500 text-xs">☕</span>
                  )}
                </div>

                <div className="text-center pb-1">
                  <span className="text-[9px] font-bold text-amber-900 group-hover:text-amber-950 block">
                    {lang === 'ar' ? 'ردهة الأنشطة' : 'Student Lounge'}
                  </span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute bottom-16 right-2" />
              </div>

              {/* Door 3: Quiet Study & Contemplation Room (Target) */}
              <div
                onClick={handleEnterQuietRoom}
                className="flex-1 h-56 sm:h-60 bg-emerald-50 rounded-t-2xl border-4 border-emerald-500 relative cursor-pointer hover:scale-[1.02] shadow-xl transition-all flex flex-col justify-between p-2 ring-4 ring-emerald-400/40 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-white bg-emerald-700 px-2 py-0.5 rounded-md">
                    {lang === 'ar' ? 'ركن هادئ' : 'Quiet Spot'}
                  </span>
                  <span className="text-sm animate-pulse">🌿</span>
                </div>

                <div className="w-full h-18 rounded-lg bg-emerald-100 border-2 border-emerald-300 flex flex-col items-center justify-center text-center p-1">
                  <span className="text-sm">🕌</span>
                  <span className="text-[8px] font-bold text-emerald-800">
                    {lang === 'ar' ? 'مساحة سكينة وطهارة' : 'Peaceful Clean Space'}
                  </span>
                </div>

                <div className="text-center pb-2">
                  <span className="text-[10px] font-black text-emerald-950 block">
                    {lang === 'ar' ? 'ركن المطالعة والتأمل' : 'Contemplation Room'}
                  </span>
                  <span className="text-[8px] text-emerald-700 font-bold underline mt-0.5 block">
                    {lang === 'ar' ? 'انقر للدخول ↵' : 'Click to Enter ↵'}
                  </span>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-600 shadow absolute bottom-18 right-2 animate-ping" />
              </div>
            </div>

            {/* Hallway Floor */}
            <div className="absolute bottom-0 inset-x-0 h-8 bg-stone-300 border-t-2 border-stone-400" />
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: INSIDE THE QUIET PRAYER ROOM */}
        {/* ============================================================== */}
        {currentView === 'quiet_room' && (
          <div className="relative w-full h-full bg-gradient-to-b from-[#F5FAF6] via-[#EBF3ED] to-[#D8E6DC] p-4 flex flex-col justify-between animate-fade-in">
            {/* Top Bar inside Room */}
            <div className="flex items-center justify-between pb-2 border-b border-[#2C483F]/20">
              <button
                type="button"
                onClick={() => setCurrentView('hallway')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-stone-700 text-[10px] font-bold shadow-xs cursor-pointer"
              >
                <ArrowRight className="w-3 h-3 rtl:rotate-0 ltr:rotate-180" />
                <span>{lang === 'ar' ? 'الرجوع للممر' : 'Back to Hallway'}</span>
              </button>
              
              <div className="flex items-center gap-1.5 text-xs font-black text-[#2C483F]">
                <span>🌿</span>
                <span>{lang === 'ar' ? 'داخل الركن الهادئ بالجامعة' : 'Inside Campus Quiet Room'}</span>
              </div>

              <div className="text-[9px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                {lang === 'ar' ? 'متاح ومناسب تماماً' : 'Available & Serene'}
              </div>
            </div>

            {/* The Room Environment with Window & Shelf */}
            <div className="relative flex-1 flex items-center justify-between px-2 sm:px-6">
              
              {/* Quiet Window overlooking campus greenery */}
              <div className="w-20 sm:w-24 h-28 rounded-t-xl border-3 border-[#8B7355] bg-sky-100 shadow flex flex-col overflow-hidden">
                <div className="flex-1 bg-gradient-to-b from-sky-200 to-emerald-100 relative p-1 flex items-end">
                  <span className="text-xl">🌳</span>
                </div>
                <div className="h-3 bg-[#6F5B43]" />
              </div>

              {/* Center: Prayer Mat Spot on Clean Floor */}
              <div className="flex flex-col items-center">
                {matUnrolled ? (
                  <div
                    onClick={() => playSoftTap()}
                    className="w-28 sm:w-32 h-44 rounded-t-2xl bg-gradient-to-b from-[#1C4135] to-[#122A22] border-2 border-[#D4A373] p-2 flex flex-col items-center justify-between text-white shadow-xl animate-scale-up"
                  >
                    <div className="w-16 h-20 border-2 border-[#D4A373]/80 rounded-t-full flex flex-col items-center justify-center bg-black/20">
                      <span className="text-sm">🕌</span>
                      <span className="text-[7px] text-[#D4A373] font-bold mt-1">
                        {lang === 'ar' ? 'اتجاه القبلة' : 'Qibla'}
                      </span>
                    </div>

                    {isPraying ? (
                      <div className="flex flex-col items-center animate-fade-in my-auto">
                        <div className="w-5 h-5 rounded-full bg-amber-100 border border-[#2C483F] flex items-center justify-center text-xs">
                          🤲
                        </div>
                        <div className="w-8 h-8 bg-white/90 rounded-t-lg border border-stone-300 mt-0.5" />
                        <span className="text-[7px] font-bold text-emerald-300 mt-0.5">
                          {lang === 'ar' ? 'صلاة الظهر' : 'Dhuhr Prayer'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[8px] font-bold text-[#D4A373]">
                        {lang === 'ar' ? 'السجادة جاهزة' : 'Mat Ready'}
                      </span>
                    )}

                    <div className="w-full flex justify-between px-1 opacity-70">
                      <span className="text-[6px] tracking-widest text-[#D4A373]">||||||</span>
                      <span className="text-[6px] tracking-widest text-[#D4A373]">||||||</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      playSoftTap();
                      setMatUnrolled(true);
                    }}
                    className="p-3.5 rounded-2xl border-2 border-dashed border-[#2C483F] bg-white/90 hover:bg-white text-[#2C483F] text-xs font-bold transition-all shadow-md flex flex-col items-center gap-1.5 hover:scale-105 cursor-pointer"
                  >
                    <span className="text-2xl">🌱</span>
                    <span>{lang === 'ar' ? 'انقر لبسط سجادتك هنا' : 'Tap to lay prayer mat here'}</span>
                  </button>
                )}
              </div>

              {/* Shelf with Student Bag & Books */}
              <div className="flex flex-col items-center gap-2">
                {/* Backpack (Interactive) */}
                <div
                  onClick={() => {
                    playSoftTap();
                    setBagPlaced(!bagPlaced);
                  }}
                  className={`w-14 h-18 rounded-xl border-2 cursor-pointer shadow-md p-1.5 flex flex-col items-center justify-between transition-all ${
                    bagPlaced
                      ? 'bg-amber-800 border-amber-950 text-white'
                      : 'bg-amber-600 border-amber-800 text-amber-100 hover:scale-105'
                  }`}
                  title={lang === 'ar' ? 'حقيبتك الدراسية' : 'Study backpack'}
                >
                  <div className="w-6 h-2 rounded-full border border-white/40" />
                  <span className="text-xs">🎒</span>
                  <span className="text-[7px] font-bold">
                    {bagPlaced ? (lang === 'ar' ? 'مرتبة' : 'Set aside') : (lang === 'ar' ? 'الحقيبة' : 'Bag')}
                  </span>
                </div>

                <div className="w-20 h-2 bg-[#8B7355] rounded-full shadow-xs" />
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-2 flex items-center justify-between border-t border-[#2C483F]/20 text-[11px]">
              <span className="text-stone-600">
                {matUnrolled
                  ? (lang === 'ar' ? '✓ المكان طاهر ومهيأ بسكينة تامة' : '✓ Clean, quiet space ready')
                  : (lang === 'ar' ? 'ابسط سجادتك لأداء الصلاة' : 'Lay mat to begin prayer')}
              </span>

              {matUnrolled && !isPraying && (
                <button
                  type="button"
                  onClick={handleStartPrayer}
                  className="px-6 py-2 rounded-xl bg-[#2C483F] hover:bg-[#1e342d] text-white text-xs font-black shadow-soft hover:scale-105 transition-all cursor-pointer"
                >
                  {lang === 'ar' ? 'أداء الصلاة بسكينة والعودة للمحاضرة' : 'Perform Prayer Peacefully & Return'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gentle Explanation (Secondary - Appears After Interaction) */}
      {isPraying && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 animate-fade-in text-start">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'الصلاة والمسؤوليات اليومية:' : 'Prayer & Daily Responsibilities:'}</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {lang === 'ar'
              ? 'الصلاة مدمجة في صلب يومك الدراسي ومسؤولياتك؛ لا تحتاج لتعطيل دراستك بل تنظم وقتك وتختار المكان الأهدأ بوعي واطمئنان.'
              : 'Prayer integrates naturally into study responsibilities. Planning your schedule allows you to excel academically while keeping regular worship.'}
          </p>
        </div>
      )}
    </div>
  );
};
