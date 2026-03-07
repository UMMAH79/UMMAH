
import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Star, 
  Moon, 
  X,
  Sparkles,
  CheckCircle2,
  Zap
} from 'lucide-react';

const HIJRI_MONTH_NAMES = [
  "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
  "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
];

const GREGORIAN_MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface Event {
  name: string;
  hDate: string; // "HijriDay HijriMonthName HijriYear"
  gDate: string; // "YYYY-MM-DD"
  type: 'eid' | 'fasting' | 'holy_night' | 'commemoration';
  description: string;
}

// 2026 Exact Islamic Events based on astronomical mapping provided
const EVENTS_2026: Event[] = [
  { name: "Isra and Mi'raj", hDate: "27 Rajab 1447", gDate: "2026-01-16", type: 'holy_night', description: "Prophet Muhammad's (PBUH) night journey and ascension to heaven." },
  { name: "Shab-e-Barat", hDate: "15 Sha'ban 1447", gDate: "2026-02-03", type: 'holy_night', description: "The Night of Records and Forgiveness." },
  { name: "Ramadan Begins", hDate: "1 Ramadan 1447", gDate: "2026-02-18", type: 'fasting', description: "The first day of fasting in the holiest month of the year." },
  { name: "Nuzul Quran", hDate: "17 Ramadan 1447", gDate: "2026-03-07", type: 'commemoration', description: "The day the first verses of the Holy Quran were revealed." },
  { name: "Laylat al-Qadr", hDate: "27 Ramadan 1447", gDate: "2026-03-16", type: 'holy_night', description: "The Night of Power (Expected), better than a thousand months." },
  { name: "Eid al-Fitr", hDate: "1 Shawwal 1447", gDate: "2026-03-20", type: 'eid', description: "Festival of breaking the fast, marking the joyful end of Ramadan." },
  { name: "Hajj Begins", hDate: "8 Dhu al-Hijjah 1447", gDate: "2026-05-25", type: 'commemoration', description: "The start of the annual pilgrimage to Makkah." },
  { name: "Day of Arafah", hDate: "9 Dhu al-Hijjah 1447", gDate: "2026-05-26", type: 'fasting', description: "The most important day of Hajj; fasting is highly recommended for non-pilgrims." },
  { name: "Eid al-Adha", hDate: "10 Dhu al-Hijjah 1447", gDate: "2026-05-27", type: 'eid', description: "Festival of Sacrifice, honoring Ibrahim's (AS) devotion to Allah." },
  { name: "Islamic New Year", hDate: "1 Muharram 1448", gDate: "2026-06-16", type: 'commemoration', description: "The beginning of the year 1448 AH, marking the Hijrah." },
  { name: "Ashura", hDate: "10 Muharram 1448", gDate: "2026-06-25", type: 'fasting', description: "10th of Muharram; a day of fasting and victory for Musa (AS)." },
  { name: "Mawlid an-Nabi", hDate: "12 Rabi' al-Awwal 1448", gDate: "2026-08-25", type: 'commemoration', description: "Observance of the birth and life of the Prophet Muhammad (PBUH)." },
];

// Precise Month Starts for 2026 calibrated to match the event dates exactly
const HIJRI_MONTH_STARTS_DATA = [
  { hMonth: 6, hYear: 1447, gStart: "2025-12-21" }, // 1 Rajab 1447
  { hMonth: 7, hYear: 1447, gStart: "2026-01-20" }, // 1 Sha'ban 1447
  { hMonth: 8, hYear: 1447, gStart: "2026-02-18" }, // 1 Ramadan 1447
  { hMonth: 9, hYear: 1447, gStart: "2026-03-20" }, // 1 Shawwal 1447
  { hMonth: 10, hYear: 1447, gStart: "2026-04-19" }, // 1 Dhu al-Qi'dah 1447
  { hMonth: 11, hYear: 1447, gStart: "2026-05-18" }, // 1 Dhu al-Hijjah 1447
  { hMonth: 0, hYear: 1448, gStart: "2026-06-16" }, // 1 Muharram 1448
  { hMonth: 1, hYear: 1448, gStart: "2026-07-16" }, // 1 Safar 1448
  { hMonth: 2, hYear: 1448, gStart: "2026-08-14" }, // 1 Rabi' al-Awwal 1448
  { hMonth: 3, hYear: 1448, gStart: "2026-09-13" }, // 1 Rabi' al-Thani 1448
  { hMonth: 4, hYear: 1448, gStart: "2026-10-12" }, // 1 Jumada al-Ula 1448
  { hMonth: 5, hYear: 1448, gStart: "2026-11-11" }, // 1 Jumada al-Thani 1448
  { hMonth: 6, hYear: 1448, gStart: "2026-12-11" }, // 1 Rajab 1448
];

