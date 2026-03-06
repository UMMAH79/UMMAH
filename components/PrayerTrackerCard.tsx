
import React, { useState, useEffect, useMemo } from 'react';
import { Moon, Sun, Loader2, Clock } from 'lucide-react';
import { PrayerTimes as IPrayerTimes } from '../types';

interface Schedule {
  name: string;
  start: string;
  end: string;
  nextLabel: string;
}

interface Props {
  timings: IPrayerTimes | null;
}

const PrayerTrackerCard: React.FC<Props> = ({ timings }) => {
  const [activePrayer, setActivePrayer] = useState<Schedule | null>(null);
  const [progress, setProgress] = useState(0);
  const [timeRemainingText, setTimeRemainingText] = useState("");
  const [iconPosition, setIconPosition] = useState({ x: 10, y: 90 });
  const [isNight, setIsNight] = useState(true);

  const toMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const schedule: Schedule[] = useMemo(() => {
    if (!timings) return [];
    return [
      { name: "Fajr", start: timings.Fajr, end: timings.Sunrise, nextLabel: "Sunrise" },
      { name: "Sunrise", start: timings.Sunrise, end: timings.Dhuhr, nextLabel: "Dhuhr" },
      { name: "Dhuhr", start: timings.Dhuhr, end: timings.Asr, nextLabel: "Asr" },
      { name: "Asr", start: timings.Asr, end: timings.Maghrib, nextLabel: "Maghrib" },
      { name: "Maghrib", start: timings.Maghrib, end: timings.Isha, nextLabel: "Isha" },
      { name: "Isha", start: timings.Isha, end: timings.Fajr, nextLabel: "Fajr" },
    ];
  }, [timings]);

  useEffect(() => {
    if (!schedule.length) return;

    const updateWidget = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      let current = null;
      for (let i = 0; i < schedule.length; i++) {
        const item = schedule[i];
        let s = toMinutes(item.start);
        let e = toMinutes(item.end);

        if (e < s) { // Overnight case (Isha to Fajr)
          if (currentMinutes >= s || currentMinutes < e) {
            current = item;
            break;
          }
        } else {
          if (currentMinutes >= s && currentMinutes < e) {
            current = item;
            break;
          }
        }
      }

      if (!current) current = schedule[schedule.length - 1];
      setActivePrayer(current);

      let s = toMinutes(current.start);
      let e = toMinutes(current.end);
      let nowAdj = currentMinutes;

      if (e < s) {
        if (nowAdj < s) nowAdj += 1440;
        e += 1440;
      }

      const totalDuration = e - s;
      const elapsed = nowAdj - s;
      const percent = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
      setProgress(percent);

      const remaining = e - nowAdj;
      const rh = Math.floor(remaining / 60);
      const rm = remaining % 60;
      setTimeRemainingText(`${rh > 0 ? `${rh}h ` : ""}${rm}m`);

      setIsNight(["Fajr", "Maghrib", "Isha"].includes(current.name));

      const t = percent / 100;
      const p0 = { x: 10, y: 90 };
      const p1 = { x: 150, y: -40 };
      const p2 = { x: 290, y: 90 };
      const x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
      const y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
      setIconPosition({ x, y });
    };

    updateWidget();
    const interval = setInterval(updateWidget, 10000);
    return () => clearInterval(interval);
  }, [schedule]);

  if (!timings || !activePrayer) {
    return (
      <div className="bg-white dark:bg-ummah-card-dark rounded-5xl p-16 flex flex-col items-center justify-center shadow-premium border border-black/5 dark:border-white/5">
        <Loader2 className="animate-spin text-ummah-icon-active-light dark:text-ummah-icon-active-dark mb-4" size={32} />
        <p className="text-[10px] font-black text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase tracking-[0.3em]">Sacred timing sync...</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-white dark:bg-ummah-card-dark rounded-[3rem] p-10 shadow-premium border border-black/5 dark:border-white/5 group">
      {/* Decorative Clock Outline */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-[0.03] dark:opacity-[0.05] dark:text-ummah-icon-active-dark">
        <Clock size={300} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        {/* Top Labels */}
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/40 mb-10">
          <div className="flex flex-col gap-1">
            <span className="text-ummah-icon-active-light dark:text-ummah-icon-active-dark opacity-100">{activePrayer.name}</span>
            <span>{activePrayer.start}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="opacity-60">{activePrayer.nextLabel}</span>
            <span>{activePrayer.end}</span>
          </div>
        </div>

        {/* The Arc Hero Section */}
        <div className="relative h-28 mb-10 flex justify-center items-end">
          <svg className="absolute w-full h-full overflow-visible" viewBox="0 0 300 100">
            {/* Background Arc */}
            <path 
              d="M 10 90 Q 150 -40 290 90" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray="6 8"
              className="text-ummah-mint dark:text-white/10"
            />
            {/* Active Progress Arc */}
            <path 
              d="M 10 90 Q 150 -40 290 90" 
              fill="none" 
              stroke="url(#arcGradient)" 
              strokeWidth="3" 
              strokeDasharray="300"
              strokeDashoffset={300 - (300 * (progress / 100))}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0E6F4F" />
                <stop offset="100%" stopColor="#3ED598" />
              </linearGradient>
            </defs>

            {/* Moving Celestial Icon */}
            <g transform={`translate(${iconPosition.x - 20}, ${iconPosition.y - 20})`}>
                <foreignObject width="40" height="40">
                    <div className={`flex items-center justify-center w-full h-full rounded-full shadow-premium transition-all duration-1000 border-2 border-white dark:border-ummah-bg-dark ${
                      isNight ? 'bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark text-white' : 'bg-ummah-gold text-white'
                    }`}>
                        {isNight ? (
                          <Moon size={20} fill="currentColor" />
                        ) : (
                          <Sun size={20} fill="currentColor" />
                        )}
                    </div>
                </foreignObject>
            </g>
          </svg>
        </div>

        {/* Info Area */}
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-ummah-gold uppercase tracking-[0.4em] mb-2">Currently</p>
              <h2 className="premium-header text-4xl font-black text-ummah-text-light dark:text-ummah-text-dark leading-none">
                {activePrayer.name}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/40 uppercase tracking-[0.4em] mb-2">Next Prayer ({timeRemainingText})</p>
              <h2 className="premium-header text-4xl font-black text-ummah-icon-active-light dark:text-ummah-icon-active-dark leading-none uppercase">
                {activePrayer.nextLabel}
              </h2>
            </div>
          </div>

          {/* Simple Progress Bar */}
          <div className="h-1.5 bg-ummah-mint dark:bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-ummah-icon-active-light to-ummah-icon-active-dark rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerTrackerCard;
