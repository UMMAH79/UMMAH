
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
  return (
    <div className="flex flex-col h-[100dvh] max-w-lg mx-auto bg-ummah-bg-light dark:bg-ummah-bg-dark shadow-2xl relative overflow-hidden transition-colors duration-700 ring-1 ring-black/5 dark:ring-white/5 overscroll-none">
      <main className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          {children}
        </div>
      </main>

      <nav className="shrink-0 bg-white/95 dark:bg-ummah-bg-dark/95 backdrop-blur-2xl border-t border-black/5 dark:border-white/10 flex justify-around items-center z-50 shadow-[0_-15px_50px_rgba(0,0,0,0.04)] pb-[calc(env(safe-area-inset-bottom,20px)+12px)] pt-5 px-6 transition-all duration-700">
        {[
          { id: Tab.Home, icon: HomeIcon, label: 'Ummah' },
          { id: Tab.Quran, icon: BookOpen, label: 'Quran' },
          { id: Tab.Agent, icon: MessageSquareText, label: 'Ummah AI' },
          { id: Tab.More, icon: Menu, label: 'More' },
        ].map((item) => {
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
