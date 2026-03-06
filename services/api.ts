
import { PrayerTimes, Surah, Ayah } from '../types';

/**
 * Generic fetch wrapper with basic error handling to prevent app crashes on network failure
 */
async function safeFetch(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`API Error [${response.status}]: ${url}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch failure: ${url}`, error);
    return null;
  }
}

export const fetchPrayerTimes = async (
  lat: number, 
  lon: number, 
  method: number = 2, 
  school: number = 0
): Promise<any> => {
  const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=${method}&school=${school}`;
  const data = await safeFetch(url);
  if (!data) throw new Error('Network error: Could not connect to Aladhan API');
  return data;
};

export const fetchSurahs = async (): Promise<Surah[]> => {
  const data = await safeFetch('https://api.alquran.cloud/v1/surah');
  if (!data) return [];
  return data.data;
};

export const fetchSurahDetail = async (id: number, edition: string = 'en.sahih'): Promise<Ayah[]> => {
  const url = `https://api.alquran.cloud/v1/surah/${id}/editions/ar.alafasy,${edition},en.transliteration`;
  const data = await safeFetch(url);
  
  if (!data || !data.data) return [];

  const arabicEdition = data.data[0];
  const translationEdition = data.data[1];
  const translitEdition = data.data[2];

  return arabicEdition.ayahs.map((ayah: any, index: number) => ({
    ...ayah,
    translation: translationEdition.ayahs[index].text,
    transliteration: translitEdition.ayahs[index].text
  }));
};

export const fetchAyahDetail = async (id: number, edition: string = 'en.sahih'): Promise<Ayah & { surah: any } | null> => {
  const url = `https://api.alquran.cloud/v1/ayah/${id}/editions/ar.alafasy,${edition},en.transliteration`;
  const data = await safeFetch(url);
  
  if (!data || !data.data) return null;
  
  const arabic = data.data[0];
  const translation = data.data[1];
  const translit = data.data[2];

  return {
    ...arabic,
    translation: translation.text,
    transliteration: translit.text,
    surah: arabic.surah
  };
};
