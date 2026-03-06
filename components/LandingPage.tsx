import React, { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
    // Smooth transition delay
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(onEnter, 800); 
    }, 400);
  };

  return (
    <div 
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center p-6 transition-all duration-1000 ease-in-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
        backgroundColor: '#020617'
      }}
    >
      {/* Background Ambience: Subtle Teal Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-xs w-full animate-fade-up">
        
        {/* Branding Title (Alternative to the large logo disc) */}
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl font-black tracking-[0.2em] uppercase" style={{ fontFamily: 'Playfair Display, serif' }}>
            UMMAH
          </h1>
          <div className="h-px w-12 bg-ummah-gold mx-auto mt-4 opacity-50"></div>
        </div>

        {/* Text Section */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-400/60 mb-2">
            Assalamu Alaikum
          </h2>
          <p className="text-[12px] text-white/60 font-medium leading-relaxed italic px-4 max-w-[280px] mx-auto">
            "Your digital sanctuary for essential Islamic tools, resources, and spiritual growth."
          </p>
        </div>

        {/* Button Section */}
        <div className="w-full px-8 mb-12">
          <button
            onClick={handleEnter}
            disabled={isEntering}
            className={`
              relative w-full overflow-hidden
              py-4 bg-[#0EAB7B]
              text-white rounded-2xl font-black tracking-[0.25em] text-[11px] uppercase
              transition-all duration-300 shadow-[0_15px_35px_rgba(14,171,123,0.25)]
              hover:shadow-[0_20px_45px_rgba(14,171,123,0.4)]
              hover:-translate-y-1 active:scale-95 active:translate-y-0
              disabled:opacity-50
            `}
          >
            <span className="flex items-center justify-center gap-3">
              {isEntering ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  Enter Ummah <ArrowRight size={14} strokeWidth={3} />
                </>
              )}
            </span>
          </button>
        </div>

        {/* Beta Disclaimer */}
        <div className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
          <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">
            BETA: DEVELOPMENT IN PROGRESS
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;