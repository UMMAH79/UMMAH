export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface UserSettings {
  calculationMethod: number;
  asrMethod: 0 | 1;
  language: AppLanguage;
  notifications: boolean;
  adhanEnabled: boolean;
  selectedAdhanVoice: string;
  prayerAdhanSettings: Record<string, boolean>;
  userName?: string;
  appMode: AppMode;
  dailyChatCount: {
    date: string;
    count: number;
  };
}

export enum Tab {
  Home = 'HOME',
  Quran = 'QURAN',
  Agent = 'UMMAH AI',
  More = 'MORE'
}

export type AppMode = 'normal' | 'ramadan' | 'hajj';

export type AppLanguage = 
  | 'en' | 'ar' | 'ur' | 'bn' | 'id' | 'ms' | 'tr' 
  | 'kk' | 'fa' | 'prs' | 'ps' | 'ha' | 'sw' | 'wo' | 'fr';

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  audio: string;
  text: string;
  numberInSurah: number;
  juz: number;
  translation: string;
  transliteration: string;
}

export interface FastingDay {
  date: string;
  hijriDate: string;
  status: 'completed' | 'missed' | 'planned' | 'none';
  sehri: string;
  iftar: string;
}

export interface Dua {
  id: number;
  title: string;
  category: string;
  arabic: string;
  transliteration: string;
  translations: Record<string, string>;
}

export interface AllahName {
  number: number;
  name: string;
  transliteration: string;
  translation: string;
  description: string;
}

// New Question Interfaces
export interface Question {
  id: string;
  title: string;
  category: 'Prayers' | 'Quran' | 'Fasting' | 'Zakat' | 'Duas' | 'Faith & Doubts' | 'Prophets & History' | 'Prayer' | 'Faith & Doubt';
  ageGroup: 'Kids' | 'Teen' | 'Adult';
  shortAnswer: string;
  longAnswer: string;
}

export type HomeSubFeature = 'main' | 'duas' | 'calendar' | 'fasting' | 'prayers' | 'hadith' | 'tasbih' | 'ask-learn' | 'zakat' | 'names' | 'stories' | 'life-guidance';