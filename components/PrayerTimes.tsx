import React, { useState, useEffect } from 'react';
import { PrayerTimes as IPrayerTimes, LocationData, UserSettings } from '../types';
import { CALCULATION_METHODS, ADHAN_VOICES } from '../constants';
import { 
  MapPin, 
  Loader2, 
  Settings2, 
  X, 
  Volume2, 
  BellRing, 
  Check, 
  Clock,
  Zap,
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface Props {
  location: LocationData | null;
  initialTimings: IPrayerTimes | null;
  settings: UserSettings;
  onUpdateSettings: (s: Partial<UserSettings>) => void;
  onAskAgent?: (query: string) => void;
  setActiveAdhan: (adhan: {name: string, voiceId: string} | null) => void;
}

const PrayerTimes: React.FC<Props> = ({ location, initialTimings, settings, onUpdateSettings, onAskAgent, setActiveAdhan }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPrayerInfo, setCurrentPrayerInfo] = useState<{ 
    name: string; 
    time: string; 
    nextName: string; 
    nextTime: string;
    progress: number;
    remainingText: string;
    secondsRemaining: number;
  } | null>(null);

  useEffect(() => {
    if (!initialTimings) return;

    const updateStatus = () => {
      const now = new Date();
      const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      
      const prayers = [
        { name: 'Fajr', time: initialTimings.Fajr },
        { name: 'Dhuhr', time: initialTimings.Dhuhr },
        { name: 'Asr', time: initialTimings.Asr },
        { name: 'Maghrib', time: initialTimings.Maghrib },
        { name: 'Isha', time: initialTimings.Isha },
      ];

      let nextIdx = -1;
      for (let i = 0; i < prayers.length; i++) {
        const [h, m] = prayers[i].time.split(':').map(Number);
        const prayerSeconds = h * 3600 + m * 60;
        if (currentSeconds < prayerSeconds) {
          nextIdx = i;
          break;
        }
      }

      // If all passed, next is Fajr tomorrow
      if (nextIdx === -1) nextIdx = 0; 

      const next = prayers[nextIdx];
      const prev = prayers[(nextIdx - 1 + prayers.length) % prayers.length];
      
      const [ph, pm] = prev.time.split(':').map(Number);
      let startSecs = ph * 3600 + pm * 60;
      
      const [nh, nm] = next.time.split(':').map(Number);
      let endSecs = nh * 3600 + nm * 60;
      
      let nowSecs = currentSeconds;

      if (endSecs <= startSecs) {
        if (nowSecs >= startSecs) {
          endSecs += 86400; 
        } else {
          startSecs -= 86400;
        }
      }

      const duration = endSecs - startSecs;
      const elapsed = nowSecs - startSecs;
      const progress = Math.max(0, Math.min(100, (elapsed / duration) * 100));
      const remaining = endSecs - nowSecs;
      
      const rh = Math.floor(remaining / 3600);
      const rm = Math.floor((remaining % 3600) / 60);
      const rs = remaining % 60;
      
      setCurrentPrayerInfo({
        name: prev.name,
        time: prev.time,
        nextName: next.name,
        nextTime: next.time,
        progress,
        remainingText: `${rh > 0 ? `${rh}h ` : ""}${rm}m ${rs}s`,
        secondsRemaining: remaining
      });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, [initialTimings]);

  const prayerIcons: Record<string, string> = { 
    Fajr: '🌅', Dhuhr: '☀️', Asr: '🌥️', Maghrib: '🌆', Isha: '🌙' 
  };
  const arabicNames: Record<string, string> = { 
    Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' 
  };

  if (!initialTimings) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-ummah-bg-light dark:bg-ummah-bg-dark">
        <Loader2 className="animate-spin text-ummah-icon-active-light mb-4" size={40} />
        <p className="text-[10px] text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase tracking-[0.3em] font-black">
          Syncing Sacred Timings...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col bg-ummah-bg-light dark:bg-ummah-bg-dark transition-colors duration-300 overflow-y-auto green-scrollbar pb-32">
      {/* Header */}
      <div className="p-8 flex justify-between items-center bg-white/80 dark:bg-ummah-bg-dark/80 backdrop-blur-md sticky top-0 z-30 border-b border-black/5 dark:border-white/5">
        <div>
          <h1 className="premium-header text-2xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight uppercase">Prayer Times</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin size={10} className="text-ummah-icon-active-light" />
            <p className="text-[9px] font-black text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase tracking-widest truncate max-w-[150px]">
              {location?.city || 'Detecting Location...'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="p-3 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-2xl text-ummah-icon-inactive-light hover:text-ummah-icon-active-light transition-all shadow-soft"
        >
          <Settings2 size={20} />
        </button>
      </div>

      {/* Next Prayer Hero */}
      {currentPrayerInfo && (
        <div className="px-6 mt-6 mb-10 animate-fade-up">
          <div className="bg-gradient-to-br from-ummah-icon-active-light to-[#043326] dark:from-ummah-card-dark dark:to-ummah-bg-dark rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-premium">
            <div className="absolute inset-0 opacity-10 pattern-bg"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">Next Prayer</span>
              </div>
              
              <div className="mb-2">
                <p dir="rtl" className="arabic-text text-4xl font-bold text-ummah-gold drop-shadow-sm">
                  {arabicNames[currentPrayerInfo.nextName]}
                </p>
              </div>
              
              <h2 className="premium-header text-6xl font-black tracking-widest uppercase mb-6 text-white drop-shadow-2xl">
                {currentPrayerInfo.nextName}
              </h2>
              
              <div className="inline-block py-6 px-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-inner mb-10">
                 <p className="text-[10px] font-black text-emerald-100/40 uppercase tracking-[0.4em] mb-2">Begins In</p>
                 <p className="text-4xl font-black text-white tracking-tighter tabular-nums leading-none">
                   {currentPrayerInfo.remainingText}
                 </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                   <span>{currentPrayerInfo.name}</span>
                   <span>{currentPrayerInfo.nextName}</span>
                </div>
                <div className="h-2 bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-ummah-gold to-amber-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                    style={{ width: `${currentPrayerInfo.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prayer List */}
      <div className="px-6 space-y-4">
        <div className="flex items-center justify-between px-2 mb-4">
          <h3 className="text-[11px] font-black text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/30 uppercase tracking-[0.4em]">Daily Schedule</h3>
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-ummah-gold" />
            <span className="text-[9px] font-black text-ummah-gold uppercase tracking-widest">Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        
        {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((name) => {
          const time = initialTimings[name as keyof IPrayerTimes];
          const isNext = currentPrayerInfo?.nextName === name;

          return (
            <div 
              key={name}
              className={`flex items-center justify-between p-7 rounded-[3rem] border transition-all duration-500 shadow-soft relative overflow-hidden group ${
                isNext 
                  ? 'bg-white dark:bg-ummah-card-dark border-ummah-gold/40 ring-4 ring-ummah-gold/5' 
                  : 'bg-white/60 dark:bg-ummah-card-dark/60 border-black/5 dark:border-white/5 hover:border-ummah-icon-active-light/20'
              }`}
            >
              {isNext && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ummah-gold to-amber-500 animate-pulse"></div>
              )}

              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-3xl transition-all duration-500 ${
                  isNext ? 'bg-ummah-gold text-white shadow-glow' : 'bg-ummah-mint dark:bg-ummah-bg-dark text-ummah-icon-active-light'
                }`}>
                  {prayerIcons[name]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`text-lg font-black tracking-tight ${isNext ? 'text-ummah-gold' : 'text-ummah-text-light dark:text-ummah-text-dark'}`}>{name}</h4>
                    {isNext && <Sparkles size={12} className="text-ummah-gold animate-pulse" />}
                  </div>
                  <p dir="rtl" className="arabic-text text-2xl font-bold mt-1 text-ummah-gold opacity-90 leading-none">{arabicNames[name]}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                 <p className={`text-2xl font-black tracking-tighter tabular-nums ${isNext ? 'text-ummah-text-light dark:text-white' : 'text-ummah-text-light/80 dark:text-ummah-text-dark/80'}`}>{time}</p>
                 <button 
                  onClick={() => {
                    setActiveAdhan({ name, voiceId: settings.selectedAdhanVoice });
                    if (navigator.vibrate) navigator.vibrate(20);
                  }}
                  className={`p-4 rounded-2xl transition-all hover:scale-110 active:scale-90 ${isNext ? 'bg-ummah-gold text-white shadow-premium' : 'bg-ummah-bg-light dark:bg-white/5 text-ummah-icon-inactive-light'}`}
                 >
                   <Volume2 size={20} />
                 </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Settings Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-ummah-bg-dark/60 backdrop-blur-xl" onClick={() => setIsEditing(false)}></div>
           <div className="absolute inset-x-4 bottom-10 animate-fade-up bg-white dark:bg-ummah-card-dark rounded-[4rem] p-10 shadow-2xl border border-black/5 dark:border-white/10 max-h-[85vh] overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="premium-header text-xl font-black text-ummah-text-light dark:text-ummah-text-dark uppercase tracking-tight">Preferences</h3>
                 <button onClick={() => setIsEditing(false)} className="p-3 bg-ummah-mint dark:bg-white/5 rounded-2xl text-ummah-icon-inactive-light active:scale-90 transition-all"><X size={20} /></button>
              </div>

              <div className="space-y-12">
                 <div>
                    <label className="block text-[10px] font-black text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase tracking-[0.5em] mb-8 flex items-center gap-3">
                       <BellRing size={16} className="text-ummah-icon-active-light" /> Notification Sound
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                       {ADHAN_VOICES.map(voice => (
                          <button
                            key={voice.id}
                            onClick={() => onUpdateSettings({ selectedAdhanVoice: voice.id })}
                            className={`w-full p-6 rounded-[2.5rem] border text-left transition-all duration-500 flex items-center justify-between ${
                              settings.selectedAdhanVoice === voice.id 
                                ? 'bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark border-ummah-icon-active-light dark:border-ummah-icon-active-dark text-white shadow-premium' 
                                : 'bg-ummah-mint dark:bg-ummah-bg-dark border-transparent text-ummah-text-light dark:text-ummah-text-secondary-dark'
                            }`}
                          >
                             <div>
                               <span className="font-bold text-lg tracking-tight block">{voice.name}</span>
                               <span className={`text-[10px] font-black uppercase tracking-widest ${settings.selectedAdhanVoice === voice.id ? 'text-white/60' : 'text-ummah-text-light/40'}`}>{voice.reciter}</span>
                             </div>
                             {settings.selectedAdhanVoice === voice.id && <Check size={24} />}
                          </button>
                       ))}
                    </div>
                 </div>

                 <div>
                    <label className="block text-[10px] font-black text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase tracking-[0.5em] mb-8 flex items-center gap-3">
                       <Clock size={16} className="text-ummah-icon-active-light" /> Calculation Method
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                       {CALCULATION_METHODS.map(method => (
                          <button
                            key={method.id}
                            onClick={() => onUpdateSettings({ calculationMethod: method.id })}
                            className={`w-full p-6 rounded-[2.5rem] border text-left transition-all duration-500 ${
                              settings.calculationMethod === method.id 
                                ? 'bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark border-ummah-icon-active-light dark:border-ummah-icon-active-dark text-white shadow-premium' 
                                : 'bg-ummah-mint dark:bg-ummah-bg-dark border-transparent text-ummah-text-light dark:text-ummah-text-secondary-dark'
                            }`}
                          >
                             <span className="font-bold text-sm tracking-tight leading-tight">{method.name}</span>
                          </button>
                       ))}
                    </div>
                 </div>

                 <button 
                    onClick={() => setIsEditing(false)}
                    className="w-full py-6 bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark text-white rounded-[3rem] font-black text-xs uppercase tracking-[0.4em] shadow-premium active:scale-95 transition-all"
                 >
                    Save & Sync
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PrayerTimes;