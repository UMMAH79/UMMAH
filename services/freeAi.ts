
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
  "assalamu alaikum": "Wa Alaikum Assalam wa Rahmatullahi wa Barakatuh! I am **UMMAH AI**, your dedicated companion for Islamic knowledge and spiritual growth. How can I serve you today?",
  "salam": "Wa Alaikum Assalam! It is a blessing to connect with you. How can I assist you on your journey of faith today?",
  "hello": "Assalamu Alaikum! I am **UMMAH AI**. I am here to provide you with authentic Islamic guidance, Quranic insights, and Sunnah-based wisdom. What is on your mind?",
  "hi": "Assalamu Alaikum! How can I help you today? Whether it's about Salah, Quran, or daily life, I am here for you.",
  "how are you": "Alhamdulillah, I am functioning at my best to serve the Ummah. I hope you are in the best of health and Iman. How can I help you today?",
  "thank you": "You are most welcome! May Allah (SWT) reward your kindness and increase you in goodness. Is there anything else you'd like to know?",
  "jazakallah": "Wa Iyyakum! May Allah (SWT) grant you the best in this world and the hereafter. It is my honor to assist you.",
  "who are you": "I am **UMMAH AI**, a specialized artificial intelligence designed to be a companion for every Muslim. My mission is to provide authentic, accessible, and spiritually uplifting Islamic knowledge based on the Quran and the Sahih Sunnah.",
  "what can you do": "I am equipped to help you with a wide range of topics: from explaining **Quranic verses** and **Hadiths** to providing guidance on **Salah**, **Wudu**, **Islamic History**, and **Daily Ethics**. I can also help you find Duas for specific situations and provide insights into the lives of the Prophets (AS)."
};

