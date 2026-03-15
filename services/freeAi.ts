
/**
 * UMMAH AI - Free Knowledge Service
 * Works without an API key by using free public APIs and a local knowledge base.
 */

import { AppLanguage } from '../types';

interface FreeAiResponse {
  content: string;
}

const SCHOLAR_SUGGESTION = "\n\n**Note:** This query involves personal or complex matters. I strongly suggest you consult a **trusted local Imam or Islamic Scholar** for a definitive ruling (Fatwa) tailored to your specific situation.";

const KNOWLEDGE_BASE: Record<string, string> = {
  "salah": "Salah (Prayer) is the second pillar of Islam. It is a direct link between the worshipper and Allah. **Five daily prayers** are mandatory: Fajr, Dhuhr, Asr, Maghrib, and Isha.",
  "zakat": "Zakat is the third pillar of Islam. It is a mandatory charitable contribution, often considered to be a tax. It is 2.5% of a Muslim's total savings and wealth above a minimum amount known as nisab.",
  "fasting": "Sawm (Fasting) during the month of Ramadan is the fourth pillar of Islam. It involves abstaining from food, drink, and other physical needs from dawn to sunset.",
  "hajj": "Hajj is the fifth pillar of Islam. It is a pilgrimage to the holy city of Mecca that every adult Muslim who is physically and financially able must perform at least once in their lifetime.",
  "iman": "Iman (Faith) consists of belief in Allah, His Angels, His Books, His Messengers, the Day of Judgment, and Divine Decree (Qadr).",
  "quran": "The Holy Qur'an is the central religious text of Islam, which Muslims believe to be a revelation from Allah. It is widely regarded as the finest work in classical Arabic literature.",
  "hadith": "Hadith are the collected traditions of the Prophet Muhammad (peace be upon him), based on his sayings and actions.",
  "sunnah": "Sunnah refers to the traditions and practices of the Prophet Muhammad (peace be upon him) that constitute a model for Muslims to follow.",
  "halal": "Halal is an Arabic word that means 'permissible'. In terms of food, it means food that is permissible according to Islamic law.",
  "haram": "Haram is an Arabic word that means 'forbidden'. It refers to anything that is prohibited by Islamic law.",
  "wudu": "Wudu is the Islamic procedure for washing parts of the body, a type of ritual purification performed before prayer.",
  "ghusl": "Ghusl is an Arabic term referring to the full-body ritual purification mandatory before the performance of various rituals and prayers.",
  "dua": "Dua is the act of supplication. It is calling out to Allah; it is a conversation with Allah, our Creator, our Lord, the All-Knowing, and the All-Powerful.",
  "tahajjud": "Tahajjud is a special Islamic prayer which is recommended (but not compulsory) for all Muslims. It is performed after Isha (the nightly prayer) and before Fajr (the early morning prayer).",
  "marriage": "Marriage (Nikah) in Islam is a legal contract between two people. Both the groom and the bride are to consent to the marriage of their own free wills.",
  "divorce": "Divorce (Talaq) is permitted in Islam as a last resort if a marriage cannot be saved. It is the most disliked of permissible things in the sight of Allah.",
  "parents": "Islam places great emphasis on the respect and care of parents. 'Your Lord has decreed that you worship none but Him, and that you be kind to parents.' (Quran 17:23)",
  "modesty": "Haya (Modesty) is a key part of Islamic faith. It applies to both men and women in their dress, speech, and behavior.",
  "patience": "Sabr (Patience) is one of the most important virtues in Islam. Allah says: 'Indeed, Allah is with the patient.' (Quran 2:153)",
  "gratitude": "Shukr (Gratitude) is highly valued in Islam. 'If you are grateful, I will surely increase you [in favor].' (Quran 14:7)",
  "ramadan": "Ramadan is the ninth month of the Islamic calendar, observed by Muslims worldwide as a month of fasting, prayer, reflection, and community.",
  "eid": "Eid refers to two major Islamic festivals: Eid al-Fitr (marking the end of Ramadan) and Eid al-Adha (commemorating the sacrifice of Ibrahim).",
  "prophet": "Muhammad (peace be upon him) is the final prophet and messenger of Allah. He was born in Mecca and received the first revelation of the Quran at the age of 40.",
  "kaaba": "The Kaaba is a building at the center of Islam's most important mosque, the Masjid al-Haram in Mecca, Saudi Arabia. It is the most sacred site in Islam.",
  "mecca": "Mecca is the holiest city in Islam, located in Saudi Arabia. It is the birthplace of the Prophet Muhammad (peace be upon him) and the site of the Kaaba.",
  "medina": "Medina is the second holiest city in Islam. It is where the Prophet Muhammad (peace be upon him) migrated (Hijra) and where he is buried.",
  "hijab": "Hijab is a veil worn by some Muslim women in the presence of any male outside of their immediate family, which usually covers the head and chest.",
  "jannah": "Jannah is the Islamic concept of paradise. It is the final abode of the righteous after the Day of Judgment.",
  "jahannam": "Jahannam is the Islamic concept of hell. It is the place of punishment for the wicked after the Day of Judgment.",
  "angel": "Angels (Malaikah) are celestial beings created from light by Allah. They perform various duties, such as recording deeds and delivering revelations.",
  "sharia": "Sharia is the religious law forming part of the Islamic tradition. It is derived from the religious precepts of Islam, particularly the Quran and the Hadith.",
  "ummah": "Ummah is an Arabic word meaning 'community'. In Islam, it refers to the collective community of Islamic peoples.",
  "caliph": "A Caliph is a person considered a religious successor to the Islamic prophet Muhammad (peace be upon him) and a leader of the entire Muslim community.",
  "mosque": "A Mosque (Masjid) is a place of worship for Muslims. Any act of worship that follows the Islamic rules of prayer can be said to create a mosque.",
  "imam": "An Imam is an Islamic leadership position. It is most commonly used as the title of a worship leader of a mosque and Muslim community.",
  "fatwa": "A Fatwa is a non-binding legal opinion on a point of Islamic law given by a qualified jurist (Mufti) in response to a question posed by a private individual or a judge.",
  "jihad": "Jihad is an Arabic word which literally means striving or struggling, especially with a praiseworthy aim. It can refer to the internal struggle against one's own evil inclinations."
};

