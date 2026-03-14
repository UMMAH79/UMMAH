
import { GoogleGenAI } from "@google/genai";
import { PrayerTimes, Surah, Ayah } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

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
 * Uses Gemini to get high-quality, language-specific transliteration (pronunciation)
 * and translation for Quranic verses.
 */
export const getAiVerseContent = async (arabicText: string, targetLangName: string) => {
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `
      Arabic Text: "${arabicText}"
      Target Language: ${targetLangName}
      
      Please provide:
      1. A high-quality translation in ${targetLangName}.
      2. A precise phonetic transliteration (pronunciation guide) adapted specifically for ${targetLangName} speakers. 
         - For example, if Turkish, use Turkish phonetic rules (e.g., 'c' for 'j' sounds, 'ş' for 'sh', etc.).
         - Ensure the FULL verse is transliterated, do not truncate.
      
      Return ONLY a JSON object with these keys: "translation", "transliteration".
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini Verse Error:", error);
    return null;
  }
};

/**
 * Free translation and transliteration using Google Translate's gtx API.
 * No API key required. Used as a fallback or for simple text.
 */
export const translateText = async (text: string, targetLang: string, sourceTranslit?: string) => {
  try {
    // 1. Primary call: Arabic to Target Language
    // We request translation (t) and transliteration (rm)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=${targetLang}&dt=t&dt=rm&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
    let translation = "";
    let googleTranslit = "";
    
    if (data && data[0]) {
      data[0].forEach((segment: any) => {
        if (segment[0]) translation += segment[0];
        // segment[3] is the transliteration of the source (Arabic)
        // For some languages, Google provides a native-script transliteration here
        if (segment[3]) googleTranslit += segment[3] + " ";
      });
    }

    // 2. Base transliteration (Latin)
    // We always want a good Latin base as a fallback or for phonetic bridge
    let latinBase = sourceTranslit || "";
    if (!latinBase || targetLang === 'en') {
      // If we don't have a verified one, or we are in English, use Google's
      if (googleTranslit.trim()) {
        latinBase = googleTranslit.trim();
      }
    }

    // 3. Phonetic Adaptation / Script Conversion
    let finalTranslit = googleTranslit.trim() || latinBase;

    // If target is not English, we try to adapt the Latin base to the target language
    if (targetLang !== 'en' && latinBase) {
      try {
        // We use the "phonetic bridge"
        // Translate the Latin base to the target language
        const bridgeUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(latinBase)}`;
        const bridgeRes = await fetch(bridgeUrl);
        if (bridgeRes.ok) {
          const bridgeData = await bridgeRes.json();
          if (bridgeData && bridgeData[0]) {
            let adapted = "";
            bridgeData[0].forEach((s: any) => {
              if (s[0]) adapted += s[0];
            });
            
            // If Google changed the spelling, it's likely a phonetic adaptation
            if (adapted.trim() && adapted.trim().toLowerCase() !== latinBase.toLowerCase()) {
              // Heuristic: if it's not a long sentence (meaning it's likely phonetics)
              // or if it contains non-Latin characters
              const hasNonLatin = /[^\u0000-\u007F]/.test(adapted);
              if (hasNonLatin || adapted.split(' ').length === latinBase.split(' ').length) {
                finalTranslit = adapted.trim();
              }
            }
          }
        }
      } catch (e) {
        console.warn("Phonetic bridge failed", e);
      }
    }
    
    return {
      translation: translation.trim() || text,
      transliteration: finalTranslit || latinBase || googleTranslit.trim() || ""
    };
  } catch (error) {
    console.error('Translation Error:', error);
    return {
      translation: text,
      transliteration: sourceTranslit || ""
    };
  }
};