const KNOWLEDGE_BASE: Record<string, string> = {
  "allah": "Allah is the **One and Only God**, the Creator, the Sustainer, and the Sovereign of all that exists. In Islam, the concept of **Tawhid** (the Oneness of Allah) is central. He is described in the Quran as having no partners, no parents, and no children. He is **Ar-Rahman** (The Most Merciful) and **Ar-Rahim** (The Especially Merciful). His knowledge encompasses everything, and His mercy extends to all creation. **Subhanahu Wa Ta'ala** (Glorified and Exalted is He).",
  "who is allah": "Allah is the **One and Only God**, the Creator, the Sustainer, and the Sovereign of all that exists. In Islam, the concept of **Tawhid** (the Oneness of Allah) is central. He is described in the Quran as having no partners, no parents, and no children. He is **Ar-Rahman** (The Most Merciful) and **Ar-Rahim** (The Especially Merciful). His knowledge encompasses everything, and His mercy extends to all creation. **Subhanahu Wa Ta'ala** (Glorified and Exalted is He).",
  "salah": "Salah (Prayer) is the second pillar of Islam and the daily connection between a believer and Allah (SWT). It is mandatory for every adult Muslim to perform the **Five Daily Prayers**: Fajr, Dhuhr, Asr, Maghrib, and Isha. Salah is not just a ritual; it is a spiritual ascension, a time of peace, and a means of seeking forgiveness and guidance. The Prophet (PBUH) said: 'The first thing for which a person will be brought to account on the Day of Resurrection will be his prayer.'",
  "zakat": "Zakat is the mandatory act of charity and the third pillar of Islam. It involves giving **2.5%** of one's qualifying wealth (savings, gold, trade goods) to specific categories of people in need, such as the poor and the wayfarer. Zakat is a means of **purifying one's wealth** and heart from greed, and it ensures social justice within the Ummah by redistributing resources to those who need them most.",
  "fasting": "Fasting (Sawm) during the month of **Ramadan** is the fourth pillar of Islam. It is an act of deep devotion where Muslims abstain from food, drink, and marital relations from dawn until sunset. The primary goal of fasting is to attain **Taqwa** (God-consciousness). It is a time for self-discipline, empathy for the hungry, increased recitation of the Quran, and seeking the Night of Decree (Laylat al-Qadr).",
  "hajj": "Hajj is the pilgrimage to the **Kaaba in Mecca** and the fifth pillar of Islam. It is mandatory once in a lifetime for those who are physically and financially able. Hajj is a profound demonstration of the unity and equality of the Ummah, as millions of Muslims from all over the world gather in simple white garments (Ihram) to worship Allah (SWT) and commemorate the trials of Prophet Ibrahim (AS) and his family.",
  "iman": "Iman (Faith) is the firm belief in the heart, the testimony of the tongue, and the actions of the limbs. The **Six Pillars of Iman** are: Belief in Allah, His Angels, His Books, His Messengers, the Last Day, and the Divine Decree (Qadar). Iman is like a tree; its root is the Shahada, and its branches are good deeds. It increases with obedience to Allah and decreases with disobedience.",
  "quran": "The **Holy Quran** is the final revelation from Allah (SWT) to humanity, revealed to Prophet Muhammad (PBUH) over 23 years through the Angel Jibril. It is the literal Word of Allah, preserved perfectly in its original Arabic. The Quran is a **healing for the hearts**, a criterion between right and wrong, and a complete guide for every aspect of life. Its beauty and wisdom are unmatched, and reciting it is an act of great worship.",
  "what is quran": "The **Holy Quran** is the final revelation from Allah (SWT) to humanity, revealed to Prophet Muhammad (PBUH) over 23 years through the Angel Jibril. It is the literal Word of Allah, preserved perfectly in its original Arabic. The Quran is a **healing for the hearts**, a criterion between right and wrong, and a complete guide for every aspect of life. Its beauty and wisdom are unmatched, and reciting it is an act of great worship.",
  "hadith": "Hadith refers to the recorded sayings, actions, and silent approvals of the **Prophet Muhammad (PBUH)**. They are the second primary source of Islamic law and guidance, providing the practical application of the Quran's teachings. Authentic collections like **Sahih Bukhari** and **Sahih Muslim** are highly revered. Following the Hadith is essential to understanding how to live as a true follower of the Sunnah.",
  "sunnah": "The Sunnah represents the **way of life** of the Prophet Muhammad (PBUH). It encompasses his character, his dealings with people, his worship, and his ethics. Following the Sunnah is a sign of love for the Prophet (PBUH) and a means of attaining the love of Allah (SWT). As Allah says in the Quran: 'Say, [O Muhammad], If you should love Allah, then follow me, [so] Allah will love you and forgive you your sins.' (3:31).",
  "halal": "Halal is an Arabic term meaning **permissible**. In Islam, it refers to everything that is allowed according to the Sharia. While often associated with food (like meat slaughtered in the name of Allah), it also applies to earnings, relationships, and lifestyle. Choosing Halal is an act of obedience that brings **Barakah** (blessing) into a Muslim's life and ensures spiritual purity.",
  "haram": "Haram refers to everything that is **forbidden** by Allah (SWT). These prohibitions are set for the protection and well-being of humanity. Avoiding the Haram—whether it be in food, speech, or actions—is a fundamental part of a Muslim's struggle (Jihad) to stay on the Straight Path. Sincere repentance (Tawbah) is always open for those who have fallen into the Haram.",
  "wudu": "Wudu (Ablution) is the ritual purification performed before Salah and other acts of worship. It involves washing the hands, mouth, nose, face, arms, wiping the head, and washing the feet. Wudu is not just physical cleaning; it is a **spiritual preparation** that washes away minor sins and allows a believer to stand before their Creator in a state of purity.",
  "ghusl": "Ghusl is the full-body ritual purification required after certain states, such as after marital relations or the completion of a woman's cycle. It is a **mandatory act of worship** that restores ritual purity. Performing Ghusl is also a Sunnah before the Friday (Jumu'ah) prayer and on the two Eids, symbolizing a fresh start and spiritual cleanliness.",
  "dua": "Dua (Supplication) is the **essence of worship**. It is a direct, personal conversation between a servant and Allah (SWT). Allah loves to be asked and has promised to respond: 'Call upon Me; I will respond to you.' (40:60). Dua can be made in any language, at any time, and for any need, reflecting our complete reliance on the Almighty.",
  "tahajjud": "Tahajjud is the **voluntary night prayer** performed after waking up from sleep in the last third of the night. It is one of the most virtuous acts of worship, a time when Allah (SWT) descends to the lowest heaven to answer the prayers and forgive the sins of those who seek Him. It is a sign of deep spiritual devotion and a means of attaining high ranks in Jannah.",
  "marriage": "In Islam, marriage (Nikah) is a **sacred contract** and a sign of Allah's mercy. It is described as 'half of the Deen' because it protects one's chastity and provides a framework for a life of companionship, love, and mutual support. A successful Islamic marriage is built on **Mawaddah** (love) and **Rahmah** (mercy), with the goal of building a righteous family.",
  "divorce": "While divorce (Talaq) is permitted in Islam as a last resort when a marriage becomes untenable, it is described as the **most disliked of permissible things** to Allah. Islam provides a clear process for divorce that ensures fairness and protects the rights of both parties, especially women, while encouraging reconciliation and patience whenever possible.",
  "parents": "The Quran places the duty of being kind to parents immediately after the duty to worship Allah alone. **Paradise lies at the feet of mothers**, and the pleasure of the father is linked to the pleasure of Allah. We are commanded to speak to them with honor and never even say 'uff' (a sigh of frustration) to them, especially in their old age.",
  "modesty": "Modesty (Haya) is a core value in Islam, described by the Prophet (PBUH) as a **branch of faith**. It is not just about dress; it is an internal state of being that reflects in one's speech, behavior, and interactions. Haya protects a person's dignity and acts as a shield against indecency and immorality.",
  "patience": "Patience (Sabr) is one of the most emphasized virtues in the Quran. It involves remaining steadfast in the face of trials, persevering in worship, and restraining oneself from sin. Allah says: 'Indeed, Allah is with the patient.' (2:153). The reward for Sabr is **Paradise without account**, and it is a key to success in both worlds.",
  "gratitude": "Gratitude (Shukr) is the act of acknowledging and thanking Allah (SWT) for His infinite blessings. Allah promises: 'If you are grateful, I will surely increase you [in favor].' (14:7). A grateful heart is a content heart, and Shukr is expressed through the tongue, the heart, and by using Allah's blessings in ways that please Him.",
  "ramadan": "Ramadan is the **holiest month** in the Islamic calendar, the month in which the Quran was first revealed. It is a time of intense worship, fasting, charity, and community. The gates of Jannah are opened, the gates of Jahannam are closed, and the devils are chained. It is a spiritual boot camp designed to recharge a Muslim's Iman for the rest of the year.",
  "eid": "Islam has two main festivals: **Eid al-Fitr**, celebrated at the end of Ramadan, and **Eid al-Adha**, which commemorates the sacrifice of Prophet Ibrahim (AS). These are days of joy, gratitude, and community. We begin the day with a special prayer, give charity (Zakat al-Fitr), and share meals and gifts with family and the needy.",
  "prophet": "Prophet Muhammad (PBUH) is the **final Messenger** sent by Allah to all of humanity. He is the 'Seal of the Prophets' and a 'Mercy to the Worlds'. His life (Seerah) is the perfect example of character, leadership, and devotion. Following him is the path to attaining Allah's love and success in the hereafter.",
  "kaaba": "The Kaaba is the **House of Allah** in Mecca, the most sacred site in Islam. It is the Qibla (direction) that all Muslims face during their daily prayers, symbolizing the unity of the Ummah. It was originally built by Prophet Ibrahim (AS) and his son Ismail (AS) as the first house dedicated to the worship of the One True God.",
  "mecca": "Mecca is the **holiest city** in Islam, located in Saudi Arabia. It is the birthplace of Prophet Muhammad (PBUH) and the site of the Kaaba. Every year, millions of Muslims travel to Mecca for Hajj and Umrah, fulfilling a deep spiritual longing to visit the heart of the Islamic world.",
  "medina": "Medina is the second holiest city, known as **Al-Madinah al-Munawwarah** (The Radiant City). It is where the Prophet (PBUH) migrated (Hijrah), established the first Islamic community, and where he is buried in the **Prophet's Mosque** (Al-Masjid an-Nabawi). It is a place of immense peace and spiritual significance.",
  "hijab": "The Hijab is an act of **devotion and modesty** for Muslim women, commanded by Allah (SWT) in the Quran. It is a symbol of a woman's identity and her commitment to her faith. Beyond the physical headscarf, Hijab encompasses a woman's entire conduct and character, protecting her dignity and ensuring she is judged for her intellect and soul.",
  "jannah": "Jannah (Paradise) is the **eternal abode of peace** and joy promised to the righteous. It is described as having gardens beneath which rivers flow, and its inhabitants will have whatever their hearts desire. The greatest of all rewards in Jannah will be the honor of **beholding the Countenance of Allah (SWT)**.",
  "jahannam": "Jahannam (Hellfire) is the place of punishment in the hereafter for those who rejected faith and committed injustice. It is a **stern warning** from Allah (SWT) to humanity to stay on the path of truth. Seeking refuge from the Fire is a constant Dua of the believer, and Allah's mercy is always available for those who repent.",
  "angel": "Angels (Mala'ikah) are noble beings created by Allah (SWT) from light. They have no free will and **always obey Allah's commands**. Key angels include Jibril (who brought revelation), Mika'il (in charge of rain and sustenance), and Israfil (who will blow the trumpet on the Day of Judgment). Belief in angels is a pillar of Iman.",
  "sharia": "Sharia is the **Divine Law** of Islam, derived from the Quran and the Sunnah. It is not just a legal code but a comprehensive path that guides a Muslim in worship, ethics, and social conduct. The ultimate goal of Sharia is to promote **justice, mercy, and the common good** for all of humanity.",
  "ummah": "The Ummah is the **global community** of Muslims, united by their faith in Allah (SWT) and the Prophet (PBUH). It transcends all boundaries of race, language, and nationality. The Prophet (PBUH) described the Ummah as one body; if one part is in pain, the whole body feels it. This brotherhood is a core strength of Islam.",
  "caliph": "A Caliph (Khalifah) is a successor to the Prophet (PBUH) in his role as the political and spiritual leader of the Ummah. The first four Caliphs—Abu Bakr, Umar, Uthman, and Ali (RA)—are known as the **Rightly Guided Caliphs** (Al-Khulafa al-Rashidun) for their adherence to the Prophet's path and their just leadership.",
  "mosque": "A Mosque (Masjid) is a **place of prostration** and the center of Islamic life. It is where Muslims gather for the five daily prayers, the Friday sermon, and community learning. The most sacred mosques are Al-Masjid al-Haram in Mecca, Al-Masjid an-Nabawi in Medina, and Al-Masjid al-Aqsa in Jerusalem.",
  "imam": "An Imam is a leader who **leads the congregational prayer** and often serves as a spiritual guide and teacher for the community. In a broader sense, an Imam is a person of deep knowledge and piety who provides leadership and guidance based on the Quran and Sunnah.",
  "fatwa": "A Fatwa is a **scholarly legal opinion** given by a qualified Islamic scholar (Mufti) in response to a question about Islamic law. It helps Muslims understand how to apply the principles of the faith to specific situations or modern challenges, though it is generally not a binding law.",
  "jihad": "Jihad means **struggle** or striving in the path of Allah. The 'Greater Jihad' is the internal struggle against one's own desires and ego to stay righteous. The 'Lesser Jihad' refers to the physical struggle to defend the faith or the oppressed. Jihad is never about aggression; it is about establishing justice and truth.",
  "charity": "Charity (Sadaqah) is a voluntary act of giving that is highly encouraged in Islam. It is a sign of sincere faith and a means of **bringing Barakah** into one's life. The Prophet (PBUH) said: 'Sadaqah extinguishes sin as water extinguishes fire.' Even a smile or a kind word is considered Sadaqah.",
  "forgiveness": "Allah is **Al-Ghafur** (The All-Forgiving) and **Al-Afuww** (The Pardoner). No matter how many sins a person has committed, if they turn to Allah with sincere repentance, He will forgive them. Islam also encourages Muslims to be forgiving towards others, as we hope for Allah's forgiveness for ourselves.",
  "death": "In Islam, death is not the end but a **transition** from the temporary life of this world to the eternal life of the hereafter. It is a reminder to live a purposeful life and to prepare for the meeting with our Creator. The Prophet (PBUH) advised us to 'remember the destroyer of pleasures' (death) frequently.",
  "afterlife": "The Afterlife (Akhirah) is the **true and eternal life**. This world is a testing ground where our actions determine our station in the next. Belief in the Akhirah gives meaning to our struggles and ensures that ultimate justice will be served by Allah (SWT) on the Day of Judgment.",
  "judgment": "The Day of Judgment (Yawm al-Qiyamah) is the day when all of humanity will be resurrected and held **accountable for their deeds**. Every person will be given their book of deeds, and Allah (SWT) will judge with absolute justice and mercy. It is the day when the true successful ones will be revealed.",
  "mercy": "Mercy (Rahmah) is a defining attribute of Allah (SWT) and a core value for Muslims. Allah's mercy encompasses everything, and He has commanded us to be **merciful to all creation**. The Prophet (PBUH) said: 'Those who are merciful will be shown mercy by the Most Merciful.'",
  "knowledge": "Seeking knowledge (Ilm) is a **sacred duty** for every Muslim, man and woman. It is the path to recognizing Allah, understanding our purpose, and benefiting society. The Prophet (PBUH) said: 'Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.'",
  "honesty": "Honesty (Sidq) is a fundamental trait of a believer. The Prophet (PBUH) was known as **Al-Amin** (the Trustworthy) even before his prophethood. Islam teaches that truthfulness leads to righteousness, and righteousness leads to Paradise, while falsehood leads to wickedness and the Fire.",
  "justice": "Islam commands absolute justice (Adl), even if it is against oneself or one's loved ones. Allah says: 'O you who have believed, be persistently standing firm in justice.' (4:135). Justice is the **foundation of a healthy society** and a means of attaining the pleasure of the Almighty.",
  "brotherhood": "Islamic brotherhood (Ukhuwwah) is a bond of faith that is stronger than blood. Muslims are commanded to support one another, protect each other's honor, and **love for their brother** what they love for themselves. It is a source of strength and unity for the global Ummah.",
  "character": "Good character (Akhlaq) is the **fruit of faith**. The Prophet (PBUH) said: 'I was sent only to perfect good character.' On the Day of Judgment, nothing will be heavier on the scales than good manners. A Muslim's faith is reflected in how they treat others with kindness, respect, and integrity.",
  "intentions": "In Islam, the value of an action depends on the **intention (Niyyah)** behind it. The Prophet (PBUH) said: 'Actions are but by intentions.' A small deed done purely for the sake of Allah is far more valuable than a massive deed done for show or worldly gain. Sincerity (Ikhlas) is the key.",
  "trust": "Trust in Allah (Tawakkul) means putting one's full confidence in Allah's plan after having made the necessary effort. It is the **peace of mind** that comes from knowing that whatever Allah has decreed will happen, and whatever He has not decreed will never happen. It is the ultimate reliance on the Best of Disposers."
};

