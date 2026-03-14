
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
 * No API key required.
 */
export const translateText = async (text: string, targetLang: string) => {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&dt=rm&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    
    // data[0] contains translation segments
    // data[0][0][0] is the translated text
    // data[0][1] often contains transliteration in some versions, 
    // but in gtx it's usually in a separate segment if dt=rm is provided.
    
    let translation = "";
    let transliteration = "";
    
    if (data[0]) {
      data[0].forEach((segment: any) => {
        if (segment[0]) translation += segment[0];
        // segment[3] is the transliteration of the source text (Arabic)
        if (segment[3]) transliteration += segment[3] + " ";
        // segment[2] is the transliteration of the target text (if target is non-Latin)
        // We prefer source transliteration for Quran/Dua
      });
    }

    // If no transliteration found in the primary response, try to get it via a second call to English
    // This ensures we at least have a Latin transliteration even if the target language call failed to provide one
    if (!transliteration.trim() && targetLang !== 'en') {
      try {
        const fallbackUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=rm&q=${encodeURIComponent(text)}`;
        const fallbackRes = await fetch(fallbackUrl);
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          if (fallbackData[0]) {
            fallbackData[0].forEach((s: any) => {
              if (s[3]) transliteration += s[3] + " ";
              else if (s[2]) transliteration += s[2] + " ";
            });
          }
        }
      } catch (e) {
        console.warn("Transliteration fallback failed", e);
      }
    }
    
    // If we have a Latin transliteration and the target language is not English,
    // try to convert the Latin transliteration into the target language's script.
    // This is a trick: translating a phonetic string often results in a script conversion.
    if (transliteration.trim() && targetLang !== 'en') {
      try {
        const scriptUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(transliteration.trim())}`;
        const scriptRes = await fetch(scriptUrl);
        if (scriptRes.ok) {
          const scriptData = await scriptRes.json();
          if (scriptData[0]) {
            let scriptTranslit = "";
            scriptData[0].forEach((s: any) => {
              if (s[0]) scriptTranslit += s[0];
            });
            
            // Only use it if it's actually different from the Latin version 
            // and contains non-Latin characters (indicating script conversion)
            if (scriptTranslit && scriptTranslit.trim() !== transliteration.trim()) {
              const hasNonLatin = /[^\u0000-\u007F]/.test(scriptTranslit);
              if (hasNonLatin) {
                transliteration = scriptTranslit;
              }
            }
          }
        }
      } catch (e) {
        console.warn("Script conversion failed", e);
      }
    }
    
    return {
      translation: translation.trim() || text,
      transliteration: transliteration.trim() || ""
    };
  } catch (error) {
    console.error("Translation error:", error);
    return null;
  }
};
