
import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock,
  LayoutList,
  Sparkles,
  TrendingUp,
  CircleDashed,
  RotateCcw,
  AlertTriangle,
  X
} from 'lucide-react';

type FastStatus = 'not-come-yet' | 'fasted' | 'missed';

interface RamadanDay {
  dayNumber: number;
  status: FastStatus;
}

interface FastingTrackerProps {
  onAskAgent?: (query: string) => void;
}

const STORAGE_KEY = 'ummah_ramadan_tracker_v2';

const FastingTracker: React.FC<FastingTrackerProps> = ({ onAskAgent }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [ramadanDays, setRamadanDays] = useState<RamadanDay[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse Ramadan data", e);
      }
    }
    return Array.from({ length: 30 }, (_, i) => ({
      dayNumber: i + 1,
      status: 'not-come-yet'
    }));
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ramadanDays));
  }, [ramadanDays]);

  const stats = useMemo(() => {
    const fasted = ramadanDays.filter(d => d.status === 'fasted').length;
    const missed = ramadanDays.filter(d => d.status === 'missed').length;
    const remaining = ramadanDays.filter(d => d.status === 'not-come-yet').length;
    const progress = Math.round((fasted / 30) * 100);
    
    return { fasted, missed, remaining, progress };
  }, [ramadanDays]);

  const updateStatus = (dayNum: number, newStatus: FastStatus) => {
    setRamadanDays(prev => 
      prev.map(day => day.dayNumber === dayNum ? { ...day, status: newStatus } : day)
    );
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handleReset = () => {
    const freshData: RamadanDay[] = Array.from({ length: 30 }, (_, i) => ({
      dayNumber: i + 1,
      status: 'not-come-yet' as FastStatus
    }));
    setRamadanDays(freshData);
    setShowResetConfirm(false);
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
  };

  return (
    <div className="flex flex-col h-full bg-ummah-bg-light dark:bg-ummah-bg-dark transition-colors duration-500 font-inter">
      
      {/* Reset Confirmation Overlay */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowResetConfirm(false)}></div>
           <div className="relative bg-white dark:bg-ummah-card-dark rounded-[3rem] p-8 shadow-2xl border border-black/5 dark:border-white/10 max-w-sm w-full text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                 <AlertTriangle size={32} />
              </div>
              <h3 className="premium-header text-xl font-black text-ummah-text-light dark:text-ummah-text-dark mb-2 tracking-tight">Clear All Progress?</h3>
              <p className="text-xs text-ummah-text-light/50 dark:text-ummah-text-secondary-dark/50 font-medium leading-relaxed mb-8 px-2">
                This will reset all 30 days to "Not Come Yet". This action is private and cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={handleReset}
                  className="flex-1 py-4 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-rose-500/20 active:scale-95 transition-all"
                >
                  Yes, Reset
                </button>
                <button 
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-zinc-400 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                >
                  Cancel
                </button>
              </div>
           </div>
        </div>
      )}

      {/* Dashboard Section */}
      <div className="p-8 space-y-6">
        <div className="bg-gradient-to-br from-ummah-icon-active-light to-[#043326] dark:from-ummah-card-dark dark:to-ummah-bg-dark rounded-[3rem] p-8 text-white relative overflow-hidden shadow-premium animate-fade-up">
           <div className="absolute inset-0 pattern-bg opacity-10"></div>
           
           <div className="relative z-10 flex flex-col items-center">
             <div className="w-24 h-24 relative flex items-center justify-center mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="48" cy="48" r="42"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="48" cy="48" r="42"
                    fill="transparent"
                    stroke="#3ED598"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - stats.progress / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black">{stats.progress}%</span>
                  <span className="text-[7px] font-black uppercase tracking-widest opacity-60">Success</span>
                </div>
             </div>

             <h2 className="premium-header text-2xl font-black mb-6">Ramadan Progress</h2>

             <div className="grid grid-cols-3 w-full gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/5">
                   <p className="text-[7px] font-black uppercase tracking-widest text-emerald-300 mb-1">Fasted</p>
                   <p className="text-xl font-black">{stats.fasted}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/5">
                   <p className="text-[7px] font-black uppercase tracking-widest text-rose-300 mb-1">Missed</p>
                   <p className="text-xl font-black">{stats.missed}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/5">
                   <p className="text-[7px] font-black uppercase tracking-widest text-blue-300 mb-1">Left</p>
                   <p className="text-xl font-black">{stats.remaining}</p>
                </div>
             </div>
           </div>
        </div>

        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-2">
            <LayoutList size={16} className="text-ummah-icon-active-light" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40">Log Your Fasts</h3>
          </div>
          <button 
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-2 text-[9px] font-black text-rose-500 uppercase tracking-widest px-3 py-1.5 bg-rose-500/5 rounded-lg border border-rose-500/10 active:scale-95 transition-all"
          >
            <RotateCcw size={12} /> Reset Data
          </button>
        </div>
      </div>

      {/* Main List Section */}
      <div className="px-8 pb-32 space-y-4">
        {ramadanDays.map((day) => (
          <div 
            key={day.dayNumber}
            className="bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-[2.5rem] p-6 shadow-soft group hover:border-ummah-icon-active-light/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all ${
                  day.status === 'fasted' ? 'bg-ummah-icon-active-light text-white shadow-glow' :
                  day.status === 'missed' ? 'bg-rose-500 text-white shadow-lg' :
                  'bg-ummah-mint dark:bg-ummah-bg-dark text-ummah-icon-active-light'
                }`}>
                  {day.dayNumber}
                </div>
                <div>
                  <h4 className="text-sm font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight">Day {day.dayNumber} of Ramadan</h4>
                  <p className="text-[9px] font-bold text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/40 uppercase tracking-widest mt-0.5">
                    {day.status === 'not-come-yet' ? 'Pending Observation' : day.status === 'fasted' ? 'MashaAllah! Fasted' : 'Fasted Missed'}
                  </p>
                </div>
              </div>
              
              <div className="flex bg-slate-50 dark:bg-ummah-bg-dark p-1.5 rounded-2xl border border-black/5 dark:border-white/5 gap-1 shadow-inner">
                <button 
                  onClick={() => updateStatus(day.dayNumber, 'not-come-yet')}
                  className={`p-2 rounded-xl transition-all ${day.status === 'not-come-yet' ? 'bg-white dark:bg-ummah-card-dark text-slate-400 shadow-sm' : 'text-slate-300 opacity-40 hover:opacity-100'}`}
                  title="Not Come Yet"
                >
                  <CircleDashed size={18} />
                </button>
                <button 
                  onClick={() => updateStatus(day.dayNumber, 'fasted')}
                  className={`p-2 rounded-xl transition-all ${day.status === 'fasted' ? 'bg-ummah-icon-active-light text-white shadow-glow scale-110' : 'text-ummah-icon-active-light opacity-40 hover:opacity-100'}`}
                  title="Mark as Fasted"
                >
                  <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={() => updateStatus(day.dayNumber, 'missed')}
                  className={`p-2 rounded-xl transition-all ${day.status === 'missed' ? 'bg-rose-500 text-white shadow-lg scale-110' : 'text-rose-500 opacity-40 hover:opacity-100'}`}
                  title="Mark as Missed"
                >
                  <XCircle size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Spiritual Motivation */}
        <div className="py-20 text-center opacity-20 pointer-events-none flex flex-col items-center gap-4">
           <Sparkles size={24} className="text-ummah-gold" />
           <p className="text-[9px] font-black uppercase tracking-[0.5em] leading-loose max-w-[200px]">
             O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.
           </p>
        </div>
      </div>
    </div>
  );
};

export default FastingTracker;