const INTENT_MAP: Record<string, string> = {
  "most beautiful ayah": "Many scholars and believers consider **Ayat al-Kursi** (The Throne Verse, 2:255) to be the most beautiful and powerful ayah in the Quran. It describes the absolute majesty and knowledge of Allah. Another deeply beloved ayah is from **Surah Az-Zumar (39:53)**: *'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins.'*",
  "beautiful verse": "One of the most heart-touching verses is from **Surah Ar-Rahman (55:13)**: *'So which of the favors of your Lord would you deny?'* This verse is repeated throughout the Surah as a reminder of Allah's infinite blessings upon us.",
  "how to pray": "Salah is performed in specific steps: **Niyyah** (intention), **Takbir** (Allahu Akbar), **Qiyam** (standing and reciting Fatiha), **Ruku** (bowing), **Sajdah** (prostration), and **Tashahhud** (sitting). For a complete visual guide, I recommend checking our **Ask & Learn** section or visiting a local mosque for practical learning.",
  "how to do wudu": "Wudu involves: 1. Washing hands, 2. Rinsing mouth, 3. Rinsing nose, 4. Washing face, 5. Washing arms to elbows, 6. Wiping head and ears, 7. Washing feet to ankles. Always start with **Bismillah**.",
  "what is islam": "Islam is the complete submission to the will of **Allah (SWT)**. It is built on five pillars: **Shahada** (Faith), **Salah** (Prayer), **Zakat** (Charity), **Sawm** (Fasting), and **Hajj** (Pilgrimage). It is a deen of peace, justice, and mercy for all of creation.",
  "who is muhammad": "Prophet Muhammad (PBUH) is the **final Messenger of Allah**. He was born in Mecca and received the revelation of the Quran. He is known as **Al-Amin** (the Trustworthy) and is the perfect role model for all humanity in character and conduct.",
  "why was i created": "Allah says in the Quran: *'And I did not create the jinn and mankind except to worship Me.'* (**Surah Adh-Dhariyat, 51:56**). Our purpose is to recognize our Creator, live according to His guidance, and return to Him with a pure heart.",
  "is music haram": "The ruling on music is a subject of scholarly discussion. Many scholars advise caution, especially if the content promotes vanity or neglect of remembrance of Allah. It is best to focus on the **recitation of the Quran**, which brings true peace to the heart.",
  "how to be a better muslim": "To improve your faith: 1. Be consistent in **Salah**, 2. Read the **Quran** with understanding, 3. Maintain **Good Character** (Akhlaq), 4. Seek **Knowledge**, and 5. Make constant **Dua** for guidance. Remember, Allah loves those who strive to improve.",
  "what is jannah": "Jannah is the **Eternal Paradise** promised to the believers. It is a place of infinite joy, where there is no pain, no sadness, and no death. The greatest reward in Jannah will be the **vision of Allah (SWT)**.",
  "who is allah": "Allah is the **One and Only God**, the Creator and Sustainer of the universe. In Islam, He is known by His **99 Beautiful Names**, such as Ar-Rahman (The Most Merciful) and Ar-Rahim (The Especially Merciful). He has no partners, no parents, and no children. He is the source of all peace, guidance, and mercy. **Subhanahu Wa Ta'ala** (Glorified and Exalted is He).",
  "tell me about allah": "Allah is the **One and Only God**, the Creator and Sustainer of the universe. In Islam, He is known by His **99 Beautiful Names**, such as Ar-Rahman (The Most Merciful) and Ar-Rahim (The Especially Merciful). He has no partners, no parents, and no children. He is the source of all peace, guidance, and mercy. **Subhanahu Wa Ta'ala** (Glorified and Exalted is He).",
  "tell me about quran": "The **Holy Quran** is the literal word of Allah, revealed to Prophet Muhammad (PBUH) through the Angel Jibril. It is a healing for the hearts, a guide for all of humanity, and the final revelation.",
  "what is the quran": "The **Holy Quran** is the literal word of Allah, revealed to Prophet Muhammad (PBUH) through the Angel Jibril. It is a healing for the hearts, a guide for all of humanity, and the final revelation.",
  "is smoking haram": "Many modern scholars have ruled that smoking is **Haram** (forbidden) or at least highly disliked (Makruh Tahrimi) because of the clear evidence of its severe harm to the body, which is a trust from Allah. Islam teaches us to protect our health and not to waste wealth on things that cause harm.",
  "how to convert to islam": "To convert to Islam, one must sincerely recite the **Shahada** (the testimony of faith): *'Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasulu Allah'* (I bear witness that there is no god but Allah, and I bear witness that Muhammad is the messenger of Allah). It is recommended to do this in the presence of witnesses at a mosque, but the sincere belief in the heart is what truly matters before Allah.",
  "what is the purpose of life": "The purpose of life in Islam is to **recognize and worship our Creator**, Allah (SWT), and to live according to His guidance to attain His pleasure and the eternal reward of Jannah. Allah says in the Quran: *'And I did not create the jinn and mankind except to worship Me.'* (51:56).",
  "meaning of islam": "The word Islam is derived from the Arabic root 'S-L-M,' which signifies peace, safety, and submission. In a religious context, it means the complete surrender of one’s will to Allah, the Creator of the universe. By submitting to the divine guidance of Allah, a person achieves internal peace and harmony with the world around them.",
  "allah has no partner": "The belief in the absolute oneness of Allah (Tawhid) is the foundation of Islam. If there were multiple gods, the universe would be in chaos due to conflicting wills. The harmony and precision of the universe are evidence of a single, consistent Designer. Attributing partners to Allah (Shirk) is the gravest sin.",
  "five pillars": "The Five Pillars are the core practices of Islam: 1. **Shahada** (Faith), 2. **Salah** (Prayer), 3. **Zakat** (Charity), 4. **Sawm** (Fasting), and 5. **Hajj** (Pilgrimage). They serve as the spiritual and practical foundation for a Muslim’s life.",
  "importance of salah": "Salah is the direct link between a Muslim and Allah. It serves as a spiritual recharge, a source of peace, and a reminder of our purpose in life. It is the second pillar of Islam and helps to purify the soul and prevent one from committing sins.",
  "how many times do muslims pray": "Muslims pray five times a day: Fajr (Dawn), Dhuhr (Noon), Asr (Afternoon), Maghrib (Sunset), and Isha (Night). These specific timings ensure that Allah is remembered throughout the entire day, weaving spirituality into the fabric of daily life.",
  "missed a prayer": "If a prayer is missed due to sleep or forgetfulness, it should be made up (Qada) as soon as it is remembered. The Prophet (PBUH) said that the 'debt' of prayer must be repaid. Intentionally skipping prayer is a serious spiritual neglect that requires sincere repentance.",
  "purpose of fasting": "Fasting (Sawm) during Ramadan aims to develop **Taqwa** (God-consciousness), self-control, and empathy for the less fortunate. By denying the body its basic needs, the believer learns to discipline their desires and strengthens their willpower.",
  "who must fast": "Fasting is mandatory for every healthy, adult Muslim. Exceptions are made for the sick, travelers, elderly, and women who are pregnant, nursing, or menstruating. Allah does not intend hardship; missed days can be made up later or compensated with Fidyah.",
  "what is zakat": "Zakat is a mandatory charitable contribution of 2.5% of one’s surplus wealth. It literally means 'purification' and 'growth.' It is a right of the poor over the wealthy, ensuring wealth circulates and supports the most vulnerable in society.",
  "how is zakat calculated": "Zakat is calculated as 2.5% of wealth that has been held for one lunar year and exceeds the **Nisab** (minimum threshold). It applies to cash, gold, silver, and business assets. It is a beautiful system of social security in Islam.",
  "meaning of hajj": "Hajj is the pilgrimage to the Kaaba in Mecca, performed during the month of Dhu al-Hijjah. it is the fifth pillar of Islam and is mandatory once in a lifetime for those who are physically and financially able. It symbolizes the unity of the Ummah and the equality of all humans before Allah.",
  "connect better with the quran": "To connect better with the Quran: 1. Read it with **Tadabbur** (reflection), 2. Listen to beautiful recitations, 3. Study the Tafsir (explanation), 4. Act upon its teachings, and 5. Make Dua for Allah to open your heart to its light.",
  "improve my character": "Improving character (Akhlaq) is central to faith. The Prophet (PBUH) said: 'I was sent only to perfect good character.' Focus on honesty, patience, kindness, and humility. Remember that your character is the heaviest thing on the scales on the Day of Judgment.",
  "find peace in difficult times": "In difficult times, find peace through: 1. **Dhikr** (remembrance of Allah), 2. **Salah**, 3. **Sabr** (patience), 4. **Dua**, and 5. Trusting in Allah's plan (**Tawakkul**). Allah says: 'Verily, in the remembrance of Allah do hearts find rest.' (13:28).",
  "what is sharia": "Sharia is the **Divine Path** and legal framework derived from the Quran and the Sunnah. It is designed to protect five essential human needs: **Faith, Life, Intellect, Lineage, and Property**. It is a system of justice, mercy, and wisdom that guides a Muslim in all aspects of life."
};

