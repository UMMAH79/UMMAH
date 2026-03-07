
import React from 'react';
import { Tab } from '../types';
import { 
  Home as HomeIcon,
  BookOpen, 
  Menu,
  MessageSquareText
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: Tab.Home, icon: HomeIcon, label: 'Ummah' },
    { id: Tab.Quran, icon: BookOpen, label: 'Quran' },
    { id: Tab.Agent, icon: MessageSquareText, label: 'Ummah AI' },
    { id: Tab.More, icon: Menu, label: 'More' },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-[100dvh] max-w-lg lg:max-w-none mx-auto bg-ummah-bg-light dark:bg-ummah-bg-dark shadow-2xl lg:shadow-none relative overflow-hidden transition-colors duration-700 ring-1 ring-black/5 dark:ring-white/5 overscroll-none">
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col w-72 shrink-0 bg-white/95 dark:bg-ummah-bg-dark/95 backdrop-blur-2xl border-r border-black/5 dark:border-white/10 z-50 p-8 transition-all duration-700">
        <div className="mb-12 px-4">
          <h1 className="premium-header text-3xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tighter">UMMAH</h1>
          <p className="text-[10px] font-black text-ummah-gold uppercase tracking-[0.3em] mt-2">Islamic Lifestyle</p>
        </div>
        
        <div className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 group ${
                  isActive 
                    ? 'bg-ummah-mint dark:bg-ummah-icon-active-dark/10 shadow-glow text-ummah-icon-active-light dark:text-ummah-icon-active-dark' 
                    : 'text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark hover:bg-black/5 dark:hover:bg-white/5 hover:text-ummah-text-light dark:hover:text-ummah-text-dark'
                }`}
              >
                <item.icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <span className="text-xs font-black uppercase tracking-widest">
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-ummah-gold rounded-full shadow-[0_0_10px_#C5A059] animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-auto p-6 bg-ummah-mint/50 dark:bg-white/5 rounded-3xl border border-ummah-icon-active-light/10">
          <p className="text-[10px] font-bold text-ummah-text-light/60 dark:text-ummah-text-secondary-dark leading-relaxed italic">
            "The best of people are those that bring most benefit to the rest of mankind."
          </p>
        </div>
      </nav>

      <main className="flex-1 relative overflow-hidden bg-ummah-bg-light dark:bg-ummah-bg-dark">
        <div className="absolute inset-0 lg:max-w-5xl lg:mx-auto lg:px-8 lg:py-4">
          <div className="h-full w-full lg:bg-white lg:dark:bg-ummah-card-dark lg:rounded-[3rem] lg:shadow-premium lg:border lg:border-black/5 lg:dark:border-white/5 overflow-hidden relative">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden shrink-0 bg-white/95 dark:bg-ummah-bg-dark/95 backdrop-blur-2xl border-t border-black/5 dark:border-white/10 flex justify-around items-center z-50 shadow-[0_-15px_50px_rgba(0,0,0,0.04)] pb-[calc(env(safe-area-inset-bottom,20px)+12px)] pt-5 px-6 transition-all duration-700">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-2 transition-all duration-500 relative px-4 ${
                isActive ? 'scale-105 opacity-100' : 'scale-100 opacity-70 hover:opacity-100'
              }`}
            >
              <div className={`transition-all duration-500 p-2.5 rounded-2xl ${
                isActive 
                  ? 'bg-ummah-mint dark:bg-ummah-icon-active-dark/10 shadow-glow' 
                  : ''
              }`}>
                <item.icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-colors duration-500 ${
                    isActive 
                      ? 'text-ummah-icon-active-light dark:text-ummah-icon-active-dark' 
                      : 'text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark'
                  }`}
                />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                isActive 
                  ? 'text-ummah-icon-active-light dark:text-ummah-icon-active-dark' 
                  : 'text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-ummah-gold rounded-full shadow-[0_0_10px_#C5A059] animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
