import { Dua, AllahName } from './types';

export const PRIMARY_COLOR = '#047857';

export const SUPPORTED_LANGUAGES = [
  { id: 'en', name: 'English', native: 'English', edition: 'en.sahih' },
  { id: 'ar', name: 'Arabic', native: 'العربية', edition: 'ar.jalalayn' },
  { id: 'ur', name: 'Urdu', native: 'اردو', edition: 'ur.jalandhry' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', edition: 'bn.bengali' },
  { id: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', edition: 'id.indonesian' },
  { id: 'ms', name: 'Malay', native: 'Bahasa Melayu', edition: 'ms.melayu' },
  { id: 'tr', name: 'Turkish', native: 'Türkçe', edition: 'tr.diyanet' },
  { id: 'kk', name: 'Kazakh', native: 'Қазақша', edition: 'kk.kazakh' },
  { id: 'fa', name: 'Persian', native: 'فارسی', edition: 'fa.ayati' },
  { id: 'prs', name: 'Dari', native: 'دری', edition: 'fa.ahansaz' },
  { id: 'ps', name: 'Pashto', native: 'پښتو', edition: 'ps.abdulwali' },
  { id: 'ha', name: 'Hausa', native: 'Hausa', edition: 'ha.gumi' },
  { id: 'sw', name: 'Swahili', native: 'Kiswahili', edition: 'sw.barwani' },
  { id: 'wo', name: 'Wolof', native: 'Wolof', edition: 'ar.jalalayn' },
  { id: 'fr', name: 'French', native: 'Français', edition: 'fr.hamidullah' },
];

export const CALCULATION_METHODS = [
  { id: 1, name: "Karachi" },
  { id: 2, name: "ISNA" },
  { id: 3, name: "MWL" },
  { id: 4, name: "Umm Al-Qura" },
  { id: 5, name: "Egyptian" },
  { id: 8, name: "Gulf" },
  { id: 9, name: "Kuwait" },
  { id: 10, name: "Qatar" },
  { id: 11, name: "Singapore" },
  { id: 12, name: "France" },
  { id: 13, name: "Turkey" },
];

export const ASR_SCHOOLS = [
  { id: 0, name: "Standard (Shafi, Maliki, Hanbali)" },
  { id: 1, name: "Hanafi" }
];

export const ADHAN_VOICES = [
  { 
    id: 'makkah', 
    name: 'Makkah Al-Mukarramah', 
    reciter: 'Sheikh Ali Ahmed Mulla', 
    url: 'https://www.islamcan.com/audio/adhan/azan1.mp3',
    region: 'Saudi Arabia'
  },
  { 
    id: 'madinah', 
    name: 'Madinah Al-Munawwarah', 
    reciter: 'Sheikh Muhammad Surayhi', 
    url: 'https://www.islamcan.com/audio/adhan/azan2.mp3',
    region: 'Saudi Arabia'
  },
  { 
    id: 'egypt', 
    name: 'Al-Azhar Style', 
    reciter: 'Traditional Egyptian', 
    url: 'https://www.islamcan.com/audio/adhan/azan11.mp3',
    region: 'Egypt'
  },
  { 
    id: 'turkey', 
    name: 'Istanbul Style', 
    reciter: 'Traditional Turkish', 
    url: 'https://www.islamcan.com/audio/adhan/azan18.mp3',
    region: 'Turkey'
  }
];

export const ADHAN_PHRASES = [
  { arabic: "اللَّهُ أَكْبَرُ (x4)", english: "Allah is the Greatest (x4)", startPercent: 0, endPercent: 20 },
  { arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ (x2)", english: "I bear witness that there is no god but Allah (x2)", startPercent: 20, endPercent: 35 },
  { arabic: "أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ (x2)", english: "I bear witness that Muhammad is the Messenger of Allah (x2)", startPercent: 35, endPercent: 50 },
  { arabic: "حَيَّ عَلَى الصَّلَاةِ (x2)", english: "Hasten to the prayer (x2)", startPercent: 50, endPercent: 62 },
  { arabic: "حَيَّ عَلَى الْفَلَاحِ (x2)", english: "Hasten to the success (x2)", startPercent: 62, endPercent: 75 },
  { arabic: "الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ (x2)", english: "Prayer is better than sleep (x2)", startPercent: 75, endPercent: 88, fajrOnly: true },
  { arabic: "اللَّهُ أَكْبَرُ (x2)", english: "Allah is the Greatest (x2)", startPercent: 88, endPercent: 95 },
  { arabic: "لَا إِلَهَ إِلَّا اللَّهُ", english: "There is no god but Allah", startPercent: 95, endPercent: 100 }
];

export const DUAS: Dua[] = [
  // 🕌 DAILY & ESSENTIAL DUAS
  {
    id: 1,
    title: "Dua before sleeping",
    category: "Daily Life",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya.",
    translations: { en: "In Your name, O Allah, I die and I live." }
  },
  {
    id: 2,
    title: "Dua after waking up",
    category: "Daily Life",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilaihin-nushur.",
    translations: { en: "All praise is due to Allah who gave us life after He had given us death, and to Him is the resurrection." }
  },
  {
    id: 3,
    title: "Dua before entering the bathroom",
    category: "Daily Life",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    transliteration: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith.",
    translations: { en: "O Allah, I seek refuge in You from the male and female evil spirits." }
  },
  {
    id: 4,
    title: "Dua after leaving the bathroom",
    category: "Daily Life",
    arabic: "غُفْرَانَكَ",
    transliteration: "Ghufranak.",
    translations: { en: "I seek Your forgiveness." }
  },
  {
    id: 5,
    title: "Dua before wudu",
    category: "Daily Life",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah.",
    translations: { en: "In the name of Allah." }
  },
  {
    id: 6,
    title: "Dua after wudu",
    category: "Daily Life",
    arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    transliteration: "Ashhadu an la ilaha illallahu wahdahu la sharika lahu wa ashhadu anna Muhammadan 'abduhu wa Rasuluhu.",
    translations: { en: "I bear witness that there is no god but Allah alone, without partner, and I bear witness that Muhammad is His servant and Messenger." }
  },
  {
    id: 7,
    title: "Dua before eating",
    category: "Daily Life",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah.",
    translations: { en: "In the name of Allah." }
  },
  {
    id: 8,
    title: "Dua after eating",
    category: "Daily Life",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin.",
    translations: { en: "Praise be to Allah Who has fed us and given us drink and made us Muslims." }
  },
  {
    id: 9,
    title: "Dua when wearing clothes",
    category: "Daily Life",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration: "Alhamdu lillahil-ladhi kasani hadha (ath-thawba) wa razaqanihi min ghayri hawlin minni wala quwwah.",
    translations: { en: "Praise be to Allah who has clothed me with this (garment) and provided it for me, though I was powerless myself and had no strength." }
  },
  {
    id: 10,
    title: "Dua when seeing someone wearing new clothes",
    category: "Daily Life",
    arabic: "إِلْبَسْ جَدِيداً، وَعِشْ حَمِيداً، وَمُتْ شَهِيداً",
    transliteration: "Ilbas jadidan, wa 'ish hamidan, wa mut shahidan.",
    translations: { en: "Wear new clothes, live a praiseworthy life and die as a martyr." }
  },

  // 🌅 MORNING & EVENING DUAS
  {
    id: 11,
    title: "Morning remembrance (Adhkar)",
    category: "Morning & Evening",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah.",
    translations: { en: "We have reached the morning and at this very time unto Allah belongs all sovereignty, and all praise is for Allah." }
  },
  {
    id: 12,
    title: "Evening remembrance (Adhkar)",
    category: "Morning & Evening",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah.",
    translations: { en: "We have reached the evening and at this very time unto Allah belongs all sovereignty, and all praise is for Allah." }
  },
  {
    id: 13,
    title: "Ayat-ul-Kursi (morning & evening)",
    category: "Morning & Evening",
    arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...",
    transliteration: "Allahu la ilaha illa Huwal-Hayyul-Qayyum...",
    translations: { en: "Allah! There is no god but He, the Living, the Self-subsisting, Eternal..." }
  },
  {
    id: 14,
    title: "Surah Ikhlas (x3)",
    category: "Morning & Evening",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ...",
    transliteration: "Qul Huwallahu Ahad...",
    translations: { en: "Say: He is Allah, the One and Only..." }
  },
  {
    id: 15,
    title: "Surah Falaq (x3)",
    category: "Morning & Evening",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...",
    transliteration: "Qul a'udhu bi rabbil-falaq...",
    translations: { en: "Say: I seek refuge with the Lord of the Dawn..." }
  },
  {
    id: 16,
    title: "Surah Nas (x3)",
    category: "Morning & Evening",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ...",
    transliteration: "Qul a'udhu bi rabbin-nas...",
    translations: { en: "Say: I seek refuge with the Lord of Mankind..." }
  },

  // 🕌 SALAH & MASJID DUAS
  {
    id: 17,
    title: "Dua after Adhan",
    category: "Salah & Masjid",
    arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّداً الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَاماً مَحْمُوداً الَّذِي وَعَدْتَهُ",
    transliteration: "Allahumma Rabba hadhihid-da'watit-tammah, was-salatil-qa'imah, ati Muhammadan al-wasilata wal-fadhilah, wab'ath-hu maqaman mahmudanilladhi wa'adtah.",
    translations: { en: "O Allah, Lord of this perfect call and established prayer. Grant Muhammad the intercession and favor, and raise him to the honored station You have promised him." }
  },
  {
    id: 18,
    title: "Dua between Adhan & Iqamah",
    category: "Salah & Masjid",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
    transliteration: "Allahumma inni as'alukal-'afwa wal-'afiyah fid-dunya wal-akhirah.",
    translations: { en: "O Allah, I ask You for forgiveness and well-being in this world and the Hereafter." }
  },
  {
    id: 19,
    title: "Dua when entering the masjid",
    category: "Salah & Masjid",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahummaftah li abwaba rahmatik.",
    translations: { en: "O Allah, open the doors of Your mercy for me." }
  },
  {
    id: 20,
    title: "Dua when leaving the masjid",
    category: "Salah & Masjid",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    transliteration: "Allahumma inni as'aluka min fadhlika.",
    translations: { en: "O Allah, I ask for Your favor." }
  },
  {
    id: 21,
    title: "Dua after salah (Tasbih)",
    category: "Salah & Masjid",
    arabic: "سُبْحَانَ اللَّهِ (33) الْحَمْدُ لِلَّهِ (33) اللَّهُ أَكْبَرُ (33)",
    transliteration: "SubhanAllah (33), Alhamdulillah (33), Allahu Akbar (33).",
    translations: { en: "Glory be to Allah, Praise be to Allah, Allah is the Greatest." }
  },
  {
    id: 22,
    title: "Dua for concentration in prayer",
    category: "Salah & Masjid",
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "A'udhu billahi minash-shaytanir-rajim.",
    translations: { en: "I seek refuge in Allah from the accursed Satan." }
  },
  {
    id: 23,
    title: "Dua after witr",
    category: "Salah & Masjid",
    arabic: "سُبْحَانَ الْمَلِكِ الْقُدُّوسِ (x3)",
    transliteration: "Subhanal-Malikil-Quddus (x3).",
    translations: { en: "Glory be to the Sovereign, the Most Holy." }
  },

  // 🤲 FORGIVENESS & TAUBAH
  {
    id: 24,
    title: "Sayyidul Istighfar",
    category: "Forgiveness & Taubah",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ...",
    transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka...",
    translations: { en: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant..." }
  },
  {
    id: 25,
    title: "Dua for forgiveness of sins",
    category: "Forgiveness & Taubah",
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    transliteration: "Rabbi-ghfir li wa tub 'alayya innaka Antat-Tawwabur-Rahim.",
    translations: { en: "My Lord, forgive me and accept my repentance, for You are the Accepter of Repentance, the Merciful." }
  },
  {
    id: 26,
    title: "Dua for acceptance of repentance",
    category: "Forgiveness & Taubah",
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Rabbana taqabbal minna innaka Antas-Sami'ul-Alim.",
    translations: { en: "Our Lord, accept from us, for You are the All-Hearing, the All-Knowing." }
  },
  {
    id: 27,
    title: "Dua for mercy",
    category: "Forgiveness & Taubah",
    arabic: "رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَداً",
    transliteration: "Rabbana atina min ladunka rahmatan wa hayyi' lana min amrina rashada.",
    translations: { en: "Our Lord, grant us mercy from Yourself and provide for us right guidance in our affair." }
  },
  {
    id: 28,
    title: "Dua for protection from Hellfire",
    category: "Forgiveness & Taubah",
    arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَاماً",
    transliteration: "Rabbanash-rif 'anna 'adhaba jahannama inna 'adhabaha kana gharama.",
    translations: { en: "Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering." }
  },

  // 🛡️ PROTECTION DUAS
  {
    id: 29,
    title: "Dua for protection from evil eye",
    category: "Protection",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
    transliteration: "A'udhu bikalimatil-lahit-tammati min kulli shaytanin wa hammah, wa min kulli 'aynin lammah.",
    translations: { en: "I seek refuge in the perfect words of Allah from every devil and poisonous creature, and from every envious eye." }
  },
  {
    id: 30,
    title: "Dua for protection from Shaytan",
    category: "Protection",
    arabic: "رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوذُ بِكَ رَبِّ أَنْ يَحْضُرُونِ",
    transliteration: "Rabbi a'udhu bika min hamazatish-shayatin, wa a'udhu bika Rabbi ay-yahdhurun.",
    translations: { en: "My Lord, I seek refuge in You from the incitements of the devils, and I seek refuge in You, my Lord, lest they be present with me." }
  },
  {
    id: 31,
    title: "Dua for protection from harm",
    category: "Protection",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadhurru ma'as-mihi shay'un fil-ardhi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    translations: { en: "In the name of Allah, with whose name nothing can cause harm in the earth nor in the heavens, and He is the All-Hearing, the All-Knowing." }
  },
  {
    id: 32,
    title: "Dua for fear or anxiety",
    category: "Protection",
    arabic: "اللَّهُمَّ اكْفِنِيهِمْ بِمَا شِئْتَ",
    transliteration: "Allahummak-finihim bima shi'ta.",
    translations: { en: "O Allah, suffice me against them however You wish." }
  },
  {
    id: 33,
    title: "Dua for safety of family",
    category: "Protection",
    arabic: "اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي",
    transliteration: "Allahummah-fadhni min bayni yadayya wa min khalfi wa 'an yamini wa 'an shimali wa min fawqi.",
    translations: { en: "O Allah, protect me from my front and my back, and my right and my left, and from above me." }
  },
  {
    id: 34,
    title: "Dua before sleeping (protection version)",
    category: "Protection",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bikalimatil-lahit-tammati min sharri ma khalaq.",
    translations: { en: "I seek refuge in the perfect words of Allah from the evil of what He has created." }
  },

  // 👨‍👩‍👧 FAMILY & RELATIONSHIPS
  {
    id: 35,
    title: "Dua for parents",
    category: "Family & Relationships",
    arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيراً",
    transliteration: "Rabbi-rhamhuma kama rabbayani saghira.",
    translations: { en: "My Lord, have mercy upon them as they brought me up [when I was] small." }
  },
  {
    id: 36,
    title: "Dua for children",
    category: "Family & Relationships",
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَاماً",
    transliteration: "Rabbana hab lana min azwajina wa dhurriyatina qurrata a'yunin waj'alna lil-muttaqina imama.",
    translations: { en: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous." }
  },
  {
    id: 37,
    title: "Dua for spouse",
    category: "Family & Relationships",
    arabic: "اللَّهُمَّ بَارِكْ لِي فِي أَهْلِي وَبَارِكْ لَهُمْ فِيَّ",
    transliteration: "Allahumma barik li fi ahli wa barik lahum fiyya.",
    translations: { en: "O Allah, bless me in my family and bless them in me." }
  },
  {
    id: 38,
    title: "Dua for family unity",
    category: "Family & Relationships",
    arabic: "اللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا، وَأَصْلِحْ ذَاتَ بَيْنِنَا",
    transliteration: "Allahumma allif bayna qulubina, wa aslih dhata baynina.",
    translations: { en: "O Allah, join our hearts, and settle our disputes." }
  },
  {
    id: 39,
    title: "Dua for righteous offspring",
    category: "Family & Relationships",
    arabic: "رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
    transliteration: "Rabbi hab li min ladunka dhurriyatan tayyibatan innaka Sami'ud-du'a.",
    translations: { en: "My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication." }
  },

  // 😔 DIFFICULTY & HARD TIMES
  {
    id: 40,
    title: "Dua during hardship",
    category: "Difficulty & Hard Times",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
    transliteration: "Ya Hayyu Ya Qayyumu birahmatika astaghith.",
    translations: { en: "O Living, O Sustainer, by Your mercy I seek help." }
  },
  {
    id: 41,
    title: "Dua when feeling sad",
    category: "Difficulty & Hard Times",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحُزْنِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-huzn.",
    translations: { en: "O Allah, I seek refuge in You from anxiety and sorrow." }
  },
  {
    id: 42,
    title: "Dua for patience",
    category: "Difficulty & Hard Times",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْراً وَثَبِّتْ أَقْدَامَنَا",
    transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana.",
    translations: { en: "Our Lord, pour upon us patience and plant firmly our feet." }
  },
  {
    id: 43,
    title: "Dua for relief from stress",
    category: "Difficulty & Hard Times",
    arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa Anta subhanaka inni kuntu minadh-dhalimin.",
    translations: { en: "There is no god except You; exalted are You. Indeed, I have been of the wrongdoers." }
  },
  {
    id: 44,
    title: "Dua when facing injustice",
    category: "Difficulty & Hard Times",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal-wakil.",
    translations: { en: "Allah is sufficient for us, and He is the best Disposer of affairs." }
  },

  // 🌍 TRAVEL & DAILY LIFE
  {
    id: 45,
    title: "Dua before traveling",
    category: "Travel & Daily Life",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
    transliteration: "Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinina wa inna ila Rabbina lamunqalibun.",
    translations: { en: "Exalted is He who has subjected this to us, and we could not have [otherwise] subdued it. And indeed, to our Lord we will return." }
  },
  {
    id: 46,
    title: "Dua while traveling",
    category: "Travel & Daily Life",
    arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى",
    transliteration: "Allahumma inna nas'aluka fi safarina hadhal-birra wat-taqwa.",
    translations: { en: "O Allah, we ask You for righteousness and piety on this journey of ours." }
  },
  {
    id: 47,
    title: "Dua when returning home",
    category: "Travel & Daily Life",
    arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
    transliteration: "Ayibuna ta'ibuna 'abiduna liRabbina hamidun.",
    translations: { en: "We return, repenting, worshipping, and praising our Lord." }
  },
  {
    id: 48,
    title: "Dua for rain",
    category: "Travel & Daily Life",
    arabic: "اللَّهُمَّ أَغِثْنَا، اللَّهُمَّ أَغِثْنَا، اللَّهُمَّ أَغِثْنَا",
    transliteration: "Allahumma aghithna, Allahumma aghithna, Allahumma aghithna.",
    translations: { en: "O Allah, bless us with rain. O Allah, bless us with rain. O Allah, bless us with rain." }
  },
  {
    id: 49,
    title: "Dua during storms",
    category: "Travel & Daily Life",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا",
    transliteration: "Allahumma inni as'aluka khayraha, wa a'udhu bika min sharriha.",
    translations: { en: "O Allah, I ask You for its goodness and seek refuge in You from its evil." }
  },

  // 🤒 HEALTH & WELL-BEING
  {
    id: 50,
    title: "Dua for healing",
    category: "Health & Well-being",
    arabic: "أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ، وَاشْفِ أَنْتَ الشَّافِي",
    transliteration: "Adhhibil-ba'sa Rabban-nas, washfi Antash-Shafi.",
    translations: { en: "Remove the pain, O Lord of mankind, and grant healing, for You are the Healer." }
  },
  {
    id: 51,
    title: "Dua when visiting the sick",
    category: "Health & Well-being",
    arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
    transliteration: "La ba'sa tahurun in sha' Allah.",
    translations: { en: "No need to worry, this is a purification, if Allah wills." }
  },
  {
    id: 52,
    title: "Dua for protection from illness",
    category: "Health & Well-being",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ، وَالْجُنُونِ، وَالْجُذَامِ، وَمِنْ سَيِّئِ الْأَسْقَامِ",
    transliteration: "Allahumma inni a'udhu bika minal-barasi, wal-jununi, wal-judhami, wa min sayyi'il-asqam.",
    translations: { en: "O Allah, I seek refuge in You from vitiligo, madness, leprosy, and from all evil diseases." }
  },

  // 📖 QURANIC DUAS
  {
    id: 53,
    title: "Rabbana la tuzigh qulubana",
    category: "Quranic Duas",
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ",
    transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana min ladunka rahmatan innaka Antal-Wahhab.",
    translations: { en: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower." }
  },
  {
    id: 54,
    title: "Rabbana atina fid-dunya hasanah",
    category: "Quranic Duas",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
    translations: { en: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire." }
  },
  {
    id: 55,
    title: "Rabbighfir li waliwalidayya",
    category: "Quranic Duas",
    arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    transliteration: "Rabbighfir li wa li-walidayya wa lil-mu'minina yawma yaqumul-hisab.",
    translations: { en: "Our Lord, forgive me and my parents and the believers the Day the account is established." }
  },
  {
    id: 56,
    title: "Rabbishrah li sadri",
    category: "Quranic Duas",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    transliteration: "Rabbi-shrah li sadri wa yassir li amri.",
    translations: { en: "My Lord, expand for me my breast [with assurance] and ease for me my task." }
  },
  {
    id: 57,
    title: "Rabbi zidni ilma",
    category: "Quranic Duas",
    arabic: "رَبِّ زِدْنِي عِلْماً",
    transliteration: "Rabbi zidni 'ilma.",
    translations: { en: "My Lord, increase me in knowledge." }
  },
  {
    id: 58,
    title: "HasbiAllahu la ilaha illa Huwa",
    category: "Quranic Duas",
    arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    transliteration: "Hasbiyallahu la ilaha illa Huwa 'alayhi tawakkaltu wa Huwa Rabbul-'Arshil-'Azhim.",
    translations: { en: "Sufficient for me is Allah; there is no god but He. On Him I have relied, and He is the Lord of the Great Throne." }
  },

  // 🌙 RAMADAN & SPECIAL OCCASIONS
  {
    id: 59,
    title: "Dua for Laylatul Qadr",
    category: "Ramadan & Occasions",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allahumma innaka 'Afuwwun tuhibbul-'afwa fa'fu 'anni.",
    translations: { en: "O Allah, indeed You are Forgiving and love forgiveness, so forgive me." }
  },
  {
    id: 60,
    title: "Dua at iftar",
    category: "Ramadan & Occasions",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: "Dhahabadh-dhama'u wabtallatil-'uruqu, wa thabatal-ajru in sha' Allah.",
    translations: { en: "The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills." }
  },
  {
    id: 61,
    title: "Dua for acceptance of fasting",
    category: "Ramadan & Occasions",
    arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    transliteration: "Allahumma laka sumtu wa 'ala rizqika aftartu.",
    translations: { en: "O Allah, for You I have fasted and by Your provision I have broken my fast." }
  },
  {
    id: 62,
    title: "Dua for Eid",
    category: "Ramadan & Occasions",
    arabic: "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ",
    transliteration: "Taqabbalallahu minna wa minkum.",
    translations: { en: "May Allah accept [good deeds] from us and from you." }
  },

  // ☠️ AKHIRAH & DEATH
  {
    id: 63,
    title: "Dua for good ending (husn al-khatimah)",
    category: "Akhirah & Death",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُسْنَ الْخَاتِمَةِ",
    transliteration: "Allahumma inni as'aluka husnal-khatimah.",
    translations: { en: "O Allah, I ask You for a good end." }
  },
  {
    id: 64,
    title: "Dua for protection from grave punishment",
    category: "Akhirah & Death",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
    transliteration: "Allahumma inni a'udhu bika min 'adhabil-qabr.",
    translations: { en: "O Allah, I seek refuge in You from the punishment of the grave." }
  },
  {
    id: 65,
    title: "Dua for deceased Muslims",
    category: "Akhirah & Death",
    arabic: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا",
    transliteration: "Allahummagh-fir lihayyina wa mayyitina wa shahidina wa gha'ibina.",
    translations: { en: "O Allah, forgive our living and our dead, those of us who are present and those who are absent." }
  },

  // ❤️ GRATITUDE & CHARACTER
  {
    id: 66,
    title: "Dua for gratitude",
    category: "Gratitude & Character",
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ",
    transliteration: "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya.",
    translations: { en: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me." }
  },
  {
    id: 67,
    title: "Dua for humility",
    category: "Gratitude & Character",
    arabic: "اللَّهُمَّ اجْعَلْنِي فِي عَيْنِي صَغِيراً وَفِي أَعْيُنِ النَّاسِ كَبِيراً",
    transliteration: "Allahummaj-'alni fi 'ayni saghira wa fi a'yunin-nasi kabira.",
    translations: { en: "O Allah, make me small in my own eyes and great in the eyes of people." }
  },
  {
    id: 68,
    title: "Dua for sincerity",
    category: "Gratitude & Character",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
    transliteration: "Allahumma inni a'udhu bika an ushrika bika wa ana a'lamu, wa astaghfiruka lima la a'lamu.",
    translations: { en: "O Allah, I seek refuge in You from knowingly associating partners with You, and I seek Your forgiveness for what I do not know." }
  },
  {
    id: 69,
    title: "Dua for guidance",
    category: "Gratitude & Character",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina.",
    translations: { en: "O Allah, I ask You for guidance, piety, chastity and self-sufficiency." }
  },
  {
    id: 70,
    title: "Dua for steadfast faith",
    category: "Gratitude & Character",
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    transliteration: "Ya Muqallibal-qulubi thabbit qalbi 'ala dinik.",
    translations: { en: "O Turner of hearts, keep my heart firm upon Your religion." }
  },
  // Adding more to reach ~80
  {
    id: 71,
    title: "Dua for Rizq (Provision)",
    category: "Daily Life",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    transliteration: "Allahummak-fini bihalalika 'an haramika, wa aghnini bifadhlika 'amman siwak.",
    translations: { en: "O Allah, suffice me with Your lawful against Your unlawful, and make me independent of all besides You." }
  },
  {
    id: 72,
    title: "Dua for protection from debt",
    category: "Daily Life",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ...",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazani...",
    translations: { en: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice..." }
  },
  {
    id: 73,
    title: "Dua for ease in every matter",
    category: "Difficulty & Hard Times",
    arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلاً وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً",
    transliteration: "Allahumma la sahla illa ma ja'altahu sahlan wa Anta taj'alul-hazna idha shi'ta sahlan.",
    translations: { en: "O Allah, there is no ease except what You make easy, and You make the difficulty easy if You will." }
  },
  {
    id: 74,
    title: "Dua when visiting a graveyard",
    category: "Akhirah & Death",
    arabic: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ...",
    transliteration: "Assalamu 'alaykum ahlad-diyari minal-mu'minina wal-muslimina...",
    translations: { en: "Peace be upon you, O people of the dwellings, from among the believers and the Muslims..." }
  },
  {
    id: 75,
    title: "Dua for the night of Jummah",
    category: "Morning & Evening",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
    transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad.",
    translations: { en: "O Allah, send blessings upon Muhammad and the family of Muhammad." }
  },
  {
    id: 76,
    title: "Dua for successful business",
    category: "Daily Life",
    arabic: "اللَّهُمَّ بَارِكْ لِي فِيمَا رَزَقْتَنِي",
    transliteration: "Allahumma barik li fima razaqtani.",
    translations: { en: "O Allah, bless me in what You have provided for me." }
  },
  {
    id: 77,
    title: "Dua when sneezing",
    category: "Daily Life",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah.",
    translations: { en: "All praise is for Allah." }
  },
  {
    id: 78,
    title: "Dua response to sneeze",
    category: "Daily Life",
    arabic: "يَرْحَمُكَ اللَّهُ",
    transliteration: "YarhamukAllah.",
    translations: { en: "May Allah have mercy on you." }
  },
  {
    id: 79,
    title: "Dua for increasing barakah",
    category: "Daily Life",
    arabic: "اللَّهُمَّ أَكْثِرْ مَالِي، وَوَلَدِي، وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي",
    transliteration: "Allahumma akthir mali, wa waladi, wa barik li fima a'taytani.",
    translations: { en: "O Allah, increase my wealth and my children, and bless me in what You have given me." }
  },
  {
    id: 80,
    title: "Dua for protection from fitna",
    category: "Protection",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
    transliteration: "Allahumma inni a'udhu bika min fitnatil-mahya wal-mamat.",
    translations: { en: "O Allah, I seek refuge in You from the trials of life and death." }
  }
];

export const HADITHS = [
  {
    category: "Intention",
    text: "Actions are judged by intentions, and every person will get what they intended.",
    source: "Sahih Bukhari & Muslim",
  },
  {
    category: "Character",
    text: "The best among you are those who have the best manners and character.",
    source: "Sahih Bukhari",
  },
  {
    category: "Mercy",
    text: "The Merciful One shows mercy to those who are merciful. Be merciful to those on earth, and the One in the heavens will be merciful to you.",
    source: "Sunan At-Tirmidhi",
  },
  {
    category: "Knowledge",
    text: "Seeking knowledge is an obligation upon every Muslim.",
    source: "Sunan Ibn Majah",
  },
  {
    category: "Cleanliness",
    text: "Cleanliness is half of faith.",
    source: "Sahih Muslim",
  },
  {
    category: "Social Life",
    text: "None of you truly believes until he loves for his brother what he loves for himself.",
    source: "Sahih Bukhari",
  },
  {
    category: "Gentleness",
    text: "Allah is gentle and He loves gentleness. He rewards for gentleness what He does not reward for harshness.",
    source: "Sahih Muslim",
  },
  {
    category: "Forgiveness",
    text: "Wealth does not decrease by giving in charity, and Allah increases a servant in honor when he forgives others.",
    source: "Sahih Muslim",
  },
  {
    category: "Dua",
    text: "Dua is the essence of worship.",
    source: "Sunan At-Tirmidhi",
  },
  {
    category: "Parents",
    text: "Paradise lies under the feet of mothers.",
    source: "Sunan An-Nasa'i",
  }
];

export const ALLAH_NAMES: AllahName[] = [
  { number: 1, name: "ٱلرَّحْمَٰنُ", transliteration: "Ar-Rahman", translation: "The Most Merciful", description: "The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter." },
  { number: 2, name: "ٱلرَّحِيمُ", transliteration: "Ar-Rahim", translation: "The Especially Merciful", description: "The One who has plenty of mercy for the believers." },
  { number: 3, name: "ٱلْمَلِكُ", transliteration: "Al-Malik", translation: "The King", description: "The One with complete Dominion, the One Whose Dominion is clear from imperfection." },
  { number: 4, name: "ٱلْقُدُّوسُ", transliteration: "Al-Quddus", translation: "The Most Holy", description: "The One who is pure from any imperfection and clear from children and adversaries." },
  { number: 5, name: "ٱلسَّلَامُ", transliteration: "As-Salam", translation: "The Source of Peace", description: "The One who is free from every imperfection." },
  { number: 6, name: "ٱلْمُؤْمِنُ", transliteration: "Al-Mu'min", translation: "The Giver of Faith", description: "The One who witnessed for Himself that no one is God but Him. And He witnessed for His believers that they are truthful in their belief that no one is God but Him." },
  { number: 7, name: "ٱلْمُهَيْمِنُ", transliteration: "Al-Muhaymin", translation: "The Guardian", description: "The One who witnesses the saying and deeds of His creatures." },
  { number: 8, name: "ٱلْعَزِيزُ", transliteration: "Al-Aziz", translation: "The Almighty", description: "The Defeater who is not defeated." },
  { number: 9, name: "ٱلْجَبَّارُ", transliteration: "Al-Jabbar", translation: "The Compeller", description: "The One that nothing happens in His Dominion except that which He willed." },
  { number: 10, name: "ٱلْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", translation: "The Supreme", description: "The One who is clear from the attributes of the creatures and from resembling them." },
  { number: 11, name: "ٱلْخَالِقُ", transliteration: "Al-Khaliq", translation: "The Creator", description: "The One who brings everything from non-existence to existence." },
  { number: 12, name: "ٱلْبَارِئُ", transliteration: "Al-Bari'", translation: "The Evolver", description: "The Maker who creates without a model." },
  { number: 13, name: "ٱلْمُصَوِّرُ", transliteration: "Al-Musawwir", translation: "The Fashioner", description: "The One who forms His creatures in different pictures." },
  { number: 14, name: "ٱلْغَفَّارُ", transliteration: "Al-Ghaffar", translation: "The Constant Forgiver", description: "The One who forgives the sins of His slaves time and time again." },
  { number: 15, name: "ٱلْقَهَّارُ", transliteration: "Al-Qahhar", translation: "The All-Prevailing", description: "The One who has the perfect power and is not unable over anything." },
  { number: 16, name: "ٱلْوَهَّابُ", transliteration: "Al-Wahhab", translation: "The Supreme Bestower", description: "The One who is Generous in giving plenty without a return." },
  { number: 17, name: "ٱلرَّزَّاقُ", transliteration: "Ar-Razzaq", translation: "The Provider", description: "The Provider, the Sustainer." },
  { number: 18, name: "ٱلْفَتَّاحُ", transliteration: "Al-Fattah", translation: "The Supreme Solver", description: "The One who opens for His slaves the closed worldly and religious matters." },
  { number: 19, name: "ٱلْعَلِيمُ", transliteration: "Al-Alim", translation: "The All-Knowing", description: "The Knowledgeable; The One nothing is absent from His knowledge." },
  { number: 20, name: "ٱلْقَابِضُ", transliteration: "Al-Qabid", translation: "The Withholder", description: "The One who constricts the sustenance by His wisdom and expands it by His Generosity and Mercy." },
  { number: 21, name: "ٱلْبَاسِطُ", transliteration: "Al-Basit", translation: "The Extender", description: "The One who expands and multiplies." },
  { number: 22, name: "ٱلْخَافِضُ", transliteration: "Al-Khafid", translation: "The Reducer", description: "The One who lowers whoever He willed by His Destruction and raises whoever He willed by His Endowment." },
  { number: 23, name: "ٱلرَّافِعُ", transliteration: "Ar-Rafi", translation: "The Exalter", description: "The One who raises the status of those who are close to Him." },
  { number: 24, name: "ٱلْمُعِزُّ", transliteration: "Al-Mu'izz", translation: "The Bestower of Honor", description: "He gives esteem to whoever He willed, hence there is no one to degrade Him." },
  { number: 25, name: "ٱلْمُذِلُّ", transliteration: "Al-Mudhill", translation: "The Humiliator", description: "He degrades whoever He willed, hence there is no one to give him esteem." },
  { number: 26, name: "ٱلسَّمِيعُ", transliteration: "As-Sami", translation: "The All-Hearing", description: "The One who Hears all things that are heard by His Eternal Hearing without an ear, instrument or condition." },
  { number: 27, name: "ٱلْبَصِيرُ", transliteration: "Al-Basir", translation: "The All-Seeing", description: "The One who Sees all things that are seen by His Eternal Sight without a pupil or any other instrument." },
  { number: 28, name: "ٱلْحَكَمُ", transliteration: "Al-Hakam", translation: "The Impartial Judge", description: "He is the Ruler and His judgment is His Word." },
  { number: 29, name: "ٱلْعَدْلُ", transliteration: "Al-Adl", translation: "The Utterly Just", description: "The One who is entitled to do what He does." },
  { number: 30, name: "ٱللَّطِيفُ", transliteration: "Al-Latif", translation: "The Subtle One", description: "The One who is kind to His creatures and bestows on them their needs." },
  { number: 31, name: "ٱلْخَبِيرُ", transliteration: "Al-Khabir", translation: "The All-Aware", description: "The One who knows the truth of things." },
  { number: 32, name: "ٱلْحَلِيمُ", transliteration: "Al-Halim", translation: "The Most Forbearing", description: "The One who delays the punishment for those who deserve it and then He might forgive them." },
  { number: 33, name: "ٱلْعَظِيمُ", transliteration: "Al-Azim", translation: "The Magnificent", description: "The One deserving the attributes of Exaltation, Glory, Extolment, and Purity from all imperfection." },
  { number: 34, name: "ٱلْغَفُورُ", transliteration: "Al-Ghafur", translation: "The Great Forgiver", description: "The One who forgives a lot." },
  { number: 35, name: "ٱلشَّكُورُ", transliteration: "Ash-Shakur", translation: "The Most Appreciative", description: "The One who gives a lot of reward for a little obedience." },
  { number: 36, name: "ٱلْعَلِيُّ", transliteration: "Al-Ali", translation: "The Most High", description: "The One who is clear from the attributes of the creatures, and is High above everything." },
  { number: 37, name: "ٱلْكَبِيرُ", transliteration: "Al-Kabir", translation: "The Most Great", description: "The One who is greater than everything in status." },
  { number: 38, name: "ٱلْحَفِيظُ", transliteration: "Al-Hafiz", translation: "The Preserver", description: "The One who protects whatever He willed to protect." },
  { number: 39, name: "ٱلْمُقِيتُ", transliteration: "Al-Muqit", translation: "The Sustainer", description: "The One who gives the creatures their sustenance." },
  { number: 40, name: "ٱلْحَسِيبُ", transliteration: "Al-Hasib", translation: "The Reckoner", description: "The One who gives the satisfaction." },
  { number: 41, name: "ٱلْجَلِيلُ", transliteration: "Al-Jalil", translation: "The Majestic", description: "The One who is attributed with greatness of Power and Glory of status." },
  { number: 42, name: "ٱلْكَرِيمُ", transliteration: "Al-Karim", translation: "The Most Generous", description: "The One who is clear from abasement." },
  { number: 43, name: "ٱلرَّقِيبُ", transliteration: "Ar-Raqib", translation: "The Watchful", description: "The One that nothing is absent from Him." },
  { number: 44, name: "ٱلْمُجِيبُ", transliteration: "Al-Mujib", translation: "The Responsive One", description: "The One who answers the one in need if he asks Him and rescues the yearner if he calls upon Him." },
  { number: 45, name: "ٱلْوَاسِعُ", transliteration: "Al-Wasi", translation: "The All-Encompassing", description: "The Knowledgeable." },
  { number: 46, name: "ٱلْحَكِيمُ", transliteration: "Al-Hakim", translation: "The All-Wise", description: "The One who is correct in His doings." },
  { number: 47, name: "ٱلْوَدُودُ", transliteration: "Al-Wadud", translation: "The Most Loving", description: "The One who loves His believing slaves and His believing slaves love Him." },
  { number: 48, name: "ٱلْمَجِيدُ", transliteration: "Al-Majid", translation: "The Glorious", description: "The One who is with perfect Power, High Status, Compassion, Generosity, and Kindness." },
  { number: 49, name: "ٱلْبَاعِثُ", transliteration: "Al-Ba'ith", translation: "The Resurrector", description: "The One who resurrects for reward and punishment." },
  { number: 50, name: "ٱلشَّهِيدُ", transliteration: "Ash-Shahid", translation: "The All-Observing Witness", description: "The One who nothing is absent from His knowledge." },
  { number: 51, name: "ٱلْحَقُّ", transliteration: "Al-Haqq", translation: "The Absolute Truth", description: "The One who truly exists." },
  { number: 52, name: "ٱلْوَكِيلُ", transliteration: "Al-Wakil", translation: "The Trustee", description: "The One who gives the satisfaction and is relied upon." },
  { number: 53, name: "ٱلْقَوِيُّ", transliteration: "Al-Qawi", translation: "The All-Strong", description: "The One with the complete Power." },
  { number: 54, name: "ٱلْمَتِينُ", transliteration: "Al-Matin", translation: "The Firm", description: "The One with extreme Power which is un-interrupted and He does not get tired." },
  { number: 55, name: "ٱلْوَلِيُّ", transliteration: "Al-Wali", translation: "The Protecting Associate", description: "The Supporter." },
  { number: 56, name: "ٱلْحَمِيدُ", transliteration: "Al-Hamid", translation: "The Praiseworthy", description: "The praised One who deserves to be praised." },
  { number: 57, name: "ٱلْمُحْصِي", transliteration: "Al-Muhsi", translation: "The All-Enumerating", description: "The One who the count of things are known to him." },
  { number: 58, name: "ٱلْمُبْدِئُ", transliteration: "Al-Mubdi'", translation: "The Originator", description: "The One who started the human." },
  { number: 59, name: "ٱلْمُعِيدُ", transliteration: "Al-Mu'id", translation: "The Restorer", description: "The One who brings back the creatures after death." },
  { number: 60, name: "ٱلْمُحْيِي", transliteration: "Al-Muhyi", translation: "The Giver of Life", description: "The One who took out a living human from semen." },
  { number: 61, name: "ٱلْمُمِيتُ", transliteration: "Al-Mumit", translation: "The Bringer of Death", description: "The One who renders the living dead." },
  { number: 62, name: "ٱلْحَيُّ", transliteration: "Al-Hayy", translation: "The Ever-Living", description: "The One who is attributed with a life that is unlike our life." },
  { number: 63, name: "ٱلْقَيُّومُ", transliteration: "Al-Qayyum", translation: "The Self-Sustaining", description: "The One who remains and does not end." },
  { number: 64, name: "ٱلْوَاجِدُ", transliteration: "Al-Wajid", translation: "The Perceiver", description: "The Rich who is never poor." },
  { number: 65, name: "ٱلْمَاجِدُ", transliteration: "Al-Majid", translation: "The Illustrious", description: "The One who is with perfect Power, High Status, Compassion, Generosity, and Kindness." },
  { number: 66, name: "ٱلْوَاحِدُ", transliteration: "Al-Wahid", translation: "The Sole One", description: "The One without a partner." },
  { number: 67, name: "ٱلْأَحَدُ", transliteration: "Al-Ahad", translation: "The Unique", description: "The Individual." },
  { number: 68, name: "ٱلصَّمَدُ", transliteration: "As-Samad", translation: "The Eternal", description: "The Master who is relied upon in matters and reverted to in ones needs." },
  { number: 69, name: "ٱلْقَادِرُ", transliteration: "Al-Qadir", translation: "The Capable", description: "The One who is attributed with Power." },
  { number: 70, name: "ٱلْمُقْتَدِرُ", transliteration: "Al-Muqtadir", translation: "The All-Authoritative", description: "The One with the perfect Power." },
  { number: 71, name: "ٱلْمُقَدِّمُ", transliteration: "Al-Muqaddim", translation: "The Expediter", description: "The One who puts things in their right places." },
  { number: 72, name: "ٱلْمُؤَخِّرُ", transliteration: "Al-Mu'akhkhir", translation: "The Delayer", description: "The One who delays whatever He willed." },
  { number: 73, name: "ٱلْأَوَّلُ", transliteration: "Al-Awwal", translation: "The First", description: "The One whose Existence is without a beginning." },
  { number: 74, name: "ٱلْآخِرُ", transliteration: "Al-Akhir", translation: "The Last", description: "The One whose Existence is without an end." },
  { number: 75, name: "ٱلظَّاهِرُ", transliteration: "Az-Zahir", translation: "The Manifest", description: "The One that nothing is above Him and nothing is underneath Him." },
  { number: 76, name: "ٱلْبَاطِنُ", transliteration: "Al-Batin", translation: "The Hidden One", description: "The One that nothing is underneath Him." },
  { number: 77, name: "ٱلْوَالِي", transliteration: "Al-Wali", translation: "The Governor", description: "The One who owns things and manages them." },
  { number: 78, name: "ٱلْمُتَعَالِي", transliteration: "Al-Muta'ali", translation: "The Self Exalted", description: "The One who is clear from the attributes of the creatures." },
  { number: 79, name: "ٱلْبَرُّ", transliteration: "Al-Barr", translation: "The Source of All Goodness", description: "The One who is kind to His creatures." },
  { number: 80, name: "ٱلتَّوَّابُ", transliteration: "At-Tawwab", translation: "The Ever-Relenting", description: "The One who grants repentance to whoever He willed among His creatures and accepts his repentance." },
  { number: 81, name: "ٱلْمُنْتَقِمُ", transliteration: "Al-Muntaqim", translation: "The Avenger", description: "The One who victoriously prevails over His enemies." },
  { number: 82, name: "ٱلْعَفُوُّ", transliteration: "Al-Afuww", translation: "The Pardoner", description: "The One with wide forgiveness." },
  { number: 83, name: "ٱلرَّؤُوفُ", transliteration: "Ar-Ra'uf", translation: "The Most Kind", description: "The One with extreme Mercy." },
  { number: 84, name: "مَالِكُ ٱلْمُلْكِ", transliteration: "Malik-ul-Mulk", translation: "The King of Sovereignty", description: "The One who owes the Dominion and rules in His Kingdom." },
  { number: 85, name: "ذُو ٱلْجَلَالِ وَٱلْإِكْرَامِ", transliteration: "Dhul-Jalali wal-Ikram", translation: "The Lord of Majesty and Generosity", description: "The One who deserves to be Exalted and not denied." },
  { number: 86, name: "ٱلْمُقْسِطُ", transliteration: "Al-Muqsit", translation: "The Equitable", description: "The One who is Just in His judgment." },
  { number: 87, name: "ٱلْجَامِعُ", transliteration: "Al-Jami", translation: "The Gatherer", description: "The One who gathers the creatures on a day that there is no doubt about." },
  { number: 88, name: "ٱلْغَنِيُّ", transliteration: "Al-Ghani", translation: "The Self-Sufficient", description: "The One who does not need the creatures." },
  { number: 89, name: "ٱلْمُغْنِي", transliteration: "Al-Mughni", translation: "The Enricher", description: "The One who satisfies the necessities of the creatures." },
  { number: 90, name: "ٱلْمَانِعُ", transliteration: "Al-Mani", translation: "The Withholder", description: "The One who prevents." },
  { number: 91, name: "ٱلضَّارُّ", transliteration: "Ad-Darr", translation: "The Distresser", description: "The One who makes harm reach to whoever He willed." },
  { number: 92, name: "ٱلنَّافِعُ", transliteration: "An-Nafi", translation: "The Propitious", description: "The One who makes good reach to whoever He willed." },
  { number: 93, name: "ٱلنُّورُ", transliteration: "An-Nur", translation: "The Light", description: "The One who guides." },
  { number: 94, name: "ٱلْهَادِي", transliteration: "Al-Hadi", translation: "The Guide", description: "The One whom with His Guidance His believers were guided." },
  { number: 95, name: "ٱلْبَدِيعُ", transliteration: "Al-Badi", translation: "The Incomparable", description: "The One who created the creatures and designed them without any preceding example." },
  { number: 96, name: "ٱلْبَاقِي", transliteration: "Al-Baqi", translation: "The Ever-Surviving", description: "The One that the state of non-existence is impossible for Him." },
  { number: 97, name: "ٱلْوَارِثُ", transliteration: "Al-Warith", translation: "The Inheritor", description: "The One whose Existence remains." },
  { number: 98, name: "ٱلرَّشِيدُ", transliteration: "Ar-Rashid", translation: "The Guide to the Right Path", description: "The One who guides." },
  { number: 99, name: "ٱلصَّبُورُ", transliteration: "As-Sabur", translation: "The Most Patient", description: "The One who does not quickly punish the sinners." }
];