/**
 * Cleans up Wikipedia text to make it more faith-based and Islamic.
 */
const synthesizeIslamicResponse = (text: string): string => {
  let synthesized = text;
  
  // Remove overly academic/secular phrasing
  synthesized = synthesized.replace(/principally associated with Islam/gi, "the cornerstone of the Islamic faith");
  synthesized = synthesized.replace(/thought to be derived/gi, "understood in the light of the Quran and Sunnah");
  synthesized = synthesized.replace(/Arabic language term for God/gi, "the proper Name of the One True God, Allah (SWT)");
  synthesized = synthesized.replace(/specifically the monotheistic God of Abraham/gi, "the God of all the Prophets, from Adam (AS) to Muhammad (PBUH)");
  synthesized = synthesized.replace(/Abrahamic religions/gi, "the divine lineage of monotheism");
  synthesized = synthesized.replace(/principally associated with/gi, "the heart of");
  synthesized = synthesized.replace(/is a term used in/gi, "is a sacred concept in");
  synthesized = synthesized.replace(/refers to/gi, "beautifully encompasses");
  
  // Add Islamic honorifics and context
  synthesized = synthesized.replace(/Muhammad/g, "Prophet Muhammad (PBUH)");
  synthesized = synthesized.replace(/Allah/g, "Allah (SWT)");
  synthesized = synthesized.replace(/God/g, "Allah (SWT)");
  
  // Ensure the tone is respectful and conversational
  if (!synthesized.includes("Islam teaches")) {
    const intros = [
      "In the beautiful light of Islam, ",
      "According to the authentic teachings of our Deen, ",
      "As we learn from the Quran and the Sunnah, ",
      "Islam provides a comprehensive guide where "
    ];
    const randomIntro = intros[Math.floor(Math.random() * intros.length)];
    synthesized = randomIntro + synthesized.charAt(0).toLowerCase() + synthesized.slice(1);
  }

  // Add a concluding spiritual note if it's long
  if (synthesized.length > 200 && !synthesized.includes("Allah knows best")) {
    synthesized += "\n\nMay Allah (SWT) grant us the correct understanding and guide us all to the Straight Path. And Allah knows best.";
  }

  return synthesized;
};

