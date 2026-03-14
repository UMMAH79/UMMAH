import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { fetchSurahs, fetchSurahDetail, fetchAyahDetail, translateText, getAiVerseContent } from '../services/api';
import { Surah, Ayah, AppLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { 
  Search, 
  Headphones, 
  Play, 
  Pause, 
  Bookmark, 
  Languages,
  ChevronLeft,
  Star,
  Sparkles,
  Volume2,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface QuranReaderProps {
  currentLanguage: AppLanguage;
}

const STORAGE_KEY = 'ummah_hub_quran_bookmarks';

const QuranReader: React.FC<QuranReaderProps> = ({ currentLanguage }) => {
  const { t } = useTranslation(currentLanguage);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [featuredAyah, setFeaturedAyah] = useState<(Ayah & { surah: any }) | null>(null);
  const [featuredLoading, setFeaturedLoading] = useState(false);
  const [featuredError, setFeaturedError] = useState(false);
  const [isPlayingFeatured, setIsPlayingFeatured] = useState(false);
  const [viewMode, setViewMode] = useState<'surahs' | 'bookmarks'>('surahs');
  
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  
  // AI translations state
  const [aiContent, setAiContent] = useState<Record<number, { translation: string; transliteration: string }>>({});
  const [isAiLoading, setIsAiLoading] = useState<Record<number, boolean>>({});

  const [bookmarks, setBookmarks] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [playingAyahNumber, setPlayingAyahNumber] = useState<number | null>(null);
  const translatedAyahs = useRef<Set<number>>(new Set());
  const loadingAyahs = useRef<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const featuredAudioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const activeEdition = useMemo(() => {
    return SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage)?.edition || 'en.sahih';
  }, [currentLanguage]);

  useEffect(() => {
    fetchSurahs().then(setSurahs);
    loadDailyFeaturedAyah();
    
    // Reset AI content and refs on language or surah change
    setAiContent({});
    setIsAiLoading({});
    translatedAyahs.current.clear();
    loadingAyahs.current.clear();
    
    if (selectedSurah) {
      setLoading(true);
      fetchSurahDetail(selectedSurah.number, activeEdition).then(data => {
        setAyahs(data);
        setLoading(false);
      });
    }
    
    return () => {
      stopAudio();
      stopFeaturedAudio();
    };
  }, [currentLanguage, activeEdition, selectedSurah?.number]);

  useEffect(() => {
    if (playingAyahNumber && ayahRefs.current[playingAyahNumber]) {
      ayahRefs.current[playingAyahNumber]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [playingAyahNumber]);

  const loadDailyFeaturedAyah = async () => {
    setFeaturedLoading(true);
    setFeaturedError(false);
    try {
      const now = new Date();
      const daysSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
      const ayahId = (daysSinceEpoch % 6236) + 1;
      const data = await fetchAyahDetail(ayahId, activeEdition);
      if (data) {
        setFeaturedAyah(data);
        
        // Auto-translate featured ayah
        if (currentLanguage !== 'en') {
          const langName = SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage)?.name || 'English';
          const aiRes = await getAiVerseContent(data.text, langName);
          if (aiRes) {
            setAiContent(prev => ({
              ...prev,
              [data.number]: aiRes
            }));
          } else {
            const translated = await translateText(data.text, currentLanguage, data.transliteration);
            if (translated) {
              setAiContent(prev => ({
                ...prev,
                [data.number]: translated
              }));
            }
          }
        }
      } else {
        setFeaturedError(true);
      }
    } catch (e) {
      console.error("Failed to load featured ayah", e);
      setFeaturedError(true);
    } finally {
      setFeaturedLoading(false);
    }
  };

  const handleSurahClick = async (surah: Surah) => {
    stopAudio();
    stopFeaturedAudio();
    setSelectedSurah(surah);
    setLoading(true);
    setAiContent({}); // Reset AI content for new surah
    translatedAyahs.current.clear();
    loadingAyahs.current.clear();
    try {
      const data = await fetchSurahDetail(surah.number, activeEdition);
      setAyahs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const translateAyahIfNeeded = useCallback(async (ayah: Ayah) => {
    if (translatedAyahs.current.has(ayah.number) || loadingAyahs.current.has(ayah.number)) return;
    
    loadingAyahs.current.add(ayah.number);
    setIsAiLoading(prev => ({ ...prev, [ayah.number]: true }));
    
    try {
      if (currentLanguage === 'en') {
        loadingAyahs.current.delete(ayah.number);
        setIsAiLoading(prev => ({ ...prev, [ayah.number]: false }));
        return;
      }

      const langName = SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage)?.name || 'English';
      const aiRes = await getAiVerseContent(ayah.text, langName);
      
      if (aiRes) {
        translatedAyahs.current.add(ayah.number);
        setAiContent(prev => ({
          ...prev,
          [ayah.number]: aiRes
        }));
      } else {
        const translated = await translateText(ayah.text, currentLanguage, ayah.transliteration);
        if (translated) {
          translatedAyahs.current.add(ayah.number);
          setAiContent(prev => ({
            ...prev,
            [ayah.number]: translated
          }));
        }
      }
    } catch (e) {
      console.error(`Translation Error for Ayah ${ayah.number}:`, e);
    }
    
    loadingAyahs.current.delete(ayah.number);
    setIsAiLoading(prev => ({ ...prev, [ayah.number]: false }));
  }, [currentLanguage]);

  // Auto-translate visible ayahs
  useEffect(() => {
    if (!ayahs.length || !selectedSurah) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ayahNumber = Number(entry.target.getAttribute('data-ayah-number'));
            const ayah = ayahs.find(a => a.number === ayahNumber);
            if (ayah) {
              translateAyahIfNeeded(ayah);
            }
          }
        });
      },
      { threshold: 0, rootMargin: '500px' }
    );

    // Observe all ayah elements
    const elements = Object.values(ayahRefs.current).filter((el): el is HTMLDivElement => el !== null);
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ayahs, currentLanguage, selectedSurah, translateAyahIfNeeded]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingAyahNumber(null);
  };

  const stopFeaturedAudio = () => {
    if (featuredAudioRef.current) {
      featuredAudioRef.current.pause();
      featuredAudioRef.current = null;
    }
    setIsPlayingFeatured(false);
  };

  const toggleFeaturedAudio = () => {
    if (!featuredAyah) return;
    
    if (isPlayingFeatured) {
      stopFeaturedAudio();
    } else {
      stopAudio(); 
      const audio = new Audio(featuredAyah.audio);
      featuredAudioRef.current = audio;
      setIsPlayingFeatured(true);
      
      audio.play().catch(() => setIsPlayingFeatured(false));
      audio.onended = () => setIsPlayingFeatured(false);
    }
  };

  const toggleAyahAudio = (ayah: Ayah, list?: Ayah[]) => {
    if (playingAyahNumber === ayah.number) {
      stopAudio();
    } else {
      stopFeaturedAudio();
      if (audioRef.current) stopAudio();
      
      // Translate when playing
      translateAyahIfNeeded(ayah);

      const audio = new Audio(ayah.audio);
      audioRef.current = audio;
      setPlayingAyahNumber(ayah.number);
      
      audio.play().catch(() => setPlayingAyahNumber(null));
      
      audio.onended = () => {
        if (list) {
          const currentIndex = list.findIndex(a => a.number === ayah.number);
          if (currentIndex !== -1 && currentIndex < list.length - 1) {
            toggleAyahAudio(list[currentIndex + 1], list);
          } else {
            stopAudio();
          }
        } else {
          stopAudio();
        }
      };
    }
  };

  const toggleBookmark = (ayah: Ayah, surah: any) => {
    const isBookmarked = bookmarks.some(b => b.number === ayah.number);
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter(b => b.number !== ayah.number);
    } else {
      const newBookmark = {
        ...ayah,
        surahNumber: surah.number,
        surahName: surah.englishName,
        createdAt: Date.now()
      };
      newBookmarks = [...bookmarks, newBookmark];
    }
    setBookmarks(newBookmarks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
  };

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.toString().includes(searchQuery)
  );

  const getDynamicFontSizes = (ayah: Ayah) => {
    const currentTranslit = aiContent[ayah.number]?.transliteration || ayah.transliteration;
    const currentTrans = aiContent[ayah.number]?.translation || ayah.translation;
    
    const totalChars = ayah.text.length + 
                       (showTransliteration ? currentTranslit.length : 0) + 
                       (showTranslation ? currentTrans.length : 0);
    
    let arSize = 'text-3xl md:text-4xl';
    let exSize = 'text-sm md:text-base';
    let trSize = 'text-xs md:text-sm';

    if (totalChars > 800) {
      arSize = 'text-xl md:text-2xl';
      exSize = 'text-xs md:text-sm';
      trSize = 'text-[10px] md:text-xs';
    } else if (totalChars > 500) {
      arSize = 'text-2xl md:text-3xl';
      exSize = 'text-sm md:text-base';
      trSize = 'text-xs md:text-sm';
    } else if (totalChars > 300) {
      arSize = 'text-2xl md:text-3xl';
      exSize = 'text-sm md:text-base';
      trSize = 'text-xs md:text-sm';
    } else if (totalChars < 120) {
      arSize = 'text-4xl md:text-5xl';
      exSize = 'text-base md:text-lg';
      trSize = 'text-sm md:text-base';
    }

    return { arSize, exSize, trSize };
  };

  return (
    <div className="h-full bg-white dark:bg-black overflow-hidden flex flex-col">
      {selectedSurah ? (
        <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-300">
          <div className="shrink-0 bg-white/90 dark:bg-black/90 backdrop-blur-md z-40 p-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
            <button onClick={() => setSelectedSurah(null)} className="flex items-center gap-1 text-slate-500 dark:text-zinc-400 font-bold text-sm">
              <ChevronLeft size={20}/>{t('back')}
            </button>
            <div className="text-center">
              <h3 className="font-bold text-slate-800 dark:text-white">{selectedSurah.englishName}</h3>
              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{selectedSurah.englishNameTranslation}</p>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => setShowTransliteration(!showTransliteration)} 
                className={`p-2 rounded-xl transition-all ${showTransliteration ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                title={t('toggle_pronunciation')}
              >
                <Sparkles size={18}/>
              </button>
              <button 
                onClick={() => setShowTranslation(!showTranslation)} 
                className={`p-2 rounded-xl transition-all ${showTranslation ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                title={t('toggle_translation')}
              >
                <Languages size={18}/>
              </button>
              <button 
                onClick={() => toggleAyahAudio(ayahs[0], ayahs)} 
                className={`p-2 rounded-xl transition-all ${playingAyahNumber ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Headphones size={18}/>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto green-scrollbar snap-y snap-mandatory scroll-smooth">
            {loading ? (
              <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-emerald-600" size={32}/></div>
            ) : (
              ayahs.map((ayah, index) => {
                const isPlaying = playingAyahNumber === ayah.number;
                const { arSize, exSize, trSize } = getDynamicFontSizes(ayah);

                return (
                  <div 
                    key={ayah.number} 
                    ref={el => { ayahRefs.current[ayah.number] = el; }} 
                    data-ayah-number={ayah.number}
                    className={`w-full h-full snap-start flex flex-col p-8 transition-all duration-700 relative overflow-hidden border-b border-slate-50 dark:border-white/5 ${
                      isPlaying 
                        ? 'bg-[#ECFDF5] dark:bg-emerald-950/40' 
                        : 'bg-white dark:bg-zinc-950'
                    } items-center justify-center`}
                  >
                    {isPlaying && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#16A34A] rounded-r-full dark:hidden"></div>
                    )}

                    <div className="absolute top-6 left-8 right-8 flex justify-between items-center z-10">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${isPlaying ? 'bg-emerald-600 text-white' : 'bg-emerald-50 dark:bg-zinc-800 text-emerald-700 dark:text-emerald-400'}`}>
                          {ayah.numberInSurah}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('juz')} {ayah.juz}</span>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => toggleAyahAudio(ayah, ayahs)} 
                          className={`p-2 rounded-xl transition-all ${isPlaying ? 'text-[#16A34A] dark:text-emerald-400 scale-110' : 'text-slate-300 hover:text-emerald-600'}`}
                        >
                          {isPlaying ? <Pause size={20} fill="currentColor"/> : <Play size={20} fill="currentColor"/>}
                        </button>
                        <button 
                          onClick={() => toggleBookmark(ayah, selectedSurah)} 
                          className={`p-2 rounded-xl transition-all ${bookmarks.some(b => b.number === ayah.number) ? 'text-emerald-600' : 'text-slate-300'}`}
                        >
                          <Bookmark size={20} fill={bookmarks.some(b => b.number === ayah.number) ? "currentColor" : "none"}/>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto mt-16 space-y-5 md:space-y-8">
                      <p 
                        dir="rtl" 
                        className={`arabic-text ${arSize} leading-[1.6] text-center transition-all duration-700 ${
                          isPlaying 
                            ? 'text-emerald-500 drop-shadow-[0_0_15px_rgba(110,231,183,0.55)]' 
                            : 'text-emerald-600 dark:text-emerald-500/90'
                        }`}
                      >
                        {ayah.text}
                      </p>

                      {showTransliteration && (
                        <div className="text-center px-4 animate-in fade-in slide-in-from-top-2 duration-300">
                          {isAiLoading[ayah.number] ? (
                            <Loader2 className="animate-spin text-emerald-600/30 mx-auto" size={16} />
                          ) : (
                            <p className={`${exSize} font-semibold leading-relaxed tracking-wide ${
                              isPlaying ? 'text-[#064E3B] dark:text-emerald-300/80' : 'text-slate-700 dark:text-zinc-400'
                            }`}>
                              {aiContent[ayah.number]?.transliteration || ayah.transliteration}
                            </p>
                          )}
                        </div>
                      )}

                      {showTranslation && (
                        <div className="text-center px-2 animate-in fade-in slide-in-from-top-2 duration-300">
                          {isAiLoading[ayah.number] ? (
                            <Loader2 className="animate-spin text-emerald-600/30 mx-auto mt-2" size={16} />
                          ) : (
                            <p className={`${trSize} font-medium leading-relaxed italic ${
                              isPlaying ? 'text-[#064E3B] dark:text-emerald-100 font-bold' : 'text-slate-700 dark:text-zinc-400'
                            }`}>
                              "{aiContent[ayah.number]?.translation || ayah.translation}"
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none opacity-40">
                       <span className="text-[8px] font-black text-slate-300 dark:text-zinc-700 uppercase tracking-[0.4em]">{t('end_of_ayah')} {ayah.numberInSurah}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto green-scrollbar p-5 pb-24 scroll-smooth">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">{t('the_holy_quran')}</h1>
            <div className="bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl flex gap-1">
              <button onClick={() => setViewMode('surahs')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'surahs' ? 'bg-white dark:bg-zinc-800 text-emerald-700' : 'text-slate-400'}`}>{t('surahs')}</button>
              <button onClick={() => setViewMode('bookmarks')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === 'bookmarks' ? 'bg-white dark:bg-zinc-800 text-emerald-700' : 'text-slate-400'}`}>{t('bookmarks')}</button>
            </div>
          </div>

          {!searchQuery && viewMode === 'surahs' && (
            <div className={`mb-10 p-6 rounded-[2rem] relative overflow-hidden transition-all duration-500 border ${isPlayingFeatured ? 'border-emerald-500 shadow-2xl shadow-emerald-500/20 bg-slate-900' : 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border-slate-800 shadow-lg'}`}>
              <Star className={`absolute -right-10 -bottom-10 transition-all duration-1000 ${isPlayingFeatured ? 'text-emerald-400/10 scale-125' : 'text-white/5 opacity-50'}`} size={200} fill="currentColor"/>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                    <Sparkles className="text-emerald-400" size={10}/>
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-100">{t('ayah_of_the_day')}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={toggleFeaturedAudio}
                      disabled={!featuredAyah}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isPlayingFeatured ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
                    >
                      {isPlayingFeatured ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                    </button>
                  </div>
                </div>

                {featuredLoading ? (
                  <div className="py-6 flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-emerald-500/40" size={20}/>
                  </div>
                ) : featuredError ? (
                  <div className="py-6 flex flex-col items-center gap-2 text-center">
                    <AlertCircle className="text-white/20" size={24} />
                    <p className="text-[10px] text-white/40 font-bold uppercase">{t('ayah_loading_paused')}</p>
                  </div>
                ) : featuredAyah && (
                  <div className="w-full text-center space-y-3">
                    <div dir="rtl" className={`arabic-text text-xl leading-[1.6] text-center transition-all duration-700 ${isPlayingFeatured ? 'text-emerald-300 drop-shadow-[0_0_15px_rgba(110,231,183,0.6)]' : 'text-emerald-400'}`}>
                      {featuredAyah.text}
                    </div>
                    <div className="space-y-2 pt-3 border-t border-white/5">
                      <p className="text-[9px] font-bold tracking-wide text-emerald-400/60 italic">
                        {aiContent[featuredAyah.number]?.transliteration || featuredAyah.transliteration}
                      </p>
                      <p className="text-[11px] font-medium leading-relaxed text-slate-300 line-clamp-2">
                        "{aiContent[featuredAyah.number]?.translation || featuredAyah.translation}"
                      </p>
                      <div className="pt-1">
                        <span className="text-[7px] font-black text-emerald-500/80 uppercase tracking-[0.3em] bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                          {featuredAyah.surah.englishName} • {featuredAyah.numberInSurah}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder={t('search_surah')} className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-zinc-900 border-none rounded-2xl outline-none font-bold text-slate-800 dark:text-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredSurahs.map(surah => (
              <button key={surah.number} onClick={() => handleSurahClick(surah)} className="flex items-center justify-between p-5 bg-white dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-zinc-900 hover:border-emerald-200 transition-all text-left group">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-xs">{surah.number}</span>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-zinc-200">{surah.englishName}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{surah.revelationType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="arabic-text text-xl text-emerald-600 dark:text-emerald-400">{surah.name}</p>
                  <p className="text-[9px] text-slate-400 font-bold">{surah.numberOfAyahs} {t('ayahs')}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranReader;