
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { calculateQiblaDirection, calculateDistance } from '../utils/geo';
import { LocationData } from '../types';
import { 
  Navigation, 
  MapPin, 
  Compass,
  Zap,
  Smartphone,
  Info,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface Props {
  location: LocationData | null;
  onAskAgent?: (query: string) => void;
}

const QiblaCompass: React.FC<Props> = ({ location }) => {
  const [heading, setHeading] = useState<number>(0);
  const [needsPermission, setNeedsPermission] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const qiblaBearing = useMemo(() => {
    if (location) return calculateQiblaDirection(location.latitude, location.longitude);
    return 0;
  }, [location]);

  const distance = useMemo(() => {
    if (location) return calculateDistance(location.latitude, location.longitude);
    return 0;
  }, [location]);

  // Stable orientation handler to be used in add/removeEventListener
  // This avoids anonymous function creation in the event registration
  const handleOrientation = useCallback((e: any) => {
    let currentHeading = 0;
    
    // iOS: webkitCompassHeading is the gold standard for compass
    if (e.webkitCompassHeading !== undefined) {
      currentHeading = e.webkitCompassHeading;
    } 
    // Android Absolute: alpha is relative to Earth's north
    else if (e.alpha !== null) {
      currentHeading = 360 - e.alpha;
    }

    if (currentHeading !== 0) {
      setIsActive(true);
      setHeading(currentHeading);
    }
  }, []);

  const startCompass = async () => {
    setError(null);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    try {
      // Use globalThis to avoid shadowing issues and ensure access to standard Window interface
      const g = globalThis as any;
      
      if (isIOS && typeof g.DeviceOrientationEvent?.requestPermission === 'function') {
        const response = await g.DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setNeedsPermission(false);
          // Fix: use window as any to avoid 'never' type error during orientation access
          (window as any).addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setError("Permission denied. Enable motion sensors in settings.");
        }
      } else {
        // Android / Desktop Chrome - Fix 'never' type error by simplifying access and using handleOrientation directly
        // Fix: cast window to any to ensure addEventListener is accessible regardless of narrowing
        if ('ondeviceorientationabsolute' in (window as any)) {
          (window as any).addEventListener('deviceorientationabsolute', handleOrientation, true);
        } else if ('ondeviceorientation' in (window as any)) {
          (window as any).addEventListener('deviceorientation', handleOrientation, true);
        } else {
          setError("Your device does not support orientation sensors.");
        }
        setNeedsPermission(false);
      }
    } catch (err) {
      console.error("Sensor initialization failed", err);
      setError("Failed to initialize compass. Check browser permissions.");
    }
  };

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      setNeedsPermission(true);
    } else {
      startCompass();
    }

    return () => {
      // Clean up event listeners using the stable handleOrientation reference
      // Fix: use any for window to avoid potential never type narrowing issues in cleanup
      (window as any).removeEventListener('deviceorientation', handleOrientation, true);
      (window as any).removeEventListener('deviceorientationabsolute', handleOrientation, true);
    };
  }, [handleOrientation]);

  const isAligned = Math.abs(heading - qiblaBearing) < 5 || Math.abs(heading - qiblaBearing) > 355;

  // Haptic feedback on alignment
  useEffect(() => {
    if (isAligned && isActive && navigator.vibrate) {
      navigator.vibrate(40);
    }
  }, [isAligned, isActive]);

  return (
    <div className="h-full w-full flex flex-col bg-ummah-bg-light dark:bg-ummah-bg-dark transition-colors duration-500 overflow-y-auto p-8 green-scrollbar">
      <div className="flex justify-between items-start mb-8 animate-fade-up">
        <div>
          <h2 className="premium-header text-3xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight">Qibla</h2>
          <p className="text-[10px] font-black text-ummah-gold uppercase tracking-[0.4em] mt-1 opacity-60">Towards the Kaaba</p>
        </div>
        <div className="p-4 bg-white dark:bg-ummah-card-dark rounded-3xl shadow-premium border border-black/5 dark:border-white/5">
          <Compass size={24} className={isActive ? "text-emerald-500 animate-pulse" : "text-ummah-icon-inactive-light"} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[350px] relative">
        {!location ? (
          <div className="text-center p-10 bg-white dark:bg-ummah-card-dark rounded-[3rem] border border-black/5 dark:border-white/5 shadow-premium animate-pulse">
            <MapPin className="text-ummah-icon-inactive-light mx-auto mb-4" size={48} />
            <p className="text-[10px] font-black text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 uppercase tracking-widest leading-relaxed px-4">Waiting for GPS location to calculate Qibla...</p>
          </div>
        ) : needsPermission ? (
          <div className="text-center p-10 bg-white dark:bg-ummah-card-dark rounded-[3rem] border border-black/5 dark:border-white/5 shadow-premium max-w-xs animate-in zoom-in duration-300">
            <Smartphone className="text-ummah-gold mx-auto mb-6" size={48} />
            <h3 className="font-bold text-sm text-ummah-text-light dark:text-ummah-text-dark mb-2">Compass Required</h3>
            <p className="text-[10px] text-slate-400 mb-6 px-4 font-medium uppercase tracking-wider">Tap the button to enable motion sensors for Qibla tracking.</p>
            <button 
              onClick={startCompass}
              className="w-full py-4 bg-ummah-icon-active-light text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-premium active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Zap size={14} /> Start Compass
            </button>
          </div>
        ) : error ? (
          <div className="text-center p-10 bg-white dark:bg-ummah-card-dark rounded-[3rem] border border-rose-500/20 shadow-premium max-w-xs">
            <Info className="text-rose-500 mx-auto mb-4" size={48} />
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-6 leading-relaxed">{error}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-slate-100 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500">Retry App</button>
          </div>
        ) : (
          <div className="relative w-full aspect-square max-w-[300px] flex items-center justify-center animate-fade-up">
            {/* Outer Static Ring */}
            <div className={`absolute inset-0 border-[12px] rounded-full transition-all duration-700 shadow-premium ${isAligned ? 'border-emerald-500 shadow-glow bg-emerald-500/5' : 'border-white dark:border-white/5 bg-white dark:bg-ummah-card-dark'}`}></div>
            
            {/* Rotating Disk (Cardinal Points) */}
            <div className="absolute inset-0 transition-transform duration-200 ease-out" style={{ transform: `rotate(${-heading}deg)` }}>
              {['N', 'E', 'S', 'W'].map((label, i) => (
                <span key={label} className="absolute left-1/2 -translate-x-1/2 top-4 font-black text-[10px] text-ummah-text-light/20 dark:text-white/10" style={{ transform: `rotate(${i * 90}deg)`, transformOrigin: 'center 134px' }}>
                  {label}
                </span>
              ))}
            </div>

            {/* Qibla Needle (Moves relative to Disk) */}
            <div className="absolute inset-0 transition-transform duration-500 ease-out z-20" style={{ transform: `rotate(${qiblaBearing - heading}deg)` }}>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className={`p-4 rounded-2xl text-white shadow-2xl transition-all duration-500 ${isAligned ? 'bg-emerald-500 scale-110 shadow-glow' : 'bg-ummah-icon-active-light'}`}>
                  <Navigation size={28} />
                </div>
                <div className={`w-1 h-14 rounded-full mt-2 transition-colors duration-500 ${isAligned ? 'bg-emerald-500' : 'bg-ummah-icon-active-light'}`}></div>
              </div>
            </div>

            {/* Center Hub */}
            <div className="absolute w-20 h-20 bg-white dark:bg-ummah-card-dark rounded-full shadow-2xl flex items-center justify-center z-10 border border-black/5 dark:border-white/5">
               <div className={`w-10 h-10 rounded-xl rotate-45 border-4 flex items-center justify-center transition-all duration-500 ${isAligned ? 'bg-emerald-500 border-emerald-400' : 'bg-ummah-text-light dark:bg-black border-ummah-gold'}`}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
               </div>
            </div>
          </div>
        )}
      </div>

      {isActive && isAligned && (
        <div className="mt-8 flex items-center justify-center gap-2 animate-in zoom-in duration-300">
          <CheckCircle2 size={16} className="text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Qibla Found</span>
        </div>
      )}

      {isActive && (
        <div className="grid grid-cols-2 gap-4 mt-12 animate-fade-up [animation-delay:200ms]">
          <div className="bg-white dark:bg-ummah-card-dark p-6 rounded-[2.5rem] border border-black/5 dark:border-white/5 flex flex-col items-center shadow-soft">
             <p className="text-[9px] font-black text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/30 uppercase tracking-[0.3em] mb-2">Distance</p>
             <p className="text-2xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tighter tabular-nums">{distance.toLocaleString()}<span className="text-[10px] ml-1 opacity-40 font-bold tracking-normal text-ummah-gold">KM</span></p>
          </div>
          <div className="bg-white dark:bg-ummah-card-dark p-6 rounded-[2.5rem] border border-black/5 dark:border-white/5 flex flex-col items-center shadow-soft">
             <p className="text-[9px] font-black text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/30 uppercase tracking-[0.3em] mb-2">Direction</p>
             <p className="text-2xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tighter tabular-nums">{Math.round(qiblaBearing)}°<span className="text-[10px] ml-1 opacity-40 font-bold tracking-normal text-ummah-gold">N</span></p>
          </div>
        </div>
      )}

      <div className="mt-12 p-6 bg-ummah-mint/30 dark:bg-white/5 rounded-[2rem] border border-black/5 dark:border-white/5 flex gap-4 items-start animate-fade-up [animation-delay:400ms]">
         <RefreshCw className={`text-ummah-icon-active-light shrink-0 mt-0.5 ${isActive ? 'animate-spin-slow' : ''}`} size={16} />
         <p className="text-[10px] font-medium text-ummah-text-light/60 dark:text-ummah-text-secondary-dark/60 leading-relaxed italic">
           Point your phone towards the needle. If it freezes, move your device in a 'figure-8' motion to recalibrate the magnetometer.
         </p>
      </div>
    </div>
  );
};
