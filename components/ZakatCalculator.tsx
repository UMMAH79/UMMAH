import React, { useState, useMemo } from 'react';
import { 
  Coins, 
  Wallet, 
  TrendingUp, 
  HandCoins, 
  Info, 
  RefreshCcw,
  Scale,
  Gem,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Calculator
} from 'lucide-react';

interface AssetInputProps {
  id: string;
  label: string;
  value: string;
  icon: any;
  color: string;
  onChange: (id: any, value: string) => void;
}

const AssetInput: React.FC<AssetInputProps> = ({ id, label, value, icon: Icon, color, onChange }) => (
  <div className="flex items-center gap-4 p-4 bg-white dark:bg-ummah-card-dark rounded-2xl border border-black/[0.03] dark:border-white/[0.05] shadow-soft hover:border-ummah-icon-active-light/20 transition-all">
    <div className={`p-3 rounded-xl bg-slate-50 dark:bg-white/5 ${color} shrink-0`}>
      <Icon size={20} />
    </div>
    <div className="flex-1 min-w-0">
      <label className="block text-[10px] font-black text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase mb-0.5 truncate tracking-widest">{label}</label>
      <div className="relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-ummah-text-light/20 dark:text-white/20 font-bold">$</span>
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder="0.00"
          className="w-full pl-4 py-1 bg-transparent border-none focus:ring-0 focus:outline-none font-bold text-ummah-text-light dark:text-ummah-text-dark placeholder:text-ummah-text-light/10"
        />
      </div>
    </div>
  </div>
);

interface ZakatCalculatorProps {
  onAskAgent?: (query: string) => void;
}

