
import { GoogleGenAI, Type, Modality, ThinkingLevel } from "@google/genai";

export type VoiceType = 'male'; 

export interface HadithInsight {
  narrator: string;
  context: string;
  explanation: string;
  lessons: string[];
}

export interface GlobalHadith {
  text: string;
  source: string;
  category: string;
}

const GET_VOICE_NAME = (voice: VoiceType) => 'Charon';

/**
 * Searches the global corpus of 10,000+ Hadiths.
 */
export async function searchGlobalHadiths(query: string, category?: string): Promise<GlobalHadith[]> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const contents = category 
      ? `Provide 10 highly authentic Hadiths related to "${category}". Search terms: "${query}" if relevant.`
      : `Search authentic Hadiths related to: "${query}". Return 10 highly authentic results.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: "Islamic librarian. Provide authentic Hadiths from Kutub al-Sittah. Format as JSON.",
        responseMimeType: "application/json",
        // OPTIMIZATION: Instant response
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              source: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["text", "source", "category"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return [];
  } catch (error) {
    console.error("Global search error:", error);
    return [];
  }
}

export async function reciteHadith(
  text: string, 
  source: string, 
  category: string, 
  voice: VoiceType = 'male'
): Promise<Uint8Array | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const voiceName = GET_VOICE_NAME(voice);
    const prompt = `Narrate: Category: ${category}. Source: From ${source}. Text: ${text}.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return decodeBase64(base64Audio);
    }
    return null;
  } catch (error) {
    console.error("TTS error:", error);
    return null;
  }
}

export async function reciteDuaPart(
  text: string,
  voice: VoiceType = 'male'
): Promise<Uint8Array | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const voiceName = GET_VOICE_NAME(voice);
    
    const prompt = `[ROLE: WORLD-CLASS QARI] Recite Arabic text exactly: "${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return decodeBase64(base64Audio);
    }
    return null;
  } catch (error) {
    console.error("Dua TTS error:", error);
    return null;
  }
}

export async function getHadithExplanation(text: string, source: string): Promise<HadithInsight | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze: "${text}" Source: ${source}`,
      config: {
        systemInstruction: "Islamic scholar. Provide authentic insights. JSON format.",
        responseMimeType: "application/json",
        // OPTIMIZATION: Instant response
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            narrator: { type: Type.STRING },
            context: { type: Type.STRING },
            explanation: { type: Type.STRING },
            lessons: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["narrator", "context", "explanation", "lessons"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return null;
  } catch (error) {
    console.error("Insight error:", error);
    return null;
  }
}

function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
