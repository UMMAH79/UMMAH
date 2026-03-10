
import React, { useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { 
  HelpCircle, 
  Shield, 
  Bell,
  Globe,
  ChevronRight,
  ChevronLeft,
  Info,
  CheckCircle2,
  BellRing,
  Moon as MoonIcon,
  Languages,
  Lightbulb,
  Mail,
  X,
  Copy,
  Check,
  HandHeart,
  Heart,
  Coins,
  History,
  Sparkles,
  Zap,
  Send,
  Loader2,
  Crown,
  User,
  Layout,
  Sun,
  Moon,
  Footprints,
  Facebook,
  Youtube,
  Star
} from 'lucide-react';
import { AppLanguage, UserSettings, AppMode } from '../types';
import AboutUs from './AboutUs';

type FeatureState = 'main' | 'notifications' | 'privacy' | 'language' | 'donate' | 'upgrade' | 'profile' | 'about' | 'contact';

interface MoreFeaturesProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
  onAskAgent?: (query: string) => void;
  currentLanguage: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  settings: UserSettings;
  onUpdateSettings: (s: Partial<UserSettings>) => void;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqedklon';

const MoreFeatures: React.FC<MoreFeaturesProps> = ({ 
  isDarkMode = false, 
  toggleDarkMode, 
  onAskAgent, 
  currentLanguage, 
  setLanguage,
  settings,
  onUpdateSettings
}) => {
  const [activeFeature, setActiveFeature] = useState<FeatureState>('main');
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'report' | 'feedback'>('report');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [nameInput, setNameInput] = useState(settings.userName || '');
  
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('ummah_hub_notifications_enabled');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('ummah_hub_notifications_enabled', String(notificationsEnabled));
  }, [notificationsEnabled]);

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all app data?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleOpenFeedback = (type: 'report' | 'feedback') => {
    setFeedbackType(type);
    setShowFeedbackPanel(true);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          type: feedbackType,
          message: message,
          language: currentLanguage,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error("Submission failed:", error);
    }
    
    setIsSending(false);
    setShowFeedbackPanel(false);
    setMessage('');
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3500);
  };

  const saveProfile = () => {
    onUpdateSettings({ userName: nameInput });
    setActiveFeature('main');
  };

  const FeatureHeader = ({ title, onBack }: { title: string, onBack: () => void }) => (
    <div className="shrink-0 sticky top-0 bg-white/80 dark:bg-ummah-bg-dark/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 z-50">
      <button 
        onClick={onBack} 
        className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold text-sm"
      >
        <ChevronLeft size={18} /> Back
      </button>
      <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-[10px]">{title}</h3>
      <div className="w-10"></div>
    </div>
  );

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'notifications': 
        return (
          <div className="p-6 space-y-6">
            <div className="bg-white dark:bg-ummah-card-dark rounded-[2rem] p-6 shadow-sm border border-black/5 dark:border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-2xl">
                    <BellRing size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Push Notifications</h4>
                    <p className="text-[10px] text-slate-400">Prayer times and daily reminders</p>
                  </div>
                </div>
                <button 
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${notificationsEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${notificationsEnabled ? 'translate-x-5.5' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>
        );
      case 'language':
        return (
          <div className="p-6 space-y-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-3xl border border-emerald-100 dark:border-emerald-800 mb-4 flex gap-4">
              <Info className="text-emerald-600 shrink-0" size={18} />
              <p className="text-[10px] text-emerald-800 dark:text-emerald-400 font-medium leading-relaxed">
                Selecting a side language will update the translation of the **Holy Quran**, **Daily Duas**, and **AI Guidance** throughout the app.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button 
                  key={lang.id}
                  onClick={() => { setLanguage(lang.id as AppLanguage); setActiveFeature('main'); }}
                  className={`flex items-center justify-between p-4 rounded-[1.25rem] border transition-all ${currentLanguage === lang.id ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-white dark:bg-ummah-card-dark border-black/5 dark:border-white/5 text-slate-700 dark:text-slate-300'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-black ${currentLanguage === lang.id ? 'bg-white/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                      {lang.id.toUpperCase()}
                    </div>
                    <div className="text-left">
                      <p className="font-black text-xs">{lang.name}</p>
                      <p className={`text-[9px] uppercase tracking-widest opacity-60 ${currentLanguage === lang.id ? 'text-white' : 'text-slate-400'}`}>{lang.native}</p>
                    </div>
                  </div>
                  {currentLanguage === lang.id && <CheckCircle2 size={18} />}
                </button>
              ))}
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="p-6 space-y-6">
            <div className="bg-white dark:bg-ummah-card-dark rounded-[2.5rem] p-8 shadow-soft border border-black/5 dark:border-white/5">
               <h4 className="font-black text-slate-800 dark:text-white mb-6 text-lg uppercase tracking-tight">Privacy & Security</h4>
               <div className="space-y-4 text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                 <p className="font-bold text-slate-800 dark:text-white">At UMMAH, your privacy is a responsibility, not just a feature.</p>
                 <p>We clearly state that we do not collect, sell, rent, or steal any of your personal data. Your personal information remains yours. We do not access your private messages, photos, files, contacts, or personal content.</p>
                 <p>The permissions requested when you first open the app are strictly for functional purposes only.</p>
                 <p>These permissions are required to properly manage:</p>
                 <ul className="list-disc pl-5 space-y-1">
                   <li>Prayer time calculations</li>
                   <li>Adhan notifications</li>
                   <li>Qur’an display and audio playback</li>
                   <li>Reminder alerts</li>
                 </ul>
                 <p>For example, location permission is used only to calculate accurate prayer times. Notification permission is used only for prayer alerts. Audio access is used only for Adhan and Qur’an playback.</p>
                 <p>These permissions exist only to ensure smooth performance and prevent glitches.</p>
                 <div className="space-y-0.5">
                   <p>We do not sell data.</p>
                   <p>We do not track users for profit.</p>
                   <p>We do not store unnecessary personal information.</p>
                   <p>We do not access data beyond what is required for core functionality.</p>
                 </div>
                 <p className="font-bold pt-2 text-ummah-icon-active-light dark:text-ummah-icon-active-dark">Your trust matters. Your privacy matters.</p>
               </div>
               <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
                 <button onClick={handleClearData} className="w-full py-4 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Reset All Local Data</button>
               </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="p-6 space-y-6">
             <div className="bg-white dark:bg-ummah-card-dark rounded-[2.5rem] p-8 border border-black/5 dark:border-white/5 shadow-premium">
                <div className="w-20 h-20 bg-ummah-mint dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-ummah-icon-active-light">
                   <User size={36} />
                </div>
                <div className="space-y-4">
                   <div>
                      <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Spiritual Name</label>
                      <input 
                        type="text" 
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="Enter your name..."
                        className="w-full bg-slate-50 dark:bg-ummah-bg-dark border border-black/5 dark:border-white/5 rounded-2xl px-6 py-4 font-bold text-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                   </div>
                   <button 
                     onClick={saveProfile}
                     className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-premium active:scale-95 transition-all"
                   >
                     Update Profile
                   </button>
                </div>
             </div>
          </div>
        );
      case 'upgrade':
        return (
          <div className="p-6 space-y-6">
             <div className="bg-gradient-to-br from-ummah-gold to-amber-600 rounded-[3rem] p-10 text-white shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                   <Crown size={120} />
                </div>
                <div className="relative z-10">
                   <h3 className="premium-header text-3xl font-black mb-2">Ummah Premium</h3>
                   <p className="text-amber-100/60 text-[10px] font-black uppercase tracking-[0.2em] mb-10">Ascend to Divine Efficiency</p>
                   
                   <ul className="space-y-4 mb-10">
                      {[
                        'Unlimited AI Chats per day',
                        'High-Accuracy GPS Hijri Sync',
                        'Advanced Hadith Explanation',
                        'Custom Qibla Skins',
                        'Priority Adhan Audio Loading'
                      ].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                           <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                              <Check size={12} strokeWidth={3} />
                           </div>
                           <span className="text-xs font-bold">{feature}</span>
                        </li>
                      ))}
                   </ul>

                   <button className="w-full py-5 bg-white text-ummah-gold rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-xl flex items-center justify-center gap-3 group">
                      <span>Unlock Premium</span>
                      <div className="flex items-center gap-2 border-l border-ummah-gold/20 pl-3">
                         <span className="text-[8px] opacity-60">UNDER DEVELOPMENT</span>
                         <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                   </button>
                </div>
             </div>
          </div>
        );
      case 'donate':
        return (
          <div className="p-6 space-y-6 animate-in fade-in duration-500">
            {donationSuccess ? (
              <div className="py-20 flex flex-col items-center text-center space-y-6 animate-in zoom-in">
                <div className="w-24 h-24 bg-ummah-mint dark:bg-ummah-icon-active-dark/10 text-ummah-icon-active-light dark:text-ummah-icon-active-dark rounded-full flex items-center justify-center shadow-glow">
                  <CheckCircle2 size={48} />
                </div>
                <div>
                  <h3 className="premium-header text-2xl font-black text-ummah-text-light dark:text-ummah-text-dark">Barakallahu Feek</h3>
                  <p className="text-xs text-ummah-text-light/40 dark:text-ummah-text-secondary-dark font-medium mt-2 max-w-[200px] mx-auto italic">
                    "When a person dies, his deeds come to an end except for three: Ongoing charity..."
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-ummah-icon-active-light to-emerald-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-premium">
                   <div className="absolute top-0 right-0 p-8 opacity-10">
                     <HandHeart size={120} />
                   </div>
                   <div className="relative z-10">
                     <h3 className="premium-header text-2xl font-black mb-2">Donate Us</h3>
                     <p className="text-emerald-100/70 text-[10px] font-black uppercase tracking-widest mb-6">Support UMMAH Ecosystem</p>
                     <p className="text-xs leading-relaxed opacity-90 font-medium">Your support keeps UMMAH independent, free of ads, and continuously improving for Muslims worldwide.</p>
                   </div>
                </div>

                <div className="flex flex-col gap-6">
                  <button 
                    onClick={() => setDonationSuccess(true)}
                    className="group relative w-full overflow-hidden bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center gap-6 shadow-premium transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-ummah-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-20 h-20 bg-ummah-gold/10 text-ummah-gold rounded-[2rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      <Coins size={36} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-black text-lg text-slate-800 dark:text-white uppercase tracking-tight">Make a Donation</h4>
                      <p className="text-xs text-slate-400 font-medium mt-1">Direct support for app development & AI</p>
                    </div>
                    <div className="w-full py-4 bg-ummah-gold text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg">
                      Donate Now
                    </div>
                  </button>

                  <div className="p-8 bg-ummah-mint/30 dark:bg-white/5 rounded-[2.5rem] border border-ummah-icon-active-light/5">
                    <div className="flex items-center gap-3 mb-4">
                        <History size={16} className="text-ummah-icon-active-light" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-ummah-icon-active-light">Our Commitment</span>
                    </div>
                    <p className="text-[11px] text-ummah-text-light/60 dark:text-ummah-text-secondary-dark/60 leading-relaxed italic">
                      "100% of your contributions go towards server maintenance, API costs, and feature development. We are committed to remaining an ad-free sanctuary for the global Ummah."
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      case 'about':
        return <AboutUs onBack={() => setActiveFeature('main')} />;
      case 'contact':
        return (
          <div className="p-6 space-y-6">
            <div className="bg-white dark:bg-ummah-card-dark rounded-[2.5rem] p-8 border border-black/5 dark:border-white/5 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-2xl">
                  <Mail size={20} />
                </div>
                <h2 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs">Contact Us</h2>
              </div>
              <div className="space-y-6">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                  If you have any questions, feedback, or inquiries related to Ummah, feel free to contact us. For any general reason or business purpose, please reach out to us at:
                </p>
                <div className="py-4 px-6 bg-slate-50 dark:bg-ummah-bg-dark rounded-2xl border border-black/5 dark:border-white/5 flex items-center gap-3 group">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-xl">
                    <Mail size={16} />
                  </div>
                  <a href="mailto:ummahbusiness349@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:underline">
                    ummahbusiness349@gmail.com
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium leading-relaxed italic">
                  For general feedback or reports, please use the appropriate sections available on the website.
                </p>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                  We will try our best to respond as soon as possible. Thank you for supporting Ummah.
                </p>
              </div>
            </div>

            <div className="p-8 bg-ummah-mint/30 dark:bg-white/5 rounded-[2.5rem] border border-ummah-icon-active-light/5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-ummah-icon-active-light mb-2">Response Time</p>
              <p className="text-[11px] text-ummah-text-light/60 dark:text-ummah-text-secondary-dark/60 leading-relaxed font-medium">
                Our team typically responds within 24-48 hours. We appreciate your patience.
              </p>
            </div>
          </div>
        );
      default: return null;
    }
  };

  if (activeFeature !== 'main') {
    return (
      <div className="h-full flex flex-col animate-in slide-in-from-right duration-300 bg-slate-50 dark:bg-ummah-bg-dark overflow-hidden">
        <FeatureHeader 
          title={activeFeature === 'donate' ? 'Donate Us' : activeFeature === 'upgrade' ? 'Premium Upgrade' : activeFeature.replace('_', ' ')} 
          onBack={() => setActiveFeature('main')} 
        />
        <div className="flex-1 overflow-y-auto green-scrollbar scroll-smooth">
          {renderFeatureContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto green-scrollbar p-5 pb-24 bg-slate-50/50 dark:bg-ummah-bg-dark/50 relative scroll-smooth">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight uppercase">More</h1>
        <div className="flex gap-2">
           <button onClick={() => setActiveFeature('profile')} className="bg-white dark:bg-ummah-card-dark px-3 py-1.5 rounded-xl border border-black/5 dark:border-white/5 flex items-center gap-2">
              <User size={12} className="text-emerald-500" />
              <span className="text-[8px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">{settings.userName || 'Guest User'}</span>
           </button>
           <div className="bg-white dark:bg-ummah-card-dark px-2.5 py-1.5 rounded-xl border border-black/5 dark:border-white/5 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                {SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage)?.name || 'English'}
              </span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div className="space-y-6">
          <button onClick={() => setActiveFeature('upgrade')} className="w-full bg-gradient-to-br from-ummah-gold to-amber-600 rounded-[2rem] p-6 mb-6 shadow-premium group relative overflow-hidden flex items-center justify-between">
         <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white shadow-inner">
               <Crown size={24} fill="currentColor" />
            </div>
            <div className="text-left">
               <h3 className="text-white font-black text-sm uppercase tracking-wider">Unlock Premium</h3>
               <p className="text-white/60 text-[9px] font-bold tracking-widest">UNLIMITED AI ACCESS</p>
            </div>
         </div>
         <div className="flex items-center gap-2 relative z-10">
            <span className="text-[7px] font-black text-white/40 uppercase tracking-widest">COMING SOON</span>
            <ChevronRight className="text-white/40 group-hover:translate-x-1 transition-transform" size={16} />
         </div>
      </button>

      <div className="bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/10 rounded-[2rem] p-2 overflow-hidden shadow-sm transition-colors mb-6">
        <div className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all mb-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400">
              <MoonIcon size={16} />
            </div>
            <span className="font-bold text-slate-700 dark:text-white text-xs">Dark Mode</span>
          </div>
          <button onClick={toggleDarkMode} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isDarkMode ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>

        <button onClick={() => setActiveFeature('language')} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group mb-1 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500">
              <Languages size={16} />
            </div>
            <div>
              <span className="block font-bold text-slate-700 dark:text-white text-xs">App Language</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage)?.name || 'English'}</span>
            </div>
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
        </button>

        <button onClick={() => setActiveFeature('notifications')} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group mb-1 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500"><Bell size={16} /></div>
            <span className="font-bold text-slate-700 dark:text-white text-xs">Notifications</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
        </button>

        <button onClick={() => setActiveFeature('privacy')} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group mb-1 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400"><Shield size={16} /></div>
            <span className="font-bold text-slate-700 dark:text-white text-xs">Privacy & Security</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
        </button>

        <button onClick={() => setActiveFeature('about')} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group mb-1 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600"><Star size={16} /></div>
            <span className="font-bold text-slate-700 dark:text-white text-xs">About Ummah</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
        </button>

        <button onClick={() => setActiveFeature('contact')} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group mb-1 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600"><Mail size={16} /></div>
            <span className="font-bold text-slate-700 dark:text-white text-xs">Contact Us</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

        </div>

        <div className="space-y-6">
          <div className="px-2 mb-3">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/40">Follow Us</h3>
      </div>
      <div className="bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/10 rounded-[2rem] p-2 overflow-hidden shadow-sm transition-colors mb-6">
        <a href="https://www.facebook.com/share/1FtGPU5sqJ/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group mb-1 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600">
              <Facebook size={16} />
            </div>
            <span className="font-bold text-slate-700 dark:text-white text-xs">Facebook</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
        </a>

        <a href="https://www.youtube.com/@UMMAHTEAMOFFICIAL" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600">
              <Youtube size={16} />
            </div>
            <span className="font-bold text-slate-700 dark:text-white text-xs">YouTube</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
        </a>
      </div>

      <div className="bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/10 rounded-[2rem] p-2 overflow-hidden shadow-sm transition-colors mb-6">
        <button onClick={() => setActiveFeature('donate')} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group mb-1 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-ummah-gold/10 text-ummah-gold"><HandHeart size={16} /></div>
            <span className="font-bold text-slate-700 dark:text-white text-xs">Donate Us</span>
          </div>
          <div className="flex items-center gap-2">
             <span className="bg-ummah-gold text-white text-[7px] font-black px-1.5 py-0.5 rounded tracking-tighter shadow-sm">SUPPORT</span>
             <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
          </div>
        </button>
      </div>

      <div className="bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/10 rounded-[2rem] p-2 overflow-hidden shadow-sm transition-colors mb-12">
        <button onClick={() => handleOpenFeedback('report')} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group mb-1 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-500"><HelpCircle size={16} /></div>
            <span className="font-bold text-slate-700 dark:text-white text-xs">Report Any Problem</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
        </button>

        <button onClick={() => handleOpenFeedback('feedback')} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group mb-1 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-500"><Lightbulb size={16} /></div>
            <span className="font-bold text-slate-700 dark:text-white text-xs">Feedback</span>
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

        </div>
      </div>

      <div className="text-center px-10 opacity-20 flex flex-col items-center gap-2">
        <HandHeart size={20} className="text-ummah-gold" />
        <p className="text-[9px] font-black uppercase tracking-[0.4em] leading-loose">UMMAH V2.5 • OPEN SOURCE</p>
      </div>

      {/* Feedback Bottom Sheet Modal */}
      {showFeedbackPanel && (
        <div className="fixed inset-0 z-[110] flex items-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowFeedbackPanel(false)}></div>
           <div className="relative w-full bg-white dark:bg-ummah-card-dark rounded-t-[3rem] p-8 shadow-premium animate-in slide-in-from-bottom duration-500">
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-8"></div>
              
              <div className="flex items-center justify-between mb-8">
                 <button onClick={() => setShowFeedbackPanel(false)} className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-2xl active:scale-90 transition-transform">
                    <X size={20} />
                 </button>
                 <h3 className="premium-header text-xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight uppercase">
                    {feedbackType === 'report' ? 'Report a Problem' : 'Send Feedback'}
                 </h3>
                 <div className="w-10"></div>
              </div>

              <div className="mb-8">
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {feedbackType === 'report' 
                      ? "Found a bug or an error? Please describe it below so we can fix it for the global Ummah." 
                      : "We value your voice. Let us know how we can make UMMAH even better for your spiritual journey."}
                 </p>
              </div>

              <div className="relative mb-6">
                 <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={feedbackType === 'report' ? "Describe the issue..." : "Write your suggestions..."}
                    className="w-full min-h-[160px] p-6 bg-slate-50 dark:bg-ummah-bg-dark border border-black/5 dark:border-white/5 rounded-[2.5rem] text-sm font-medium text-ummah-text-light dark:text-ummah-text-dark outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                 />
              </div>

              <div className="mb-10 px-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Send to</span>
                </div>
                <div className="px-5 py-3 bg-slate-50/50 dark:bg-black/20 border border-black/5 dark:border-white/5 rounded-2xl">
                  <p className="text-[10px] font-medium text-slate-400 dark:text-slate-600 truncate">{FORMSPREE_ENDPOINT}</p>
                </div>
              </div>

              <div className="flex justify-center">
                 <button 
                    onClick={handleSendMessage}
                    disabled={isSending || !message.trim()}
                    className="w-full max-w-xs py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-premium flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50"
                 >
                    {isSending ? (
                       <Loader2 size={18} className="animate-spin" />
                    ) : (
                       <>
                          <Send size={18} className="ml-1" />
                          Send Now
                       </>
                    )}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Success Confirmation Modal */}
      {showSuccess && (
        <div className="fixed inset-x-6 top-1/2 -translate-y-1/2 z-[120] animate-in zoom-in duration-300">
           <div className="bg-white dark:bg-ummah-card-dark rounded-[3rem] p-10 shadow-2xl border border-emerald-500/10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-[1.75rem] flex items-center justify-center mb-6 shadow-glow">
                 <CheckCircle2 size={40} />
              </div>
              <h3 className="premium-header text-xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight mb-2">Message Sent Successfully</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                 Thank you for your valuable contribution. Together, we build a better UMMAH ecosystem.
              </p>
              <div className="mt-8 flex items-center gap-2">
                 <Sparkles size={14} className="text-emerald-500" />
                 <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Barakallahu Feek</span>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MoreFeatures;
