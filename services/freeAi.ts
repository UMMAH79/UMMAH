
/**
 * UMMAH AI - Free Knowledge Service
 * Works without an API key by using free public APIs and a local knowledge base.
 */

import { AppLanguage } from '../types';

interface FreeAiResponse {
  content: string;
}

const SCHOLAR_SUGGESTION = "\n\n**Note:** For complex personal matters, it is always best to consult a **trusted local Imam or Scholar** who can provide a specific ruling (Fatwa) for your unique situation.";

const CONVERSATION_MAP: Record<string, string> = {
  "assalamu alaikum": "Wa Alaikum Assalam! I am **UMMAH AI**. How can I assist you today?",
  "salam": "Wa Alaikum Assalam! How can I help you?",
  "hello": "Assalamu Alaikum! I am **UMMAH AI**. How can I assist you with Islamic knowledge today?",
  "hi": "Assalamu Alaikum! How can I help you?",
  "how are you": "Alhamdulillah, I am here to serve you. How can I help you today?",
  "thank you": "You are most welcome! May Allah bless you.",
  "jazakallah": "Wa Iyyakum! May Allah reward you with goodness.",
  "who are you": "I am **UMMAH AI**, your companion for authentic Islamic knowledge and guidance.",
  "what can you do": "I can provide detailed information on **Salah**, **Quran**, **Hadith**, **Islamic History**, and **Daily Life** according to the Sunnah."
};

