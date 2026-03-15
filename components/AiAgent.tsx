
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI, GenerateContentResponse, ThinkingLevel } from "@google/genai";
import { getFreeAiResponse } from '../services/freeAi';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Loader2, 
  RefreshCcw,
  MessageCircleQuestion,
  Copy,
  Check,
  Camera,
  X,
  Zap,
  Lock,
  ChevronRight,
  AlertCircle,
  Clock,
  LayoutList
} from 'lucide-react';
import { AppLanguage, UserSettings } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface AiAgentProps {
  initialQuery?: string | null;
  onClearInitialQuery?: () => void;
  preferredLanguage?: AppLanguage;
  settings: UserSettings;
  onUpdateSettings: (s: Partial<UserSettings>) => void;
  onRedirectToAskLearn?: () => void;
}

const DAILY_LIMIT = 10;
const DEVELOPERS = [
  'SahilUmmahDeveloper347743437',
  'TahmidUmmahDeveloper201110047',
  'JubaerUmmahDeveloper20111003'
];

const isValidKey = (key: any): boolean => {
  return typeof key === 'string' && key.length > 10 && key !== 'undefined' && key !== 'null';
};

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Premium Markdown Parser using react-markdown
 */
const MarkdownText: React.FC<{ content: string }> = ({ content }) => {
  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  return (
    <div className="markdown-body prose dark:prose-invert max-w-none prose-sm prose-p:leading-relaxed prose-strong:font-extrabold prose-strong:text-ummah-text-light dark:prose-strong:text-white prose-em:not-italic prose-em:text-ummah-icon-active-light dark:prose-em:text-ummah-icon-active-dark">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-extrabold text-ummah-text-light dark:text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => {
            const text = String(children);
            return (
              <em className={`${isArabic(text) ? 'arabic-text text-lg' : 'italic'} text-ummah-icon-active-light dark:text-ummah-icon-active-dark not-italic-style`}>
                {children}
              </em>
            );
          },
          ul: ({ children }) => <ul className="list-disc pl-4 mb-3 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-4 mb-3 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="text-ummah-text-light/80 dark:text-ummah-text-secondary-dark">{children}</li>,
          h1: ({ children }) => <h1 className="premium-header text-lg font-black mb-2 uppercase tracking-tight">{children}</h1>,
          h2: ({ children }) => <h2 className="premium-header text-base font-black mb-2 uppercase tracking-tight">{children}</h2>,
          h3: ({ children }) => <h3 className="premium-header text-sm font-black mb-2 uppercase tracking-tight">{children}</h3>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-ummah-gold/30 pl-4 py-1 italic my-3 text-ummah-text-light/70 dark:text-ummah-text-secondary-dark/70">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-ummah-mint dark:bg-white/5 px-1.5 py-0.5 rounded-md font-mono text-xs text-ummah-icon-active-light dark:text-ummah-icon-active-dark">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-ummah-bg-light dark:bg-black/20 p-4 rounded-2xl overflow-x-auto my-4 border border-black/5 dark:border-white/5 no-scrollbar">
              {children}
            </pre>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const getApiKey = async (): Promise<string | undefined> => {
  // Try process.env first (defined by Vite config)
  let key = process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY8 || process.env.GEMINI_API_KEY1 || process.env.API_KEY;
  if (isValidKey(key)) return key;

  // Try import.meta.env (Vite standard)
  const metaKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY8 || (import.meta as any).env?.VITE_GEMINI_API_KEY1 || (import.meta as any).env?.VITE_API_KEY;
  if (isValidKey(metaKey)) return metaKey;

  // Try window.aistudio if available
  const aiStudio = (window as any).aistudio;
  if (aiStudio && aiStudio.getApiKey) {
    try {
      key = await aiStudio.getApiKey();
      if (isValidKey(key)) return key;
    } catch (e) {
      console.error("Error getting key from AI Studio:", e);
    }
  }

  return undefined;
};

const AiAgent: React.FC<AiAgentProps> = ({ 
  initialQuery, 
  onClearInitialQuery, 
  preferredLanguage = 'en', 
  settings, 
  onUpdateSettings,
  onRedirectToAskLearn
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isKeyChecking, setIsKeyChecking] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasTriggeredInitial = useRef(false);

  const activeLangName = SUPPORTED_LANGUAGES.find(l => l.id === preferredLanguage)?.name || 'English';

  const isDeveloper = useMemo(() => {
    return settings.userName && DEVELOPERS.includes(settings.userName);
  }, [settings.userName]);

  const chatStatus = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const userCount = settings.dailyChatCount?.date === today ? settings.dailyChatCount.count : 0;
    const reachedLimit = !isDeveloper && userCount >= DAILY_LIMIT;
    return { count: userCount, reachedLimit };
  }, [settings.dailyChatCount, isDeveloper]);

  const SYSTEM_INSTRUCTION = `You are UMMAH AI. Be concise and fast.
  
IMAGE RULE:
- IF an image is provided: Start with **I CAN BE WRONG BUT HERE IS MY OPINION** and add a line break.

FORBIDDEN:
- NO transliteration.
- NO emojis/icons in text.
- ONLY use bold for headings and emphasis.
- DO NOT answer non-Islamic topics.

FORMATTING:
1. BOLD (**text**): Use for emphasis and key points.
2. ITALIC (*text*): ONLY for Arabic text and references.
3. QUR'AN FORMAT:
   *Arabic Verse*
   *Surah : Ayah*
   **Translation: [English Text]**

Tone: Sincere teacher. Language: ${activeLangName}.`;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery && !hasTriggeredInitial.current) {
      hasTriggeredInitial.current = true;
      handleSend(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  useEffect(() => {
    const checkKey = async () => {
      setIsKeyChecking(true);
      const key = await getApiKey();
      let hasKey = !!key;
      
      const aiStudio = (window as any).aistudio;
      if (!hasKey && aiStudio && aiStudio.hasSelectedApiKey) {
        try {
          hasKey = await aiStudio.hasSelectedApiKey();
        } catch (e) {
          console.error("Error checking AI Studio key status:", e);
        }
      }

      setHasApiKey(hasKey);
      setIsKeyChecking(false);
    };
    
    checkKey();
    const timer = setTimeout(checkKey, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectKey = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio && aiStudio.openSelectKey) {
      try {
        await aiStudio.openSelectKey();
        // Assume success as per guidelines
        setHasApiKey(true);
      } catch (e) {
        console.error("Failed to open key selector", e);
        alert("Could not open the key selector. Please try again.");
      }
    } else {
      alert("Key selection tool not found. Please ensure you are using the AI Studio preview environment.");
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setSelectedImage({ data: base64, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };

  const handleSend = async (text: string = input) => {
    if ((!text.trim() && !selectedImage) || isLoading || chatStatus.reachedLimit) return;
    
    const userMessageContent = text || "Analyze this image for Islamic context.";
    const userMessage: Message = { role: 'user', content: userMessageContent };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    const today = new Date().toISOString().split('T')[0];
    const currentCount = settings.dailyChatCount?.date === today ? settings.dailyChatCount.count : 0;
    onUpdateSettings({ dailyChatCount: { date: today, count: currentCount + 1 } });

    const streamFreeFallback = async () => {
      // Simulate "thinking" for a better UX
      setIsLoading(true);
      await new Promise(r => setTimeout(r, 800));
      
      const freeResponse = await getFreeAiResponse(
        userMessageContent, 
        preferredLanguage as AppLanguage,
        messages
      );
      setMessages(prev => [...prev, { role: 'model', content: '' }]);
      const words = freeResponse.content.split(' ');
      let currentText = '';
      for (let i = 0; i < words.length; i++) {
        currentText += words[i] + ' ';
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', content: currentText };
          return newMessages;
        });
        if (i % 3 === 0) await new Promise(r => setTimeout(r, 30));
      }
      setIsLoading(false);
    };

    try {
      const apiKey = await getApiKey();
      
      if (!apiKey) {
        await streamFreeFallback();
        return;
      }
      
      const ai = new GoogleGenAI({ apiKey });
      
      const historyToInclude = messages.slice(-4); 
      
      const contents: any[] = historyToInclude.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      const currentTurnParts: any[] = [{ text: userMessageContent }];
      
      if (currentImage) {
        currentTurnParts.push({
          inlineData: {
            data: currentImage.data,
            mimeType: currentImage.mimeType
          }
        });
      }

      contents.push({ role: 'user', parts: currentTurnParts });

      const result = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: { 
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.1,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
        }
      });
      
      setMessages(prev => [...prev, { role: 'model', content: '' }]);
      
      let fullText = '';
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', content: fullText };
            return newMessages;
          });
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') return;
      console.error("AI Error (Falling back to Free Mode):", error);
      
      // On any error (Quota, Invalid Key, Network), use the Free Fallback
      await streamFreeFallback();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    navigator.clipboard.writeText(cleanText).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div className="flex flex-col h-full bg-ummah-bg-light dark:bg-ummah-bg-dark relative overflow-hidden transition-colors">
      
      {chatStatus.reachedLimit && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-8 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-ummah-bg-dark/60 backdrop-blur-md"></div>
           <div className="relative w-full max-w-xs bg-white dark:bg-ummah-card-dark rounded-[3rem] p-10 shadow-premium border border-black/5 dark:border-white/5 text-center animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                 <AlertCircle size={32} />
              </div>
              <h3 className="premium-header text-xl font-black text-ummah-text-light dark:text-ummah-text-dark mb-4 tracking-tight">Daily Limit</h3>
              <p className="text-xs text-ummah-text-light/50 dark:text-ummah-text-secondary-dark/50 font-medium leading-relaxed mb-8">
                 Limit resets at midnight.
              </p>
              <button 
                onClick={onRedirectToAskLearn}
                className="w-full py-4 bg-ummah-icon-active-light text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
              >
                Browse Ask & Learn
              </button>
           </div>
        </div>
      )}

      <div className="bg-white/95 dark:bg-ummah-bg-dark/95 backdrop-blur-xl px-6 py-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark p-2 rounded-2xl text-white shadow-glow"><Bot size={20} /></div>
          <div>
            <h2 className="font-bold text-ummah-text-light dark:text-ummah-text-dark text-sm uppercase tracking-wider">Ummah AI</h2>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-ummah-icon-active-dark rounded-full"></div>
              <span className="text-[8px] font-black text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark uppercase tracking-widest">Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
           {!hasApiKey && !isKeyChecking && (
             <button 
               onClick={handleSelectKey}
               className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-500/20 transition-all active:scale-95 group"
               title="Connect Gemini for Best Experience"
             >
               <Zap size={14} className="fill-current group-hover:animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Best AI</span>
             </button>
           )}
           {!isDeveloper && (
             <div className="px-2 py-1 bg-ummah-mint dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/10 flex items-center gap-1.5">
                <span className={`text-[8px] font-black ${chatStatus.reachedLimit ? 'text-rose-500' : 'text-ummah-icon-active-light'}`}>{chatStatus.count}/{DAILY_LIMIT}</span>
             </div>
           )}
           <button 
             onClick={() => {
               setMessages([]);
               setIsLoading(false);
             }} 
             className="p-2 text-ummah-icon-inactive-light hover:text-rose-500 transition-colors"
             title="Reset Conversation"
           >
             <RefreshCcw size={18} />
           </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 green-scrollbar scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-full text-center space-y-8 animate-in fade-in py-10">
            <div className="w-20 h-20 bg-white dark:bg-ummah-card-dark rounded-[2.5rem] border border-black/5 dark:border-white/5 flex items-center justify-center text-ummah-icon-active-light dark:text-ummah-icon-active-dark shadow-xl">
              <Sparkles size={40} />
            </div>
            <div className="max-w-xs space-y-2">
              <h3 className="premium-header text-xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight">Ummah AI is Ready</h3>
              <p className="text-xs text-ummah-text-light/60 dark:text-ummah-text-secondary-dark font-medium italic">Ask about prayer, Quran, or Islamic lifestyle.</p>
              <button 
                onClick={() => handleSend("Assalamu Alaikum! Are you working now?")}
                className="mt-4 px-4 py-2 bg-ummah-mint dark:bg-white/5 text-ummah-icon-active-light rounded-xl text-[10px] font-bold uppercase tracking-widest border border-ummah-icon-active-light/10"
              >
                Test Connection
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in`}>
              <div className={`flex gap-3 max-w-[92%] lg:max-w-[75%] group ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-ummah-icon-active-light text-white' : 'bg-white dark:bg-ummah-card-dark text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark shadow-sm border border-black/5 dark:border-white/5'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-5 rounded-[2rem] text-sm relative leading-relaxed shadow-soft whitespace-pre-wrap ${msg.role === 'user' ? 'bg-ummah-icon-active-light text-white rounded-tr-none' : 'bg-white dark:bg-ummah-card-dark text-ummah-text-light dark:text-ummah-text-dark border border-black/5 dark:border-white/5 rounded-tl-none'}`}>
                  {msg.role === 'model' && msg.content && (
                    <button onClick={() => handleCopy(msg.content, i)} className="absolute -top-3 -right-3 p-2 bg-white dark:bg-ummah-bg-dark border border-black/5 dark:border-white/10 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10">
                      {copiedIndex === i ? <Check size={14} className="text-ummah-icon-active-light" /> : <Copy size={14} />}
                    </button>
                  )}
                  {msg.content ? (
                    msg.role === 'model' ? <MarkdownText content={msg.content} /> : msg.content
                  ) : (
                    <Loader2 size={16} className="animate-spin text-ummah-icon-active-light m-1" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white/95 dark:bg-ummah-bg-dark/95 backdrop-blur-2xl border-t border-black/5 dark:border-white/10 shrink-0 px-4 pt-4 pb-6 space-y-4 lg:px-12 lg:py-8">
        
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex flex-col gap-3">
          {selectedImage && (
            <div className="flex items-center gap-3 p-2 bg-ummah-mint dark:bg-white/5 rounded-2xl border border-ummah-icon-active-light/10">
               <img src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} alt="Selected" className="w-12 h-12 rounded-xl object-cover" />
               <button type="button" onClick={removeImage} className="p-1 text-rose-500"><X size={16} /></button>
            </div>
          )}

          <div className={`flex items-center gap-2 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/10 rounded-[2.5rem] px-4 py-2 shadow-premium ${chatStatus.reachedLimit ? 'opacity-50 grayscale' : ''}`}>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageSelect} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-1 text-ummah-icon-inactive-light hover:text-ummah-icon-active-light"><Camera size={20} /></button>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder={chatStatus.reachedLimit ? 'Daily limit reached' : isLoading ? 'Ummah AI is thinking...' : 'Ask Ummah AI...'} 
              className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-ummah-text-light dark:text-ummah-text-dark placeholder:text-ummah-text-light/30" 
              disabled={isLoading || chatStatus.reachedLimit} 
            />
            {isLoading ? (
              <button 
                type="button" 
                onClick={stopGeneration}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-rose-500 text-white shadow-glow animate-pulse"
                title="Stop Generation"
              >
                <X size={16} />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={(!input.trim() && !selectedImage) || isLoading || chatStatus.reachedLimit} 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${(!input.trim() && !selectedImage) || isLoading || chatStatus.reachedLimit ? 'bg-black/5 text-black/10' : 'bg-ummah-icon-active-light text-white shadow-glow hover:scale-105'}`}
              >
                <Send size={16} className="ml-0.5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AiAgent;
