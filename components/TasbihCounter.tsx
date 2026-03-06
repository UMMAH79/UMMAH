
import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'ummah_simple_tasbih_count_v4';
const SOUND_KEY = 'ummah_simple_tasbih_sound_v4';

const TasbihCounter: React.FC = () => {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem(SOUND_KEY);
    return saved === null ? true : saved === 'true';
  });

  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem(SOUND_KEY, soundEnabled.toString());
  }, [soundEnabled]);

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio feedback failed", e);
    }
  }, [soundEnabled]);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setIsPulsing(true);
    playClick();
    if (navigator.vibrate) navigator.vibrate(10);
    setTimeout(() => setIsPulsing(false), 80);
  };

  const handleReset = () => {
    setCount(0);
    if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-ummah-bg-light dark:bg-ummah-bg-dark transition-colors p-8 select-none">
      {/* Sound Toggle */}
      <div className="absolute top-6 right-8 z-20">
        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-4 rounded-2xl bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 shadow-soft transition-all active:scale-90 ${soundEnabled ? 'text-ummah-icon-active-light dark:text-ummah-icon-active-dark' : 'text-slate-300'}`}
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center gap-10">
        <div className="text-center space-y-2">
          <h2 className="premium-header text-3xl font-black text-ummah-text-light dark:text-ummah-text-dark uppercase tracking-tight">Tasbih</h2>
          <p className="text-[10px] font-black text-ummah-gold uppercase tracking-[0.4em] opacity-60">Heart's Remembrance</p>
        </div>

        {/* Main Counter Button */}
        <button 
          onClick={handleIncrement}
          className={`
            relative w-72 h-72 rounded-full flex flex-col items-center justify-center
            bg-white dark:bg-ummah-card-dark border-[10px] shadow-premium transition-all duration-75 active:scale-[0.97]
            ${isPulsing 
              ? 'border-ummah-icon-active-light dark:border-ummah-icon-active-dark scale-[1.02]' 
              : 'border-ummah-mint dark:border-white/5'}
          `}
        >
          <span className="text-[10px] font-black text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/30 uppercase tracking-[0.3em] mb-2">Total</span>
          <h1 className="text-8xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tighter tabular-nums leading-none">
            {count}
          </h1>
          <div className="mt-4 flex items-center gap-2">
            <Sparkles size={14} className="text-ummah-gold animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest text-ummah-gold">Tap to Count</span>
          </div>
        </button>

        {/* Action Bar */}
        <div className="flex flex-col items-center gap-6 w-full">
          <button 
            onClick={handleReset}
            className="flex items-center gap-3 px-10 py-5 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-3xl font-black text-[11px] uppercase tracking-widest border border-rose-100 dark:border-rose-900/30 active:scale-90 transition-all shadow-sm"
          >
            <RotateCcw size={18} /> Reset Counter
          </button>
          
          <p dir="rtl" className="arabic-text text-4xl text-ummah-icon-active-light/20 dark:text-ummah-icon-active-dark/10 mt-4">
            سُبْحَانَ ٱللَّٰهِ
          </p>
        </div>
      </div>
    </div>
  );
};

export default TasbihCounter;