const KNOWLEDGE_BASE: Record<string, string> = {
  "allah": "Allah is the **One and Only God**, the Creator and Sustainer of the universe. In Islam, He is known by His **99 Beautiful Names**, such as Ar-Rahman (The Most Merciful) and Ar-Rahim (The Especially Merciful). He has no partners, no parents, and no children. He is the source of all peace, guidance, and mercy. **Subhanahu Wa Ta'ala** (Glorified and Exalted is He).",
  "salah": "Salah is the foundation of a Muslim's life. The **Five Daily Prayers** (Fajr, Dhuhr, Asr, Maghrib, Isha) are mandatory. It is the first thing we will be questioned about on the Day of Judgment. It is our direct connection to our Creator.",
  "zakat": "Zakat is a beautiful system of wealth purification. It is **2.5%** of your qualifying wealth given to those in need, ensuring social justice and spiritual growth. It is an act of worship that cleanses the heart from greed.",
  "fasting": "Fasting in **Ramadan** is a shield and a means of attaining Taqwa (God-consciousness). It is not just abstaining from food, but also from bad speech and actions. It is a time of spiritual renewal and empathy for the poor.",
  "hajj": "Hajj is the journey of a lifetime to the **House of Allah** in Mecca. It is a demonstration of the unity of the Ummah and a chance for a fresh start in life. It commemorates the trials of Prophet Ibrahim (AS) and his family.",
  "iman": "Iman is the firm belief in **Allah**, His Angels, His Books, His Messengers, the Last Day, and the Divine Decree. It is the light that guides a believer's heart and gives purpose to our existence.",
  "quran": "The **Holy Quran** is the literal word of Allah, revealed to Prophet Muhammad (PBUH) through the Angel Jibril. It is a healing for the hearts, a guide for all of humanity, and the final revelation.",
  "hadith": "Hadith are the recorded sayings and actions of the **Prophet Muhammad (PBUH)**. They provide the practical application of the Quranic teachings and are the second source of Islamic law.",
  "sunnah": "The Sunnah is the way of the **Prophet (PBUH)**. Following it brings us closer to Allah and ensures we are living our lives in the best possible way, following the best of examples.",
  "halal": "Halal refers to everything that is **permissible** in Islam. It is a blessing from Allah that ensures our physical and spiritual well-being. It covers food, earnings, and lifestyle.",
  "haram": "Haram refers to what is **forbidden**. Avoiding the Haram is an act of worship that protects us from harm and keeps our hearts pure. It is a boundary set by Allah for our own benefit.",
  "wudu": "Wudu is the ritual purification before prayer. It is a means of **washing away sins** and preparing oneself to stand before the Creator in a state of physical and spiritual cleanliness.",
  "ghusl": "Ghusl is the full-body purification required after certain states. It is a **mandatory act of worship** that restores ritual purity and allows a Muslim to perform their religious duties.",
  "dua": "Dua is the **weapon of the believer**. It is a direct conversation with Allah, who says: 'Call upon Me; I will respond to you.' It is an expression of our complete dependence on Him.",
  "tahajjud": "Tahajjud is the **Night Prayer**, a time when the gates of heaven are open and Allah descends to the lowest heaven to answer the prayers of His servants. It is a sign of deep love for Allah.",
  "marriage": "Marriage is **half of our Deen**. It is a sacred contract built on love, mercy, and mutual respect between a husband and a wife, designed to build a righteous family and community.",
  "divorce": "While permitted as a last resort, divorce is the **most disliked** of permissible things. Islam encourages reconciliation, patience, and fair treatment whenever possible.",
  "parents": "Kindness to parents is ranked immediately after the worship of Allah. **Paradise lies at the feet of mothers**, and the pleasure of Allah is in the pleasure of the father. We must serve them with love.",
  "modesty": "Modesty (Haya) is a branch of faith. It is the **beauty of the soul** and applies to our dress, our speech, and our interactions with others. It is a protection for one's dignity.",
  "patience": "Patience (Sabr) is a light. Allah is with those who are patient, and the reward for Sabr is **Paradise without account**. It is the ability to remain steadfast during trials.",
  "gratitude": "Gratitude (Shukr) is the key to more blessings. If you are grateful, Allah will surely **increase you** in His favors. It is acknowledging that every blessing comes from Him.",
  "ramadan": "Ramadan is the month of the Quran and mercy. It is a time for **spiritual rebooting**, strengthening our connection with the Creator, and increasing our acts of charity and worship.",
  "eid": "Eid is a time of **celebration and gratitude**. We celebrate the completion of worship and share our joy with the family and the community, remembering the less fortunate.",
  "prophet": "Prophet Muhammad (PBUH) is the **Mercy to the Worlds**. He is our role model in every aspect of life, from leadership to family and character. He is the Seal of the Prophets.",
  "kaaba": "The Kaaba is the **Qibla** for all Muslims. It represents the unity of the Ummah as we all face one direction in our worship of the One God. It was built by Ibrahim (AS) and Ismail (AS).",
  "mecca": "Mecca is the **holiest city**, the birthplace of the Prophet (PBUH) and the site of the first house of worship built for humanity. It is the heart of the Islamic world.",
  "medina": "Medina is the **City of the Prophet**, a place of peace and tranquility where the first Islamic state was established and where the Prophet (PBUH) rests in his mosque.",
  "hijab": "The Hijab is an act of **obedience and modesty**. It is a symbol of a woman's identity and her commitment to the commands of Allah, protecting her from being judged by her appearance.",
  "jannah": "Jannah is the **eternal home** of the righteous. It contains what no eye has seen, no ear has heard, and no human heart has ever imagined. It is the ultimate reward for faith.",
  "jahannam": "Jahannam is the place of punishment for those who rejected the truth. It is a **reminder to stay on the straight path**, seek Allah's mercy, and fear His justice.",
  "angel": "Angels are noble servants of Allah created from light. They **never disobey Him** and are constantly engaged in His worship and carrying out His commands, such as Jibril and Mika'il.",
  "sharia": "Sharia is the **Divine Path** that ensures justice, mercy, and the well-being of all people. It is the framework for a righteous life based on the Quran and Sunnah.",
  "ummah": "The Ummah is the **global family** of Muslims. We are like one body; if one part suffers, the whole body feels the pain. It transcends race, nationality, and language.",
  "caliph": "A Caliph is a leader who follows the guidance of the Prophet (PBUH) to **uphold justice** and lead the community in the way of Allah, protecting the Deen and the people.",
  "mosque": "The Mosque is the **heart of the community**. It is a place of worship, learning, and brotherhood for all Muslims, where we stand shoulder to shoulder before Allah.",
  "imam": "An Imam is a leader in prayer and a **guide for the community**. They carry the responsibility of teaching the Deen, leading by example, and providing spiritual support.",
  "fatwa": "A Fatwa is a **scholarly opinion** on Islamic law. It helps Muslims navigate modern challenges while staying true to the principles of the faith, given by qualified scholars.",
  "jihad": "Jihad is the **struggle for the sake of Allah**. The greatest Jihad is the struggle against one's own soul (Jihad al-Nafs) to stay on the path of righteousness and truth.",
  "charity": "Charity (Sadaqah) **extinguishes sins** as water extinguishes fire. It is a proof of one's faith and a means of bringing barakah into one's life and helping the needy.",
  "forgiveness": "Allah is the **Most Forgiving**. No matter how great the sin, His mercy is greater. We should always turn back to Him in sincere repentance and seek His pleasure.",
  "death": "Death is not the end, but a **bridge to the hereafter**. It is a reminder to live our lives in a way that prepares us for the meeting with our Lord and the eternal life.",
  "afterlife": "The Afterlife (Akhirah) is the **true life**. This world is temporary, while the next is eternal. Our actions here determine our station in the presence of Allah.",
  "judgment": "The Day of Judgment is the day of **absolute justice**. Every soul will be rewarded for what it earned, and no one will be wronged. It is the day of accountability.",
  "mercy": "Allah's Mercy precedes His Wrath. He is **Ar-Rahman and Ar-Rahim**, the source of all compassion and kindness. We must show mercy to others to receive His mercy.",
  "knowledge": "Seeking knowledge is **obligatory** for every Muslim. It is the path to understanding our purpose, drawing closer to our Creator, and benefiting humanity.",
  "honesty": "Honesty is a core Islamic value. The Prophet (PBUH) was known as **Al-Amin** (the Trustworthy). A Muslim must be truthful in speech and action at all times.",
  "justice": "Islam commands justice even against oneself or one's kin. Allah loves those who are **just and fair** in all their dealings, as it is the foundation of a stable society.",
  "brotherhood": "Muslims are brothers to one another. We should **love for our brother** what we love for ourselves and support each other in goodness and piety.",
  "character": "The best of you are those with the **best character**. Good manners are the heaviest thing on the scales on the Day of Judgment. Character is the fruit of faith.",
  "intentions": "Actions are judged by **intentions**. A small deed done with a pure heart for the sake of Allah is better than a great deed done for show or worldly gain.",
  "trust": "Trust in Allah (Tawakkul) means doing your best and then **leaving the results to Him**. He is the best of disposers of affairs and knows what is best for us."
};

