import React, { useState, useMemo, useEffect } from 'react';
import { DUAS, SUPPORTED_LANGUAGES } from '../constants';
import { Dua, AppLanguage } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";
import { getApiKey } from '../services/ai';
import { 
  Search, 
  Sparkles, 
  ChevronRight,
  BookMarked,
  Sparkle,
  Languages,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface DuaCollectionProps {
  language: AppLanguage;
}

const DuaCollection: React.FC<DuaCollectionProps> = ({ language }) => {
  const { t } = useTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);
  
  // State for AI-powered translations
  const [translatedContent, setTranslatedContent] = useState<{
    title: string;
    translation: string;
    transliteration: string;
  } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(false);

  // Categories extraction
  const categories = useMemo(() => {
    const cats = new Set(DUAS.map(d => d.category));
    return Array.from(cats);
  }, []);

  // Filter logic
  const filteredDuas = useMemo(() => {
    return DUAS.filter(d => {
      const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? d.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Handle translation when language or selected dua changes
  useEffect(() => {
    setTranslatedContent(null); // Reset on any change
    
    if (!selectedDua) {
      return;
    }

    // If English is selected, we still proceed to AI to get refined content if needed
    // or we can just remove this block to let the translateDua handle it
    
    const translateDua = async (retryCount = 0) => {
      setIsTranslating(true);
      setTranslationError(false);
      try {
        const apiKey = await getApiKey();
        if (!apiKey) {
          setTranslationError(true);
          return;
        }
        const ai = new GoogleGenAI({ apiKey });
        const lang = SUPPORTED_LANGUAGES.find(l => l.id === language);
        const langName = lang ? `${lang.name} (${lang.native})` : language;
        
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: language === 'en' 
            ? `Refine the English translation and provide a clear phonetic transliteration for this Dua.
            
            Title: "${selectedDua.title}"
            Arabic: "${selectedDua.arabic}"
            Current Meaning: "${selectedDua.translations['en']}"
            
            Requirements:
            1. Provide a clear phonetic transliteration using Latin script for English speakers.
            
            Return JSON ONLY:
            {
              "title": "Refined Title",
              "translation": "Refined Meaning",
              "transliteration": "Clear English transliteration"
            }`
            : `Translate the following Islamic Dua details into ${langName}. 
            Maintain technical religious terms accurately.
            
            Title: "${selectedDua.title}"
            Arabic: "${selectedDua.arabic}"
            English Meaning: "${selectedDua.translations['en']}"
            
            Requirements:
            1. Provide a phonetic transliteration specifically adapted for ${langName} speakers. 
               - CRITICAL: Use the ${langName} script (e.g., Devanagari for Hindi, Urdu script for Urdu, Cyrillic for Russian, Bengali script for Bengali, etc.).
               - If ${langName} uses the Latin script, provide a clear phonetic version.
            
            Return JSON ONLY:
            {
              "title": "Translated Title",
              "translation": "Translated Meaning",
              "transliteration": "Phonetic transliteration in ${langName} script"
            }`,
          config: {
            responseMimeType: "application/json",
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                translation: { type: Type.STRING },
                transliteration: { type: Type.STRING }
              },
              required: ["title", "translation", "transliteration"]
            }
          }
        });

        if (response.text) {
          const data = JSON.parse(response.text.trim());
          setTranslatedContent(data);
        } else if (retryCount < 2) {
          setTimeout(() => translateDua(retryCount + 1), 1000);
        } else {
          setTranslationError(true);
        }
      } catch (e) {
        console.error("Dua Translation Error:", e);
        if (retryCount < 2) {
          setTimeout(() => translateDua(retryCount + 1), 2000);
        } else {
          setTranslationError(true);
        }
      } finally {
        if (retryCount === 0 || !isTranslating) {
          // Only stop loading if we're not retrying or it's the last attempt
          // Actually, better to just check if we're still in the process
        }
        setIsTranslating(false);
      }
    };

    translateDua();
  }, [selectedDua?.id, language]);

  const handleDuaClick = (dua: Dua) => {
    if (selectedDua?.id === dua.id) {
      setSelectedDua(null);
    } else {
      setSelectedDua(dua);
    }
  };

  return (
    <div className="flex flex-col bg-ummah-bg-light dark:bg-ummah-bg-dark transition-colors font-inter">
      
      {/* Search & Category Header */}
      <div className="bg-ummah-bg-light dark:bg-ummah-bg-dark p-8 space-y-6 shrink-0 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center justify-between mb-2">
           <h2 className="premium-header text-2xl font-black text-ummah-text-light dark:text-ummah-text-dark">{t('supplications')}</h2>
           <div className="flex items-center gap-2 px-3 py-1 bg-ummah-emerald/10 rounded-full border border-ummah-emerald/20">
              <BookMarked size={12} className="text-ummah-emerald" />
              <span className="text-[10px] font-black text-ummah-emerald uppercase tracking-widest">{DUAS.length} {t('total')}</span>
           </div>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-ummah-icon-inactive-light group-focus-within:text-ummah-icon-active-light transition-colors" size={20} />
          <input 
            type="text" 
            placeholder={t('search_supplications')}
            className="w-full pl-16 pr-6 py-4 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-[2rem] focus:ring-2 focus:ring-ummah-emerald outline-none transition-all shadow-soft text-sm font-medium text-ummah-text-light dark:text-ummah-text-dark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${!selectedCategory ? 'bg-ummah-emerald text-white shadow-premium' : 'bg-white dark:bg-ummah-card-dark text-ummah-text-light/40 border border-black/5 dark:border-white/5'}`}
          >
            {t('all_duas')}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-ummah-emerald text-white shadow-premium' : 'bg-white dark:bg-ummah-card-dark text-ummah-text-light/40 border border-black/5 dark:border-white/5'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main List Section */}
      <div className="px-8 pt-8 pb-32">
        {filteredDuas.length === 0 ? (
          <div className="py-20 text-center opacity-30 flex flex-col items-center gap-4">
            <Sparkles size={48} className="text-ummah-icon-inactive-light" />
            <p className="text-xs font-black uppercase tracking-widest">{t('no_matching_supplications')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredDuas.map((dua) => (
              <div 
                key={dua.id} 
                className={`p-6 rounded-[2.5rem] border transition-all duration-500 shadow-soft cursor-pointer relative overflow-hidden group h-fit ${
                  selectedDua?.id === dua.id 
                    ? 'bg-ummah-mint dark:bg-ummah-card-dark border-ummah-emerald/30 ring-1 ring-ummah-emerald/10' 
                    : 'bg-white dark:bg-ummah-card-dark border-black/5 dark:border-white/5 hover:border-ummah-emerald/20'
                }`}
                onClick={() => handleDuaClick(dua)}
              >
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    selectedDua?.id === dua.id ? 'bg-ummah-emerald text-white scale-110 shadow-glow' : 'bg-ummah-mint dark:bg-white/5 text-ummah-emerald'
                  }`}>
                    <Sparkle size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ummah-text-light dark:text-ummah-text-dark tracking-tight">
                      {(selectedDua?.id === dua.id && translatedContent) ? translatedContent.title : dua.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-ummah-gold opacity-60">{dua.category}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-ummah-emerald/30 group-hover:translate-x-1 transition-transform ${selectedDua?.id === dua.id ? 'rotate-90' : 'opacity-100'}`} />
              </div>
              
              {selectedDua?.id === dua.id && (
                <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p 
                        dir="rtl" 
                        className="arabic-text text-4xl text-right leading-[1.6] text-ummah-emerald drop-shadow-sm"
                      >
                        {dua.arabic}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/5 dark:border-white/5 min-h-[40px] flex items-center justify-center">
                      {isTranslating ? (
                        <div className="flex items-center gap-2 text-ummah-text-light/20 dark:text-white/10">
                          <Loader2 size={14} className="animate-spin" />
                          <span className="text-[9px] font-black uppercase tracking-widest">{t('translating_transliteration')}</span>
                        </div>
                      ) : translationError ? (
                        <p className="text-sm font-medium text-rose-500 italic text-center">{dua.transliteration}</p>
                      ) : (
                        <p className="text-sm font-medium text-ummah-text-light dark:text-ummah-text-secondary-dark leading-relaxed italic text-center">
                          {translatedContent?.transliteration || dua.transliteration}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 bg-ummah-emerald/5 dark:bg-white/5 p-6 rounded-[2rem] border border-ummah-emerald/10 relative">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Languages size={14} className="text-ummah-emerald" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-ummah-emerald">
                          {SUPPORTED_LANGUAGES.find(l => l.id === language)?.name.toUpperCase() || 'ENGLISH'} {t('guidance')}
                        </span>
                      </div>
                      
                      {isTranslating ? (
                        <div className="flex flex-col items-center gap-4 py-4">
                          <Loader2 size={24} className="animate-spin text-ummah-emerald opacity-20" />
                          <span className="text-[8px] font-black text-ummah-emerald/40 uppercase tracking-[0.3em]">{t('ai_syncing_language')}</span>
                        </div>
                      ) : translationError ? (
                        <div className="flex flex-col items-center gap-2 py-2">
                          <AlertCircle size={20} className="text-rose-400" />
                          <p className="text-sm font-medium text-ummah-text-light dark:text-ummah-text-dark leading-relaxed text-center">
                            "{dua.translations['en']}"
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-ummah-text-light dark:text-ummah-text-dark leading-relaxed text-center">
                          "{translatedContent?.translation || dua.translations['en']}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <span className="text-[8px] font-black text-ummah-text-light/20 dark:text-white/10 uppercase tracking-[0.3em]">
                      {t('authentic')} • {language === 'en' ? t('static_content') : t('ai_translated_for_you')}
                    </span>
                  </div>
                </div>
              )}
            </div>
            ))}
          </div>
        )}

        {/* Spiritual Footer */}
        <div className="pt-24 pb-12 flex flex-col items-center opacity-10 pointer-events-none">
          <Sparkle size={24} className="text-ummah-gold mb-3" />
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-center leading-loose">Sincere Guidance for the Ummah</p>
        </div>
      </div>
    </div>
  );
};

export default DuaCollection;