/**
 * Gathers information from free sources and local knowledge base.
 */
export const getFreeAiResponse = async (query: string, lang: AppLanguage = 'en'): Promise<FreeAiResponse> => {
  const lowerQuery = query.toLowerCase();
  
  // 1. Check for personal/sensitive topics first
  const sensitiveKeywords = [
    "should i", "can i marry", "is it haram for me", "my wife", "my husband", 
    "my problem", "feeling", "depressed", "suicide", "fatwa", "ruling on me",
    "divorce", "talaq", "inheritance", "money problem"
  ];
  
  const isSensitive = sensitiveKeywords.some(k => lowerQuery.includes(k));
  
  // 2. Search Quran (Free API)
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

  // 3. Search Local Knowledge Base
  let localResult = "";
  for (const [key, val] of Object.entries(KNOWLEDGE_BASE)) {
    if (lowerQuery.includes(key)) {
      localResult = val;
      break;
    }
  }

  // 4. Search Wikipedia (Free API)
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

  // 5. Construct Final Response
  let content = "";
  
  if (localResult) {
    content = `**${query.toUpperCase()}**\n\n${localResult}`;
  } else if (wikiResult) {
    content = `**INFORMATION GATHERED**\n\n${wikiResult}`;
  } else if (quranResult) {
    content = `**QURANIC GUIDANCE**\n\nI found a relevant verse for your query:`;
  } else {
    content = `**UMMAH AI GUIDANCE**\n\nI am currently operating in **Lite Mode** without an API connection. I can provide general Islamic information, but for specific queries, I recommend checking our **Ask & Learn** section or the **Quran Reader**.`;
  }

  if (quranResult) {
    content += quranResult;
  }

  if (isSensitive || (!localResult && !wikiResult && !quranResult)) {
    content += SCHOLAR_SUGGESTION;
  }

  return { content };
};
