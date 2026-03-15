
/**
 * UMMAH AI - Free Knowledge Service
 * Works without an API key by using free public APIs and a local knowledge base.
 */

import { AppLanguage } from '../types';

interface FreeAiResponse {
  content: string;
}

const SCHOLAR_SUGGESTION = "\n\n**Note:** This query involves personal or complex matters. I strongly suggest you consult a **trusted local Imam or Islamic Scholar** for a definitive ruling (Fatwa) tailored to your specific situation.";

const CONVERSATION_MAP: Record<string, string> = {
  "assalamu alaikum": "Wa Alaikum Assalam! I am **UMMAH AI**, your Islamic lifestyle companion. How can I assist you today in your journey of faith?",
  "salam": "Wa Alaikum Assalam! How can I help you today?",
  "hello": "Assalamu Alaikum! I am **UMMAH AI**. I can help you with questions about Islam, Quran, and Hadith. How can I assist you?",
  "hi": "Assalamu Alaikum! How can I help you today?",
  "how are you": "Alhamdulillah, I am functioning well and ready to assist you. How are you doing?",
  "thank you": "You are most welcome! May Allah bless you. Is there anything else you would like to know?",
  "jazakallah": "Wa Iyyakum! May Allah reward you with goodness as well.",
  "who are you": "I am **UMMAH AI**, a specialized assistant designed to provide authentic Islamic knowledge and guidance based on the Quran and Sunnah.",
  "what can you do": "I can provide information on **Salah**, **Zakat**, **Fasting**, **Hajj**, and general Islamic history. I can also help you find relevant **Quranic verses**."
};

const ISLAMIC_KEYWORDS = [
  "islam", "allah", "prophet", "quran", "hadith", "salah", "prayer", "fasting", "ramadan", 
  "zakat", "hajj", "mecca", "medina", "dua", "wudu", "ghusl", "halal", "haram", "iman", 
  "sunnah", "sharia", "ummah", "jannah", "jahannam", "angel", "caliph", "mosque", "imam", 
  "fatwa", "jihad", "hijab", "modesty", "patience", "gratitude", "marriage", "divorce", 
  "parents", "tahajjud", "kaaba", "eid", "companion", "sahaba", "deen", "faith", "worship",
  "sin", "repent", "tawbah", "afterlife", "judgment", "creation", "miracle"
];

/**
 * Gathers information from free sources and local knowledge base.
 */
export const getFreeAiResponse = async (query: string, lang: AppLanguage = 'en'): Promise<FreeAiResponse> => {
  const lowerQuery = query.toLowerCase().trim();
  
  // 1. Handle Normal Conversation
  for (const [key, val] of Object.entries(CONVERSATION_MAP)) {
    if (lowerQuery.includes(key)) {
      return { content: val };
    }
  }

  // 2. Topic Filter - Check if it's Islamic
  const isIslamic = ISLAMIC_KEYWORDS.some(k => lowerQuery.includes(k));
  
  // If not Islamic and not a greeting, politely decline
  if (!isIslamic) {
    return { 
      content: "**UMMAH AI** is specialized in **Islamic knowledge** and guidance. I cannot provide information on topics outside of Islam. Please ask me something related to our beautiful faith!" 
    };
  }

  // 3. Check for personal/sensitive topics
  const sensitiveKeywords = [
    "should i", "can i marry", "is it haram for me", "my wife", "my husband", 
    "my problem", "feeling", "depressed", "suicide", "fatwa", "ruling on me",
    "divorce", "talaq", "inheritance", "money problem"
  ];
  
  const isSensitive = sensitiveKeywords.some(k => lowerQuery.includes(k));
  
  // 4. Search Quran (Free API)
  let quranResult = "";
  try {
    const quranRes = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/en.sahih`);
    if (quranRes.ok) {
      const data = await quranRes.json();
      if (data.data && data.data.matches && data.data.matches.length > 0) {
        const match = data.data.matches[0];
        quranResult = `\n\n*${match.text}*\n*Surah ${match.surah.englishName} : ${match.numberInSurah}*\n**Translation: [Sahih International]**`;
      }
    }
  } catch (e) {
    console.warn("Quran search failed", e);
  }

  // 5. Search Local Knowledge Base
  let localResult = "";
  for (const [key, val] of Object.entries(KNOWLEDGE_BASE)) {
    if (lowerQuery.includes(key)) {
      localResult = val;
      break;
    }
  }

  // 6. Search Wikipedia (Free API)
  let wikiResult = "";
  if (!localResult) {
    try {
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      if (wikiRes.ok) {
        const data = await wikiRes.json();
        if (data.extract) {
          wikiResult = data.extract;
        }
      }
    } catch (e) {
      console.warn("Wiki search failed", e);
    }
  }

  // 7. Construct Final Response
  let content = "";
  
  if (localResult) {
    content = `**${query.toUpperCase()}**\n\n${localResult}`;
  } else if (wikiResult) {
    content = `**INFORMATION GATHERED**\n\n${wikiResult}`;
  } else if (quranResult) {
    content = `**QURANIC GUIDANCE**\n\nI found a relevant verse for your query:`;
  } else {
    content = `**UMMAH AI GUIDANCE**\n\nI am currently operating in **Lite Mode**. I can provide general Islamic information, but for specific queries, I recommend checking our **Ask & Learn** section or the **Quran Reader**.`;
  }

  if (quranResult) {
    content += quranResult;
  }

  if (isSensitive || (!localResult && !wikiResult && !quranResult)) {
    content += SCHOLAR_SUGGESTION;
  }

  return { content };
};
