
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { HADITHS } from '../constants';
import { 
  Headphones, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Share2, 
  Loader2, 
  Volume2, 
  Bookmark, 
  Music,
  UserCircle2,
  Check
} from 'lucide-react';
import { reciteHadith, decodeAudioData, VoiceType } from '../services/ai';

const BOOKMARKS_KEY = 'ummah_hub_hadith_bookmarks';

const HadithReciter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const voice: VoiceType = 'male';
  
  const [bookmarks, setBookmarks] = useState<any[]>(() => {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const currentHadith = HADITHS[currentIndex];
  const isBookmarked = bookmarks.some(b => b.text === currentHadith.text);

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    window.dispatchEvent(new Event('bookmarksUpdated'));
  }, [bookmarks]);

  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      if (saved) setBookmarks(JSON.parse(saved));
    };
    window.addEventListener('bookmarksUpdated', handleSync);
    return () => window.removeEventListener('bookmarksUpdated', handleSync);
  }, []);

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {}
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const handlePlayToggle = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    setIsLoading(true);
    try {
      const audioBytes = await reciteHadith(
        currentHadith.text, 
        currentHadith.source, 
        currentHadith.category, 
        voice
      );
      
      if (audioBytes) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioContextRef.current;
        const buffer = await decodeAudioData(audioBytes, ctx);
        const sourceNode = ctx.createBufferSource();
        sourceNode.buffer = buffer;
        sourceNode.connect(ctx.destination);
        sourceNode.onended = () => {
          setIsPlaying(false);
        };
        sourceNodeRef.current = sourceNode;
        sourceNode.start();
        setIsPlaying(true);
      }
    } catch (e) {
      console.error("Audio playback error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    stopAudio();
    setCurrentIndex(prev => (prev + 1) % HADITHS.length);
  };

  const handlePrev = () => {
    stopAudio();
    setCurrentIndex(prev => (prev - 1 + HADITHS.length) % HADITHS.length);
  };

  const toggleBookmark = () => {
    if (window.navigator.vibrate) window.navigator.vibrate(20);
    if (isBookmarked) {
      setBookmarks(prev => prev.filter(b => b.text !== currentHadith.text));
    } else {
      setBookmarks(prev => [...prev, { ...currentHadith, bookmarkedAt: Date.now() }]);
    }
  };

  const handleShare = async () => {
    const shareText = `📜 *Listen to this Hadith*\n\n"${currentHadith.text}"\n\n— *Source:* ${currentHadith.source}\n\n🔗 Shared via *UMMAH* - Your Digital Islamic Sanctuary`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Hadith Wisdom - UMMAH', text: shareText });
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {}
    }
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  return (
    <div className="p-6 pb-24 flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-black text-ummah-icon-active-light dark:text-ummah-icon-active-dark uppercase tracking-[0.4em] bg-ummah-mint dark:bg-ummah-icon-active-dark/10 px-4 py-1.5 rounded-full border border-ummah-icon-active-light/10">
          Ummah AI Recitation
        </span>
        <h2 className="text-[11px] font-black text-ummah-text-light/40 dark:text-ummah-text-secondary-dark uppercase tracking-widest">{currentIndex + 1} of {HADITHS.length}</h2>
      </div>

      {/* Voice Info Badge */}
      <div className="flex bg-ummah-mint dark:bg-ummah-card-dark p-2 rounded-2xl w-full max-w-[200px] shadow-inner border border-black/5 dark:border-white/5 items-center justify-center gap-3">
        <div className="p-1.5 bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark rounded-lg text-white">
          <UserCircle2 size={16} />
        </div>
        <span className="text-[10px] font-black text-ummah-icon-active-light dark:text-ummah-icon-active-dark uppercase tracking-widest">Male Hafiz</span>
      </div>

      {/* Media Card */}
      <div className="w-full max-w-sm aspect-square bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-[3.5rem] shadow-premium flex flex-col items-center justify-center p-12 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-ummah-mint/30 to-transparent transition-opacity duration-700"></div>
        
        <div className={`w-32 h-32 rounded-full bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark flex items-center justify-center text-white mb-8 shadow-xl relative z-10 transition-transform duration-1000 ${isPlaying ? 'scale-110 shadow-glow' : ''}`}>
           {isLoading ? (
             <Loader2 size={48} className="animate-spin" />
           ) : isPlaying ? (
             <Volume2 size={48} className="animate-pulse" />
           ) : (
             <Music size={48} />
           )}
        </div>

        <div className="text-center relative z-10 space-y-6">
          <p className="premium-header text-xl font-bold text-ummah-text-light dark:text-ummah-text-dark leading-relaxed italic line-clamp-4 px-2">
            "{currentHadith.text}"
          </p>
          <div className="flex flex-col items-center gap-3">
            <span className="text-[9px] font-black text-ummah-gold uppercase tracking-[0.4em] px-4 py-1.5 bg-ummah-gold/5 rounded-full border border-ummah-gold/10">{currentHadith.category}</span>
            <p className="text-[10px] font-black text-ummah-icon-active-light dark:text-ummah-icon-active-dark uppercase tracking-[0.2em]">{currentHadith.source}</p>
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-8">
        <button 
          onClick={handlePrev}
          className="p-5 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-3xl text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark hover:text-ummah-icon-active-light transition-all active:scale-90 shadow-soft"
        >
          <SkipBack size={24} fill="currentColor" />
        </button>

        <button 
          onClick={handlePlayToggle}
          disabled={isLoading}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-premium ${isPlaying ? 'bg-rose-500 text-white shadow-rose-100' : 'bg-ummah-icon-active-light text-white shadow-ummah-icon-active-light/30'}`}
        >
          {isLoading ? (
            <Loader2 size={36} className="animate-spin" />
          ) : isPlaying ? (
            <Pause size={36} fill="currentColor" />
          ) : (
            <Play size={36} fill="currentColor" className="ml-1" />
          )}
        </button>

        <button 
          onClick={handleNext}
          className="p-5 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-3xl text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark hover:text-ummah-icon-active-light transition-all active:scale-90 shadow-soft"
        >
          <SkipForward size={24} fill="currentColor" />
        </button>
      </div>

      <div className="w-full max-w-sm flex items-center justify-between px-8 py-5 bg-white dark:bg-ummah-card-dark rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-soft">
         <button 
           onClick={toggleBookmark}
           className={`flex flex-col items-center gap-1.5 transition-colors ${isBookmarked ? 'text-ummah-emerald' : 'text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark hover:text-ummah-icon-active-light'}`}
         >
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
            <span className="text-[8px] font-black uppercase tracking-widest">{isBookmarked ? 'Saved' : 'Save'}</span>
         </button>
         <button 
           onClick={handleShare}
           className={`flex flex-col items-center gap-1.5 transition-colors ${isCopied ? 'text-emerald-500' : 'text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark hover:text-ummah-icon-active-light'}`}
         >
            {isCopied ? <Check size={18} /> : <Share2 size={18} />}
            <span className="text-[8px] font-black uppercase tracking-widest">{isCopied ? 'Done' : 'Share'}</span>
         </button>
         <div className="flex flex-col items-center gap-1.5 text-ummah-icon-active-light dark:text-ummah-icon-active-dark">
            <Headphones size={18} />
            <span className="text-[8px] font-black uppercase tracking-widest">Live Qari</span>
         </div>
      </div>

      <p className="text-[10px] text-ummah-text-light/40 dark:text-ummah-text-secondary-dark font-medium italic text-center max-w-[280px] leading-relaxed">
        "Vocals are modeled after classical Qari masters to provide a spiritually grounding listening experience."
      </p>
    </div>
  );
};

export default HadithReciter;