interface IslamicCalendarProps {
  onAskAgent?: (query: string) => void;
}

const IslamicCalendar: React.FC<IslamicCalendarProps> = ({ onAskAgent }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); 
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const getHijriDate = (date: Date) => {
    const dStr = date.toISOString().split('T')[0];
    const starts = [...HIJRI_MONTH_STARTS_DATA].reverse();
    const start = starts.find(s => s.gStart <= dStr) || HIJRI_MONTH_STARTS_DATA[0];
    const diff = Math.floor((date.getTime() - new Date(start.gStart).getTime()) / (1000 * 60 * 60 * 24));
    return {
      day: diff + 1,
      month: start.hMonth,
      year: start.hYear,
      monthName: HIJRI_MONTH_NAMES[start.hMonth]
    };
  };

  const calendarDays = useMemo(() => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Fill initial empty cells
    for (let i = 0; i < firstDay; i++) days.push(null);
    
    for (let i = 1; i <= lastDay; i++) {
      const d = new Date(year, month, i);
      const hijri = getHijriDate(d);
      const dStr = d.toISOString().split('T')[0];
      const event = EVENTS_2026.find(e => e.gDate === dStr);
      
      const isWhiteDay = [13, 14, 15].includes(hijri.day);
      const isSunnahFast = d.getDay() === 1 || d.getDay() === 4;

      days.push({ 
        gDay: i, 
        hDay: hijri.day, 
        event, 
        fullDate: dStr, 
        hijriInfo: hijri,
        isWhiteDay,
        isSunnahFast,
        isToday: dStr === todayStr
      });
    }
    return days;
  }, [currentDate]);

  const changeMonth = (dir: number) => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + dir);
    if (next.getFullYear() !== 2026) return;
    setCurrentDate(next);
  };

  const typeStyles = {
    eid: 'bg-emerald-600 text-white shadow-glow',
    fasting: 'bg-amber-500 text-white',
    holy_night: 'bg-indigo-600 text-white',
    commemoration: 'bg-slate-700 text-white'
  };

  return (
    <div className="flex flex-col h-full bg-ummah-bg-light dark:bg-ummah-bg-dark transition-colors">
      {/* Header Info */}
      <div className="px-8 pt-10 pb-6 flex justify-between items-end">
        <div>
          <h1 className="premium-header text-4xl font-black text-ummah-text-light dark:text-ummah-text-dark leading-none">Calendar</h1>
          <p className="text-[10px] font-black text-emerald-600 dark:text-ummah-icon-active-dark uppercase tracking-[0.4em] mt-3">2026 Gregorian | 1447–1448 AH</p>
        </div>
        <div className="p-3 bg-white dark:bg-ummah-card-dark rounded-2xl shadow-soft border border-black/5 dark:border-white/5">
           <CalendarIcon className="text-ummah-gold" size={24} />
        </div>
      </div>

      {/* Main Calendar Card */}
      <div className="px-6 mb-10">
        <div className="bg-white dark:bg-ummah-card-dark rounded-[3rem] shadow-premium border border-black/5 dark:border-white/5 overflow-hidden transition-all duration-500">
          
          {/* Controller */}
          <div className="p-8 flex items-center justify-between border-b border-black/5 dark:border-white/5">
            <button 
              onClick={() => changeMonth(-1)} 
              className="p-3 bg-ummah-bg-light dark:bg-ummah-bg-dark text-ummah-icon-inactive-light hover:text-emerald-600 rounded-2xl transition-all active:scale-90"
              disabled={currentDate.getMonth() === 0}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-center">
              <h2 className="text-xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight">
                {GREGORIAN_MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <p className="text-[10px] font-bold text-ummah-gold uppercase tracking-[0.3em] mt-1">
                {getHijriDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)).monthName} {getHijriDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)).year} AH
              </p>
            </div>
            <button 
              onClick={() => changeMonth(1)} 
              className="p-3 bg-ummah-bg-light dark:bg-ummah-bg-dark text-ummah-icon-inactive-light hover:text-emerald-600 rounded-2xl transition-all active:scale-90"
              disabled={currentDate.getMonth() === 11}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Week Labels */}
          <div className="grid grid-cols-7 bg-ummah-bg-light/30 dark:bg-ummah-bg-dark/30 border-b border-black/5 dark:border-white/5">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="py-4 text-center text-[9px] font-black text-ummah-text-light/20 dark:text-ummah-text-secondary-dark/20 tracking-widest">{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 p-4">
            {calendarDays.map((day, idx) => {
              if (!day) return <div key={idx} className="aspect-square"></div>;
              const isSelected = selectedDay?.fullDate === day.fullDate;

              return (
                <button 
                  key={idx}
                  onClick={() => setSelectedDay(day)}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-[1.5rem] transition-all duration-300 group ${
                    day.isToday ? 'bg-emerald-600 shadow-glow text-white z-10 scale-105' : 
                    isSelected ? 'bg-ummah-mint dark:bg-white/5 ring-1 ring-emerald-500/20' : 
                    'hover:bg-ummah-mint/50 dark:hover:bg-white/5'
                  }`}
                >
                  <span className={`text-base font-black ${day.isToday ? 'text-white' : 'text-ummah-text-light dark:text-ummah-text-dark'}`}>
                    {day.gDay}
                  </span>
                  <span className={`text-[9px] font-bold mt-0.5 ${day.isToday ? 'text-white/60' : 'text-ummah-gold/60'}`}>
                    {day.hDay}
                  </span>

                  {day.event && (
                    <div className={`absolute bottom-2 w-1.5 h-1.5 rounded-full ${day.isToday ? 'bg-white' : 'bg-emerald-500 animate-pulse'}`}></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Day/Event View */}
      {selectedDay && (
        <div className="px-6 mb-10 animate-fade-up">
          <div className="bg-white dark:bg-ummah-card-dark p-8 rounded-[3rem] shadow-premium border border-black/5 dark:border-white/5 relative overflow-hidden">
            <button 
              onClick={() => setSelectedDay(null)}
              className="absolute top-6 right-6 p-2 text-ummah-icon-inactive-light hover:text-rose-500 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-5 mb-8">
              <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center text-3xl ${selectedDay.event ? typeStyles[selectedDay.event.type] : 'bg-ummah-mint dark:bg-white/5 text-ummah-gold'}`}>
                {selectedDay.event ? (selectedDay.event.type === 'eid' ? '🕌' : '✨') : <Moon size={24} />}
              </div>
              <div>
                <h3 className="text-2xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight leading-none">
                  {selectedDay.event ? selectedDay.event.name : `${GREGORIAN_MONTH_NAMES[currentDate.getMonth()]} ${selectedDay.gDay}`}
                </h3>
                <p className="text-[11px] font-black text-ummah-gold uppercase tracking-[0.3em] mt-2">
                  {selectedDay.hijriInfo.day} {selectedDay.hijriInfo.monthName} {selectedDay.hijriInfo.year} AH
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-ummah-mint/50 dark:bg-white/5 rounded-[2rem] border border-black/5 dark:border-white/5">
                <p className="text-sm font-medium text-ummah-text-light/70 dark:text-ummah-text-secondary-dark leading-relaxed italic">
                  {selectedDay.event ? selectedDay.event.description : "May this day bring peace and spiritual growth to your life."}
                </p>
              </div>

              {selectedDay.isToday && (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-900/30 text-[9px] font-black uppercase tracking-widest w-fit">
                  <CheckCircle2 size={10} /> Active Day
                </div>
              )}

              <button 
                onClick={() => onAskAgent?.(`What are the recommended acts of worship or spiritual significance for ${selectedDay.hijriInfo.day} ${selectedDay.hijriInfo.monthName}?`)}
                className="w-full py-5 bg-ummah-text-light dark:bg-ummah-icon-active-dark text-white dark:text-ummah-bg-dark rounded-[2rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-premium"
              >
                <Sparkles size={16} /> Consult UMMAH AI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full 2026 Schedule List */}
      <div className="px-8 pb-10">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-ummah-text-light/20 dark:text-ummah-text-secondary-dark/20">Significant Events</h3>
          <div className="h-px flex-1 bg-black/5 dark:bg-white/5"></div>
        </div>

        <div className="grid gap-4">
          {EVENTS_2026.map((event, idx) => {
            const dateObj = new Date(event.gDate);
            const isPassed = dateObj < new Date();
            
            return (
              <div key={idx} className={`bg-white dark:bg-ummah-card-dark p-6 rounded-[2.5rem] border border-black/5 dark:border-white/5 flex items-center justify-between group hover:border-emerald-500/20 transition-all ${isPassed ? 'opacity-40' : ''}`}>
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft ${typeStyles[event.type]}`}>
                    {event.type === 'eid' ? <CheckCircle2 size={20} /> : event.type === 'fasting' ? <Moon size={20} /> : <Zap size={20} />}
                  </div>
                  <div>
                    <h4 className="font-black text-ummah-text-light dark:text-ummah-text-dark text-sm tracking-tight">{event.name}</h4>
                    <p className="text-[10px] font-bold text-ummah-gold/60 uppercase tracking-widest mt-1">
                      {event.hDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tighter uppercase tabular-nums">
                    {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-[8px] font-black text-ummah-text-light/20 dark:text-ummah-text-secondary-dark/20 uppercase tracking-widest mt-1">2026</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IslamicCalendar;
