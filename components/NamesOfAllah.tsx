import React, { useState, useMemo } from 'react';
import { ALLAH_NAMES } from '../constants';
import { AllahName } from '../types';
import { 
  Search, 
  Sparkles, 
  ChevronRight,
  Star,
  Sparkle,
  X,
  Info,
  ChevronLeft
} from 'lucide-react';

interface NamesOfAllahProps {
  onAskAgent?: (query: string) => void;
}

const NamesOfAllah: React.FC<NamesOfAllahProps> = ({ onAskAgent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedName, setSelectedName] = useState<AllahName | null>(null);

  const dailyName = useMemo(() => {
    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const index = daysSinceEpoch % ALLAH_NAMES.length;
    return ALLAH_NAMES[index];
  }, []);

  const filteredNames = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return ALLAH_NAMES.filter(n => 
      n.transliteration.toLowerCase().includes(q) || 
      n.translation.toLowerCase().includes(q) ||
      n.name.includes(q)
    );
  }, [searchQuery]);

  const handleNameClick = (name: AllahName) => {
    setSelectedName(name);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  return (
    <div className="flex flex-col bg-ummah-bg-light dark:bg-ummah-bg-dark h-full transition-colors font-inter overflow-y-auto green-scrollbar">
      <div className="flex flex-col h-full">
        <div className="p-5 space-y-3 shrink-0 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between">
             <div>
               <h2 className="premium-header text-lg font-black text-ummah-text-light dark:text-ummah-text-dark leading-tight uppercase tracking-tighter">99 Names of Allah</h2>
               <p className="text-[7px] font-black text-ummah-gold uppercase tracking-[0.3em] mt-0.5">Asma-ul-Husna</p>
             </div>
             <div className="p-1.5 bg-white dark:bg-ummah-card-dark rounded-lg shadow-soft border border-black/5 dark:border-white/5">
                <Star className="text-ummah-gold fill-ummah-gold/20" size={14} />
             </div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ummah-icon-inactive-light group-focus-within:text-ummah-icon-active-light transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search Names..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-xl focus:ring-1 focus:ring-ummah-gold/20 outline-none transition-all shadow-soft text-[10px] font-medium text-ummah-text-light dark:text-ummah-text-dark"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 px-5 pb-32 pt-4 space-y-4">
          {!searchQuery && (
            <div className="animate-fade-up">
              <div className="flex items-center gap-1.5 mb-2 px-1">
                <Sparkles size={10} className="text-ummah-gold" />
                <h3 className="text-[7px] font-black text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase tracking-[0.3em]">Daily Highlight</h3>
              </div>
              
              <div 
                onClick={() => handleNameClick(dailyName)}
                className="bg-gradient-to-br from-ummah-icon-active-light to-[#043326] dark:from-ummah-card-dark dark:to-ummah-bg-dark border border-white/5 p-5 rounded-2xl shadow-premium relative overflow-hidden transition-all duration-700 cursor-pointer hover:scale-[1.01]"
              >
                <div className="absolute inset-0 pattern-bg opacity-10"></div>
                <div className="relative z-10 text-center space-y-1">
                  <p className="arabic-text text-3xl text-white drop-shadow-md">{dailyName.name}</p>
                  <div>
                     <h4 className="text-base font-black text-white tracking-tighter">{dailyName.transliteration}</h4>
                     <p className="text-[7px] font-black text-emerald-300 uppercase tracking-widest">{dailyName.translation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {filteredNames.map((name) => (
              <button 
                key={name.number}
                onClick={() => handleNameClick(name)}
                className="p-3 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-xl flex flex-col items-center text-center gap-1.5 shadow-soft hover:border-ummah-gold/30 transition-all group"
              >
                <span className="text-[6px] font-black text-ummah-text-light/20 dark:text-white/10 uppercase tracking-widest">{name.number}</span>
                <p className="arabic-text text-lg text-ummah-icon-active-light group-hover:text-ummah-gold transition-colors">{name.name}</p>
                <div>
                  <p className="text-[9px] font-black text-ummah-text-light dark:text-ummah-text-dark truncate w-full px-1 tracking-tighter">{name.transliteration}</p>
                  <p className="text-[6px] font-bold text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase tracking-tight line-clamp-1">{name.translation}</p>
                </div>
              </button>
            ))}
          </div>

          {filteredNames.length === 0 && (
            <div className="py-12 text-center opacity-30 flex flex-col items-center gap-2">
              <Info size={24} className="text-ummah-icon-inactive-light" />
              <p className="text-[8px] font-black uppercase tracking-widest">No matching names found</p>
            </div>
          )}
        </div>

        {selectedName && (
          <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
             <div className="absolute inset-0 bg-ummah-bg-dark/60 backdrop-blur-xl" onClick={() => setSelectedName(null)}></div>
             <div className="absolute inset-x-4 bottom-10 animate-fade-up bg-white dark:bg-ummah-card-dark rounded-[2rem] p-6 shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden">
                
                <button 
                  onClick={() => setSelectedName(null)}
                  className="absolute top-4 right-4 p-1.5 bg-ummah-mint dark:bg-white/5 rounded-lg text-ummah-icon-inactive-light hover:text-rose-500 transition-colors"
                >
                  <X size={14} />
                </button>

                <div className="flex flex-col items-center text-center space-y-3 mt-1">
                  <div className="space-y-0.5">
                     <span className="text-[7px] font-black text-ummah-gold uppercase tracking-[0.4em] opacity-60">Beautiful Name {selectedName.number}</span>
                     <p className="arabic-text text-4xl text-ummah-icon-active-light dark:text-ummah-icon-active-dark drop-shadow-sm">{selectedName.name}</p>
                  </div>

                  <div className="space-y-0">
                     <h3 className="premium-header text-lg font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tighter">{selectedName.transliteration}</h3>
                     <p className="text-[9px] font-bold text-ummah-gold uppercase tracking-widest">{selectedName.translation}</p>
                  </div>

                  <div className="p-4 bg-ummah-mint/50 dark:bg-ummah-bg-dark rounded-xl border border-black/5 dark:border-white/5 relative">
                     <Sparkle className="absolute -top-1.5 -left-1.5 text-ummah-gold/20" size={18} />
                     <p className="text-[10px] text-ummah-text-light/80 dark:text-ummah-text-secondary-dark leading-relaxed font-medium italic">
                        {selectedName.description}
                     </p>
                  </div>

                  <button 
                    onClick={() => onAskAgent?.(`Can you explain the spiritual significance and benefits of reflecting on Allah's name "${selectedName.transliteration}" (${selectedName.name})?`)}
                    className="w-full py-3 bg-ummah-icon-active-light text-white rounded-xl font-black text-[8px] uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-premium active:scale-95 transition-all"
                  >
                    Deepen Knowledge with AI <ChevronRight size={10} />
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NamesOfAllah;