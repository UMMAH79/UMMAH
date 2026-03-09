
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI, GenerateContentResponse, ThinkingLevel } from "@google/genai";
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

const DAILY_LIMIT = 20;
const DEVELOPERS = [
  'SahilUmmahDeveloper347743437',
  'TahmidUmmahDeveloper201110047',
  'JubaerUmmahDeveloper20111003'
];

const isValidKey = (key: any): boolean => {
  return typeof key === 'string' && key.length > 10 && key !== 'undefined' && key !== 'null';
};

/**
 * Premium Markdown Parser
 */
const MarkdownText: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-3">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) return <div key={lineIdx} className="h-2" />;
        
        const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        return (
          <p key={lineIdx} className="leading-relaxed">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={i} className="font-extrabold text-ummah-text-light dark:text-white">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              if (part.startsWith('*') && part.endsWith('*')) {
                return (
                  <em key={i} className="arabic-text italic text-lg text-ummah-icon-active-light dark:text-ummah-icon-active-dark not-italic-style">
                    {part.slice(1, -1)}
                  </em>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
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
  const [hasApiKey, setHasApiKey] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ data: string; mimeType: string } | null>(null);
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

  const SYSTEM_INSTRUCTION = `You are UMMAH AI. Format text clearly and professionally.

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

Tone: Sincere teacher. Use hyphen (-) lists. Language: ${activeLangName}.`;

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
      // First check if key is in browser env (AI Studio preview)
      const key = process.env.GEMINI_API_KEY || process.env.API_KEY;
      let hasKey = isValidKey(key);
      
      const aiStudio = (window as any).aistudio;
      if (!hasKey && aiStudio && aiStudio.hasSelectedApiKey) {
        try {
          hasKey = await aiStudio.hasSelectedApiKey();
        } catch (e) {
          console.error("Error checking AI Studio key status:", e);
        }
      }

      setHasApiKey(hasKey);
    };
    
    // Check immediately and then again after a short delay to ensure window.aistudio is ready
    checkKey();
    const timer = setTimeout(checkKey, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectKey = async () => {
    const aiStudio = (window as any).aistudio;
    console.log("Connect API Key clicked. aistudio status:", !!aiStudio);
    
    if (aiStudio && aiStudio.openSelectKey) {
      try {
        await aiStudio.openSelectKey();
        // After opening, we assume success as per guidelines
        setHasApiKey(true);
        // Small delay then reload to ensure environment is refreshed
        setTimeout(() => window.location.reload(), 500);
      } catch (e) {
        console.error("Failed to open key selector", e);
        alert("Could not open the key selector. Please try again.");
      }
    } else {
      console.warn("window.aistudio not found");
      alert("Key selection tool not found. Please ensure you are using the AI Studio preview environment and that your browser isn't blocking the connection.");
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

    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!isValidKey(apiKey)) {
        setHasApiKey(false);
        throw new Error("API Key missing or invalid");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      
      const historyToInclude = messages.slice(-6);
      
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
      console.error("AI Error:", error);
      let errorMsg = "**Connection issue.** Please try again.";
      
      // Stringify error to catch nested API_KEY_INVALID messages
      const errorStr = String(error?.message || "") + String(error?.stack || "") + JSON.stringify(error);
      
      if (
        errorStr.includes("API Key missing") || 
        errorStr.includes("API_KEY_INVALID") || 
        errorStr.includes("not valid") || 
        errorStr.includes("INVALID_ARGUMENT") ||
        errorStr.includes("entity was not found")
      ) {
        setHasApiKey(false);
        errorMsg = "**API Key Error.** Please connect your API key to continue.";
      }
      
      setMessages(prev => [...prev, { role: 'model', content: errorMsg }]);
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
      
      {(!hasApiKey && !chatStatus.reachedLimit) && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-8 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-ummah-bg-dark/60 backdrop-blur-md"></div>
           <div className="relative w-full max-w-xs bg-white dark:bg-ummah-card-dark rounded-[3rem] p-10 shadow-premium border border-black/5 dark:border-white/5 text-center animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                 <Lock size={32} />
              </div>
              <h3 className="premium-header text-xl font-black text-ummah-text-light dark:text-ummah-text-dark mb-4 tracking-tight">AI Connection</h3>
              <p className="text-[10px] text-ummah-text-light/50 dark:text-ummah-text-secondary-dark/50 font-medium leading-relaxed mb-8">
                 To enable Ummah AI, please connect your Gemini API key. This ensures a secure and private connection for your queries.
              </p>
              <button 
                onClick={handleSelectKey}
                className="w-full py-4 bg-ummah-icon-active-light text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-glow"
              >
                Connect API Key
              </button>
              <p className="mt-4 text-[8px] text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/30">
                Requires a paid Google Cloud project key.
              </p>
           </div>
        </div>
      )}

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
           {!isDeveloper && (
             <div className="px-2 py-1 bg-ummah-mint dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/10 flex items-center gap-1.5">
                <span className={`text-[8px] font-black ${chatStatus.reachedLimit ? 'text-rose-500' : 'text-ummah-icon-active-light'}`}>{chatStatus.count}/{DAILY_LIMIT}</span>
             </div>
           )}
           <button onClick={() => setMessages([])} className="p-2 text-ummah-icon-inactive-light hover:text-ummah-icon-active-light transition-colors"><RefreshCcw size={18} /></button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 green-scrollbar scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-full text-center space-y-8 animate-in fade-in py-10">
            <div className="w-20 h-20 bg-white dark:bg-ummah-card-dark rounded-[2.5rem] border border-black/5 dark:border-white/5 flex items-center justify-center text-ummah-icon-active-light dark:text-ummah-icon-active-dark shadow-xl">
              <MessageCircleQuestion size={40} />
            </div>
            <div className="max-w-xs space-y-2">
              <h3 className="premium-header text-xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight">How can I help you today?</h3>
              <p className="text-xs text-ummah-text-light/60 dark:text-ummah-text-secondary-dark font-medium italic">Seek knowledge based on authentic sources.</p>
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
              placeholder={chatStatus.reachedLimit ? 'Daily limit reached' : 'Ask Ummah AI...'} 
              className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-ummah-text-light dark:text-ummah-text-dark placeholder:text-ummah-text-light/30" 
              disabled={isLoading || chatStatus.reachedLimit} 
            />
            <button type="submit" disabled={(!input.trim() && !selectedImage) || isLoading || chatStatus.reachedLimit} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${(!input.trim() && !selectedImage) || isLoading || chatStatus.reachedLimit ? 'bg-black/5 text-black/10' : 'bg-ummah-icon-active-light text-white shadow-glow hover:scale-105'}`}>
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AiAgent;