const HADITH_COLLECTION: string[] = [
  "The Prophet Muhammad (PBUH) said: 'The best of you are those who are best to their families.' (Tirmidhi)",
  "The Prophet Muhammad (PBUH) said: 'None of you truly believes until he loves for his brother what he loves for himself.' (Bukhari & Muslim)",
  "The Prophet Muhammad (PBUH) said: 'A good word is charity.' (Bukhari & Muslim)",
  "The Prophet Muhammad (PBUH) said: 'Allah does not look at your appearances or your wealth, but He looks at your hearts and your actions.' (Muslim)",
  "The Prophet Muhammad (PBUH) said: 'The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger.' (Bukhari)",
  "The Prophet Muhammad (PBUH) said: 'Whoever believes in Allah and the Last Day should speak good or remain silent.' (Bukhari)",
  "The Prophet Muhammad (PBUH) said: 'Kindness is not found in anything except that it beautifies it, and it is not removed from anything except that it disgraces it.' (Muslim)",
  "The Prophet Muhammad (PBUH) said: 'The most beloved of deeds to Allah are those that are most consistent, even if they are small.' (Bukhari)",
  "The Prophet Muhammad (PBUH) said: 'Every religion has a character, and the character of Islam is modesty (Haya).' (Ibn Majah)",
  "The Prophet Muhammad (PBUH) said: 'Seek knowledge from the cradle to the grave.'",
  "The Prophet Muhammad (PBUH) said: 'The world is a prison for the believer and a paradise for the disbeliever.' (Muslim)",
  "The Prophet Muhammad (PBUH) said: 'Purity is half of faith.' (Muslim)",
  "The Prophet Muhammad (PBUH) said: 'The best among you is the one who learns the Quran and teaches it.' (Bukhari)",
  "The Prophet Muhammad (PBUH) said: 'He who does not show mercy to others, will not be shown mercy.' (Bukhari)",
  "The Prophet Muhammad (PBUH) said: 'The upper hand is better than the lower hand (the giving hand is better than the receiving hand).' (Bukhari)"
];

