import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, BookOpen, Star, Sparkles, MessageSquareQuote, Shield, Globe, History, Info } from 'lucide-react';

interface ProphetStory {
  id: string;
  name: string;
  arabicName: string;
  lineage: string;
  timePeriod: string;
  location: string;
  nation: string;
  mission: string;
  miracles: string[];
  events: string[];
  opposition: string;
  lessons: string[];
  quranRefs: string;
  hadithRefs?: string;
}

const PROPHETS_DATA: ProphetStory[] = [
  {
    id: '1',
    name: 'Adam',
    arabicName: 'آدم',
    lineage: 'Created from clay, father of mankind.',
    timePeriod: 'Beginning of creation.',
    location: 'Earth (various locations cited).',
    nation: 'All of humanity.',
    mission: 'To worship Allah alone and inhabit the earth as His stewards.',
    // Fixed: miracles assigned as string[]
    miracles: ["Creation by Allah's hands", "Knowledge of all names"],
    events: ['Creation in Paradise', 'The prostration of angels', 'Temptation by Iblis', 'Descent to Earth', 'Repentance and forgiveness'],
    opposition: 'Iblis (Satan), the first to disobey.',
    lessons: ['The necessity of repentance', 'Avoiding arrogance', 'Allah\'s mercy'],
    quranRefs: 'Al-Baqarah: 30-38, Al-A\'raf: 11-25',
    hadithRefs: 'Sahih Bukhari (Creation of Adam)'
  },
  {
    id: '2',
    name: 'Idris',
    arabicName: 'إدريس',
    lineage: 'Grandson of Seth, direct descendant of Adam.',
    timePeriod: 'Before Nuh (AS).',
    location: 'Ancient Mesopotamia / Egypt.',
    nation: 'Followers of Prophet Seth.',
    mission: 'To restore monotheism and civilize society through knowledge.',
    // Fixed: miracles assigned as string[]
    miracles: ['Vast knowledge of writing', 'Sewing', 'Astronomy'],
    events: ['Raised to a high station', 'Development of scholarly writing', 'Teaching agriculture'],
    opposition: 'Ignorant segments of early humanity.',
    lessons: ['Importance of education', 'Diligence in work', 'Elevated status of the knowledgeable'],
    quranRefs: 'Maryam: 56-57, Al-Anbiya: 85',
  },
  {
    id: '3',
    name: 'Nuh (Noah)',
    arabicName: 'نوح',
    lineage: 'Son of Lamech, direct descendant of Idris.',
    timePeriod: 'Approx. 3900-2900 BC.',
    location: 'Ancient Mesopotamia (Iraq).',
    nation: 'The people of Nuh who worshipped idols.',
    mission: 'To warn against idol worship and call to the Oneness of Allah.',
    // Fixed: miracles assigned as string[]
    miracles: ['The Great Ark', 'Enduring the flood'],
    events: ['Preaching for 950 years', 'Building the Ark', 'The Great Flood', 'Opposition from his own son'],
    opposition: 'The arrogant elite who mocked his message.',
    lessons: ['Unyielding patience', 'Trust in Allah\'s command', 'Consequences of disbelief'],
    quranRefs: 'Surah Nuh, Al-Mu\'minun: 23-30',
  },
  {
    id: '4',
    name: 'Hud',
    arabicName: 'هود',
    lineage: 'Descendant of Nuh.',
    timePeriod: 'Approx. 2400 BC.',
    location: 'Al-Ahqaf (Southern Arabia).',
    nation: 'The people of \'Ad.',
    mission: 'To warn the powerful and arrogant \'Ad against their pride.',
    // Fixed: miracles assigned as string[]
    miracles: ['Protection from the destructive wind'],
    events: ['The warnings to \'Ad', 'The three-year drought', 'The destructive seven-night wind storm'],
    opposition: 'The wealthy elite who built grand pillars.',
    lessons: ['Wealth does not equate to success', 'Gratitude to the Provider', 'Patience in dawah'],
    quranRefs: 'Surah Hud: 50-60, Al-A\'raf: 65-72',
  },
  {
    id: '5',
    name: 'Salih',
    arabicName: 'صالح',
    lineage: 'Descendant of Nuh.',
    timePeriod: 'Approx. 2100 BC.',
    location: 'Al-Hijr (Mada\'in Salih, Saudi Arabia).',
    nation: 'The people of Thamud.',
    mission: 'To call the skilled builders of Thamud back to Allah.',
    // Fixed: miracles assigned as string[]
    miracles: ['The miraculous She-Camel emerging from stone'],
    events: ['The miracle of the camel', 'The killing of the camel', 'The sudden blast of punishment'],
    opposition: 'The nine evil men of the city.',
    lessons: ['Sanctity of Allah\'s signs', 'Rejection of corruption', 'Unity in righteousness'],
    quranRefs: 'Al-A\'raf: 73-79, Hud: 61-68',
  },
  {
    id: '6',
    name: 'Ibrahim (Abraham)',
    arabicName: 'إبراهيم',
    lineage: 'Son of Azar, Khalilullah (Friend of Allah).',
    timePeriod: 'Approx. 1900 BC.',
    location: 'Ur (Iraq), Harran (Turkey), Palestine, Makkah.',
    nation: 'People of King Nimrod.',
    mission: 'To re-establish pure monotheism across nations.',
    // Fixed: miracles assigned as string[]
    miracles: ['Surviving the fire', 'The revival of birds', 'Providing water in desert (Zamzam)'],
    events: ['Confrontation with Nimrod', 'The great migration', 'The sacrifice of Ismail', 'Building the Kaaba'],
    opposition: 'Nimrod, his own father Azar.',
    lessons: ['Total submission', 'Unshakable logic', 'Friendship with Allah'],
    quranRefs: 'Al-Baqarah: 124-129, Al-An\'am: 74-83',
  },
  {
    id: '7',
    name: 'Lut (Lot)',
    arabicName: 'لوط',
    lineage: 'Nephew of Prophet Ibrahim.',
    timePeriod: 'Approx. 1900 BC.',
    location: 'Sodom and Gomorrah (Dead Sea region).',
    nation: 'The people of Sodom.',
    mission: 'To warn against extreme immorality and indecency.',
    // Fixed: miracles assigned as string[]
    miracles: ['Angelic protection during the mob attack'],
    events: ['Migration with Ibrahim', 'The arrival of angels', 'Destruction of the sinful cities'],
    opposition: 'The corrupt masses, including his own wife.',
    lessons: ['Moral integrity', 'Avoiding bad company', 'Justice for the innocent'],
    quranRefs: 'Al-A\'raf: 80-84, Hud: 77-83',
  },
  {
    id: '8',
    name: 'Ismail (Ishmael)',
    arabicName: 'إسماعيل',
    lineage: 'Eldest son of Ibrahim.',
    timePeriod: 'Approx. 1850 BC.',
    location: 'Makkah, Hijaz.',
    nation: 'Tribes of Arabia (Jurhum).',
    mission: 'To assist his father and establish worship in Makkah.',
    // Fixed: miracles assigned as string[]
    miracles: ['Zamzam well', 'The replacement of sacrifice with a ram'],
    events: ['Left in the valley of Makkah', 'The dream of sacrifice', 'Building the Kaaba'],
    opposition: 'Difficult environment and loneliness.',
    lessons: ['Patience of the youth', 'Legacy of faith', 'Dutifulness to parents'],
    quranRefs: 'Al-Baqarah: 125-127, Maryam: 54-55',
  },
  {
    id: '9',
    name: 'Ishaq (Isaac)',
    arabicName: 'إسحاق',
    lineage: 'Second son of Ibrahim.',
    timePeriod: 'Approx. 1850 BC.',
    location: 'Palestine, Hebron.',
    nation: 'The people of Canaan.',
    mission: 'To continue the legacy of monotheism in the Levant.',
    // Fixed: miracles assigned as string[]
    miracles: ['Miraculous birth to aged parents (Ibrahim and Sarah)'],
    events: ['Birth announced by angels', 'Spiritual leadership of the Israelites'],
    opposition: 'Neighboring idolaters.',
    lessons: ['Allah\'s promise is true', 'Continuity of guidance', 'Family righteousness'],
    quranRefs: 'Al-An\'am: 84, Hud: 71-73',
  },
  {
    id: '10',
    name: 'Yaqub (Jacob)',
    arabicName: 'يعقوب',
    lineage: 'Son of Ishaq, grandson of Ibrahim (Israel).',
    timePeriod: 'Approx. 1800 BC.',
    location: 'Palestine.',
    nation: 'The Children of Israel (Bani Isra\'il).',
    mission: 'To guide his twelve sons and the early Israelites.',
    // Fixed: miracles assigned as string[]
    miracles: ['Prophetic vision and restoration of sight'],
    events: ['Grief over Yusuf', 'Migration to Egypt', 'Final advice to his sons'],
    opposition: 'Internal family discord and external pagan tribes.',
    lessons: ['Beautiful patience (Sabrun Jameel)', 'Parental love', 'Unity in faith'],
    quranRefs: 'Surah Yusuf, Al-Baqarah: 132-133',
  },
  {
    id: '11',
    name: 'Yusuf (Joseph)',
    arabicName: 'يوسف',
    lineage: 'Son of Yaqub, great-grandson of Ibrahim.',
    timePeriod: 'Approx. 1750 BC.',
    location: 'Palestine and Egypt.',
    nation: 'The Egyptians.',
    mission: 'To call to monotheism through character and economic wisdom.',
    // Fixed: miracles assigned as string[]
    miracles: ['Interpretation of dreams', 'Extraordinary beauty'],
    events: ['Betrayal by brothers', 'Life as a slave', 'Temptation and prison', 'Treasury management of Egypt'],
    opposition: 'His brothers, the wife of the Aziz.',
    lessons: ['Forgiveness of enemies', 'Chastity under pressure', 'Allah\'s plan over man\'s plot'],
    quranRefs: 'Surah Yusuf',
  },
  {
    id: '12',
    name: 'Shu‘ayb',
    arabicName: 'شعيب',
    lineage: 'Descendant of Midian, son of Ibrahim.',
    timePeriod: 'Approx. 1500 BC.',
    location: 'Madyan (Midian), near Aqaba.',
    nation: 'People of Midian and the Dwellers of the Wood.',
    mission: 'To warn against commercial fraud and corruption.',
    // Fixed: miracles assigned as string[]
    miracles: ['Eloquent preaching (the Orator of the Prophets)'],
    events: ['Warnings about fair weights', 'The earthquake punishment', 'Meeting with Musa (AS)'],
    opposition: 'The greedy merchants and arrogant leaders.',
    lessons: ['Economic justice', 'Honesty in business', 'Fear of Allah in dealings'],
    quranRefs: 'Al-A\'raf: 85-93, Hud: 84-95',
  },
  {
    id: '13',
    name: 'Ayyub (Job)',
    arabicName: 'أيوب',
    lineage: 'Descendant of Ibrahim.',
    timePeriod: 'Approx. 1400 BC.',
    location: 'Hauran region (Syria/Jordan).',
    nation: 'His tribe and family.',
    mission: 'To demonstrate absolute patience and gratitude under trial.',
    // Fixed: miracles assigned as string[]
    miracles: ['Healing via the miraculous spring'],
    events: ['Loss of wealth and children', 'Severe illness for years', 'Final restoration of all blessings'],
    opposition: 'The whispers of Shaytan trying to break his spirit.',
    lessons: ['Steadfastness in health and sickness', 'Gratitude in hardship', 'The power of dua'],
    quranRefs: 'Al-Anbiya: 83-84, Sad: 41-44',
  },
  {
    id: '14',
    name: 'Dhul-Kifl',
    arabicName: 'ذو الكفل',
    lineage: 'Often cited as the son of Ayyub.',
    timePeriod: 'Unknown (Pre-Israelite kings).',
    location: 'Ancient Iraq/Levant.',
    nation: 'The people of his region.',
    mission: 'To judge with absolute fairness and fulfill every covenant.',
    // Fixed: miracles assigned as string[]
    miracles: ['Extraordinary self-discipline and consistency'],
    events: ['Upholding a vow of justice', 'Leading his people righteously'],
    opposition: 'Temptations to break his high moral standards.',
    lessons: ['Integrity of word', 'Fairness in leadership', 'Commitment to promises'],
    quranRefs: 'Al-Anbiya: 85, Sad: 48',
  },
  {
    id: '15',
    name: 'Musa (Moses)',
    arabicName: 'موسى',
    lineage: 'Son of Amram, Kalimullah (The one spoken to by Allah).',
    timePeriod: 'Approx. 1300 BC.',
    location: 'Egypt, Sinai, Midian.',
    nation: 'Pharaoh and the Children of Israel.',
    mission: 'To liberate the Israelites and deliver the Torah.',
    // Fixed: miracles assigned as string[]
    miracles: ['The staff turning to a snake', 'The glowing hand', 'Splitting the sea'],
    events: ['Found in the river', 'Burning bush', 'Contest with magicians', 'The Exodus'],
    opposition: 'Pharaoh, Haman, Qarun.',
    lessons: ['Standing against tyranny', 'Confidence in Allah\'s help', 'Law and order'],
    quranRefs: 'Surah Taha, Al-Qasas, Al-Baqarah',
  },
  {
    id: '16',
    name: 'Harun (Aaron)',
    arabicName: 'هارون',
    lineage: 'Elder brother of Musa.',
    timePeriod: 'Approx. 1300 BC.',
    location: 'Egypt, Sinai.',
    nation: 'Pharaoh and the Children of Israel.',
    mission: 'To assist Musa (AS) with his eloquence and leadership.',
    // Fixed: miracles assigned as string[]
    miracles: ["Participated in Musa's great signs"],
    events: ['Appointment as a prophet by Musa\'s request', 'Incident of the Golden Calf'],
    opposition: 'Pharaoh and the rebellious Samiri.',
    lessons: ['Supportive brotherhood', 'Eloquence in dawah', 'Unity of the community'],
    quranRefs: 'Taha: 29-36, Maryam: 53',
  },
  {
    id: '17',
    name: 'Dawud (David)',
    arabicName: 'داود',
    lineage: 'Descendant of Judah, son of Ishaq.',
    timePeriod: 'Approx. 1000 BC.',
    location: 'Palestine/Jerusalem.',
    nation: 'The Israelites.',
    mission: 'To rule with justice and provide the Zabur (Psalms).',
    // Fixed: miracles assigned as string[]
    miracles: ['Melting iron with hands', 'Mountains singing with him', 'Killing Goliath'],
    events: ['Victory over Goliath', 'Kingship of Israel', 'Recording the Zabur'],
    opposition: 'Goliath (Jalut) and his army.',
    lessons: ['Worship and work balance', 'Justice in power', 'Softness of heart'],
    quranRefs: 'Al-Anbiya: 78-80, Sad: 17-26',
  },
  {
    id: '18',
    name: 'Sulayman (Solomon)',
    arabicName: 'سليمان',
    lineage: 'Son of Dawud.',
    timePeriod: 'Approx. 950 BC.',
    location: 'Palestine/Jerusalem.',
    nation: 'The Israelites and Jinn.',
    mission: 'To rule the greatest kingdom on earth with divine wisdom.',
    // Fixed: miracles assigned as string[]
    miracles: ['Control over wind', 'Understanding animals', 'Commanding jinn'],
    events: ['Building the Temple', 'Meeting the Queen of Sheba', 'The judgment of two mothers'],
    opposition: 'Spiritual trials and rebellious jinn.',
    lessons: ['Wisdom in judgment', 'Wealth as a tool for Allah', 'Humility in greatness'],
    quranRefs: 'Al-Anbiya: 81-82, An-Naml: 15-44',
  },
  {
    id: '19',
    name: 'Ilyas (Elijah)',
    arabicName: 'إلياس',
    lineage: 'Descendant of Harun (AS).',
    timePeriod: 'Approx. 850 BC.',
    location: 'Baalbek (Lebanon).',
    nation: 'People of Baalbek.',
    mission: 'To warn against the worship of the idol Baal.',
    // Fixed: miracles assigned as string[]
    miracles: ['Endurance in the desert', 'Answered prayers for rain'],
    events: ['Confrontation with King Ahab', 'Destruction of the idol Baal'],
    opposition: 'The ruling king and queen of his time.',
    lessons: ['Fearlessness in truth', 'Purity of worship', 'Rejection of superstition'],
    quranRefs: 'As-Saffat: 123-132, Al-An\'am: 85',
  },
  {
    id: '20',
    name: 'Al-Yasa (Elisha)',
    arabicName: 'اليسع',
    lineage: 'Companion and successor to Ilyas (AS).',
    timePeriod: 'Approx. 800 BC.',
    location: 'Israel/Palestine.',
    nation: 'The Israelites.',
    mission: 'To maintain the law of the Torah after Ilyas.',
    // Fixed: miracles assigned as string[]
    miracles: ['Succession of prophetic authority'],
    events: ['Continuation of the work of Ilyas'],
    opposition: 'Persistent idolaters among the Israelites.',
    lessons: ['Continuity of leadership', 'Loyalty to mentors', 'Steadfast guidance'],
    quranRefs: 'Al-An\'am: 86, Sad: 48',
  },
  {
    id: '21',
    name: 'Yunus (Jonah)',
    arabicName: 'يونس',
    lineage: 'Dhan-Nun (The Man of the Fish).',
    timePeriod: 'Approx. 750 BC.',
    location: 'Nineveh (Mosul, Iraq).',
    nation: 'The people of Nineveh.',
    mission: 'To call the Assyrians to monotheism.',
    // Fixed: miracles assigned as string[]
    miracles: ['Surviving in the belly of a whale'],
    events: ['Departure from Nineveh', 'The casting of lots', 'Life in the whale', 'Repentance of his entire nation'],
    opposition: 'The stubborn inhabitants of Nineveh (initially).',
    lessons: ['Never lose hope in people', 'Allah hears the distressed', 'Patience with duty'],
    quranRefs: 'Surah Yunus, As-Saffat: 139-148',
  },
  {
    id: '22',
    name: 'Zakariyya (Zechariah)',
    arabicName: 'زكريا',
    lineage: 'Descendant of Sulayman (AS).',
    timePeriod: '1st Century BC.',
    location: 'Jerusalem.',
    nation: 'The Israelites.',
    mission: 'To maintain the service of the Sanctuary and guide people.',
    // Fixed: miracles assigned as string[]
    miracles: ['Miraculous birth of a son in extreme old age'],
    events: ['Guardian of Maryam', 'Dua for a successor', 'The silence miracle'],
    opposition: 'Corrupt religious elite.',
    lessons: ['Persistence in prayer', 'Guardian responsibilities', 'Trust in Allah\'s timing'],
    quranRefs: 'Al-Imran: 37-41, Maryam: 2-11',
  },
  {
    id: '23',
    name: 'Yahya (John)',
    arabicName: 'يحيى',
    lineage: 'Son of Zakariyya.',
    timePeriod: '1st Century AD.',
    location: 'Palestine/Jordan.',
    nation: 'The Israelites.',
    mission: 'To prepare the way for Isa (AS) and call for moral reform.',
    // Fixed: miracles assigned as string[]
    miracles: ['Profound wisdom and piety as a child'],
    events: ['Ascetic lifestyle', 'Witness to the truth against kings'],
    opposition: 'King Herod and the corrupt court.',
    lessons: ['Integrity of character', 'Compassion for the poor', 'Sacrifice for truth'],
    quranRefs: 'Maryam: 12-15, Al-Imran: 39',
  },
  {
    id: '24',
    name: 'Isa (Jesus)',
    arabicName: 'عيسى',
    lineage: 'Son of Maryam, Ruhullah (Spirit of Allah).',
    timePeriod: '1st Century AD.',
    location: 'Palestine (Nazareth/Jerusalem).',
    nation: 'The Children of Israel.',
    mission: 'To confirm the Torah and bring the Injeel (Gospel).',
    // Fixed: miracles assigned as string[]
    miracles: ['Miraculous birth', 'Speaking in cradle', 'Healing the blind', 'Raising the dead'],
    events: ['Sermon on the Mount', 'The Last Supper (Table from Heaven)', 'Raised to heaven'],
    opposition: 'Corrupt religious authorities (Pharisees).',
    lessons: ['Mercy and love', 'Detachment from the world', 'Allah\'s absolute power'],
    quranRefs: 'Surah Maryam, Al-Imran, Al-Ma\'idah',
  },
  {
    id: '25',
    name: 'Muhammad ﷺ',
    arabicName: 'محمد',
    lineage: 'Son of Abdullah, descendant of Ismail.',
    timePeriod: '570 - 632 AD.',
    location: 'Makkah, Madinah.',
    nation: 'All of humanity.',
    mission: 'To deliver the final revelation (Quran) and perfect human character.',
    // Fixed: miracles assigned as string[]
    miracles: ['The Holy Quran', 'Splitting the moon', 'Night journey (Isra/Mi\'raj)'],
    events: ['The Cave of Hira', 'The Hijrah', 'Battle of Badr', 'Conquest of Makkah', 'The Farewell Sermon'],
    opposition: 'The chiefs of Quraysh and enemies of Islam.',
    lessons: ['Perfected character', 'Mercy to the worlds', 'Steadfastness in monotheism'],
    quranRefs: 'Surah Al-Ahzab, Muhammad, Al-Fath, and throughout',
    hadithRefs: 'Complete corpus of Sahih Hadith'
  }
];

