import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import QuranReader from './components/QuranReader';
import AiAgent from './components/AiAgent';
import MoreFeatures from './components/MoreFeatures';
import LandingPage from './components/LandingPage';
import AdhanPlayer from './components/AdhanPlayer';
import { Tab, LocationData, AppLanguage, UserSettings, PrayerTimes as IPrayerTimes, HomeSubFeature } from './types';
import { fetchPrayerTimes } from './services/api';

const DARK_MODE_KEY = 'ummah_hub_dark_mode';
const SETTINGS_KEY = 'ummah_hub_prayer_settings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [timings, setTimings] = useState<IPrayerTimes | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [activeAdhan, setActiveAdhan] = useState<{name: string, voiceId: string} | null>(null);
  
  const [homeSubFeature, setHomeSubFeature] = useState<HomeSubFeature>('main');
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    return saved === 'true';
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : {
      calculationMethod: 2,
      asrMethod: 0,
      notifications: true,
      language: 'en',
      appMode: 'normal',
      adhanEnabled: true,
      selectedAdhanVoice: 'makkah',
      prayerAdhanSettings: {
        Fajr: true, Dhuhr: true, Asr: true, Maghrib: true, Isha: true
      },
      userName: '',
      dailyChatCount: {
        date: new Date().toISOString().split('T')[0],
        count: 0
      }
    };
  });

  const [agentInitialQuery, setAgentInitialQuery] = useState<string | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      // Check for saved manual location first
      const savedManual = localStorage.getItem('ummah_hub_manual_location');
      if (savedManual) {
        setLocation(JSON.parse(savedManual));
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          async (error) => {
            console.warn("GPS failed, trying IP fallback...", error);
            try {
              const res = await fetch('https://ipapi.co/json/');
              const data = await res.json();
              if (data.latitude && data.longitude) {
                setLocation({
                  latitude: data.latitude,
                  longitude: data.longitude,
                  city: data.city,
                  country: data.country_name
                });
              }
            } catch (ipErr) {
              // Default to Makkah if all fails
              setLocation({ latitude: 21.4225, longitude: 39.8262, city: 'Makkah', country: 'Saudi Arabia' });
            }
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      }
    };
    detectLocation();
  }, []);

  const handleSetLocation = (newLocation: LocationData) => {
    setLocation(newLocation);
    localStorage.setItem('ummah_hub_manual_location', JSON.stringify(newLocation));
  };

  const loadTimings = useCallback(async () => {
    if (!location) return;
    try {
      const data = await fetchPrayerTimes(
        location.latitude,
        location.longitude,
        settings.calculationMethod,
        settings.asrMethod
      );
      if (data.data && data.data.timings) {
        setTimings(data.data.timings);
      }
    } catch (err) {
      console.error("Failed to load prayer times:", err);
    }
  }, [location, settings.calculationMethod, settings.asrMethod]);

  useEffect(() => {
    loadTimings();
    
    // Refresh at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const timer = setTimeout(() => {
      loadTimings();
    }, msUntilMidnight);
    
    return () => clearTimeout(timer);
  }, [loadTimings]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(DARK_MODE_KEY, String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleAskAgent = (query: string) => {
    setAgentInitialQuery(query);
    setActiveTab(Tab.Agent);
  };

  const redirectToAskLearn = () => {
    setHomeSubFeature('ask-learn');
    setActiveTab(Tab.Home);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home:
        return (
          <Home 
            key={settings.language}
            location={location} 
            timings={timings} 
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onSetLocation={handleSetLocation}
            onAskAgent={handleAskAgent} 
            setActiveAdhan={setActiveAdhan}
            initialSubFeature={homeSubFeature}
            appMode={settings.appMode}
          />
        );
      case Tab.Quran:
        return <QuranReader key={settings.language} currentLanguage={settings.language} />;
      case Tab.Agent:
        return (
          <AiAgent 
            initialQuery={agentInitialQuery} 
            onClearInitialQuery={() => setAgentInitialQuery(null)} 
            preferredLanguage={settings.language}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onRedirectToAskLearn={redirectToAskLearn}
          />
        );
      case Tab.More:
        return (
          <MoreFeatures 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode} 
            onAskAgent={handleAskAgent}
            currentLanguage={settings.language}
            setLanguage={(lang) => handleUpdateSettings({ language: lang })}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        );
      default:
        return <Home location={location} timings={timings} settings={settings} onUpdateSettings={handleUpdateSettings} onSetLocation={handleSetLocation} onAskAgent={handleAskAgent} setActiveAdhan={setActiveAdhan} appMode={settings.appMode} />;
    }
  };

  const handleTabChange = (newTab: Tab) => {
    if (newTab !== Tab.Home) {
      setHomeSubFeature('main');
    }
    setActiveTab(newTab);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {showLanding && (
        <LandingPage onEnter={() => setShowLanding(false)} />
      )}
      
      {!showLanding && (
        <>
          {activeAdhan && (
            <AdhanPlayer 
              voiceId={activeAdhan.voiceId} 
              prayerName={activeAdhan.name} 
              onClose={() => setActiveAdhan(null)} 
            />
          )}
          <Layout activeTab={activeTab} setActiveTab={handleTabChange}>
            <div className="animate-in fade-in duration-500 h-full overflow-hidden">
              {renderContent()}
            </div>
          </Layout>
        </>
      )}
    </div>
  );
};

export default App;