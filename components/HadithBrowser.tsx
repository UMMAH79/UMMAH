
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { HADITHS } from '../constants';
import { 
  Search, 
  Quote, 
  Share2, 
  Loader2, 
  Volume2, 
  Pause, 
  ChevronDown, 
  Sparkles, 
  Lightbulb,
  CheckCircle2,
  Info,
  History,
  User,
  Globe,
  Dices,
  CloudLightning,
  Check,
  Plus,
  Star,
  BrainCircuit,
  Bookmark,
  BookMarked,
  Trash2,
  // Fix: Added missing Copy icon import from lucide-react
  Copy
} from 'lucide-react';
import { 
  reciteHadith, 
  decodeAudioData, 
  getHadithExplanation, 
  searchGlobalHadiths,
  VoiceType, 
  HadithInsight,
  GlobalHadith
} from '../services/ai';
import { useTranslation } from '../hooks/useTranslation';

import { AppLanguage } from '../types';

interface HadithBrowserProps {
  onAskAgent?: (query: string) => void;
  language: AppLanguage;
}

const BOOKMARKS_KEY = 'ummah_hub_hadith_bookmarks';

const HadithBrowser: React.FC<HadithBrowserProps> = ({ onAskAgent, language }) => {
  const { t } = useTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'bookmarks'>('all');
  const [loadingAudioId, setLoadingAudioId] = useState<string | number | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | number | null>(null);
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [explanations, setExplanations] = useState<Record<string | number, HadithInsight>>({});
  const [loadingExplanationId, setLoadingExplanationId] = useState<string | number | null>(null);
  const [globalResults, setGlobalResults] = useState<GlobalHadith[]>([]);
  const [isSearchingGlobal, setIsSearchingGlobal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [animateBookmarkId, setAnimateBookmarkId] = useState<string | number | null>(null);
  
  const [bookmarks, setBookmarks] = useState<any[]>(() => {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const activeVoice: VoiceType = 'male';
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    // Dispatch custom event for cross-component sync (like HadithReciter)
    window.dispatchEvent(new Event('bookmarksUpdated'));
  }, [bookmarks]);

  // Sync bookmarks from storage if changed elsewhere
  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      if (saved) setBookmarks(JSON.parse(saved));
    };
    window.addEventListener('bookmarksUpdated', handleSync);
    return () => window.removeEventListener('bookmarksUpdated', handleSync);
  }, []);

  // Calculate Hadith of the Day
  const dailyHadith = useMemo(() => {
    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const index = daysSinceEpoch % HADITHS.length;
    return { ...HADITHS[index], id: `daily-${index}`, type: 'local' as const };
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(HADITHS.map(h => h.category));
    return Array.from(cats);
  }, []);

  const localHadiths = useMemo(() => {
    return HADITHS.map((h, index) => ({ ...h, id: index })).filter(h => {
      const matchesSearch = h.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           h.source.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? h.category === selectedCategory : true;
      const matchesBookmarks = viewMode === 'bookmarks' ? bookmarks.some(b => b.text === h.text) : true;
      return matchesSearch && matchesCategory && matchesBookmarks;
    });
  }, [searchQuery, selectedCategory, viewMode, bookmarks]);

  const handleGlobalSearch = async (isCategoryLoad = false) => {
    setIsSearchingGlobal(true);
    setViewMode('all');
    try {
      const results = await searchGlobalHadiths(
        isCategoryLoad ? "" : searchQuery, 
        isCategoryLoad ? selectedCategory || undefined : undefined
      );
      
      if (isCategoryLoad) {
        setGlobalResults(prev => [...prev, ...results]);
      } else {
        setGlobalResults(results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearchingGlobal(false);
    }
  };

  const toggleExpand = async (id: string | number, text: string, source: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }

    setExpandedId(id);
    
    if (!explanations[id]) {
      setLoadingExplanationId(id);
      try {
        const insight = await getHadithExplanation(text, source);
        if (insight) {
          setExplanations(prev => ({ ...prev, [id]: insight }));
        }
      } catch (error) {
        console.error("AI Insight failed", error);
      } finally {
        setLoadingExplanationId(null);
      }
    }
  };

  const toggleBookmark = (e: React.MouseEvent, hadith: any) => {
    e.stopPropagation();
    const isBookmarked = bookmarks.some(b => b.text === hadith.text);
    
    if (window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }

    setAnimateBookmarkId(hadith.id || hadith.text);
    setTimeout(() => setAnimateBookmarkId(null), 600);

    if (isBookmarked) {
      setBookmarks(prev => prev.filter(b => b.text !== hadith.text));
    } else {
      setBookmarks(prev => [...prev, { ...hadith, bookmarkedAt: Date.now() }]);
    }
  };

  const handleRecite = async (e: React.MouseEvent, id: string | number, text: string, source: string, category: string) => {
    e.stopPropagation();
    if (playingAudioId === id) {
      stopAudio();
      return;
    }

    stopAudio();
    setLoadingAudioId(id);

    try {
      const audioBytes = await reciteHadith(text, source, category, activeVoice);
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
          setPlayingAudioId(null);
        };
        sourceNodeRef.current = sourceNode;
        sourceNode.start();
        setPlayingAudioId(id);
      }
    } catch (error) {
      console.error("Recitation failed", error);
    } finally {
      setLoadingAudioId(null);
    }
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {}
      sourceNodeRef.current = null;
    }
    setPlayingAudioId(null);
  };

  const handleShare = async (e: React.MouseEvent, id: string | number, text: string, source: string) => {
    e.stopPropagation();
    const insight = explanations[id];
    
    let shareText = `📜 *Hadith Wisdom*\n\n"${text}"\n\n— *Source:* ${source}`;
    
    if (insight) {
      shareText += `\n\n📖 *Reflections from UMMAH:*\n${insight.explanation}`;
      if (insight.lessons && insight.lessons.length > 0) {
        shareText += `\n\n💡 *Modern Practice:*\n• ${insight.lessons.join('\n• ')}`;
      }
    }
    
    shareText += `\n\n🔗 Shared via *UMMAH* - Your Digital Islamic Sanctuary`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hadith Wisdom - UMMAH',
          text: shareText,
        });
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        console.error('Clipboard failed', err);
      }
    }
  };

  const handleDeeperDive = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if (onAskAgent) {
      onAskAgent(`I'd like to dive deeper into this Hadith. Can you explain the context, the narrator, and how I can best implement its teachings in my modern daily life? Hadith: "${text}"`);
    }
  };

  const handleLucky = () => {
    const randomIndex = Math.floor(Math.random() * HADITHS.length);
    const h = HADITHS[randomIndex];
    setViewMode('all');
    toggleExpand(randomIndex, h.text, h.source);
    setTimeout(() => {
        document.getElementById(`hadith-${randomIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const clearAllBookmarks = () => {
    if (confirm("Remove all saved Hadiths?")) {
      setBookmarks([]);
    }
  };

  const allResults = useMemo(() => {
    const results = [
      ...localHadiths.map(h => ({ ...h, type: 'local' as const })),
      ...globalResults.map((h, i) => ({ ...h, id: `global-${i}`, type: 'global' as const }))
    ].filter(h => {
      if (selectedCategory && h.category !== selectedCategory) return false;
      if (viewMode === 'bookmarks') return bookmarks.some(b => b.text === h.text);
      return true;
    });
    return results;
  }, [localHadiths, globalResults, selectedCategory, viewMode, bookmarks]);

  return (
    <div className="p-5 pb-32 space-y-6 bg-ummah-bg-light dark:bg-ummah-bg-dark transition-colors min-h-full">
      <div className="flex flex-col gap-4">
        <form onSubmit={(e) => { e.preventDefault(); handleGlobalSearch(); }} className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark group-focus-within:text-ummah-icon-active-light transition-colors" size={18} />
          <input 
            type="text" 
            placeholder={t('search_hadith_placeholder')}
            className="w-full pl-16 pr-24 py-5 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-[2.5rem] focus:ring-4 focus:ring-ummah-mint outline-none transition-all shadow-soft text-ummah-text-light dark:text-ummah-text-dark font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery.length > 2 && (
            <button 
              type="submit"
              className="absolute right-3 top-3 bottom-3 px-4 bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark text-white rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest shadow-premium active:scale-95 transition-all"
            >
              {t('search')}
            </button>
          )}
        </form>

        <div className="flex items-center justify-between px-2">
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode(viewMode === 'all' ? 'bookmarks' : 'all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all ${viewMode === 'bookmarks' ? 'bg-ummah-emerald text-white border-ummah-emerald shadow-glow scale-105' : 'bg-ummah-mint dark:bg-ummah-icon-active-dark/10 border-ummah-icon-active-light/10 text-ummah-icon-active-light dark:text-ummah-icon-active-dark'}`}
            >
              {viewMode === 'bookmarks' ? <BookMarked size={14} /> : <Bookmark size={14} />}
              <span className="text-[10px] font-black uppercase tracking-widest">{viewMode === 'bookmarks' ? `${t('saved')} (${bookmarks.length})` : t('bookmarks')}</span>
            </button>
            <button 
                onClick={handleLucky}
                className="flex items-center gap-2 bg-ummah-gold/10 dark:bg-ummah-gold/5 px-4 py-2 rounded-2xl border border-ummah-gold/20 text-ummah-gold active:scale-95 transition-all"
            >
              <Dices size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest text-nowrap">{t('random')}</span>
            </button>
          </div>
          {viewMode === 'bookmarks' && bookmarks.length > 0 && (
            <button 
              onClick={clearAllBookmarks}
              className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
            >
              <Trash2 size={14} />
            </button>
          )}
          {viewMode === 'all' && (
            <div className="text-[10px] font-black text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/40 uppercase tracking-widest flex items-center gap-2 text-right">
              <Globe size={12} className="text-ummah-icon-active-light" />
              10,000+ {t('online')}
            </div>
          )}
        </div>
      </div>

      {viewMode === 'all' && (
        <div className="sticky top-0 z-20 py-2 bg-ummah-bg-light/80 dark:bg-ummah-bg-dark/80 backdrop-blur-md -mx-5 px-5 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-black/5 dark:border-white/5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${!selectedCategory ? 'bg-ummah-icon-active-light text-white shadow-premium' : 'bg-white dark:bg-ummah-card-dark text-ummah-text-light/40 border border-black/5 dark:border-white/5'}`}
          >
            {t('all_topics')}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setGlobalResults([]); }}
              className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-ummah-icon-active-light text-white shadow-premium' : 'bg-white dark:bg-ummah-card-dark text-ummah-text-light/40 border border-black/5 dark:border-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-6">
        {/* Hadith of the Day Card - Only show when in all view and no search */}
        {!searchQuery && !selectedCategory && viewMode === 'all' && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-4 px-2">
              <Star size={14} className="text-ummah-gold fill-ummah-gold/20" />
              <h3 className="text-[10px] font-black text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase tracking-[0.4em]">{t('hadith_of_the_day')}</h3>
            </div>
            
            <div 
              onClick={() => toggleExpand(dailyHadith.id, dailyHadith.text, dailyHadith.source)}
              className={`group bg-gradient-to-br from-ummah-mint to-white dark:from-ummah-card-dark dark:to-ummah-bg-dark border p-8 rounded-[3rem] shadow-premium relative overflow-hidden transition-all duration-700 cursor-pointer ${expandedId === dailyHadith.id ? 'border-ummah-gold/30 shadow-2xl ring-2 ring-ummah-gold/5' : 'border-ummah-gold/10'}`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote size={100} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[8px] font-black text-ummah-gold uppercase tracking-[0.4em] bg-ummah-gold/10 px-3 py-1.5 rounded-full border border-ummah-gold/20">
                    {dailyHadith.category}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => toggleBookmark(e, dailyHadith)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${bookmarks.some(b => b.text === dailyHadith.text) ? 'bg-ummah-emerald text-white shadow-glow scale-110' : 'bg-white/80 dark:bg-white/5 text-ummah-emerald'} ${animateBookmarkId === dailyHadith.id ? 'animate-bounce' : ''}`}
                    >
                      <Bookmark size={16} fill={bookmarks.some(b => b.text === dailyHadith.text) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={(e) => handleRecite(e, dailyHadith.id, dailyHadith.text, dailyHadith.source, dailyHadith.category)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${playingAudioId === dailyHadith.id ? 'bg-ummah-gold text-white shadow-lg' : 'bg-white/80 dark:bg-white/5 text-ummah-gold'}`}
                    >
                      {loadingAudioId === dailyHadith.id ? <Loader2 size={16} className="animate-spin" /> : playingAudioId === dailyHadith.id ? <Pause size={16} fill="currentColor" /> : <Volume2 size={16} />}
                    </button>
                  </div>
                </div>

                <p className={`premium-header font-black tracking-tight leading-relaxed transition-all duration-700 text-ummah-text-light dark:text-ummah-text-dark ${expandedId === dailyHadith.id ? 'text-xl mb-8' : 'text-lg mb-4'}`}>
                  "{dailyHadith.text}"
                </p>

                {expandedId === dailyHadith.id && explanations[dailyHadith.id] && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-4 py-6 border-t border-ummah-gold/10">
                     <div className="flex items-center gap-3">
                        <Sparkles size={14} className="text-ummah-gold" />
                        <span className="text-[9px] font-black text-ummah-gold uppercase tracking-[0.3em]">{t('ai_reflection')}</span>
                     </div>
                     <p className="text-xs font-bold italic text-ummah-text-light/80 dark:text-ummah-text-secondary-dark/80 leading-relaxed">
                        {explanations[dailyHadith.id].explanation}
                     </p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-6 border-t border-black/5 dark:border-white/5">
                  <span className="text-[9px] font-black text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/40 uppercase tracking-widest">{dailyHadith.source}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => handleDeeperDive(e, dailyHadith.text)}
                      className="px-3 py-1.5 bg-ummah-gold/5 text-ummah-gold rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5"
                    >
                      <Sparkles size={10} /> {t('deeper_dive')}
                    </button>
                    <button 
                      onClick={(e) => handleShare(e, dailyHadith.id, dailyHadith.text, dailyHadith.source)}
                      className="p-2.5 bg-white/50 dark:bg-white/5 text-ummah-gold rounded-xl transition-all active:scale-90"
                    >
                      {copiedId === dailyHadith.id ? <Check size={16} /> : <Share2 size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent mt-8 mb-4"></div>
          </div>
        )}

        {isSearchingGlobal && (
          <div className="py-20 flex flex-col items-center justify-center gap-6 animate-pulse">
            <div className="w-16 h-16 bg-ummah-mint dark:bg-white/5 rounded-3xl flex items-center justify-center text-ummah-icon-active-light">
              <Loader2 size={32} className="animate-spin" />
            </div>
            <p className="text-[11px] font-black text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/40 uppercase tracking-[0.3em]">{t('browsing_global_corpus')}</p>
          </div>
        )}

        {allResults.length === 0 && !isSearchingGlobal ? (
          <div className="py-16 px-8 bg-white dark:bg-ummah-card-dark rounded-[3rem] border border-black/5 dark:border-white/5 text-center flex flex-col items-center gap-6 animate-in fade-in">
             <div className="w-20 h-20 bg-ummah-mint dark:bg-white/5 rounded-[2rem] flex items-center justify-center text-ummah-icon-active-light shadow-inner">
                {viewMode === 'bookmarks' ? <Bookmark size={40} className="text-ummah-emerald" /> : <Globe size={40} />}
             </div>
             <div className="space-y-2">
                <h3 className="text-xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight">
                  {viewMode === 'bookmarks' ? t('your_sanctuary_empty') : t('expand_your_library')}
                </h3>
                <p className="text-xs text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 leading-relaxed max-w-xs mx-auto italic">
                    {viewMode === 'bookmarks' 
                      ? t('save_narrations_heart') 
                      : t('no_local_results')}
                </p>
             </div>
             {viewMode === 'all' && (
              <button 
                  onClick={() => handleGlobalSearch()}
                  className="w-full py-5 bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-premium flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                  <CloudLightning size={16} />
                  {t('search_global_library')}
              </button>
             )}
             {viewMode === 'bookmarks' && (
              <button 
                  onClick={() => setViewMode('all')}
                  className="w-full py-5 bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-premium flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                  {t('discover_new_hadiths')}
              </button>
             )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {allResults.map((hadith) => {
              const insight = explanations[hadith.id];
              const isExpanded = expandedId === hadith.id;
              const isCopied = copiedId === hadith.id;
              const isBookmarked = bookmarks.some(b => b.text === hadith.text);

              return (
                <div 
                  key={hadith.id} 
                  id={`hadith-${hadith.id}`}
                  onClick={() => toggleExpand(hadith.id, hadith.text, hadith.source)}
                  className={`bg-white dark:bg-ummah-card-dark border p-8 rounded-[3.5rem] shadow-soft relative overflow-hidden group transition-all duration-500 cursor-pointer ${isExpanded ? 'border-ummah-icon-active-light/30 shadow-premium scale-[1.01]' : 'border-black/5 dark:border-white/5'}`}
                >
                  <Quote className="absolute -top-6 -left-6 text-ummah-icon-active-light/5 group-hover:scale-110 transition-transform duration-700" size={120} />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-ummah-gold uppercase tracking-[0.4em] bg-ummah-gold/5 px-4 py-1.5 rounded-full border border-ummah-gold/10">
                          {hadith.category}
                        </span>
                        {hadith.type === 'global' && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full border border-emerald-500/10 text-[8px] font-black uppercase tracking-widest">
                            <Check size={10} strokeWidth={3} /> {t('global_corpus')}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => toggleBookmark(e, hadith)}
                          className={`p-3 rounded-2xl transition-all ${isBookmarked ? 'bg-ummah-emerald text-white shadow-premium scale-110' : 'bg-ummah-mint dark:bg-white/5 text-ummah-emerald'} ${animateBookmarkId === (hadith.id || hadith.text) ? 'animate-bounce' : ''}`}
                        >
                          <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
                        </button>
                        <button 
                          onClick={(e) => handleRecite(e, hadith.id, hadith.text, hadith.source, hadith.category)}
                          className={`p-3 rounded-2xl transition-all ${playingAudioId === hadith.id ? 'bg-ummah-icon-active-light text-white shadow-premium' : 'bg-ummah-mint dark:bg-white/5 text-ummah-icon-active-light'}`}
                        >
                          {loadingAudioId === hadith.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : playingAudioId === hadith.id ? (
                            <Pause size={16} fill="currentColor" />
                          ) : (
                            <Volume2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <p className={`premium-header leading-relaxed font-bold tracking-tight transition-all duration-500 text-ummah-text-light dark:text-ummah-text-dark ${isExpanded ? 'text-2xl mb-10' : 'text-xl mb-6 line-clamp-3'}`}>
                      "{hadith.text}"
                    </p>

                    {isExpanded && (
                      <div className="mt-10 pt-10 border-t border-black/5 dark:border-white/5 animate-fade-up space-y-12">
                        <div className="space-y-12">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-ummah-icon-active-light rounded-xl text-white shadow-premium">
                              <Sparkles size={16} />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-ummah-icon-active-light dark:text-ummah-icon-active-dark">{t('spiritual_reflection')}</span>
                          </div>
                          
                          {loadingExplanationId === hadith.id ? (
                            <div className="py-20 flex flex-col items-center gap-6">
                               <Loader2 size={32} className="animate-spin text-ummah-icon-active-light" />
                               <p className="text-[10px] font-black text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/40 uppercase tracking-widest">{t('consulting_knowledge_base')}</p>
                            </div>
                          ) : insight ? (
                            <div className="space-y-12">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="p-6 bg-ummah-mint/50 dark:bg-white/5 rounded-3xl border border-ummah-icon-active-light/5">
                                  <div className="flex items-center gap-2 mb-3 text-ummah-icon-active-light dark:text-ummah-icon-active-dark">
                                    <User size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">{t('narrator')}</span>
                                  </div>
                                  <p className="text-xs font-bold text-ummah-text-light/70 dark:text-ummah-text-secondary-dark leading-relaxed">
                                    {insight.narrator}
                                  </p>
                                </div>
                                <div className="p-6 bg-amber-50/50 dark:bg-amber-950/10 rounded-3xl border border-amber-500/10">
                                  <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-500">
                                    <History size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">{t('context')}</span>
                                  </div>
                                  <p className="text-xs font-bold text-ummah-text-light/70 dark:text-ummah-text-secondary-dark leading-relaxed">
                                    {insight.context}
                                  </p>
                                </div>
                              </div>

                              <div className="p-8 bg-ummah-mint/30 dark:bg-ummah-icon-active-dark/5 rounded-[3rem] border border-ummah-icon-active-light/5 relative overflow-hidden">
                                <Quote className="absolute top-4 right-4 text-ummah-icon-active-light/10" size={32} />
                                <div className="flex items-center gap-3 mb-4">
                                   <Info size={16} className="text-ummah-icon-active-light" />
                                   <span className="text-[10px] font-black uppercase tracking-widest text-ummah-icon-active-light">{t('explanation')}</span>
                                </div>
                                <p className="text-base text-ummah-text-light dark:text-ummah-text-dark leading-relaxed font-bold italic">
                                  {insight.explanation}
                                </p>
                              </div>
                              
                              <div className="space-y-5">
                                <div className="flex items-center gap-3 px-2">
                                  <Lightbulb size={18} className="text-ummah-gold" />
                                  <span className="text-[11px] font-black uppercase tracking-widest text-ummah-text-light/40 dark:text-ummah-text-secondary-dark">{t('modern_practice')}</span>
                                </div>
                                <div className="grid gap-4">
                                  {insight.lessons.map((lesson, lIdx) => (
                                    <div key={lIdx} className="flex gap-5 p-6 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-3xl items-start shadow-soft hover:border-ummah-icon-active-light/20 transition-colors">
                                      <div className="mt-1 text-ummah-icon-active-light dark:text-ummah-icon-active-dark shrink-0">
                                        <CheckCircle2 size={20} />
                                      </div>
                                      <span className="text-sm font-bold text-ummah-text-light/80 dark:text-ummah-text-dark/80 leading-relaxed">{lesson}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <button 
                                onClick={(e) => handleDeeperDive(e, hadith.text)}
                                className="w-full flex items-center justify-center gap-4 py-6 bg-ummah-gold text-white rounded-[2.5rem] text-[11px] font-black uppercase tracking-widest shadow-premium hover:shadow-glow transition-all active:scale-95"
                              >
                                <Sparkles size={20} />
                                {t('deeper_dive_ai')}
                              </button>
                            </div>
                          ) : (
                            <div className="p-6 bg-rose-50 rounded-3xl flex items-center gap-4 text-rose-700">
                              <Info size={20} />
                              <p className="text-[11px] font-bold">{t('insight_generation_paused')}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-8 mt-6 border-t border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-2 text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/40">
                        <span className="text-[10px] font-black uppercase tracking-widest">{hadith.source}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <button 
                          onClick={(e) => handleDeeperDive(e, hadith.text)}
                          className="flex items-center gap-2 px-3 py-2 bg-ummah-gold/10 text-ummah-gold rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-ummah-gold hover:text-white transition-all"
                        >
                          <BrainCircuit size={14} /> {t('ai_dive')}
                        </button>
                        <button 
                          onClick={(e) => handleShare(e, hadith.id, hadith.text, hadith.source)}
                          className={`p-3 rounded-2xl transition-all duration-300 flex items-center gap-2 ${isCopied ? 'bg-emerald-500 text-white shadow-premium' : 'bg-slate-50 dark:bg-white/5 text-ummah-icon-inactive-light hover:text-ummah-icon-active-light'}`}
                        >
                          {isCopied ? <Check size={18} /> : (navigator.share ? <Share2 size={18} /> : <Copy size={18} />)}
                          {isCopied && <span className="text-[8px] font-black uppercase tracking-widest">{t('shared')}</span>}
                        </button>
                        <ChevronDown size={24} className={`text-ummah-icon-inactive-light transition-transform duration-500 ${isExpanded ? 'rotate-180 text-ummah-icon-active-light' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {viewMode === 'all' && (
            <div className="p-10 flex flex-col items-center gap-4 animate-in fade-in">
              <button 
                  onClick={() => handleGlobalSearch(true)}
                  disabled={isSearchingGlobal}
                  className="px-8 py-5 bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-premium flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
              >
                  {isSearchingGlobal ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  {t('load_more_global')}
              </button>
              <p className="text-[9px] text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/30 font-bold uppercase tracking-widest">
                  {t('browsing_verified_narrations')}
              </p>
            </div>
          )}
        </>
      )
    }
      </div>
      
      <div className="py-20 text-center opacity-10">
         <div className="inline-flex items-center gap-6 text-ummah-icon-active-light">
            <div className="w-12 h-px bg-current"></div>
            <Quote size={20} />
            <div className="w-12 h-px bg-current"></div>
         </div>
      </div>
    </div>
  );
};

export default HadithBrowser;