/**
 * Cleans up Wikipedia text to make it more faith-based and Islamic.
 */
const synthesizeIslamicResponse = (text: string): string => {
  let synthesized = text;
  
  // Remove overly academic/secular phrasing
  synthesized = synthesized.replace(/principally associated with Islam/gi, "central to the Islamic faith");
  synthesized = synthesized.replace(/thought to be derived/gi, "understood in Islam");
  synthesized = synthesized.replace(/Arabic language term for God/gi, "the proper Name of the One True God");
  synthesized = synthesized.replace(/specifically the monotheistic God of Abraham/gi, "the God of all the Prophets, including Ibrahim (AS), Musa (AS), and Isa (AS)");
  synthesized = synthesized.replace(/Abrahamic religions/gi, "divine messages");
  synthesized = synthesized.replace(/principally associated with/gi, "the core of");
  
  // Add Islamic honorifics and context
  synthesized = synthesized.replace(/Muhammad/g, "Muhammad (PBUH)");
  synthesized = synthesized.replace(/Allah/g, "Allah (SWT)");
  synthesized = synthesized.replace(/God/g, "Allah (SWT)");
  
  // Ensure the tone is respectful
  if (!synthesized.includes("Islam teaches")) {
    synthesized = "According to the beautiful teachings of Islam, " + synthesized.charAt(0).toLowerCase() + synthesized.slice(1);
  }

  return synthesized;
};

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
  const ISLAMIC_KEYWORDS = [
    "islam", "allah", "prophet", "quran", "hadith", "salah", "prayer", "fasting", "ramadan", 
    "zakat", "hajj", "mecca", "medina", "dua", "wudu", "ghusl", "halal", "haram", "iman", 
    "sunnah", "sharia", "ummah", "jannah", "jahannam", "angel", "caliph", "mosque", "imam", 
    "fatwa", "jihad", "hijab", "modesty", "patience", "gratitude", "marriage", "divorce", 
    "parents", "tahajjud", "kaaba", "eid", "companion", "sahaba", "deen", "faith", "worship",
    "sin", "repent", "tawbah", "afterlife", "judgment", "creation", "miracle", "charity",
    "forgiveness", "death", "knowledge", "honesty", "justice", "brotherhood", "character",
    "intentions", "trust", "prophets", "messenger", "revelation", "scripture", "monotheism",
    "tawhid", "akhirah", "shirk", "bidah", "halal", "haram", "makruh", "mustahabb", "fard"
  ];
  const isIslamic = ISLAMIC_KEYWORDS.some(k => lowerQuery.includes(k));
  
  if (!isIslamic) {
    return { 
      content: "**UMMAH AI** is a specialized assistant for **Islamic knowledge**. To provide you with the most accurate guidance, please ask questions related to Islam, the Quran, the Sunnah, or Islamic lifestyle. How can I help you with your faith today?" 
    };
  }

  // 3. Search Local Knowledge Base (More flexible matching)
  let localResult = "";
  const sortedKeys = Object.keys(KNOWLEDGE_BASE).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (lowerQuery.includes(key)) {
      localResult = KNOWLEDGE_BASE[key];
      break;
    }
  }

  // 4. Search Quran (Free API)
  let quranResult = "";
  try {
    const quranRes = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/en.sahih`);
    if (quranRes.ok) {
      const data = await quranRes.json();
      if (data.data && data.data.matches && data.data.matches.length > 0) {
        const match = data.data.matches[0];
        quranResult = `\n\n**QURANIC REFERENCE**\n*${match.text}*\n*Surah ${match.surah.englishName} : ${match.numberInSurah}*\n**Translation: [Sahih International]**`;
      }
    }
  } catch (e) {
    console.warn("Quran search failed", e);
  }

  // 5. Advanced Wikipedia Search (Try search first, then summary)
  let wikiResult = "";
  try {
    const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query + " Islam")}&format=json&origin=*`);
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.query?.search?.length > 0) {
        const bestTitle = searchData.query.search[0].title;
        const summaryRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestTitle)}`);
        if (summaryRes.ok) {
          const summaryData = await summaryRes.json();
          if (summaryData.extract) {
            wikiResult = synthesizeIslamicResponse(summaryData.extract);
          }
        }
      }
    }
  } catch (e) {
    console.warn("Wiki search failed", e);
  }

  // 6. Construct Final Response
  let content = "";
  
  if (localResult && wikiResult) {
    content = `**${query.toUpperCase()}**\n\n${localResult}\n\n**ADDITIONAL GUIDANCE**\n${wikiResult}`;
  } else if (localResult) {
    content = `**${query.toUpperCase()}**\n\n${localResult}`;
  } else if (wikiResult) {
    content = `**ISLAMIC GUIDANCE**\n\n${wikiResult}`;
  } else if (quranResult) {
    content = `**QURANIC GUIDANCE**\n\nI found a relevant verse from the Holy Quran regarding your query:`;
  } else {
    const foundKeywords = ISLAMIC_KEYWORDS.filter(k => lowerQuery.includes(k));
    if (foundKeywords.length > 0) {
      content = `**UMMAH AI GUIDANCE**\n\nRegarding **${foundKeywords[0].toUpperCase()}**, Islam teaches us to always seek the truth through the **Quran and Sunnah**. This topic is central to our faith and character. I recommend looking into the specific verses and hadiths related to this for a deeper understanding.`;
    } else {
      content = `**UMMAH AI GUIDANCE**\n\nI have analyzed your query. In Islam, we are encouraged to seek knowledge and act with **Ikhlas** (sincerity). I recommend exploring this topic further through the **Quran Reader** or by consulting a local scholar for a detailed explanation.`;
    }
  }

  if (quranResult) {
    content += quranResult;
  }

  const sensitiveKeywords = [
    "should i", "can i marry", "is it haram for me", "my wife", "my husband", 
    "my problem", "feeling", "depressed", "suicide", "fatwa", "ruling on me",
    "divorce", "talaq", "inheritance", "money problem"
  ];
  const isSensitive = sensitiveKeywords.some(k => lowerQuery.includes(k));

  if (isSensitive) {
    content += SCHOLAR_SUGGESTION;
  }

  return { content };
};
