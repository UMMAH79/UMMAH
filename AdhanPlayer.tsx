
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ADHAN_PHRASES, ADHAN_VOICES } from '../constants';
import { X, Volume2, Music, User, MapPin, Loader2 } from 'lucide-react';

interface AdhanPlayerProps {
  voiceId: string;
  prayerName: string;
  onClose: () => void;
}

const AdhanPlayer: React.FC<AdhanPlayerProps> = ({ voiceId, prayerName, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const voice = ADHAN_VOICES.find(v => v.id === voiceId) || ADHAN_VOICES[0];

  // Map for missing transliterations in the constant file
  const transliterations: Record<string, string> = {
    "اللَّهُ أَكْبَرُ (x4)": "Allāhu Akbar (x4)",
    "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ (x2)": "Ash-hadu an lā ilāha illallāh (x2)",
    "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ (x2)": "Ash-hadu anna Muḥammadan Rasūlullāh (x2)",
    "حَيَّ عَلَى الصَّلَاةِ (x2)": "Ḥayya ‘alaṣ-Ṣalāh (x2)",
    "حَيَّ عَلَى الْفَلَاحِ (x2)": "Ḥayya ‘alal-Falāḥ (x2)",
    "الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ (x2)": "Aṣ-Ṣalātu khayrum-minan-nawm (x2)",
    "اللَّهُ أَكْبَرُ (x2)": "Allāhu Akbar (x2)",
    "لَا إِلَهَ إِلَّا اللَّهُ": "Lā ilāha illallāh"
  };

  const activePhrases = useMemo(() => {
    const isFajr = prayerName === 'Fajr';
    const raw = ADHAN_PHRASES.filter(ph => !ph.fajrOnly || isFajr);
    
    let currentStart = 0;
    return raw.map((ph, idx) => {
      const duration = 100 / raw.length;
      const segment = {
        ...ph,
        transliteration: transliterations[ph.arabic] || "",
        start: currentStart,
        end: idx === raw.length - 1 ? 100 : currentStart + duration
      };
      currentStart = segment.end;
      return segment;
    });
  }, [prayerName]);

  useEffect(() => {
    const audio = new Audio(voice.url);
    audioRef.current = audio;
    
    const handleTimeUpdate = () => {
      if (!audio.duration) return;
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(p);
      
      const idx = activePhrases.findIndex(ph => p >= ph.start && p < ph.end);
      if (idx !== -1) setActivePhraseIndex(idx);
    };

    const handleEnded = () => onClose();

    const handleCanPlay = () => {
      setIsBuffering(false);
      audio.play().catch(() => console.warn("Auto-play interaction required"));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('waiting', () => setIsBuffering(true));
    audio.addEventListener('playing', () => setIsBuffering(false));

    audio.load();

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, [voice, activePhrases, onClose]);

  const handleManualClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    onClose();
  };

  const getArabicSize = (text: string) => {
    const len = text.length;
    if (len < 15) return 'text-5xl md:text-7xl lg:text-8xl';
    if (len < 30) return 'text-3xl md:text-5xl lg:text-6xl';
    return 'text-2xl md:text-3xl lg:text-4xl';
  };

  const getTransSize = (text: string) => {
    const len = text.length;
    if (len < 25) return 'text-xl md:text-2xl lg:text-3xl';
    if (len < 50) return 'text-lg md:text-xl lg:text-2xl';
    return 'text-base md:text-lg';
  };

  const getTranslationSize = (text: string) => {
    const len = text.length;
    if (len < 30) return 'text-lg md:text-xl lg:text-2xl';
    if (len < 60) return 'text-base md:text-lg';
    return 'text-sm md:text-base';
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-ummah-bg-dark flex flex-col items-center p-6 md:p-10 animate-in fade-in duration-500 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pattern-bg pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-ummah-icon-active-dark/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      {/* Header */}
      <div className="relative w-full max-w-lg flex justify-between items-center mb-6 md:mb-10 shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-ummah-icon-active-dark border border-white/10">
            {isBuffering ? <Loader2 size={20} className="animate-spin" /> : <Volume2 size={20} />}
          </div>
          <div>
            <h2 className="text-white font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px] opacity-40">Adhan Recitation</h2>
            <p className="text-ummah-icon-active-dark font-black tracking-tight text-sm md:text-lg">Prayer: {prayerName}</p>
          </div>
        </div>
        <button onClick={handleManualClose} className="p-3 md:p-4 bg-white/5 text-white/40 hover:text-white rounded-2xl border border-white/10 transition-all active:scale-95">
          <X size={20} />
        </button>
      </div>

      {/* Mu'adhin */}
      <div className="relative mb-6 md:mb-10 flex flex-col items-center animate-fade-up shrink-0">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-ummah-icon-active-dark to-emerald-900 p-1 mb-2 shadow-glow">
          <div className="w-full h-full rounded-full bg-ummah-bg-dark flex items-center justify-center text-ummah-icon-active-dark">
            <User size={24} md:size={30} />
          </div>
        </div>
        <h3 className="text-white font-bold text-base md:text-lg tracking-tight mb-0.5">{voice.reciter}</h3>
        <div className="flex items-center gap-2 text-white/40 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
          <MapPin size={10} /> {voice.name}
        </div>
      </div>

      {/* Main Text Area */}
      <div className="relative w-full max-w-3xl flex-1 flex flex-col items-center justify-center text-center px-2 md:px-6 overflow-hidden min-h-0">
        {activePhrases.map((phrase, idx) => (
          <div 
            key={idx}
            className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto green-scrollbar ${
              idx === activePhraseIndex 
                ? 'opacity-100 scale-100 translate-y-0 visible' 
                : 'opacity-0 scale-95 translate-y-4 pointer-events-none invisible'
            }`}
          >
            <div className="w-full space-y-4 md:space-y-6">
              {/* Arabic Layer */}
              <p dir="rtl" className={`arabic-text ${getArabicSize(phrase.arabic)} text-white font-bold leading-[1.3] drop-shadow-lg transition-all duration-500`}>
                {phrase.arabic}
              </p>
              
              {/* Transliteration Layer */}
              <p className={`${getTransSize(phrase.transliteration)} text-ummah-gold font-bold tracking-wide uppercase transition-all duration-500 opacity-90`}>
                {phrase.transliteration}
              </p>

              <div className="h-px w-12 md:w-20 bg-white/10 mx-auto"></div>

              {/* Translation Layer */}
              <p className={`${getTranslationSize(phrase.english)} text-ummah-icon-active-dark font-medium italic leading-relaxed max-w-xl mx-auto opacity-80 transition-all duration-500`}>
                "{phrase.english}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="relative w-full max-w-md mt-6 md:mt-10 shrink-0">
        <div className="flex justify-between text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">
          <span>{prayerName} Begins</span>
          <span>Full Adhan Cycle</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div className="h-full bg-ummah-icon-active-dark rounded-full shadow-glow transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 md:mt-8 mb-4 flex items-center gap-2 py-2 px-5 bg-white/5 rounded-full border border-white/5 shrink-0">
        <Music size={12} className="text-ummah-icon-active-dark" />
        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Authentic Human Audio</span>
      </div>
    </div>
  );
};

export default AdhanPlayer;
