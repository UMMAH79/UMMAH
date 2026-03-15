
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

/**
 * Free translation and transliteration using Google Translate's gtx API.
 * No API key required. Handles chunking to prevent truncation of long verses.
 * Optimized to provide accurate transliteration that adapts to the app language.
 */
export const translateText = async (text: string, targetLang: string, sourceTranslit?: string) => {
  try {
    // Helper to fetch in chunks if text is too long
    const fetchInChunks = async (input: string, sl: string, tl: string, dt: string) => {
      if (!input) return null;
      const maxLength = 500; // Smaller chunks for absolute reliability against truncation
      if (input.length <= maxLength) {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=${dt}&q=${encodeURIComponent(input)}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
      }

      // Split by space to avoid cutting words
      const chunks = [];
      let current = input;
      while (current.length > 0) {
        let splitIndex = current.lastIndexOf(' ', maxLength);
        if (splitIndex === -1 || splitIndex === 0) splitIndex = maxLength;
        
        chunks.push(current.substring(0, splitIndex));
        current = current.substring(splitIndex).trim();
      }

      const results = await Promise.all(chunks.map(async (chunk) => {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=${dt}&q=${encodeURIComponent(chunk)}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
      }));

      // Merge results
      const merged: any = [[], null, sl];
      results.forEach(r => {
        if (r && r[0]) {
          merged[0].push(...r[0]);
        }
      });
      return merged;
    };

    // 1. Get Translation (Arabic -> Target)
    const transData = await fetchInChunks(text, 'ar', targetLang, 't');
    let translation = "";
    if (transData && transData[0]) {
      transData[0].forEach((s: any) => {
        if (s[0]) translation += s[0];
      });
    }

    // 2. Get Language-Specific Transliteration (Pronunciation)
    // We use the accurate Latin transliteration as a base and "translate" it to the target language.
    // This forces Google to provide the pronunciation in the target script (like Bengali)
    // or adapt the phonetics to the target language's rules.
    // This avoids the "half text glitch" because it uses the full Latin string as source.
    let finalTranslit = sourceTranslit || "";
    
    if (targetLang !== 'en' && sourceTranslit) {
      // Phonetic Bridge: Latin Translit -> Target Language
      // This is what makes it "work perfectly" for Bengali and other non-Latin scripts
      const bridgeData = await fetchInChunks(sourceTranslit, 'en', targetLang, 't');
      if (bridgeData && bridgeData[0]) {
        let adapted = "";
        bridgeData[0].forEach((s: any) => {
          if (s[0]) adapted += s[0];
        });
        if (adapted.trim()) {
          finalTranslit = adapted.trim();
        }
      }
    } else if (!sourceTranslit) {
      // Fallback: Use Google's direct Arabic transliteration if no base is provided
      const fallbackData = await fetchInChunks(text, 'ar', targetLang, 't&dt=rm');
      if (fallbackData && fallbackData[0]) {
        let googleTranslit = "";
        fallbackData[0].forEach((s: any) => {
          if (s[3]) googleTranslit += s[3].replace(/[⟨⟩]/g, '') + " ";
        });
        if (googleTranslit.trim()) finalTranslit = googleTranslit.trim();
      }
    }
    
    return {
      translation: translation.trim() || text,
      transliteration: finalTranslit
    };
  } catch (error) {
    console.error('Translation Error:', error);
    return {
      translation: text,
      transliteration: sourceTranslit || ""
    };
  }
};
