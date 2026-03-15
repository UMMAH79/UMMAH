
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
      2. A precise phonetic transliteration (pronunciation guide) adapted specifically for ${targetLangName} speakers, using the ${targetLangName} script if applicable (e.g., Bengali script for Bengali, Latin script for Turkish/English).
         - The goal is to help a non-Arabic speaker pronounce the verse correctly.
         - Use phonetic rules of ${targetLangName} (e.g., for Turkish, use 'ş' for 'sh', 'ç' for 'ch', 'ğ' where appropriate).
         - Ensure the ENTIRE verse is transliterated. Do not truncate or summarize.
      
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
 * Handles chunking to prevent truncation of long verses.
 */
export const translateText = async (text: string, targetLang: string, sourceTranslit?: string) => {
  try {
    // Helper to fetch in chunks if text is too long
    const fetchInChunks = async (input: string, sl: string, tl: string, dt: string) => {
      const maxLength = 1000; // Safe limit for gtx API
      if (input.length <= maxLength) {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=${dt}&q=${encodeURIComponent(input)}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
      }

      // Split by sentence or space
      const chunks = [];
      let current = input;
      while (current.length > 0) {
        let splitIndex = current.lastIndexOf('. ', maxLength);
        if (splitIndex === -1) splitIndex = current.lastIndexOf(' ', maxLength);
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

    // 1. Primary call: Arabic to Target Language
    const data = await fetchInChunks(text, 'ar', targetLang, 't&dt=rm');
    if (!data) throw new Error("Translation failed");
    
    let translation = "";
    let googleTranslit = "";
    
    if (data && data[0]) {
      data[0].forEach((segment: any) => {
        if (segment[0]) translation += segment[0];
        if (segment[3]) googleTranslit += segment[3] + " ";
      });
    }

    // 2. Base transliteration (Latin)
    let latinBase = sourceTranslit || "";
    if (!latinBase || targetLang === 'en') {
      if (googleTranslit.trim()) {
        latinBase = googleTranslit.trim();
      }
    }

    // 3. Phonetic Adaptation / Script Conversion
    let finalTranslit = googleTranslit.trim() || latinBase;

    // If target is not English, we try to adapt the Latin base to the target language
    if (targetLang !== 'en' && latinBase) {
      try {
        // We use the "phonetic bridge" with chunking
        const bridgeData = await fetchInChunks(latinBase, 'en', targetLang, 't');
        if (bridgeData && bridgeData[0]) {
          let adapted = "";
          bridgeData[0].forEach((s: any) => {
            if (s[0]) adapted += s[0];
          });
          
          if (adapted.trim() && adapted.trim().toLowerCase() !== latinBase.toLowerCase()) {
            const hasNonLatin = /[^\u0000-\u007F]/.test(adapted);
            // Only use if it looks like a phonetic adaptation (similar length or non-latin script)
            if (hasNonLatin || Math.abs(adapted.length - latinBase.length) < latinBase.length * 0.3) {
              finalTranslit = adapted.trim();
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