const ZakatCalculator: React.FC<ZakatCalculatorProps> = ({ onAskAgent }) => {
  const [assets, setAssets] = useState({
    cash: '',
    gold: '',
    silver: '',
    investments: '',
    receivables: '',
    liabilities: ''
  });

  const [nisab, setNisab] = useState('5000'); 

  const handleInputChange = (field: keyof typeof assets, value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAssets(prev => ({ ...prev, [field]: value }));
    }
  };

  const totals = useMemo(() => {
    const cash = parseFloat(assets.cash) || 0;
    const gold = parseFloat(assets.gold) || 0;
    const silver = parseFloat(assets.silver) || 0;
    const investments = parseFloat(assets.investments) || 0;
    const receivables = parseFloat(assets.receivables) || 0;
    const liabilities = parseFloat(assets.liabilities) || 0;

    const totalAssets = cash + gold + silver + investments + receivables;
    const netAssets = Math.max(0, totalAssets - liabilities);
    const nisabValue = parseFloat(nisab) || 0;
    
    const zakatDue = netAssets >= nisabValue ? netAssets * 0.025 : 0;
    const progressPercent = nisabValue > 0 ? Math.min(100, (netAssets / nisabValue) * 100) : 0;

    return {
      totalAssets,
      netAssets,
      zakatDue,
      nisabValue,
      progressPercent,
      isAboveNisab: netAssets >= nisabValue
    };
  }, [assets, nisab]);

  const reset = () => {
    setAssets({
      cash: '',
      gold: '',
      silver: '',
      investments: '',
      receivables: '',
      liabilities: ''
    });
  };

  return (
    <div className="p-8 pb-32 space-y-8 animate-fade-up">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="premium-header text-3xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight uppercase">Wealth Purifier</h2>
          <p className="text-[10px] font-black text-ummah-gold uppercase tracking-[0.4em] mt-1 opacity-60">Zakat Calculator</p>
        </div>
        <button 
          onClick={reset} 
          className="p-3 bg-white dark:bg-ummah-card-dark text-ummah-icon-inactive-light hover:text-rose-500 rounded-2xl border border-black/5 dark:border-white/5 shadow-soft transition-all"
        >
          <RefreshCcw size={20} />
        </button>
      </div>

      <div className={`relative overflow-hidden rounded-[2.5rem] p-10 transition-all duration-700 ${totals.zakatDue > 0 ? 'bg-gradient-to-br from-ummah-icon-active-light to-[#043326] text-white shadow-premium' : 'bg-slate-100 dark:bg-ummah-card-dark text-slate-400'}`}>
        <div className="absolute inset-0 pattern-bg opacity-10"></div>
        <div className="relative z-10">
          <div className="mb-6 flex justify-between items-center">
             <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Payable Amount (2.5%)</span>
             {totals.isAboveNisab && (
               <div className="bg-white/10 backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                 <CheckCircle2 size={10} /> OBLIGATORY
               </div>
             )}
          </div>
          <h2 className="text-6xl font-black tracking-tighter mb-8 tabular-nums">
            ${totals.zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          
          <div className="space-y-3">
             <div className="flex justify-between text-[8px] font-black uppercase tracking-widest opacity-60">
                <span>Wealth Progress</span>
                <span>Nisab: ${totals.nisabValue}</span>
             </div>
             <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden p-0.5">
               <div 
                 className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-glow" 
                 style={{ width: `${totals.progressPercent}%` }}
               ></div>
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <AssetInput id="cash" label="Cash & Savings" value={assets.cash} icon={Wallet} color="text-blue-500" onChange={handleInputChange} />
        <AssetInput id="investments" label="Stocks & Portfolio" value={assets.investments} icon={TrendingUp} color="text-emerald-500" onChange={handleInputChange} />
        <AssetInput id="gold" label="Gold/Silver Value" value={assets.gold} icon={Gem} color="text-amber-500" onChange={handleInputChange} />
        <AssetInput id="liabilities" label="Debt Reductions" value={assets.liabilities} icon={ArrowRight} color="text-rose-500" onChange={handleInputChange} />
        
        <div className="p-4 bg-ummah-mint dark:bg-white/5 rounded-2xl border border-ummah-icon-active-light/10 flex items-center gap-4">
           <div className="p-2.5 rounded-xl bg-white dark:bg-ummah-bg-dark text-ummah-icon-active-light shadow-sm">
              <Scale size={20} />
           </div>
           <div className="flex-1">
              <label className="block text-[10px] font-black text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase mb-0.5 tracking-widest">Nisab Threshold</label>
              <input 
                type="text"
                value={nisab}
                onChange={(e) => setNisab(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none font-bold text-ummah-text-light dark:text-ummah-text-dark"
              />
           </div>
           <button 
             onClick={() => onAskAgent?.("What is the current Nisab value for Zakat in my currency and how do I calculate it accurately?")}
             className="p-2 text-ummah-icon-active-light hover:scale-110 transition-transform"
           >
             <Info size={18} />
           </button>
        </div>
      </div>

      <div className="p-8 bg-white dark:bg-ummah-card-dark rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles size={18} className="text-ummah-gold" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40">Zakat Guidance</h4>
        </div>
        <p className="text-[11px] text-ummah-text-light/60 dark:text-ummah-text-secondary-dark/60 leading-relaxed italic">
          "Zakat is not just a tax, but a way to purify your wealth and ensure the wellbeing of the global Ummah. Need detailed Fiqh advice on specific assets?"
        </p>
        <button 
          onClick={() => onAskAgent?.("I am using the Zakat calculator. Can you guide me on the detailed rules for calculating Zakat on business stock, long-term investments, and mixed jewelry?")}
          className="w-full py-4 bg-ummah-mint dark:bg-white/5 text-ummah-icon-active-light dark:text-ummah-icon-active-dark rounded-2xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-3 border border-ummah-icon-active-light/10"
        >
          Ask Ummah AI <ArrowRight size={12} />
        </button>
      </div>

      <div className="py-12 flex flex-col items-center opacity-10 text-center space-y-3">
        <HandCoins size={24} className="text-ummah-gold" />
        <p className="text-[8px] font-black uppercase tracking-[0.5em] max-w-[200px]">"Take from their wealth a charity by which you purify them."</p>
      </div>
    </div>
  );
};

export default ZakatCalculator;