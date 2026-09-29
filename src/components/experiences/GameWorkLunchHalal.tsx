import React, { useState } from 'react';
import { Sparkles, Utensils, Check, HelpCircle, AlertCircle, Coffee } from 'lucide-react';
import { Experience, Language } from '../../types';
import { playPeaceChime, playSoftTap } from '../../utils/audio';

interface DispatcherProps {
  experience: Experience;
  lang: Language;
  onFinish: () => void;
}

interface TableDish {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  posX: string; // CSS percentage position on table
  posY: string;
  category: 'clear_halal' | 'needs_check' | 'haram';
  statusAr: string;
  statusEn: string;
  descAr: string;
  descEn: string;
  verifiedDescAr?: string;
  verifiedDescEn?: string;
}

export const GameWorkLunchHalal: React.FC<DispatcherProps> = ({ experience, lang, onFinish }) => {
  const [selectedDishId, setSelectedDishId] = useState<string | null>('fish');
  const [plateItems, setPlateItems] = useState<string[]>([]);
  const [verifiedDishes, setVerifiedDishes] = useState<string[]>([]);
  const [mealConfirmed, setMealConfirmed] = useState(false);

  const dishes: TableDish[] = [
    {
      id: 'fish',
      nameAr: 'سمك مشوي بالأعشاب',
      nameEn: 'Grilled Herb Fish',
      icon: '🐟',
      posX: '20%',
      posY: '24%',
      category: 'clear_halal',
      statusAr: 'مكوّن واضح: صيد بحري طاهر',
      statusEn: 'Clear: Pure seafood',
      descAr: 'سمك مشوي طازج بزيت الزيتون والليمون والأعشاب، طاهر ومباح دون شبهة.',
      descEn: 'Fresh grilled fish with olive oil and herbs; completely pure and wholesome.',
    },
    {
      id: 'salad',
      nameAr: 'سلطة خضار طازجة',
      nameEn: 'Fresh Garden Salad',
      icon: '🥗',
      posX: '50%',
      posY: '18%',
      category: 'clear_halal',
      statusAr: 'مكوّن واضح: خضار نقية',
      statusEn: 'Clear: Pure fresh vegetables',
      descAr: 'خس، طماطم، خيار، وزيت زيتون بكر؛ نباتات طبيعية طيبة وخالية من الشبهات.',
      descEn: 'Crisp greens, cucumbers, tomatoes, and extra virgin olive oil; pure and wholesome.',
    },
    {
      id: 'pasta',
      nameAr: 'باستا بصلصة الطماطم',
      nameEn: 'Tomato Basil Pasta',
      icon: '🍝',
      posX: '78%',
      posY: '25%',
      category: 'needs_check',
      statusAr: 'يحتاج إلى التحقق من المكونات',
      statusEn: 'Needs checking ingredients',
      descAr: 'معكرونة بصلصة حمراء؛ يُستحسن التحقق من عدم إضافة مرق اللحم أو نكهة كحولية.',
      descEn: 'Pasta with sauce; best to check that no meat stock or cooking wine was used.',
      verifiedDescAr: 'تم سؤال النادل: «الصلصة نباتية 100% بزيت الزيتون والطماطم والريحان». طعام طيب ومباح!',
      verifiedDescEn: 'Asked waiter: "100% vegetarian sauce with tomatoes and basil." Lawful & pure!',
    },
    {
      id: 'bread',
      nameAr: 'خبز فرنسي محمص',
      nameEn: 'Warm Artisan Bread',
      icon: '🥖',
      posX: '28%',
      posY: '48%',
      category: 'clear_halal',
      statusAr: 'مكوّن واضح: دقيق وخميرة',
      statusEn: 'Clear: Simple baked grains',
      descAr: 'خبز تقليدي طازج مخبوز بدقيق القمح والماء دون دهون حيوانية.',
      descEn: 'Traditional crusty bread made of wheat flour and water without animal fats.',
    },
    {
      id: 'pork',
      nameAr: 'شرائح لحم مقدد (خنزير)',
      nameEn: 'Cured Pork Bacon',
      icon: '🥓',
      posX: '72%',
      posY: '50%',
      category: 'haram',
      statusAr: 'غير مناسب للمسلم (لحم خنزير)',
      statusEn: 'Explicitly prohibited (Pork)',
      descAr: 'لحم خنزير محرم بنص القرآن الكريم؛ المسلم يتركه بكل راحة وثقة وبدائله كثيرة.',
      descEn: 'Pork is forbidden in Islamic law; leave it calmly knowing lawful options are abundant.',
    },
  ];

  const activeDish = dishes.find((d) => d.id === selectedDishId);
  const isPastaVerified = verifiedDishes.includes('pasta');

  const addToPlate = (dishId: string) => {
    playSoftTap();
    if (!plateItems.includes(dishId)) {
      setPlateItems([...plateItems, dishId]);
    }
  };

  const removeFromPlate = (dishId: string) => {
    playSoftTap();
    setPlateItems(plateItems.filter((id) => id !== dishId));
  };

  const handleVerify = (dishId: string) => {
    playSoftTap();
    if (!verifiedDishes.includes(dishId)) {
      setVerifiedDishes([...verifiedDishes, dishId]);
    }
  };

  const handleConfirmMeal = () => {
    playPeaceChime();
    setMealConfirmed(true);
    onFinish();
  };

  return (
    <div className="space-y-4">
      {/* Complete Lunch Table 2D Scene */}
      <div className="relative w-full h-84 sm:h-96 rounded-3xl overflow-hidden border-2 border-[#D4A373]/40 bg-gradient-to-b from-[#25322B] via-[#2F443B] to-[#1C2822] shadow-2xl select-none">
        
        {/* Background Café Atmosphere */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#18231E] to-transparent p-3 flex justify-between items-start opacity-90">
          {/* Café Pendant Lamp */}
          <div className="w-10 h-16 border-l-2 border-stone-500/50 flex flex-col items-center ml-8">
            <div className="w-8 h-5 rounded-t-full bg-amber-200/90 shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
            <div className="w-16 h-8 bg-amber-100/10 blur-md -mt-2" />
          </div>

          {/* Coworkers Sitting Across Table (Faceless Warm Avatars) */}
          <div className="flex items-center gap-6 sm:gap-10 -mt-1">
            {/* Coworker 1 */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#E5D2BA] border-2 border-[#9F7A50] shadow-sm flex items-center justify-center text-xs">
                👤
              </div>
              <div className="w-12 h-8 rounded-t-xl bg-[#4A635D] -mt-1 shadow-sm flex items-center justify-center">
                <span className="text-[7px] text-emerald-100 font-mono">Alex</span>
              </div>
            </div>

            {/* Pleasant chatter bubble */}
            <div className="px-2.5 py-1 rounded-full bg-white/90 text-[#2C483F] text-[9px] font-bold shadow-md -mb-4 border border-[#D4A373]/40 flex items-center gap-1">
              <span>☕</span>
              <span>{lang === 'ar' ? '«جلسة ممتعة يا صديقي!»' : '"Great lunch with everyone!"'}</span>
            </div>

            {/* Coworker 2 */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#D8B490] border-2 border-[#8A5F36] shadow-sm flex items-center justify-center text-xs">
                👤
              </div>
              <div className="w-12 h-8 rounded-t-xl bg-[#594A63] -mt-1 shadow-sm flex items-center justify-center">
                <span className="text-[7px] text-purple-100 font-mono">Sara</span>
              </div>
            </div>
          </div>

          <div className="w-10 h-16 border-r-2 border-stone-500/50 flex flex-col items-center mr-8">
            <div className="w-8 h-5 rounded-t-full bg-amber-200/90 shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
          </div>
        </div>

        {/* The Wooden Dining Table (Perspective Oval) */}
        <div className="absolute -bottom-16 inset-x-2 sm:inset-x-8 h-64 sm:h-72 rounded-[50%] bg-gradient-to-b from-[#8C5D38] via-[#6F4423] to-[#452711] border-4 border-[#A57448] shadow-[0_-10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Table Runner Cloth */}
          <div className="absolute inset-y-0 left-1/4 right-1/4 bg-[#EBE3D5] opacity-90 shadow-md border-x-2 border-[#D4C3A3] flex flex-col justify-between py-2">
            <div className="w-full border-b border-[#D4C3A3]/60" />
            <div className="w-full border-b border-[#D4C3A3]/60" />
          </div>

          {/* Glasses & Tableware */}
          <div className="absolute top-10 left-12 w-6 h-9 rounded-b-md border border-white/60 bg-sky-100/30 backdrop-blur-xs flex items-end p-0.5 shadow-sm">
            <div className="w-full h-5 bg-sky-300/40 rounded-b-xs" />
          </div>
          <div className="absolute top-10 right-12 w-6 h-9 rounded-b-md border border-white/60 bg-sky-100/30 backdrop-blur-xs flex items-end p-0.5 shadow-sm">
            <div className="w-full h-5 bg-sky-300/40 rounded-b-xs" />
          </div>

          {/* The Dishes physically laid ON the table */}
          {dishes.map((dish) => {
            const isSelected = selectedDishId === dish.id;
            const isOnPlate = plateItems.includes(dish.id);

            return (
              <div
                key={dish.id}
                onClick={() => {
                  playSoftTap();
                  setSelectedDishId(dish.id);
                }}
                style={{ left: dish.posX, top: dish.posY }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 flex flex-col items-center group z-10 ${
                  isSelected
                    ? 'scale-125 -translate-y-2'
                    : 'hover:scale-110'
                }`}
                title={lang === 'ar' ? dish.nameAr : dish.nameEn}
              >
                {/* Ceramic Serving Dish */}
                <div
                  className={`relative p-2 sm:p-2.5 rounded-full shadow-lg transition-all flex items-center justify-center ${
                    isSelected
                      ? 'bg-white ring-4 ring-[#D4A373] shadow-[0_0_20px_rgba(212,163,115,0.8)]'
                      : isOnPlate
                      ? 'bg-emerald-50 ring-2 ring-emerald-400'
                      : 'bg-stone-50/95 border-2 border-stone-300 group-hover:border-[#D4A373]'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl select-none filter drop-shadow-sm">
                    {dish.icon}
                  </span>
                  {isOnPlate && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </div>

                {/* Floating Dish Name Tag */}
                <div className={`mt-1 px-1.5 py-0.5 rounded-md text-[8px] font-bold whitespace-nowrap shadow-sm transition-all ${
                  isSelected
                    ? 'bg-[#2C483F] text-[#D4A373] scale-105'
                    : 'bg-black/60 text-white/90'
                }`}>
                  {lang === 'ar' ? dish.nameAr : dish.nameEn}
                </div>
              </div>
            );
          })}
        </div>

        {/* Foreground: The Player's Personal Plate */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="relative w-36 sm:w-44 h-24 sm:h-28 rounded-full bg-gradient-to-b from-white via-[#FAF7F2] to-[#ECE5D8] border-4 border-[#D4A373] shadow-2xl p-2 flex flex-col items-center justify-center overflow-hidden">
            {/* Plate Rim Pattern */}
            <div className="absolute inset-1 rounded-full border border-[#D4A373]/40 pointer-events-none" />
            
            {/* Cutlery beside plate */}
            <span className="absolute left-2 text-stone-400 text-xs">🍴</span>
            <span className="absolute right-2 text-stone-400 text-xs">🥄</span>

            {/* Food Items Placed Visually on Plate */}
            {plateItems.length === 0 ? (
              <div className="text-center px-2">
                <span className="text-[10px] font-bold text-stone-400 block">
                  {lang === 'ar' ? 'صحنك الشخصي فارغ' : 'Your Plate is Empty'}
                </span>
                <span className="text-[8px] text-stone-400">
                  {lang === 'ar' ? 'انقر على الأطباق لفحصها واختيار الطيب منها' : 'Tap table dishes to inspect & add'}
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-1.5 px-3 z-10">
                {plateItems.map((id) => {
                  const d = dishes.find((item) => item.id === id);
                  if (!d) return null;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromPlate(id);
                      }}
                      className="group relative p-1 rounded-full bg-white/90 shadow border border-[#D4A373]/60 hover:border-rose-400 transition-all cursor-pointer"
                      title={lang === 'ar' ? 'انقر للإزالة من الصحن' : 'Click to remove'}
                    >
                      <span className="text-base sm:text-lg">{d.icon}</span>
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 text-white text-[7px] font-bold hidden group-hover:flex items-center justify-center">
                        ✕
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            
            <div className="absolute bottom-1 text-[7px] font-mono font-bold text-stone-500">
              {plateItems.length} {lang === 'ar' ? 'أصناف في الطبق' : 'items on plate'}
            </div>
          </div>
        </div>

        {/* In-Scene Interactive Inspection Tooltip / Drawer */}
        {activeDish && !mealConfirmed && (
          <div className="absolute top-16 left-4 right-4 sm:left-12 sm:right-12 z-30 p-3 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#D4A373] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in text-start">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-2 rounded-xl bg-amber-50 border border-amber-200">
                {activeDish.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-black text-[#2C483F]">
                    {lang === 'ar' ? activeDish.nameAr : activeDish.nameEn}
                  </h4>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      activeDish.category === 'clear_halal'
                        ? 'bg-emerald-100 text-emerald-800'
                        : activeDish.category === 'haram'
                        ? 'bg-rose-100 text-rose-800'
                        : isPastaVerified
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {activeDish.id === 'pasta' && isPastaVerified
                      ? (lang === 'ar' ? '✓ تم التحقق: نباتي خالص حلال' : '✓ Verified: Lawful Vegan')
                      : (lang === 'ar' ? activeDish.statusAr : activeDish.statusEn)}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-0.5 max-w-md">
                  {activeDish.id === 'pasta' && isPastaVerified
                    ? (lang === 'ar' ? activeDish.verifiedDescAr : activeDish.verifiedDescEn)
                    : (lang === 'ar' ? activeDish.descAr : activeDish.descEn)}
                </p>
              </div>
            </div>

            {/* Action Buttons for the active dish */}
            <div className="flex items-center gap-2 shrink-0">
              {activeDish.id === 'pasta' && !isPastaVerified && (
                <button
                  type="button"
                  onClick={() => handleVerify('pasta')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'سؤال النادل / التحقق' : 'Ask Waiter / Verify'}</span>
                </button>
              )}

              {activeDish.category !== 'haram' ? (
                plateItems.includes(activeDish.id) ? (
                  <button
                    type="button"
                    onClick={() => removeFromPlate(activeDish.id)}
                    className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    {lang === 'ar' ? 'إزالة من طبقي' : 'Remove from plate'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => addToPlate(activeDish.id)}
                    className="px-4 py-1.5 rounded-xl bg-[#2C483F] hover:bg-[#1C4135] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer hover:scale-105"
                  >
                    <span>+</span>
                    <span>{lang === 'ar' ? 'وضع في الطبق' : 'Add to plate'}</span>
                  </button>
                )
              ) : (
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
                  {lang === 'ar' ? 'تجاوزه واختيار البدائل الطيبة' : 'Leave it for lawful choices'}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Decision / Confirm Meal Button */}
      {plateItems.length > 0 && !mealConfirmed && (
        <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-300 flex items-center justify-between gap-3 animate-fade-in text-start">
          <div className="flex items-center gap-2 text-emerald-950 text-xs font-bold">
            <Utensils className="w-4 h-4 text-emerald-700" />
            <span>
              {lang === 'ar'
                ? `طبقك يحتوي على ${plateItems.length} أطباق طيبة وحلال، جاهز لتناول الغداء مع الزملاء.`
                : `Your plate contains ${plateItems.length} wholesome halal items, ready to dine.`}
            </span>
          </div>
          <button
            type="button"
            onClick={handleConfirmMeal}
            className="px-6 py-2.5 rounded-2xl bg-[#2C483F] hover:bg-[#1e342d] text-white text-xs font-black shadow-soft hover:scale-105 transition-all cursor-pointer shrink-0"
          >
            {lang === 'ar' ? 'أجهّز طبقي وأتناول الغداء بارتياح' : 'Confirm Plate & Dine with Ease'}
          </button>
        </div>
      )}

      {/* Gentle Explanation (Secondary - Appears After Interaction) */}
      {mealConfirmed && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2 animate-fade-in text-start">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'القاعدة الفقهية والسكينة الاجتماعية:' : 'Social Peace & Halal Clarity:'}</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed">
            {lang === 'ar'
              ? 'تناول الغداء مع زملاء العمل فرصة طيبة للألفة والمحبة؛ الأصل في الطيبات الإباحة، وإذا التبس عليك مكوّن، تسأل بلطف وتثبّت: «إذا لم تعرف، تحقق قبل أن تحكم» دون حرج أو وسوسة.'
              : 'Lunch with colleagues builds bridges of warmth. Wholesome food is lawful by default; if in doubt, verify gently: "If you do not know, check before you judge" without anxiety.'}
          </p>
        </div>
      )}
    </div>
  );
};