/**
 * Gathers information from free sources and local knowledge base.
 */
export const getFreeAiResponse = async (
  query: string, 
  lang: AppLanguage = 'en',
  history: { role: string, content: string }[] = []
): Promise<FreeAiResponse> => {
  const lowerQuery = query.toLowerCase().trim();
  const lastUserMessage = history.length > 0 ? history.filter(m => m.role === 'user').pop()?.content.toLowerCase() : "";
  const lastAiMessage = history.length > 0 ? history.filter(m => m.role === 'model').pop()?.content.toLowerCase() : "";

  // 1. Handle Memory/Context (Follow-ups and Corrections)
  const isCorrection = lowerQuery.includes("not those") || lowerQuery.includes("i said") || lowerQuery.includes("wrong") || lowerQuery.includes("instead") || lowerQuery.includes("incorrect");
  const isFollowUp = lowerQuery.length < 25 && (lowerQuery.includes("more") || lowerQuery.includes("elaborate") || lowerQuery.includes("why") || lowerQuery.includes("how") || lowerQuery.includes("tell me about it") || lowerQuery.includes("explain"));
  
  let contextualQuery = lowerQuery;

  if (isCorrection && lastUserMessage) {
    contextualQuery = lastUserMessage;
  } else if (isFollowUp && lastUserMessage) {
    // Combine current follow-up with previous topic
    contextualQuery = `${lastUserMessage} ${lowerQuery}`;
  }

  const DEEP_DIVE_PREFIX = "please provide more authentic islamic context and sources regarding this topic:";
  const isDeepDive = lowerQuery.startsWith(DEEP_DIVE_PREFIX);
  let deepDiveTopic = "";
  
  if (isDeepDive) {
    deepDiveTopic = lowerQuery.replace(DEEP_DIVE_PREFIX, "").trim();
    contextualQuery = deepDiveTopic;
  }

  // 2. Handle Normal Conversation
  if (!isDeepDive) {
    for (const [key, val] of Object.entries(CONVERSATION_MAP)) {
      if (lowerQuery === key || lowerQuery.startsWith(key + " ")) {
        return { content: val };
      }
    }
  }

  // 3. Handle Specific Intent Questions (Fuzzy matching)
  for (const [key, val] of Object.entries(INTENT_MAP)) {
    if (contextualQuery.includes(key)) {
      let content = val;
      if (isDeepDive) {
        content = `**DEEP DIVE: ${deepDiveTopic.toUpperCase()}**\n\nAccording to the authentic knowledge prepared within **UMMAH AI**, here is a comprehensive exploration of this topic:\n\n${val}\n\n**ADDITIONAL CONTEXT**\nIslam encourages us to look beyond the surface and understand the wisdom (Hikmah) behind every teaching. This topic is essential for a complete understanding of our Deen.`;
      }
      return { content };
    }
  }

  // 4. Handle "Tell me a Hadith" specifically
  if (contextualQuery.includes("hadith") && (lowerQuery.includes("tell me") || lowerQuery.includes("give me") || lowerQuery.includes("another") || isCorrection)) {
    const randomIndex = Math.floor(Math.random() * HADITH_COLLECTION.length);
    return { content: `**HADITH OF THE DAY**\n\n${HADITH_COLLECTION[randomIndex]}` };
  }

  // 5. Topic Filter - Check if it's Islamic
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

  // 4. Search Local Knowledge Base (More flexible matching)
  let localResult = "";
  const sortedKeys = Object.keys(KNOWLEDGE_BASE).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (lowerQuery.includes(key)) {
      localResult = KNOWLEDGE_BASE[key];
      break;
    }
  }

  // 5. Search Quran (Free API)
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

  // 6. Advanced Wikipedia Search (Try search first, then summary)
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

  // 7. Construct Final Response with Personality
  let content = "";
  
  const personalityIntros = [
    "Alhamdulillah, I have gathered some insights for you.",
    "It is my pleasure to share this knowledge with you.",
    "Based on the authentic sources I have access to, here is what I found:",
    "In the spirit of seeking knowledge, let's explore this topic together."
  ];
  const intro = personalityIntros[Math.floor(Math.random() * personalityIntros.length)];

  if (localResult && wikiResult) {
    content = `${intro}\n\n**${query.toUpperCase()}**\n\n${localResult}\n\n**DEEPER INSIGHTS**\n${wikiResult}`;
  } else if (localResult) {
    content = `${intro}\n\n**${query.toUpperCase()}**\n\n${localResult}`;
  } else if (wikiResult) {
    content = `${intro}\n\n**ISLAMIC PERSPECTIVE**\n\n${wikiResult}`;
  } else if (quranResult) {
    content = `${intro}\n\nI found a relevant verse from the Holy Quran regarding your query:`;
  } else {
    const foundKeywords = ISLAMIC_KEYWORDS.filter(k => lowerQuery.includes(k));
    if (foundKeywords.length > 0) {
      content = `${intro}\n\nRegarding **${foundKeywords[0].toUpperCase()}**, Islam teaches us to always seek the truth through the **Quran and Sunnah**. This topic is central to our faith and character. I recommend looking into the specific verses and hadiths related to this for a deeper understanding.`;
    } else {
      content = `I am **UMMAH AI**, and I am here to assist you with Islamic knowledge. While I don't have a specific detailed entry for that exact phrase, I can tell you that in Islam, we are encouraged to seek knowledge and act with **Ikhlas** (sincerity). \n\nWould you like to know about **Salah**, **Quran**, or perhaps the **Life of the Prophet (PBUH)**? I have extensive knowledge in those areas!`;
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