interface ProphetStoriesProps {
  onAskAgent?: (query: string) => void;
}

const ProphetStories: React.FC<ProphetStoriesProps> = ({ onAskAgent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProphet, setSelectedProphet] = useState<ProphetStory | null>(null);

  const filteredProphets = useMemo(() => {
    return PROPHETS_DATA.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.arabicName.includes(searchQuery)
    );
  }, [searchQuery]);

  const handleProphetClick = (p: ProphetStory) => {
    setSelectedProphet(p);
    if (navigator.vibrate) navigator.vibrate(10);
  };

  if (selectedProphet) {
    return (
      <div className="flex flex-col bg-ummah-bg-light dark:bg-ummah-bg-dark h-full overflow-y-auto green-scrollbar animate-in slide-in-from-right duration-300">
        <div className="p-4 sticky top-0 bg-white/90 dark:bg-ummah-bg-dark/90 backdrop-blur-md z-20 flex items-center justify-between border-b border-black/5 dark:border-white/5">
           <button 
            onClick={() => setSelectedProphet(null)}
            className="flex items-center gap-1.5 text-ummah-icon-active-light font-bold text-[10px] uppercase tracking-widest"
           >
             <ChevronLeft size={16} /> Back to Library
           </button>
           <h4 className="text-[10px] font-black text-ummah-gold uppercase tracking-widest">Story {selectedProphet.id} of 25</h4>
        </div>

        <div className="p-8 pb-32 space-y-12">
           <div className="text-center space-y-3">
              <p className="arabic-text text-5xl text-ummah-icon-active-light dark:text-ummah-icon-active-dark drop-shadow-sm mb-4">
                {selectedProphet.arabicName}
              </p>
              <h2 className="premium-header text-3xl font-black text-ummah-text-light dark:text-ummah-text-dark leading-none tracking-tight">
                Prophet {selectedProphet.name}
              </h2>
              <div className="h-1 w-12 bg-ummah-gold mx-auto rounded-full opacity-40"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoBox icon={User} label="Lineage" content={selectedProphet.lineage} />
              <InfoBox icon={History} label="Time Period" content={selectedProphet.timePeriod} />
              <InfoBox icon={Globe} label="Location" content={selectedProphet.location} />
              <InfoBox icon={Shield} label="Nation Sent To" content={selectedProphet.nation} />
           </div>

           <div className="space-y-4">
              <SectionHeader icon={Star} label="Main Mission" />
              <div className="p-6 bg-white dark:bg-ummah-card-dark rounded-3xl border border-black/5 dark:border-white/5 shadow-soft">
                <p className="text-sm font-medium text-ummah-text-light dark:text-ummah-text-secondary-dark leading-relaxed">
                  {selectedProphet.mission}
                </p>
              </div>
           </div>

           <div className="space-y-4">
              <SectionHeader icon={Sparkles} label="Major Miracles" />
              <div className="grid gap-3">
                {selectedProphet.miracles.map((m, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-ummah-mint dark:bg-emerald-500/5 rounded-2xl border border-ummah-icon-active-light/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-ummah-icon-active-light mt-1.5 shrink-0"></div>
                    <span className="text-sm font-bold text-ummah-text-light/80 dark:text-ummah-text-dark">{m}</span>
                  </div>
                ))}
              </div>
           </div>

           <div className="space-y-4">
              <SectionHeader icon={BookOpen} label="Major Events" />
              <div className="grid gap-3">
                {selectedProphet.events.map((e, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-white dark:bg-ummah-card-dark rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0">{i+1}</div>
                    <span className="text-sm font-medium text-ummah-text-light/80 dark:text-ummah-text-dark leading-snug">{e}</span>
                  </div>
                ))}
              </div>
           </div>

           <div className="space-y-4">
              <SectionHeader icon={Info} label="Opposition Faced" />
              <div className="p-6 bg-rose-50 dark:bg-rose-950/10 rounded-3xl border border-rose-500/10">
                <p className="text-sm font-medium text-rose-700 dark:text-rose-400 leading-relaxed italic">
                  {selectedProphet.opposition}
                </p>
              </div>
           </div>

           <div className="space-y-4">
              <SectionHeader icon={MessageSquareQuote} label="Lessons for Us Today" />
              <div className="grid gap-4">
                {selectedProphet.lessons.map((l, i) => (
                  <div key={i} className="flex gap-5 p-6 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-3xl items-start shadow-soft">
                    <div className="mt-1 text-ummah-icon-active-light dark:text-ummah-icon-active-dark shrink-0">
                      <ChevronRight size={20} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-black text-ummah-text-light/90 dark:text-ummah-text-dark leading-relaxed uppercase tracking-tight">{l}</span>
                  </div>
                ))}
              </div>
           </div>

           <div className="p-8 bg-ummah-mint/30 dark:bg-ummah-icon-active-dark/5 rounded-[3rem] border border-ummah-icon-active-light/5 space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-ummah-icon-active-light" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ummah-icon-active-light">Quranic References</span>
              </div>
              <p className="text-xs font-bold text-ummah-text-light/60 dark:text-ummah-text-secondary-dark leading-relaxed italic">
                {selectedProphet.quranRefs}
              </p>
              {selectedProphet.hadithRefs && (
                 <div className="pt-4 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                       <MessageSquareQuote size={18} className="text-ummah-gold" />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ummah-gold">Hadith References</span>
                    </div>
                    <p className="text-xs font-bold text-ummah-text-light/60 dark:text-ummah-text-secondary-dark leading-relaxed italic">
                       {selectedProphet.hadithRefs}
                    </p>
                 </div>
              )}
           </div>

           <button 
             onClick={() => onAskAgent?.(`Can you give me a more detailed narrative of the life of Prophet ${selectedProphet.name} (AS) including more stories from authentic Tafsir and historical context?`)}
             className="w-full flex items-center justify-center gap-4 py-6 bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark text-white rounded-[2.5rem] text-[11px] font-black uppercase tracking-widest shadow-premium hover:shadow-glow transition-all active:scale-95"
           >
             <Sparkles size={20} />
             Learn More with Ummah AI
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto green-scrollbar bg-ummah-bg-light dark:bg-ummah-bg-dark transition-colors relative p-8">
      <div className="flex justify-between items-start mb-8 animate-fade-up">
        <div>
          <h1 className="premium-header text-4xl font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tight leading-none">Prophets</h1>
          <p className="text-[10px] font-black text-ummah-gold uppercase tracking-[0.4em] mt-3">25 Stories of Excellence</p>
        </div>
        <div className="p-4 bg-white dark:bg-ummah-card-dark rounded-3xl shadow-premium border border-black/5 dark:border-white/5">
           <BookOpen className="text-ummah-icon-active-light" size={24} />
        </div>
      </div>

      <div className="mb-8 relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-ummah-icon-inactive-light group-focus-within:text-ummah-icon-active-light transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Search by Name..."
          className="w-full pl-16 pr-6 py-4 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-[2rem] focus:ring-4 focus:ring-ummah-mint outline-none transition-all shadow-soft text-sm font-medium text-ummah-text-light dark:text-ummah-text-dark"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 pb-32">
        {filteredProphets.map(p => (
          <button 
            key={p.id}
            onClick={() => handleProphetClick(p)}
            className="flex items-center justify-between p-6 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-[2.5rem] shadow-soft hover:shadow-premium hover:border-ummah-icon-active-light/20 transition-all text-left group overflow-hidden relative"
          >
             <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-ummah-mint dark:bg-white/5 flex items-center justify-center text-sm font-black text-ummah-icon-active-light shrink-0 group-hover:scale-110 transition-transform">
                   {p.id}
                </div>
                <div>
                   <h4 className="font-black text-lg text-ummah-text-light dark:text-ummah-text-dark leading-none">{p.name}</h4>
                   <p className="arabic-text text-2xl text-ummah-gold opacity-60 group-hover:opacity-100 transition-opacity mt-1">{p.arabicName}</p>
                </div>
             </div>
             <ChevronRight className="text-ummah-icon-inactive-light group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Utility Components
const InfoBox = ({ icon: Icon, label, content }: any) => (
  <div className="p-6 bg-white dark:bg-ummah-card-dark rounded-3xl border border-black/5 dark:border-white/5 shadow-soft flex flex-col gap-3">
    <div className="flex items-center gap-2 text-ummah-icon-active-light dark:text-ummah-icon-active-dark">
      <Icon size={14} />
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-xs font-bold text-ummah-text-light/70 dark:text-ummah-text-secondary-dark leading-relaxed">{content}</p>
  </div>
);

const SectionHeader = ({ icon: Icon, label }: any) => (
  <div className="flex items-center gap-3 px-2">
    <div className="p-2.5 bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark rounded-xl text-white shadow-premium">
      <Icon size={16} />
    </div>
    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-ummah-icon-active-light dark:text-ummah-icon-active-dark">{label}</span>
  </div>
);

// Lucide Icons Fallback for static usage
const User = (props: any) => <History {...props} />; // Mock

export default ProphetStories;