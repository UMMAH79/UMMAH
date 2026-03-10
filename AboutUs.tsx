import React from 'react';
import { 
  Info, 
  Users, 
  BookOpen, 
  Heart, 
  Globe, 
  Zap, 
  ShieldCheck, 
  MessageCircle, 
  Compass,
  Star,
  Sparkles,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-ummah-bg-dark animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="shrink-0 sticky top-0 bg-white/80 dark:bg-ummah-bg-dark/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 z-50">
        <button 
          onClick={onBack} 
          className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors flex items-center gap-2 text-slate-600 dark:text-slate-300 font-bold text-sm"
        >
          <ChevronLeft size={18} /> Back
        </button>
        <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-[10px]">About Ummah</h3>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10 pb-20 scroll-smooth green-scrollbar">
        {/* Hero Section */}
        <div className="text-center space-y-4 pt-4">
          <div className="w-20 h-20 bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark rounded-[2.5rem] flex items-center justify-center mx-auto text-white shadow-glow mb-6">
            <Star size={36} fill="currentColor" />
          </div>
          <h1 className="premium-header text-4xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tighter uppercase">Ummah</h1>
          <p className="text-xs text-ummah-text-light/60 dark:text-ummah-text-secondary-dark font-bold uppercase tracking-[0.3em]">A Sincere Guidance Sanctuary</p>
          <div className="max-w-xs mx-auto pt-4">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              Ummah is a platform designed to help Muslims access authentic Islamic knowledge and useful daily tools in one place.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-ummah-card-dark rounded-[2.5rem] p-8 border border-black/5 dark:border-white/5 shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 rounded-2xl">
              <Zap size={20} />
            </div>
            <h2 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs">Our Mission</h2>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
            Our mission is to use technology to make Islamic knowledge easier to access, especially for the younger generation who rely on digital platforms for learning and guidance. We aim to make learning about Islam simple, accessible, and beneficial for Muslims around the world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-6">
          <div className="px-2">
            <h2 className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Core Features</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: BookOpen, title: "Holy Qur'an", desc: "Read and listen to the Divine Word with translations." },
              { icon: Compass, title: "Hadith Collections", desc: "Access authentic sayings of the Prophet (PBUH)." },
              { icon: Zap, title: "Prayer Times", desc: "Accurate timings with Adhan notifications." },
              { icon: Heart, title: "Islamic Duas", desc: "A collection of supplications for every situation." },
              { icon: ShieldCheck, title: "Zakat Guidance", desc: "Tools to help you fulfill your financial obligations." },
              { icon: Sparkles, title: "Ummah AI", desc: "AI-powered assistant based on reliable Islamic knowledge." }
            ].map((f, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-ummah-card-dark rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm">
                <div className="p-3 bg-slate-50 dark:bg-ummah-bg-dark text-ummah-icon-active-light dark:text-ummah-icon-active-dark rounded-2xl h-fit">
                  <f.icon size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 dark:text-white text-sm mb-1">{f.title}</h3>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Sections */}
        <div className="space-y-6">
          <div className="px-2">
            <h2 className="font-black text-slate-400 uppercase tracking-[0.3em] text-[10px]">Special Learning</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-ummah-icon-active-light to-emerald-900 rounded-[2.5rem] p-8 text-white shadow-premium">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle size={24} />
                <h3 className="font-black text-lg uppercase tracking-tight">Ask & Learn</h3>
              </div>
              <p className="text-xs font-medium opacity-80 leading-relaxed">
                A space where users can ask short questions or clear small doubts about Islam quickly and easily.
              </p>
            </div>
            <div className="bg-gradient-to-br from-ummah-gold to-amber-700 rounded-[2.5rem] p-8 text-white shadow-premium">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={24} />
                <h3 className="font-black text-lg uppercase tracking-tight">Life & Guidance</h3>
              </div>
              <p className="text-xs font-medium opacity-80 leading-relaxed">
                Provides deeper and more detailed guidance for real-life struggles and important life situations from an Islamic perspective.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white dark:bg-ummah-card-dark rounded-[2.5rem] p-8 border border-black/5 dark:border-white/5 shadow-soft">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 rounded-2xl">
              <Users size={20} />
            </div>
            <h2 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs">Our Team</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {[
              { name: "Jubaer", role: "Developer" },
              { name: "Sahil", role: "Developer" },
              { name: "Tahmid", role: "Developer" }
            ].map((member, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 dark:bg-ummah-bg-dark rounded-2xl flex items-center justify-center text-slate-400 font-black text-xs">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-slate-800 dark:text-white text-sm">{member.name}</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-black/5 dark:border-white/5">
            <p className="text-[11px] text-slate-400 font-medium italic text-center">
              Developed by a small team passionate about technology and Islamic learning.
            </p>
          </div>
        </div>

        {/* Continuous Improvement */}
        <div className="p-8 bg-ummah-mint/30 dark:bg-white/5 rounded-[2.5rem] border border-ummah-icon-active-light/5 text-center">
          <p className="text-[11px] text-ummah-text-light/60 dark:text-ummah-text-secondary-dark/60 leading-relaxed font-medium">
            The platform is continuously being improved with new features and better tools to serve the global Muslim community.
          </p>
        </div>

        {/* Closing Message */}
        <div className="text-center space-y-4 py-10">
          <div className="flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Star key={i} size={12} className="text-ummah-gold" fill="currentColor" />
            ))}
          </div>
          <p className="premium-header text-xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight">
            May this platform be a source of benefit for the Ummah.
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ummah-icon-active-light">Barakallahu Feekum</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
