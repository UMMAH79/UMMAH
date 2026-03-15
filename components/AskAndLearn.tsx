import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Info,
  ArrowRight,
  Filter,
  X,
  MessageSquareQuote
} from 'lucide-react';
import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: '1',
    title: 'What is the meaning of Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Islam is an Arabic word meaning submission, surrender, and obedience to the will of Allah. It also shares a root with the word "Salam," meaning peace.',
    longAnswer: 'The word Islam is derived from the Arabic root "S-L-M," which signifies peace, safety, and submission. In a religious context, it means the complete surrender of one’s will to Allah, the Creator of the universe. By submitting to the divine guidance of Allah, a person achieves internal peace and harmony with the world around them. Islam is not just a set of beliefs but a comprehensive way of life that encompasses spiritual, moral, and social dimensions, encouraging believers to live in accordance with the natural order established by God.'
  },
  {
    id: '2',
    title: 'Who is Allah according to Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Allah is the unique, one and only God, the Creator and Sustainer of the universe. He has no partners, no children, and is unlike anything in creation.',
    longAnswer: 'In Islam, Allah is the proper name for the one true God. The Quran describes Him as the Most Merciful, the All-Knowing, and the All-Powerful. The concept of Tawhid, or the Oneness of God, is central to Islamic belief. Allah is neither male nor female, and He is beyond human imagination or physical representation. He is the First and the Last, the Manifest and the Hidden. Muslims believe that everything in existence depends on Him, while He is completely independent of all things. His attributes are described through the 99 Beautiful Names, which help believers understand His diverse relationship with His creation.'
  },
  {
    id: '3',
    title: 'Why do Muslims believe Allah has no partner?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'The belief in the absolute oneness of Allah (Tawhid) is the foundation of Islam. If there were multiple gods, the universe would be in chaos due to conflicting wills.',
    longAnswer: 'Muslims believe that the harmony and precision of the universe are evidence of a single, consistent Designer. If there were more than one god, each with their own power and will, there would inevitably be conflict and disorder in the laws of nature. The Quran emphasizes that Allah is self-sufficient and does not need help, offspring, or partners to manage His creation. Attributing partners to Allah, known as Shirk, is considered the gravest sin in Islam because it denies the fundamental truth of the Creator’s unique status and absolute sovereignty over all that exists.'
  },
  {
    id: '4',
    title: 'What are the Five Pillars of Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'The Five Pillars are the core practices of Islam: Shahada (Faith), Salah (Prayer), Zakat (Charity), Sawm (Fasting), and Hajj (Pilgrimage).',
    longAnswer: 'The Five Pillars of Islam serve as the spiritual and practical foundation for a Muslim’s life. The first is Shahada, the declaration of faith that there is no god but Allah and Muhammad is His messenger. The second is Salah, the performance of five daily prayers to maintain a constant connection with the Creator. The third is Zakat, the obligatory giving of 2.5% of one’s surplus wealth to help those in need. The fourth is Sawm, fasting during the month of Ramadan to develop self-discipline and empathy. The fifth is Hajj, the pilgrimage to Makkah once in a lifetime for those who are physically and financially able. Together, these pillars shape the identity and character of the believer.'
  },
  {
    id: '5',
    title: 'Why is Salah (prayer) important in Islam?',
    category: 'Prayers',
    ageGroup: 'Adult',
    shortAnswer: 'Salah is the direct link between a Muslim and Allah. it serves as a spiritual recharge, a source of peace, and a reminder of our purpose in life.',
    longAnswer: 'Salah is considered the "ascension" of the believer and the second pillar of Islam. It is a compulsory act of worship performed five times a day at specific intervals. Its importance lies in the fact that it forces a person to pause their worldly activities and redirect their focus toward their Creator. Regular prayer helps to purify the soul, prevents one from committing sins and indecency, and fosters a sense of discipline and punctuality. It is also a collective experience when performed in a mosque, strengthening the bonds of brotherhood and equality among Muslims from all walks of life.'
  },
  {
    id: '6',
    title: 'How many times do Muslims pray daily and why?',
    category: 'Prayers',
    ageGroup: 'Adult',
    shortAnswer: 'Muslims pray five times a day: Fajr (Dawn), Dhuhr (Noon), Asr (Afternoon), Maghrib (Sunset), and Isha (Night). This ensures that God is remembered throughout the entire day.',
    longAnswer: 'The requirement of five daily prayers was established during the Prophet Muhammad’s ﷺ miraculous night journey (Isra and Mi\'raj). These specific timings—at dawn, midday, afternoon, sunset, and nightfall—are designed to weave the remembrance of Allah into the fabric of daily life. By praying at these intervals, a Muslim ensures that no significant part of the day passes without spiritual reflection. It serves as a constant guard against the distractions of the material world and keeps the heart humble. Each prayer consists of specific movements and recitations from the Quran, providing a comprehensive physical and spiritual exercise of submission.'
  },
  {
    id: '7',
    title: 'What happens if someone misses a prayer?',
    category: 'Prayers',
    ageGroup: 'Adult',
    shortAnswer: 'If a prayer is missed due to sleep or forgetfulness, it should be made up as soon as it is remembered. Intentionally skipping prayer is a serious spiritual neglect.',
    longAnswer: 'In Islam, the daily prayers are obligatory and must be performed within their prescribed time windows. However, Islam is a religion of mercy and practical wisdom. If a person misses a prayer unintentionally, such as being asleep or genuinely forgetting, they are required to perform it (Qada) as soon as they remember or wake up. The Prophet ﷺ said that the "debt" of prayer must be repaid. If a person intentionally skips prayer, they are encouraged to sincerely repent to Allah and resume their prayers immediately. Consistency in Salah is the hallmark of faith, and making up missed prayers is a way to restore that vital connection with the Divine.'
  },
  {
    id: '8',
    title: 'What is the purpose of fasting in Ramadan?',
    category: 'Fasting',
    ageGroup: 'Adult',
    shortAnswer: 'Fasting aims to develop Taqwa (God-consciousness), self-control, and empathy for those who are hungry and less fortunate.',
    longAnswer: 'Fasting (Sawm) during the month of Ramadan is the fourth pillar of Islam. It involves refraining from food, drink, and intimate relations from dawn until sunset. The primary spiritual goal is to cultivate Taqwa, which is a state of being constantly aware of Allah’s presence. By denying the body its most basic needs, the believer learns to discipline their desires and strengthens their willpower. Ramadan is also a time for deep reflection, increased charity, and reading the Quran. Furthermore, experiencing hunger firsthand creates a profound sense of empathy for the poor, encouraging Muslims to be more generous and grateful for the blessings they often take for granted.'
  },
  {
    id: '9',
    title: 'Who must fast and who is exempt?',
    category: 'Fasting',
    ageGroup: 'Adult',
    shortAnswer: 'Fasting is mandatory for every healthy, adult Muslim. Exceptions are made for the sick, travelers, elderly, and women who are pregnant, nursing, or menstruating.',
    longAnswer: 'Fasting is an obligation for Muslims who have reached the age of puberty and are mentally and physically capable. However, Allah does not intend hardship for His servants. Those who are ill or traveling are allowed to break their fast and make up the missed days later in the year. The elderly and those with chronic health conditions who cannot fast are exempt and should instead provide fidyah, which is feeding a needy person for each day missed. Women who are menstruating or experiencing postpartum bleeding are forbidden from fasting but must make up the days later. Pregnant and nursing mothers may also delay their fast if they fear for their health or the health of their child.'
  },
  {
    id: '10',
    title: 'What is Zakat and why is it obligatory?',
    category: 'Zakat',
    ageGroup: 'Adult',
    shortAnswer: 'Zakat is a mandatory charitable contribution of 2.5% of one’s surplus wealth. It is obligatory to purify one’s wealth and support the needy members of society.',
    longAnswer: 'The word Zakat literally means "purification" and "growth." By giving a small portion of their wealth to others, Muslims believe they are purifying the remainder of their assets from greed and selfishness. Zakat is the third pillar of Islam and is seen as a right of the poor over the wealthy, not just an act of optional kindness. It functions as a form of social security, ensuring that wealth circulates within the community and supports the most vulnerable, such as orphans, the poor, and the destitute. Paying Zakat is an act of worship that demonstrates a believer’s commitment to social justice and their understanding that all wealth ultimately belongs to Allah.'
  },
  {
    id: '11',
    title: 'How is Zakat calculated?',
    category: 'Zakat',
    ageGroup: 'Adult',
    shortAnswer: 'Zakat is calculated as 2.5% of a Muslim’s total surplus wealth (savings, gold, stocks, business assets) that has been held for one full lunar year above a minimum threshold called Nisab.',
    longAnswer: 'To calculate Zakat, a person must first determine if their total assets exceed the Nisab—a threshold equivalent to the value of 85 grams of gold or 595 grams of silver. Assets included in the calculation are cash in hand or in bank accounts, gold and silver jewelry, stocks, investment properties (excluding one’s primary residence), and business inventory. Personal items like cars, furniture, and tools used for work are not subject to Zakat. Once the total value of these surplus assets is determined, 2.5% of that amount is paid to eligible recipients. This calculation is done annually after one lunar year has passed since the wealth reached the Nisab level, ensuring that only those with consistent surplus wealth are required to pay.'
  },
  {
    id: '12',
    title: 'What is Hajj and who must perform it?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Hajj is the annual pilgrimage to Makkah. It is mandatory once in a lifetime for every adult Muslim who is physically and financially able to make the journey.',
    longAnswer: 'Hajj is the fifth pillar of Islam and occurs during the Islamic month of Dhu al-Hijjah. It is a series of rituals that commemorate the trials and sacrifices of Prophet Ibrahim (Abraham), his wife Hajar, and their son Ismail. These rituals include circling the Kaaba, walking between the hills of Safa and Marwa, and standing in prayer on the plain of Arafat. Hajj is a powerful symbol of the unity of the Muslim Ummah, as millions of people from every race and nation gather in simple white clothing, stripping away all indicators of social status. It is a journey of spiritual renewal, and Muslims believe that a Hajj performed with sincerity can result in the forgiveness of all previous sins.'
  },
  {
    id: '13',
    title: 'What is the Shahada and why is it important?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'The Shahada is the declaration: "There is no god but Allah, and Muhammad is His messenger." It is the gateway to Islam and the core of its belief system.',
    longAnswer: 'The Shahada is the most fundamental statement of Islamic faith. By reciting it with conviction, an individual becomes a Muslim. The first part, "Lā ilāha illā-llāh," establishes Tawhid, the absolute oneness of God, rejecting all forms of idolatry or partnership with the Divine. The second part, "Muḥammadur-rasūlu-llāh," affirms that Muhammad ﷺ is the final messenger sent by God to guide humanity. The Shahada is more than just a phrase; it is a life commitment to worship only God and to follow the teachings of His Prophet. It is whispered into the ear of a musician, recited in every daily prayer, and ideally, is the last word a believer speaks before passing away.'
  },
  {
    id: '14',
    title: 'Who is Prophet Muhammad ﷺ?',
    category: 'Prophets & History',
    ageGroup: 'Adult',
    shortAnswer: 'Muhammad ﷺ is the final Prophet and Messenger sent by Allah to all of humanity. He was born in Makkah and received the revelation of the Quran.',
    longAnswer: 'Prophet Muhammad ﷺ was born in the year 570 CE in Makkah into the noble tribe of Quraysh. Known for his honesty and integrity even before his prophethood, he was called "Al-Amin" (The Trustworthy). At the age of 40, he received his first revelation from Allah through the Angel Jibril (Gabriel) in the cave of Hira. For the next 23 years, he preached the message of monotheism and social justice, eventually uniting the Arabian Peninsula under Islam. He is regarded as the "Seal of the Prophets," meaning he is the last in the long line of messengers that included Adam, Noah, Abraham, Moses, and Jesus. His life serves as the ultimate example of character and devotion for all Muslims.'
  },
  {
    id: '15',
    title: 'Why do Muslims follow Prophet Muhammad ﷺ?',
    category: 'Prophets & History',
    ageGroup: 'Adult',
    shortAnswer: 'Muslims follow him because he was chosen by Allah to be the perfect role model. His actions and sayings (Sunnah) explain how to live according to the Quran.',
    longAnswer: 'Following the Prophet Muhammad ﷺ is a direct command from Allah in the Quran, which states, "He who obeys the Messenger has obeyed Allah." He was sent not just to deliver the scripture, but to demonstrate how to implement its teachings in every aspect of life—from worship and governance to family relations and personal hygiene. His character, described as "a walking Quran," provides a practical guide for achieving moral excellence. By studying his life (Sirah) and his recorded traditions (Hadith), Muslims gain a deeper understanding of their faith and learn how to navigate the challenges of life with patience, wisdom, and mercy.'
  },
  {
    id: '16',
    title: 'What is the Quran?',
    category: 'Quran',
    ageGroup: 'Adult',
    shortAnswer: 'The Quran is the literal word of Allah, revealed to Prophet Muhammad ﷺ as the final guidance for mankind. It is considered the greatest miracle in Islam.',
    longAnswer: 'The Quran is the holy book of Islam, consisting of 114 chapters (Surahs) and over 6,000 verses (Ayahs). Muslims believe it is the verbatim word of God, preserved exactly as it was revealed over 1,400 years ago. It addresses a wide range of topics, including the nature of God, the stories of previous prophets, moral guidelines, legal principles, and descriptions of the afterlife. Unlike previous scriptures, the Quran is intended for all of humanity and is protected by Allah from any alteration. It is recited in its original Arabic during prayers and is a source of spiritual healing, guidance, and law for nearly two billion people worldwide.'
  },
  {
    id: '17',
    title: 'How was the Quran revealed?',
    category: 'Quran',
    ageGroup: 'Adult',
    shortAnswer: 'The Quran was revealed piecemeal over 23 years. The Angel Jibril brought the revelations from Allah to the heart of Prophet Muhammad ﷺ.',
    longAnswer: 'The revelation of the Quran began in the month of Ramadan in the year 610 CE while the Prophet ﷺ was meditating in the Cave of Hira. The first words revealed were "Iqra" (Read/Proclaim). Over the next 23 years, verses were revealed in response to various events, questions, and challenges faced by the early Muslim community. Sometimes the revelation came like the ringing of a bell, and other times the Angel Jibril appeared in human form to deliver the message. The Prophet ﷺ would then recite the verses to his companions, who would memorize them and write them down on whatever materials were available, such as parchment, stones, or shoulder blades of camels.'
  },
  {
    id: '18',
    title: 'Why do Muslims believe the Quran is unchanged?',
    category: 'Quran',
    ageGroup: 'Adult',
    shortAnswer: 'Allah explicitly promises in the Quran to protect it from corruption. Its preservation through mass memorization and early written records ensures its authenticity.',
    longAnswer: 'The Quran is unique among historical texts because of its method of preservation. From the very beginning, the Prophet ﷺ encouraged his companions to memorize the entire text, a tradition that continues today with millions of "Huffaz" (memorisers) worldwide. This oral tradition acts as a cross-check against any written errors. Furthermore, the Quran was compiled into a standardized book shortly after the Prophet’s death, based on the original written records and the testimony of those who had memorized it. Because it is recited by millions of people daily in its original Arabic, any attempt to change even a single letter would be immediately detected by the global community.'
  },
  {
    id: '19',
    title: 'What language was the Quran revealed in and why?',
    category: 'Quran',
    ageGroup: 'Adult',
    shortAnswer: 'The Quran was revealed in Arabic. This was the language of the people it was first sent to, and its linguistic miracle is deeply tied to the Arabic language.',
    longAnswer: 'The Quran was revealed in the Arabic language of the 7th-century Hijaz region. Allah mentions in the Quran that it was sent in Arabic so that the people of the time could understand and reflect upon it. Beyond just communication, the Quran’s linguistic structure, rhythm, and eloquence are considered its primary miracle; the most skilled poets of Arabia were unable to produce even a single chapter comparable to it. While the Quran has been translated into almost every language to spread its meaning, the Arabic text itself is considered the "Quran." Maintaining the original language ensures that the nuances and depths of the divine word are not lost in translation over time.'
  },
  {
    id: '20',
    title: 'What is Hadith?',
    category: 'Prophets & History',
    ageGroup: 'Adult',
    shortAnswer: 'A Hadith is a recorded tradition of the sayings, actions, or silent approvals of the Prophet Muhammad ﷺ.',
    longAnswer: 'Hadiths serve as the second source of Islamic law and guidance after the Quran. Each Hadith consists of two parts: the "Matn" (the actual text) and the "Isnad" (the chain of narrators). Because the Prophet’s life was meant to be an example, his companions meticulously observed his behavior and repeated his words to others. Later, scholars developed a rigorous science of Hadith criticism to distinguish authentic narrations from weak or fabricated ones. Major collections, such as Sahih Bukhari and Sahih Muslim, are highly revered for their accuracy. Hadiths provide the necessary context and detail to implement the general principles found in the Quran.'
  },
  {
    id: '21',
    title: 'Difference between Quran and Hadith?',
    category: 'Quran',
    ageGroup: 'Adult',
    shortAnswer: 'The Quran is the direct, verbatim word of Allah, while Hadith are the words and actions of the Prophet Muhammad ﷺ narrated by humans.',
    longAnswer: 'The fundamental difference lies in their origin and nature. The Quran is "Kalam Allah" (the Word of God) in both meaning and wording; it is considered miraculous and is recited as an act of worship in itself. In contrast, a Hadith contains the wisdom of the Prophet ﷺ, which is divinely inspired in meaning but expressed in human language. Furthermore, the Quran is "Mutawatir," meaning it has been transmitted by such a large number of people that there is no doubt about its authenticity. Hadiths, however, vary in their levels of authenticity (Sahih, Hassan, Da\'if) based on the reliability of the narrators and the continuity of the chain through which they were passed down.'
  },
  {
    id: '22',
    title: 'Who were the Sahaba (companions)?',
    category: 'Prophets & History',
    ageGroup: 'Adult',
    shortAnswer: 'The Sahaba are the people who met the Prophet Muhammad ﷺ, believed in him, and died as Muslims.',
    longAnswer: 'The Sahaba (Companions) played a crucial role in the history of Islam as they were the ones who witnessed the revelation firsthand and supported the Prophet ﷺ during the most difficult times. They include famous figures like Abu Bakr, Umar, Uthman, Ali, and Khadijah, as well as thousands of others from diverse backgrounds. They are highly respected because they sacrificed their wealth, homes, and lives to preserve and spread the message of Islam. They were the bridge that carried the Quran and the Sunnah to the following generations. Muslims look to their lives for inspiration in faith, courage, and devotion to God.'
  },
  {
    id: '23',
    title: 'What is Sunnah?',
    category: 'Prophets & History',
    ageGroup: 'Adult',
    shortAnswer: 'Sunnah refers to the "way" or "path" of the Prophet Muhammad ﷺ, encompassing his habits, practices, and moral conduct.',
    longAnswer: 'While "Hadith" refers to the recorded reports, "Sunnah" is the practical application of those reports. It defines the lifestyle of the Prophet ﷺ and serves as the model for how a Muslim should act in daily life. This includes everything from how he performed his prayers and treated his family to how he handled business transactions and social conflicts. The Sunnah provides the "flesh and blood" to the skeletal framework provided by the Quran. For example, the Quran commands Muslims to pray, but the Sunnah teaches the specific details of how to perform the movements and what to recite.'
  },
  {
    id: '24',
    title: 'What is Iman (faith) in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Iman is the sincere belief in the heart, the verbal profession with the tongue, and the practical implementation through actions.',
    longAnswer: 'In Islamic theology, Iman is more than just a vague feeling of belief; it is an active state of being. It requires three components: "Tasdiq bi-l-qalb" (firm conviction in the heart), "Iqrar bi-l-lisan" (declaration with the tongue), and "Amal bi-l-arkan" (action with the limbs). True faith is not static; it can increase with good deeds and decrease with sin. It is often described as having "seventy-some branches," the highest of which is the declaration of "La ilaha illa Allah" and the lowest is removing a harmful object from the path. Iman provides the motivation for worship and the ethical compass for interacting with creation.'
  },
  {
    id: '25',
    title: 'What are the six articles of faith?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'The six articles of faith are: Belief in Allah, His Angels, His Books, His Messengers, the Day of Judgment, and Divine Decree (Qadr).',
    longAnswer: 'These six articles represent the fundamental creed of a Muslim. First is the belief in the absolute oneness of Allah. Second is the belief in Angels, who are spiritual beings created from light to serve God. Third is the belief in the Books revealed by God, including the Torah, Psalms, Gospel, and finally the Quran. Fourth is the belief in all the Messengers sent to humanity. Fifth is the belief in the Day of Judgment and the life after death. Sixth is the belief in Al-Qadr, the divine decree, meaning that Allah has knowledge and power over everything that happens. Accepting all six is necessary to be considered a believer.'
  },
  {
    id: '26',
    title: 'Do Muslims believe in previous prophets?',
    category: 'Prophets & History',
    ageGroup: 'Adult',
    shortAnswer: 'Yes, Muslims believe that Allah sent prophets to every nation throughout history to guide them to the worship of one God.',
    longAnswer: 'Believing in all previous prophets is a mandatory requirement of faith in Islam. The Quran mentions 25 prophets by name, but also states that there were many more whom we do not know. These include famous figures like Adam, Noah, Abraham, Ishmael, Isaac, Jacob, Joseph, Moses, David, Solomon, John the Baptist, and Jesus. Muslims believe that all these prophets preached the same fundamental message of monotheism (Islam). While their specific laws may have differed according to the needs of their people, their spiritual essence was the same. Rejecting any of God’s true prophets is equivalent to rejecting them all.'
  },
  {
    id: '27',
    title: 'Who were the major prophets in Islam?',
    category: 'Prophets & History',
    ageGroup: 'Adult',
    shortAnswer: 'The five "Ulu al-Azm" (Prophets of Firm Resolve) are Noah, Abraham, Moses, Jesus, and Muhammad ﷺ.',
    longAnswer: 'In Islam, certain prophets are distinguished for their exceptional patience, perseverance, and the magnitude of their mission. These are known as the "Ulu al-Azm." Nuh (Noah) spent centuries calling his people to God. Ibrahim (Abraham) is the patriarch of monotheism who passed extreme tests of faith. Musa (Moses) led the Israelites out of oppression and received the Torah. Isa (Jesus) was born of a miraculous birth and performed great miracles by God’s leave. Finally, Muhammad ﷺ is the final messenger sent to all of humanity. While all prophets are equal in their status as messengers, these five are highlighted for the profound impact they had on human history and the strength of their devotion.'
  },
  {
    id: '28',
    title: 'Do Muslims believe in Jesus (Isa)?',
    category: 'Prophets & History',
    ageGroup: 'Adult',
    shortAnswer: 'Yes, Jesus is a highly respected prophet in Islam. Muslims believe in his miraculous birth and his role as the Messiah, but do not believe he is the son of God.',
    longAnswer: 'In Islam, Jesus (Isa) is one of the greatest messengers of Allah. He was born miraculously to the Virgin Mary (Maryam) without a father, by God’s command "Be." He was given the Injeel (Gospel) and performed miracles like healing the blind and raising the dead, always by the permission of Allah. However, Islam strictly rejects the idea of the Trinity or that Jesus is the Son of God, as this would contradict the absolute oneness of the Creator. Muslims believe that Jesus was not crucified but was raised to heaven by Allah and that he will return before the Day of Judgment to restore justice and peace to the world.'
  },
  {
    id: '29',
    title: 'What does Islam say about miracles?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Miracles are extraordinary events performed by prophets through the power of Allah to prove the truth of their message.',
    longAnswer: 'In Islam, a miracle (Mu\'jizah) is something that breaks the natural laws of the universe and is exclusively granted by Allah to His prophets. These are not magic or independent powers possessed by the prophets, but signs from the Creator. For example, Moses’ staff turning into a serpent, Jesus healing the lepers, and Muhammad ﷺ splitting the moon or the Quran itself. The purpose of miracles is to provide evidence to a skeptical audience that the person claiming prophethood is indeed speaking on behalf of God. After the time of the prophets, extraordinary events that happen to righteous people are called "Karamat," but these are secondary to the primary miracles of the messengers.'
  },
  {
    id: '30',
    title: 'What is Angels’ role in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Angels are beings of light who obey Allah perfectly. They carry out various duties, such as delivering revelation, recording deeds, and guarding believers.',
    longAnswer: 'Angels are a fundamental part of the unseen world in Islam. Unlike humans, they do not have free will and cannot disobey Allah. They are created from light and are neither male nor female. Some prominent angels include Jibril (Gabriel), who delivers revelation; Mika’il (Michael), who is in charge of rain and sustenance; Israfil, who will blow the trumpet to announce the Day of Judgment; and the Angel of Death, who takes the souls. Additionally, every person is accompanied by two angels who record their good and bad deeds. Their existence reminds Muslims that the universe is far larger than what can be seen and that Allah’s administration is vast and meticulous.'
  },
  {
    id: '31',
    title: 'What is Jinn in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Jinn are sentient beings created by Allah from smokeless fire. Like humans, they have free will and can be good or evil.',
    longAnswer: 'The Jinn are a separate creation from humans and angels. They live in a parallel dimension and are generally invisible to us. The Quran mentions that they were created from "smokeless fire" before the creation of mankind. Because they possess free will, they are also subject to God’s judgment; some are Muslims, while others are disbelievers or followers of Shaytan. Jinn can experience emotions, marry, and have families. While popular culture often focuses on "genies" or possession, Islam teaches that humans should generally not interact with them or seek their help, as this can lead to spiritual harm and superstition. The primary purpose of their creation, like humans, is to worship Allah.'
  },
  {
    id: '32',
    title: 'What is Shaytan (Satan)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Shaytan, or Iblis, is a jinn who disobeyed Allah out of arrogance. He is the primary tempter who tries to lead humans away from the right path.',
    longAnswer: 'Iblis was once a high-ranking jinn who worshipped among the angels. However, when Allah created Adam and commanded the angels to prostrate to him out of respect, Iblis refused, claiming he was superior because he was made of fire while Adam was made of clay. For this arrogance, he was cast out of Allah’s mercy. He then vowed to misguide humanity until the Day of Judgment. Shaytan does not have the power to force humans to sin; his primary method is "Waswasa" (whispering) and making evil deeds look attractive. Muslims seek refuge in Allah from his influence and are encouraged to maintain a strong spiritual defense through prayer and remembrance of God.'
  },
  {
    id: '33',
    title: 'Why does evil exist according to Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Evil and suffering exist as a test for humanity and as a consequence of the free will that Allah has given us.',
    longAnswer: 'In Islam, this worldly life is viewed as a temporary testing ground. The presence of evil, suffering, and hardship allows humans to demonstrate virtues like patience, courage, and compassion. If there were no choice between good and evil, human actions would have no moral value. Furthermore, much of the suffering in the world is the result of human misuse of free will, such as oppression, greed, and injustice. Allah is entirely good, but He allows the existence of evil to fulfill the purpose of the test. Muslims believe that in the grand scheme of divine wisdom, even events that seem purely evil may contain hidden benefits or serve a higher purpose that we cannot fully comprehend.'
  },
  {
    id: '34',
    title: 'What is Qadr (destiny)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Qadr is the belief that Allah has full knowledge and control over everything that happens in the universe, according to His divine wisdom.',
    longAnswer: 'The belief in Al-Qadr (Divine Decree) is the sixth article of faith. It involves four components: that Allah knows everything past, present, and future; that He has written everything in the "Preserved Tablet"; that nothing happens unless He wills it; and that He is the Creator of all things. This does not mean that humans are robots without choice; rather, it means that our choices occur within the framework of Allah’s absolute knowledge. Understanding Qadr helps a believer find peace during calamities, knowing that what reached them was never meant to miss them, and what missed them was never meant to reach them. It encourages humility during success and resilience during failure.'
  },
  {
    id: '35',
    title: 'Do humans have free will in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Yes, Islam teaches that humans have a limited free will, which allows them to choose between right and wrong.',
    longAnswer: 'While Allah has ultimate control and knowledge (Qadr), He has granted human beings the ability to make choices in their moral and spiritual lives. This free will is what makes us accountable for our actions on the Day of Judgment. We cannot control natural events, our birth, or the timing of our death, but we can choose our intentions, our words, and how we treat others. Islam strikes a balance: we are neither completely determined by fate nor completely independent of God’s will. Our responsibility is to strive for the best outcomes while ultimately trusting in Allah’s plan. This duality is central to the concept of the "test" of life.'
  },
  {
    id: '36',
    title: 'What happens after death in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'After death, the soul enters a transitional state called Barzakh until the Day of Resurrection, followed by judgment and the final destination of Paradise or Hell.',
    longAnswer: 'Islam teaches that death is not the end but a transition from one world to the next. When a person dies, their soul is taken by the Angel of Death and questioned in the grave by two angels, Munkar and Nakir, about their Lord, their religion, and their Prophet. Based on their life and faith, the grave becomes either a window to Paradise or a place of discomfort. The soul remains in Barzakh until the Trumpet is blown, signaling the end of the world and the resurrection of all human beings. Everyone will then stand before Allah to be judged for their intentions and deeds, leading to their eternal abode.'
  },
  {
    id: '37',
    title: 'What is Barzakh?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Barzakh is the "barrier" or intermediate state between a person’s death and the Day of Resurrection.',
    longAnswer: 'The word Barzakh literally means a barrier or a separation. In Islamic eschatology, it refers to the realm where the souls of the deceased reside after they have left their physical bodies. It is a state of waiting where time and space operate differently than in our physical world. For the righteous, Barzakh is a place of peace and a preview of the joys of Jannah. For the disbelievers and wrongdoers, it can be a place of distress. This phase of existence serves as a reminder that the consequences of one’s earthly life begin immediately upon death, long before the final assembly on the Day of Judgment.'
  },
  {
    id: '38',
    title: 'What is the Day of Judgment?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'It is the day when all humans will be resurrected and held accountable by Allah for their beliefs and actions on earth.',
    longAnswer: 'The Day of Judgment (Yawm al-Qiyamah) is a central belief in Islam. It is the day when the entire universe will be destroyed and then recreated, and every human being from Adam to the last person will be brought back to life. Everyone will be given a "book of deeds" containing every action they performed. Allah, the Just Judge, will weigh these deeds on a scale (Mizan). Even the smallest act of kindness or the slightest injustice will be accounted for. People will be grouped according to their faith and conduct. It is a day of great reckoning where no one can help another, and the only thing that matters is one’s relationship with God and the purity of their heart.'
  },
  {
    id: '39',
    title: 'What is Jannah (Paradise)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Jannah is the eternal home of the righteous, filled with unimaginable beauty, peace, and the ultimate reward of seeing Allah.',
    longAnswer: 'Jannah is described in the Quran as gardens under which rivers flow. It is a place free from pain, fatigue, sadness, and death. Its inhabitants will have whatever their hearts desire—exquisite food, beautiful dwellings, and perfect companionship. Jannah has many levels, with the highest being Jannat al-Firdaws. However, the greatest reward of all, surpassing all physical pleasures, is the opportunity for the believers to see Allah’s countenance. It is the destination for those who believed in the Oneness of God and strived to do good deeds, representing the ultimate success and fulfillment of the human soul.'
  },
  {
    id: '40',
    title: 'What is Jahannam (Hell)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Jahannam is the place of punishment and purification for those who rejected God or committed grave injustices without repentance.',
    longAnswer: 'Jahannam is described as a place of intense fire and suffering, serving as a manifestation of God’s justice. It is the consequence for those who chose to reject their Creator, oppressed others, or lived lives of arrogance and cruelty. While the fire of this world is physical, the fire of Jahannam is described as being much more intense and capable of reaching the hearts. For some believers who committed major sins, Hell may be a temporary place of purification until they are eventually admitted to Jannah. For those who stubbornly rejected faith and the truth, it is an eternal abode. Descriptions of Hell serve as a serious warning to humanity to avoid evil and seek God’s mercy while they still have the chance.'
  },
  {
    id: '41',
    title: 'Are non-Muslims automatically punished?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Final judgment belongs only to Allah. He is the Most Just and will judge each person based on the knowledge they received and the choices they made.',
    longAnswer: 'Islam teaches that Allah is Al-Adl (The Perfectly Just). He states in the Quran that He does not punish a people until a messenger has been sent to them. Therefore, those who never heard the message of Islam or heard a distorted version of it are judged differently than those who understood the truth and rejected it out of arrogance. Every individual will be judged based on their unique circumstances, intentions, and the light that reached them. Muslims are encouraged to worry about their own accountability and leave the final fate of others to the Creator, who knows the depths of every heart and the reality of every situation.'
  },
  {
    id: '42',
    title: 'What is repentance (Tawbah)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Tawbah is the act of turning back to Allah with regret for one\'s sins and a firm intention to do better.',
    longAnswer: 'Repentance is a vital spiritual tool in Islam, as humans are naturally prone to making mistakes. For Tawbah to be sincere and accepted, it generally requires four steps: admitting the sin, feeling genuine regret, immediately stopping the act, and resolving never to return to it. If the sin involved hurting another person, one must also seek their forgiveness or return their rights. Allah loves those who repent and describes His mercy as being wider than any sin. No matter how far a person has strayed, the door of repentance remains open until the moment of death. Tawbah is not just for major sins; it is a daily practice for the believer to keep their heart clean and humble.'
  },
  {
    id: '43',
    title: 'How does Allah forgive sins?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Allah forgives sins through His infinite mercy when a person sincerely repents, performs good deeds, or endures trials with patience.',
    longAnswer: 'Allah’s forgiveness (Maghfirah) is multifaceted. The primary way is through sincere repentance (Tawbah). Additionally, performative acts of worship like Salah, fasting Ramadan, and Hajj are said to wipe away previous sins. Small daily good deeds also "erase" minor bad deeds, as "goodness removes evil." Furthermore, the trials, illnesses, and hardships a believer faces in this world are often a means of purifying them from their sins before they meet their Creator. Allah is Al-Ghaffar (The Repeatedly Forgiving), and His mercy precedes His wrath. He forgives everything except the sin of Shirk (associating partners with Him) if the person dies in that state without repenting.'
  },
  {
    id: '44',
    title: 'What are major sins in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Major sins (Kaba\'ir) are grave offenses that have specific warnings of punishment in the Quran or Hadith, such as shirk, murder, and theft.',
    longAnswer: 'Major sins are those actions that carry a severe warning of divine anger or punishment in the afterlife, or a specific legal penalty in this world. The most serious of these is Shirk (associating partners with Allah). Others include murder, practicing magic, neglecting the five daily prayers, consuming usury (Riba), stealing the wealth of orphans, fleeing from the battlefield, and accusing chaste women of adultery. Engaging in these sins is a serious threat to a person’s spiritual well-being and requires sincere Tawbah (repentance) for forgiveness. Avoiding the major sins is the first step toward achieving a state of righteousness and earning Allah’s pleasure.'
  },
  {
    id: '45',
    title: 'What are minor sins?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Minor sins are smaller moral lapses that do not have specific severe punishments but can harden the heart if repeated habitually.',
    longAnswer: 'Minor sins are everyday mistakes or lapses in judgment that fall below the threshold of "Kaba\'ir." While they are not as severe, they are not to be taken lightly. Scholars often compare minor sins to small pebbles; while one pebble is light, a mountain of them can crush you. Habitually committing minor sins without concern can lead a person to commit major ones and can distance them from Allah’s light. Fortunately, Allah provides many ways to erase these sins, such as performing wudu (ablution), praying, giving charity, and seeking forgiveness. The key for a believer is to maintain constant self-awareness and not become complacent with any form of disobedience.'
  },
  {
    id: '46',
    title: 'What is halal and haram?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Halal means permissible and haram means forbidden. These categories apply to food, actions, and speech.',
    longAnswer: 'The concepts of halal and haram provide the legal and ethical boundaries for a Muslim. In Islam, the default state of all things is "Halal" (permissible) unless there is clear evidence from the Quran or Sunnah prohibiting it. "Haram" (forbidden) things are those which Allah has declared harmful to the individual or society. For example, honesty and kindness are halal, while lying and oppression are haram. In terms of food, meat slaughtered in a specific way and wholesome foods are halal, while pork and intoxicants are haram. These rules are not intended to restrict freedom but to protect the physical, mental, and spiritual health of the believer and to maintain a just and orderly society.'
  },
  {
    id: '47',
    title: 'Why is alcohol forbidden in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Alcohol is forbidden because it is an intoxicant that clouds the mind, leads to bad behavior, and causes harm to health and relationships.',
    longAnswer: 'In Islam, anything that intoxicates (Khamr) is strictly prohibited. The primary reason is that the preservation of the intellect is one of the essential goals of Islamic law. When a person loses control of their mind, they are more likely to neglect their prayers, engage in violence, speak shameful words, or commit other sins without realizing it. Furthermore, alcohol has well-documented negative effects on physical health, family stability, and societal safety. By forbidding it, Islam aims to keep the believer’s mind clear for the remembrance of God and to prevent the numerous social evils that result from substance abuse. The prohibition was revealed in stages, eventually becoming a complete ban for the well-being of the Ummah.'
  },
  {
    id: '48',
    title: 'Why is pork forbidden?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Pork is forbidden in Islam as a matter of divine command, as the Quran describes it as "Rijs" (unclean or impure).',
    longAnswer: 'The prohibition of eating pork is found in the Quran, where it is listed alongside carrion and blood as something forbidden for consumption. While modern science may point to health risks associated with parasites or fat content in pork, the primary reason a Muslim abstains from it is out of obedience to Allah. The Quran labels it as impure. Islam emphasizes the consumption of "Tayyib" (wholesome and pure) foods, as what a person eats is believed to affect their spiritual state and character. Abstaining from pork is one of the most visible ways a Muslim practices self-discipline and adherence to divine law in their daily life.'
  },
  {
    id: '49',
    title: 'What is modesty in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Modesty (Haya) is a comprehensive virtue that includes decent clothing, humble behavior, and shyness before God.',
    longAnswer: 'Haya is often translated as modesty, but it also encompasses shame, shyness, and decency. The Prophet ﷺ said, "Every religion has a character, and the character of Islam is Haya." It is not just about what a person wears, but how they speak, how they look at others, and how they behave when they are alone. Haya toward Allah means being shy to commit sins in His presence. Haya toward people means treating them with respect and avoiding vulgarity or arrogance. It acts as an internal shield that protects a person’s dignity and prevents them from engaging in behaviors that are beneath their status as a servant of God.'
  },
  {
    id: '50',
    title: 'Why do Muslim women wear hijab?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Muslim women wear the hijab as an act of worship, obedience to God, and as a symbol of modesty and identity.',
    longAnswer: 'The hijab is a religious requirement for Muslim women that involves covering the body and hair in the presence of unrelated men. It is an expression of devotion to Allah and a way for women to be valued for their character and intellect rather than their physical appearance. It serves as a protection for their dignity and a clear marker of their identity as believers. While often debated in political and social spheres, for the majority of Muslim women, the hijab is a deeply personal choice based on their understanding of divine guidance. It is part of a broader commitment to modesty that applies to both men and women in different ways.'
  },
  {
    id: '51',
    title: 'What does Islam say about men’s modesty?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Men are also commanded to be modest by "lowering their gaze" and covering themselves appropriately from the navel to the knees.',
    longAnswer: 'Modesty is not an exclusively female obligation in Islam. The Quran actually addresses men first when it commands them to "lower their gaze and guard their modesty." This means men must avoid looking at others with lust and must maintain respectful boundaries in their interactions. Legally, the "Awrah" (private area) for men is generally defined as the area between the navel and the knees, which must be covered in public. Furthermore, men are discouraged from wearing skin-tight clothing or dressing in a way that is arrogant or seeks excessive attention. Modesty for men also includes their character, requiring them to be humble, gentle in speech, and respectful in their conduct with others.'
  },
  {
    id: '52',
    title: 'Is Islam compatible with science?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Yes, Islam encourages observation, reasoning, and the study of the natural world, viewing them as ways to understand the signs of Allah.',
    longAnswer: 'Islam does not see a conflict between faith and reason. On the contrary, the Quran repeatedly urges believers to "reflect," "ponder," and "observe" the heavens and the earth. During the Islamic Golden Age, this theological encouragement led to massive advancements in fields like medicine, astronomy, mathematics, and optics. Many early Muslim scientists believed that by studying the universe, they were uncovering the "signs" (Ayat) of the Creator. While specific scientific theories may change over time, the Quranic encouragement to seek knowledge remains constant. Islam only rejects scientific claims that are presented as absolute truths without proof when they directly contradict clear divine revelation, but generally, the two are seen as complementary ways of discovering the truth.'
  },
  {
    id: '53',
    title: 'What does Islam say about education?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Seeking knowledge is a mandatory duty for every Muslim, regardless of gender. It is considered a form of worship and a path to spiritual growth.',
    longAnswer: 'The first word revealed in the Quran was "Iqra" (Read). The Prophet Muhammad ﷺ emphasized the importance of learning, stating that "seeking knowledge is an obligation upon every Muslim." Islam makes no distinction between religious and secular knowledge in terms of their potential benefit to society. Scholars are held in very high regard, and their ink is said to be as precious as the blood of martyrs. Education is seen as a means to better understand one’s purpose, improve the community, and manage the world in a way that pleases Allah. Historically, Islamic civilization built some of the world’s first universities and libraries, reflecting this deep commitment to the intellectual growth of all its members.'
  },
  {
    id: '54',
    title: 'What is the status of parents in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Parents hold a position of immense honor and respect. Obedience to them, especially to the mother, is second only to the worship of Allah.',
    longAnswer: 'In the Quran, Allah frequently couples the command to worship Him with the command to show "Ihsan" (excellence and kindness) to parents. Disrespecting them, even with a small sigh of frustration ("uff"), is strictly forbidden. The mother, in particular, is given three times more right to companionship and care than the father due to the hardships of pregnancy, childbirth, and nursing. The Prophet ﷺ taught that "Paradise lies under the feet of mothers." Serving one’s parents in their old age is considered one of the highest forms of Jihad (struggle) and a primary means of entering Jannah. Only if parents command a person to commit a sin is a Muslim allowed to disobey them, and even then, they must maintain a relationship of kindness and respect.'
  },
  {
    id: '55',
    title: 'What are children’s rights in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Children have the right to a good name, proper nutrition, protection, a quality education, and to be treated with love and equity.',
    longAnswer: 'Islam views children as an "Amanah" (trust) given to parents by Allah. Their rights begin even before birth, through the selection of righteous parents. Once born, they have a right to be named well, provided for financially, and protected from harm. Parents are obligated to provide them with both a moral and worldly education so they can grow into responsible adults. Most importantly, the Prophet ﷺ emphasized the importance of showing affection to children, kissing them, and playing with them. He also strictly commanded that parents be fair and equitable among their children, whether in gift-giving or emotional attention, to prevent jealousy and resentment within the family.'
  },
  {
    id: '56',
    title: 'What is marriage in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Marriage is a sacred social contract between a man and a woman, designed to provide companionship, love, and a stable environment for a family.',
    longAnswer: 'Islam views marriage as the "completion of half of one\'s faith." It is not a sacrament like in some other traditions, but a legal contract ("Nikah") that requires the consent of both parties, the presence of witnesses, and the payment of a "Mahr" (dowry) from the husband to the wife. The purpose of marriage is to find "Sakinah" (tranquility) and to foster "Mawaddah" (love) and "Rahmah" (mercy) between spouses. It provides a halal outlet for physical intimacy and a structured environment for raising the next generation. Husband and wife are described in the Quran as "garments" for one another, signifying that they should protect, comfort, and beautify each other.'
  },
  {
    id: '57',
    title: 'Is love marriage allowed in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Yes, as long as the relationship before marriage remains within Islamic boundaries and the proper legal process of Nikah is followed.',
    longAnswer: 'Islam does not forbid marriage based on mutual attraction or love. In fact, the Prophet ﷺ encouraged a companion to look at his prospective bride before marriage, stating it would more likely lead to harmony between them. What Islam regulates is the "courtship" process; it prohibits private seclusion (Khalwa) and physical intimacy before the marriage contract is signed. "Love marriage" in the modern sense is perfectly valid as long as it is done transparently, with the involvement of the family or guardians, and fulfills all the requirements of a legal Nikah. The goal is to ensure that the foundation of the family is built on mutual respect and divine approval rather than just fleeting emotions.'
  },
  {
    id: '58',
    title: 'Why is divorce allowed but disliked?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Divorce is a "necessary evil" allowed to prevent greater harm when a marriage has become broken beyond repair. It is disliked because it breaks the family unit.',
    longAnswer: 'Islam acknowledges that not all marriages will succeed. Divorce (Talaq) is permitted as a last resort when reconciliation is impossible and the relationship has become a source of misery or oppression. However, the Prophet ﷺ said that of all the things Allah has permitted, divorce is the most disliked by Him. Before proceeding to divorce, Islam encourages mediation and counseling. If a divorce does occur, it must be handled with "Ihsan" (kindness and fairness), ensuring that the rights of both parties—and especially the children—are protected. The provision of divorce is actually a mercy, as it allows individuals to end unhealthy relationships and seek a better life, rather than being trapped in a life of suffering.'
  },
  {
    id: '59',
    title: 'What is polygamy in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Islam allows a man to marry up to four wives under the strict condition that he must treat them all with absolute justice and equality.',
    longAnswer: 'Polygyny (having multiple wives) was a widespread practice in pre-Islamic times without any limits. Islam came to regulate it, capping the number at four and imposing the very difficult condition of equal treatment in terms of time, finances, and kindness. The Quran warns that if a man fears he cannot be just, he must marry only one. Historically, polygyny often served social purposes, such as providing for widows and orphans in times of war. Today, it is a rare practice in most Muslim societies. While it is legally permissible, it is not a requirement or even a recommendation for most men, as the burden of maintaining absolute fairness is extremely high and the primary model of marriage in the Quran is monogamy.'
  },
  {
    id: '60',
    title: 'What rights do women have in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Women have the right to education, to own and inherit property, to choose their spouse, to be supported financially, and to be treated with honor.',
    longAnswer: 'Over 1,400 years ago, Islam granted women rights that were revolutionary for the time and are still fundamental today. These include the right to keep their own surname after marriage, to own their own businesses, to vote and participate in public life, and to receive a dowry that is exclusively theirs. A woman cannot be forced into marriage, and she has the right to seek a divorce if the marriage fails. In their roles as mothers, daughters, and wives, they are given high spiritual and social status. While cultural practices in some regions may restrict these rights, they are firmly established in Islamic law. Men and women are considered spiritual equals before Allah, with their different roles designed to complement rather than compete with one another.'
  },
  {
    id: '61',
    title: 'What rights do men have in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Men have the right to be respected as the providers and protectors of the family, and to be obeyed in matters that do not involve sin.',
    longAnswer: 'In Islam, with every right comes a corresponding responsibility. Men are designated as the "Qawwamun" (maintainers and protectors) of the family. This means they have the primary responsibility to provide for the financial, physical, and emotional needs of their wives and children. In exchange for this heavy burden, they are granted a leadership role within the household. However, this leadership is not meant to be dictatorial; it must be exercised with consultation, kindness, and extreme patience, following the example of the Prophet ﷺ. A man has the right to expect modesty and loyalty from his wife, just as he is obligated to provide her with security and respect. His authority is always limited by the laws of Allah.'
  },
  {
    id: '62',
    title: 'What does Islam say about justice?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Justice is a supreme value in Islam. Muslims are commanded to be just even if it is against themselves, their parents, or their kin.',
    longAnswer: 'Establishing justice (Adl) is one of the primary missions of all the prophets and a cornerstone of Islamic governance and social life. The Quran describes the purpose of sending messengers and scriptures as enabling mankind to "uphold justice." This means giving everyone their due right, regardless of their religion, race, or social standing. Islamic law emphasizes the equality of all people before the court. The Prophet ﷺ warned that "Oppression will be darkness on the Day of Judgment." Justice also extends to the self, requiring a person to be honest in their dealings and to maintain a balance in their personal life. In Islam, there is no peace without justice.'
  },
  {
    id: '63',
    title: 'What is oppression according to Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Oppression (Zulm) is the violation of rights, the misuse of power, or the placing of something in its wrong place.',
    longAnswer: 'Zulm is considered one of the most hated things by Allah. It can take many forms: a ruler being unjust to his subjects, a person cheating another in business, or even an individual harming their own soul through sin. Allah says in a Hadith Qudsi, "O My servants, I have forbidden oppression for Myself and have made it forbidden amongst you, so do not oppress one another." The prayer of the oppressed person is said to have no barrier between it and Allah, meaning He will surely answer it. Muslims are obligated to stand up against oppression where they see it, whether through their hands, their speech, or at the very least, by hating it in their hearts.'
  },
  {
    id: '64',
    title: 'What is charity beyond Zakat?',
    category: 'Zakat',
    ageGroup: 'Adult',
    shortAnswer: 'Charity beyond the obligatory Zakat is called "Sadaqah." It includes any act of kindness, whether financial or non-financial.',
    longAnswer: 'While Zakat is a mandatory percentage, Sadaqah is voluntary and unlimited. It is encouraged at all times and is seen as a proof of one’s faith. Sadaqah is not just giving money; the Prophet ﷺ taught that smiling at your brother, removing a harmful object from the road, or giving good advice are all forms of Sadaqah. There is also a concept called "Sadaqah Jariyah" (ongoing charity), which is an investment in something that continues to benefit people after one’s death, such as building a well, a school, or planting a tree. Muslims believe that charity does not decrease wealth but rather brings Barakah (blessing) and serves as a shade for the believer on the Day of Judgment.'
  },
  {
    id: '65',
    title: 'What is intention (Niyyah)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Niyyah is the silent purpose or intention in the heart behind every action. It is the factor that determines the spiritual value of an act.',
    longAnswer: 'The concept of Niyyah is central to Islamic practice. The very first Hadith in Sahih Bukhari states, "Actions are judged by their intentions." This means that the same physical act can have different spiritual outcomes based on why it was done. For example, a person may fast for health reasons, or they may fast for the sake of Allah; only the latter is considered worship. Niyyah must be sincere (Ikhlas), meaning the act is done solely to please God rather than for showing off (Riya). Believers are encouraged to constantly check their intentions, turning even mundane tasks like eating, sleeping, or working into acts of worship by intending them for the sake of God’s pleasure or to gain strength for His service.'
  },
  {
    id: '66',
    title: 'Why are actions judged by intention?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Intention is the soul of an action. It reflects the true state of the heart, which is what Allah looks at, rather than just physical appearances.',
    longAnswer: 'Allah is "Al-Alim" (the All-Knowing), aware of what is hidden in the breasts of men. Physical actions can be faked or done for worldly gain, but the intention is the sincere link between the servant and the Creator. Judging by intention ensures that even if a person fails to complete a good deed due to circumstances beyond their control, they are still rewarded for their sincere desire to do it. Conversely, it warns that even great-looking deeds like large donations or public prayers have no value if the heart’s intent was to gain praise from people. This system of judgment encourages a deep internal integrity and a constant focus on God rather than on human approval.'
  },
  {
    id: '67',
    title: 'What is Dawah?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Dawah is the "invitation" to Islam, sharing the message of the Quran and the life of the Prophet ﷺ with others.',
    longAnswer: 'Dawah is a responsibility for all Muslims to share the beauty and truth of their faith with those who may not know about it. It is not about forceful proselytizing but about offering an invitation with "wisdom and beautiful preaching." The most effective form of Dawah is through one’s own character (Akhlaq); when people see a Muslim who is honest, kind, and disciplined, they naturally become curious about the faith behind those actions. Dawah involves clearing up misconceptions, answering questions, and being a source of goodness in society. The goal is not necessarily to convert everyone, but to ensure that the message of God is made available to all people with clarity and dignity.'
  },
  {
    id: '68',
    title: 'Is forcing religion allowed in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'No, the Quran explicitly states, "There is no compulsion in religion." Faith must be a sincere choice made in the heart.',
    longAnswer: 'Islam teaches that true faith cannot be forced upon anyone. If a person is coerced into declaring Islam, their "faith" is not valid in the sight of God because the heart has not surrendered. The duty of the Prophet ﷺ and the believers is only to deliver the message clearly; whether someone accepts it or not is between them and Allah. Historically, under Islamic rule, non-Muslim communities were allowed to maintain their own religions, laws, and places of worship. Forcing someone to change their belief is a violation of the dignity and free will that Allah has bestowed upon every human being. The diversity of beliefs is recognized as a part of the test of this world.'
  },
  {
    id: '69',
    title: 'What does Islam say about other religions?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Islam recognizes that other religions contain truths sent by God through previous prophets, but views itself as the final and complete revelation.',
    longAnswer: 'Islam has a unique relationship with other faiths, particularly Judaism and Christianity, whose followers are called "People of the Book" (Ahl al-Kitab). Muslims believe that the original Torah and Gospel were divine revelations, but that they were altered over time by humans. Islam also acknowledges that every nation was sent a guide. Muslims are commanded to treat followers of other faiths with kindness and justice, as long as they are not fighting against the Muslims. The Quran encourages "competing with one another in good works" and leaving the final judgment of religious differences to Allah on the Day of Resurrection. While Muslims believe Islam is the only path to ultimate salvation, they are taught to respect the religious freedom of others.'
  },
  {
    id: '70',
    title: 'What is brotherhood in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Brotherhood (and sisterhood) in Islam is the spiritual bond that unites all Muslims across all races and nations.',
    longAnswer: 'Islamic brotherhood is described as a structure where believers are like "bricks in a wall," supporting each other, or like "one body"—if one part suffers, the whole body feels the pain. This bond is based on a shared faith in Allah rather than blood relations, tribe, or nationality. It requires Muslims to have sincere goodwill for one another, to protect each other’s honor, to help in times of need, and to avoid envy and backbiting. The Prophet ﷺ said, "None of you truly believes until he loves for his brother what he loves for himself." This universal brotherhood creates a global community (Ummah) that transcends all worldly divisions and provides a sense of belonging and support to every believer.'
  },
  {
    id: '71',
    title: 'What is Ummah?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'The Ummah is the global community of Muslims, regardless of their nationality, ethnicity, or language.',
    longAnswer: 'The word Ummah comes from the same root as "Umm" (mother), suggesting a community that nurtures and unites people. In Islam, the Ummah represents a collective identity that should ideally move toward common goals of worship, social justice, and mutual support. It is a supra-national community that recognizes no borders in terms of spiritual belonging. When a Muslim in one part of the world is suffering, the rest of the Ummah is encouraged to feel that pain and offer whatever help is possible, whether through prayer, political advocacy, or humanitarian aid. The Ummah is envisioned as a "middle nation" that stands as a witness for truth and morality in the world.'
  },
  {
    id: '72',
    title: 'What does Islam say about racism?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Islam strictly forbids racism. The Quran states that all humans are equal and that the only thing that distinguishes one person from another is their level of Taqwa (piety).',
    longAnswer: 'One of the most profound social messages of Islam is the absolute rejection of racial or ethnic superiority. The Quran declares that Allah created humanity from a single pair and made them into nations and tribes so that they may "know one another," not despise one another. In his final sermon, the Prophet Muhammad ﷺ explicitly stated that "An Arab has no superiority over a non-Arab, nor a non-Arab over an Arab... except by piety and good action." One of the earliest and most beloved companions of the Prophet was Bilal ibn Rabah, a formerly enslaved Black man who was given the high honor of being the first Mu\'adhin (caller to prayer). Any form of racism or tribalism is considered a remnant of "Jahiliyyah" (ignorance) and has no place in the life of a Muslim.'
  },
  {
    id: '73',
    title: 'What is patience (Sabr)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Sabr is the steadfastness and endurance shown in the face of trials, the restraint from sin, and the consistency in doing good.',
    longAnswer: 'Sabr is often translated as patience, but it is a much more active and courageous quality. It has three dimensions: "Sabr ala at-ta’ah" (perseverance in obeying God), "Sabr an al-ma’siyah" (restraint from committing sins), and "Sabr ala al-bala" (endurance during calamities). It is not about passive suffering; it is about keeping one’s composure and trusting in Allah’s wisdom when things are difficult. The Quran mentions that Allah is "with the patient" and that their reward will be without limit. Sabr is the internal anchor that allows a believer to remain stable and hopeful, preventing them from reacting with anger or despair when faced with the inevitable tests of life.'
  },
  {
    id: '74',
    title: 'What is gratitude (Shukr)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Shukr is the recognition and appreciation of Allah’s blessings, expressed through the heart, tongue, and actions.',
    longAnswer: 'Shukr is the opposite of ingratitude (Kufr). It involves realizing that every blessing—from the air we breathe to the food we eat—is a gift from Allah. A grateful person acknowledges these gifts in their heart, speaks words of "Alhamdulillah" with their tongue, and uses those blessings in a way that pleases the Giver. Allah promises in the Quran, "If you are grateful, I will surely increase you [in favor]." Gratitude is a powerful spiritual state that shifts the focus from what is lacking to what is present, leading to contentment and inner peace. It is considered a key characteristic of the prophets and a shield against the whispers of Shaytan, who seeks to make humans ungrateful.'
  },
  {
    id: '75',
    title: 'What is hypocrisy (Nifaq)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Hypocrisy is pretending to have faith on the outside while harboring disbelief or bad intentions on the inside.',
    longAnswer: 'In Islam, a hypocrite (Munafiq) is considered more dangerous than an open disbeliever because they undermine the community from within. Nifaq can be of two types: "Nifaq Akbar" (major hypocrisy in belief), which puts a person outside of Islam, and "Nifaq Asghar" (minor hypocrisy in action). The Prophet ﷺ described the signs of a hypocrite as: when he speaks he lies, when he makes a promise he breaks it, and when he is trusted he betrays that trust. While anyone can fall into these mistakes, the core of hypocrisy is a lack of sincerity and a double-faced nature. Muslims are taught to constantly fear hypocrisy in themselves and to strive for "Ikhlas" (total sincerity) in their relationship with God and people.'
  },
  {
    id: '76',
    title: 'What is backbiting (Gheebah)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Backbiting is mentioning something about a person in their absence that they would dislike, even if it is true.',
    longAnswer: 'Gheebah is a major social sin in Islam that destroys the fabric of brotherhood and trust. The Quran uses a vivid and repulsive metaphor for it, comparing backbiting to "eating the flesh of one\'s dead brother." If the thing said is true, it is backbiting; if it is false, it is "Buhtan" (slander), which is even worse. The only exceptions are when reporting a crime to an authority, seeking a fatwa, or warning others about a genuine harm. Otherwise, a Muslim is commanded to either speak good or remain silent. Guarding the tongue is considered one of the most difficult and rewarding forms of self-discipline, and it is essential for maintaining the dignity of others.'
  },
  {
    id: '77',
    title: 'What is lying’s punishment in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Lying is a major sin that leads to wickedness and, ultimately, to the Fire. It is considered incompatible with true faith.',
    longAnswer: 'The Prophet ﷺ was asked if a believer could be a coward or a miser, and he said yes, but when asked if a believer could be a liar, he said no. This highlights how fundamental honesty is to the Islamic identity. Lying destroys trust (Amanah) and leads to other sins. On the Day of Judgment, those who lied against God or committed fraud will face a severe reckoning. The punishment for lying in this world is the loss of one’s reputation and the "Barakah" in their life. However, like all sins, if a person sincerely repents and makes amends, Allah is ready to forgive. Sincerity and truthfulness (Siddiq) are the paths to Paradise, while falsehood is the path to ruin.'
  },
  {
    id: '78',
    title: 'What does Islam say about music?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'The permissibility of music is a debated topic among scholars. Most agree that music with vulgar, sinful, or distracting content is haram.',
    longAnswer: 'Scholarly opinions on music range from total prohibition of all instruments (except the hand-drum or "Duff") to the permissibility of all music that does not contain sinful lyrics or encourage haram behavior. Those who prohibit it often cite verses about "idle talk" and Hadiths about the appearance of musical instruments as signs of the end times. Those who allow it argue that the Quran does not explicitly forbid it and that many forms of music can be wholesome or even spiritually uplifting. Regardless of the legal stance, there is a consensus that anything that distracts the heart from the remembrance of Allah, accompanies alcohol and dancing, or contains lyrics contrary to Islamic morals is strictly forbidden.'
  },
  {
    id: '79',
    title: 'What does Islam say about art and drawing?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Art is encouraged in Islam, but most scholars prohibit the drawing of living beings (humans and animals) to prevent any potential for idolatry.',
    longAnswer: 'Islam has a rich tradition of art, particularly in calligraphy, geometric patterns, and architecture. The prohibition of depicting sentient beings (Taswir) is based on Hadiths that warn against trying to "imitate the creation of Allah." This was especially strict in the early days of Islam to firmly break away from pagan idol worship. Today, some scholars allow photography and non-idolatrous drawings for educational or identification purposes, while others maintain a strict ban on all such imagery. Abstract art, landscapes, and the incredibly refined art of Arabic calligraphy remain the primary outlets for artistic expression, reflecting the beauty and order of the divine creation.'
  },
  {
    id: '80',
    title: 'What is permissible entertainment in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Entertainment is allowed as long as it does not involve anything haram, does not lead to neglecting religious duties, and is wholesome.',
    longAnswer: 'Islam recognizes the human need for relaxation and joy. Permissible entertainment includes sports (the Prophet ﷺ encouraged archery, swimming, and horse riding), spending time with family and friends, storytelling, and enjoying the beauty of nature. The condition is that the activity should not involve alcohol, gambling, immodest mixing of genders, or vulgarity. Most importantly, entertainment should not become an obsession that causes a person to delay their prayers or neglect their responsibilities. The goal of "halal fun" is to refresh the mind and body so that the believer can return to their worship and work with renewed energy and a positive spirit.'
  },
  {
    id: '81',
    title: 'What is Jihad in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Jihad literally means "struggle" or "striving" in the way of Allah. It can refer to an internal spiritual struggle or an external defense of justice.',
    longAnswer: 'The term Jihad is one of the most misunderstood concepts in Islam. At its core, it means to exert effort to achieve what is good or to remove what is evil. "Jihad al-Nafs" is the internal struggle against one\'s own desires and ego to become a better person. There is also intellectual Jihad (sharing knowledge) and social Jihad (fighting for justice and the rights of the poor). External Jihad, or armed struggle, is only permissible under strict conditions: it must be in self-defense or to stop extreme oppression, it must be declared by a legitimate authority, and it must follow strict rules of engagement (e.g., no killing of women, children, elderly, or destruction of the environment). It is not an excuse for terrorism or random violence, which are strictly condemned in Islam.'
  },
  {
    id: '82',
    title: 'Difference between greater and lesser Jihad?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'The "Greater Jihad" is the internal struggle against the self, while the "Lesser Jihad" is the external armed struggle in defense of faith or justice.',
    longAnswer: 'This distinction is based on a narration where the Prophet ﷺ, returning from a battle, told his companions they were moving from the "lesser jihad" (the physical battle) to the "greater jihad" (the battle against the desires of the heart). This emphasizes that the hardest struggle a person will ever face is not against an external enemy, but against their own selfishness, arrogance, and temptations. While the physical jihad is only for certain times and specific groups of people, the greater jihad is a lifelong requirement for every single Muslim. Success in the greater jihad is what defines the true spiritual character of a believer and is the prerequisite for the success of any external effort.'
  },
  {
    id: '83',
    title: 'What does Islam say about war?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'War is a last resort permitted only for self-defense or to end oppression. It is governed by strict ethical rules to minimize harm.',
    longAnswer: 'Islam is a religion that seeks peace, but it is not pacifist; it recognizes that there are times when fighting is necessary to stop evil and protect the innocent. However, even in war, Muslims must adhere to a high moral standard. Prohibited actions include killing non-combatants, cutting down trees, killing livestock, destroying places of worship, and mistreating prisoners. Treachery and the use of excessive force are also forbidden. The Quran states that if the enemy inclines toward peace, the Muslims must also do so. The objective of war in Islam is not to gain territory or force conversions, but to restore justice and protect the religious freedom of all people.'
  },
  {
    id: '84',
    title: 'What is peace in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Peace (Salam) is the ideal state of society and the soul. It is achieved through submission to God and the establishment of justice.',
    longAnswer: 'The word "Salam" is one of the names of Allah (As-Salam, the Source of Peace) and is the universal greeting among Muslims. Peace in Islam is not just the absence of war, but a positive state of harmony, security, and well-being. This begins with "inner peace," which comes from having a sound heart and a strong connection with the Creator. When individuals are at peace with God, they are better able to build peaceful families and communities. On a global level, Islam promotes peace through treaties, diplomatic dialogue, and the protection of human rights. The ultimate goal of the Islamic message is to lead humanity to the "Abode of Peace" (Jannah) in the hereafter.'
  },
  {
    id: '85',
    title: 'What is sincerity (Ikhlas)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Ikhlas is the act of doing everything solely for the sake of Allah, without any desire for worldly praise or recognition.',
    longAnswer: 'Ikhlas is the foundation of all accepted worship. It means to "purify" one’s intentions from any "Shirk Asghar" (minor shirk), which is performing deeds to be seen by people (Riya). A person with Ikhlas is consistent in their good deeds whether they are being watched or are alone. Sincerity is what gives an action its weight on the scale of deeds; a small act done with total sincerity is far better than a massive act done for the sake of reputation. Developing Ikhlas requires constant self-reflection and a deep realization that only Allah’s approval truly matters in the end. It is the key to spiritual liberation from the opinions of others.'
  },
  {
    id: '86',
    title: 'Why is arrogance a major sin?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Arrogance (Kibr) is the root of most evil. It involves rejecting the truth and looking down upon others, which was the sin of Iblis.',
    longAnswer: 'Arrogance is one of the most destructive diseases of the heart. The Prophet ﷺ defined it as "rejecting the truth and despising people." An arrogant person forgets that all their talents, wealth, and status are gifts from Allah, not their own doing. This self-delusion creates a barrier between the person and divine guidance, as Allah says in the Quran that He will turn the arrogant away from His signs. It also leads to oppression and the mistreatment of others. The Prophet ﷺ warned that "no one with even a mustard seed of arrogance in their heart will enter Paradise." Humility (Tawadu) is the required remedy, recognizing one’s own imperfections and the inherent dignity of all of God’s creation.'
  },
  {
    id: '87',
    title: 'What does Islam say about mental health?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Islam recognizes the reality of psychological suffering and encourages seeking professional help, alongside spiritual practices, for healing.',
    longAnswer: 'The Quran and Sunnah acknowledge various states of the human psyche, from "Nafs al-Ammara" (the soul that inclines to evil) to "Nafs al-Mutma’inna" (the soul at peace). Anxiety, grief, and depression are mentioned in the stories of the prophets, such as Yaqub (Jacob) grieving for his son. Islam teaches that while prayer and remembrance of Allah are vital for spiritual well-being, they are not a substitute for medical treatment when it is needed. Early Islamic history saw the development of some of the first psychiatric hospitals in the world, where patients were treated with compassion and holistic care. A Muslim should see mental health struggles as a test from Allah that requires both spiritual resilience and practical, scientific solutions.'
  },
  {
    id: '88',
    title: 'What is dua and why is it powerful?',
    category: 'Duas',
    ageGroup: 'Adult',
    shortAnswer: 'Dua is personal supplication and conversation with Allah. It is powerful because it is a direct appeal to the One who has power over all things.',
    longAnswer: 'The Prophet ﷺ said, "Dua is the essence of worship." While Salah is a formal ritual, Dua is a spontaneous, personal connection that can happen at any time and in any language. Its power lies in the fact that it acknowledges our own weakness and total dependence on Allah. It is a way for a believer to express their needs, fears, and hopes to their Creator. Allah promises in the Quran, "Call upon Me, I will answer you." Dua has the potential to provide comfort during trials, to give strength for difficult tasks, and even to alter the course of events through divine intervention. It is the weapon of the believer and a constant source of hope in a world that can often feel overwhelming.'
  },
  {
    id: '89',
    title: 'Can dua change destiny?',
    category: 'Duas',
    ageGroup: 'Adult',
    shortAnswer: 'Yes, a Hadith states that "nothing repels destiny except dua." It is part of the divine plan that certain outcomes depend on our supplication.',
    longAnswer: 'This is a subtle point of Islamic theology. While everything is known to Allah and written in the Preserved Tablet, some things are written as "conditional." For example, Allah may have decreed that a person will face a certain hardship unless they make a specific dua, or that they will receive a certain blessing because of their supplication. In this way, our effort in asking is actually part of the destiny itself. Making dua is not "arguing" with God’s plan; it is using one part of His plan (supplication) to seek a better outcome in another part of His plan. This encourages believers to never lose hope and to always strive through prayer to improve their situation.'
  },
  {
    id: '90',
    title: 'What is the best time to make dua?',
    category: 'Duas',
    ageGroup: 'Adult',
    shortAnswer: 'While you can make dua any time, certain times are more blessed, such as the last third of the night, during rain, and between the Adhan and Iqamah.',
    longAnswer: 'Although Allah always hears His servants, the Prophet ﷺ highlighted specific "golden hours" when supplications are more likely to be accepted. One of the most powerful times is the "Tahajjud" time (the last third of the night), when Allah "descends" to the lowest heaven and asks who is calling Him so He may answer. Other recommended times include when it is raining, while prostrating (Sajdah) in prayer, on the day of Arafah, during the final hour of Friday before sunset, and when breaking the fast. The state of the heart is also crucial; a dua made with sincerity, humility, and full certainty that Allah will answer is the most effective, regardless of the timing.'
  },
  {
    id: '91',
    title: 'What is seeking knowledge in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Seeking knowledge is a lifelong journey of learning about the Creator, His religion, and the world He created to benefit society.',
    longAnswer: 'Knowledge (Ilm) in Islam is categorized into two: "Fard Ayn" (knowledge that every individual must know, like how to pray) and "Fard Kifayah" (knowledge that the community as a whole must possess, such as medicine or engineering). Seeking both types is highly encouraged and rewarded. The path to knowledge is said to lead to Paradise. It is not limited to a certain age or gender; rather, a Muslim should be a student "from the cradle to the grave." True knowledge should always lead to a greater fear and love of God and should be used to serve humanity. In Islam, the intellectual life and the spiritual life are one and the same.'
  },
  {
    id: '92',
    title: 'What does Islam say about work and livelihood?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Working to provide for oneself and one\'s family is an act of worship. Islam encourages hard work, honesty, and earning a halal income.',
    longAnswer: 'Islam strictly forbids laziness and living as a burden on others if one is capable of working. The Prophet ﷺ said that "no one has eaten better food than what they earned with their own hands." Professional excellence (Ihsan) is required in any job, whether one is a farmer, a doctor, or a cleaner. All forms of "haram" income, such as from usury, gambling, or fraud, are prohibited because they destroy the barakah in one’s life and cause social harm. Economic activity is seen as a means to achieve stability and to be able to help others through charity. A person who works with a good intention is considered to be in the "way of Allah" just like a person praying in the mosque.'
  },
  {
    id: '93',
    title: 'What is honesty in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Honesty (Sidq) is truthfulness in speech, integrity in dealings, and sincerity in intentions.',
    longAnswer: 'Honesty is one of the most praised qualities in the Quran and Sunnah. It is the opposite of falsehood and deception. A truthful person is called a "Siddiq," a title given to the closest companions of the prophets. In business, honesty means being transparent about products and not cheating on the weights or measures. In social life, it means keeping promises and being reliable. In the spiritual life, it means being honest with oneself and with Allah. Honesty leads to peace of mind and societal stability, whereas a culture of lying creates fear and corruption. The Prophet ﷺ emphasized that truthfulness leads to righteousness, and righteousness leads to Paradise.'
  },
  {
    id: '94',
    title: 'What is trust (Amanah)?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Amanah is the moral responsibility to fulfill one\'s duties and protect what has been entrusted to them by God and other people.',
    longAnswer: 'Trust is a comprehensive concept in Islam. It includes physical trusts, like a borrowed item or a secret told in confidence, as well as moral trusts, such as the responsibility of parents to their children or a ruler to his people. Our very bodies, time, and wealth are considered "Amanah" from Allah. Betraying a trust is one of the signs of hypocrisy. A person who is "Amin" (trustworthy) is respected and loved by both God and people. Upholding Amanah requires constant vigilance and integrity, ensuring that we fulfill our obligations even when no one is watching. It is the basis for all healthy relationships and a functional society.'
  },
  {
    id: '95',
    title: 'What is the role of intention in worship?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Intention (Niyyah) distinguishes an act of worship from a mere habit and determines the reward a person receives from Allah.',
    longAnswer: 'Worship in Islam is not just mechanical movement; it is a heart-centered activity. The Niyyah is what gives life to the rituals. For example, if a person remains hungry all day just because they forgot to eat, they have not fasted; they only receive the reward of fasting if their intention was to do so for Allah. Intention also allows a person to earn rewards for even "non-religious" acts, like sleeping early to be strong for Fajr prayer or being kind to a neighbor to represent the character of Islam. It is the constant internal compass that ensures all of life is directed toward the Creator.'
  },
  {
    id: '96',
    title: 'What does Islam say about time management?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Time is a precious blessing and a trust from Allah. Muslims are encouraged to use it wisely and will be questioned about how they spent it.',
    longAnswer: 'The importance of time is so great that Allah swears by various parts of the day—like the dawn, the morning light, and the passage of time—in the Quran. The Prophet ﷺ warned that two blessings are often wasted: health and free time. A Muslim’s day is naturally structured by the five daily prayers, which teach discipline and the value of time. We are taught that on the Day of Judgment, we will be asked how we spent our youth and our entire lifespan. Procrastination is discouraged, and "Barakah" (divine blessing in time) is sought through early rising and avoiding useless talk or activities. Managing time is an essential part of being a responsible servant of God.'
  },
  {
    id: '97',
    title: 'What is the purpose of life in Islam?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'The purpose of life is to know, love, and worship Allah alone, and to act as His "Khalifa" (steward) on earth.',
    longAnswer: 'The Quran explicitly states, "I did not create the jinn and mankind except to worship Me." This worship (Ibadah) is not just about rituals; it is a comprehensive term for anything that Allah loves and is pleased with. Life is a temporary journey and a test to see who is "best in conduct." By recognizing the Creator and living according to His guidance, human beings fulfill their true potential and find lasting fulfillment. We are also tasked with being stewards of the earth, meaning we must protect the environment and establish justice and mercy in society. The ultimate goal is to return to Allah with a sound heart and earn His eternal pleasure in the afterlife.'
  },
  {
    id: '98',
    title: 'How can one become closer to Allah?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Closeness to Allah is achieved through the fulfillment of obligatory duties, followed by voluntary acts of worship, dhikr, and good character.',
    longAnswer: 'A famous Hadith Qudsi explains that the best way to get close to Allah is through what He has made obligatory (Salah, Zakat, etc.). After that, a person continues to draw near through voluntary acts ("Nawafil"), such as night prayers, extra fasts, and constant remembrance (Dhikr). Loving the Quran, following the Sunnah of the Prophet ﷺ, and serving humanity with a sincere heart are also primary paths to divine intimacy. Closeness to God is not a physical distance but a spiritual state where the heart becomes filled with His light, leading to a state of peace and contentment regardless of external circumstances. It is a lifelong journey of "Tazkiyah" (purification of the soul).'
  },
  {
    id: '99',
    title: 'What makes a good Muslim?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'A good Muslim is one who combines sound belief with righteous actions and excellent character (Akhlaq).',
    longAnswer: 'Being a good Muslim involves two vertical and horizontal dimensions: "Haqq Allah" (the rights of God) and "Haqq al-Ibad" (the rights of people). A person must be diligent in their worship and sincerely believe in the oneness of God. Simultaneously, they must be a source of goodness in society—honest, kind, patient, and just. The Prophet ﷺ said, "The best of you are those with the best character." He also said, "A Muslim is the one from whose tongue and hand the people are safe." Therefore, rituals alone do not make a person complete in faith; true success is found in the integration of devotion to God with service and kindness to His creation.'
  },
  {
    id: '100',
    title: 'Why is Islam considered a complete way of life?',
    category: 'Faith & Doubt',
    ageGroup: 'Adult',
    shortAnswer: 'Islam provides guidance for every aspect of existence—spiritual, social, economic, political, and personal—ensuring harmony in all areas of life.',
    longAnswer: 'Unlike many modern philosophies that separate the "sacred" from the "secular," Islam views all parts of life as interconnected under the sovereignty of God. It offers a clear framework for spiritual devotion, but also provides detailed ethics for business, rules for governance, guidelines for family life, and even personal habits like hygiene and manners. It addresses the needs of the body, the mind, and the soul. By following this holistic guidance, a person can achieve a balanced life where their worldly work is sanctified by their spiritual intention. This completeness ensures that a believer never feels lost, providing a moral compass that remains relevant across all times and cultures.'
  }
];

interface AskAndLearnProps {
  onAskAgent?: (query: string) => void;
}

const AskAndLearn: React.FC<AskAndLearnProps> = ({ onAskAgent }) => {
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [mf, setMf] = useState<string>('All'); 
  const [sf, setSf] = useState<string>('All'); 
  const [search, setSearch] = useState('');
  const [answerType, setAnswerType] = useState<'Short' | 'Long'>('Short');
  
  const listScrollRef = useRef<HTMLDivElement>(null);
  const savedScrollPos = useRef<number>(0);

  const mainFilters = ['All', 'Prayers', 'Quran', 'Fasting', 'Zakat', 'Duas', 'Faith & Doubts', 'Prophets & History'];
  const subFilters = ['All', 'Kids', 'Teen', 'Adult'];

  const filteredQuestions = useMemo(() => {
    let results = QUESTIONS.filter(q => {
      // Normalizing categories for filtering
      const categoryKey = q.category === 'Faith & Doubt' ? 'Faith & Doubts' : 
                          q.category === 'Prayer' ? 'Prayers' : q.category;
      
      const matchesMf = mf === 'All' || categoryKey === mf;
      const matchesSf = sf === 'All' || q.ageGroup === sf;
      return matchesMf && matchesSf;
    });

    if (search.trim()) {
      const s = search.toLowerCase();
      results = results.filter(q => 
        q.title.toLowerCase().includes(s) || 
        q.shortAnswer.toLowerCase().includes(s) ||
        q.longAnswer.toLowerCase().includes(s)
      );
    }
    return results;
  }, [mf, sf, search]);

  useLayoutEffect(() => {
    if (!activeQuestion && listScrollRef.current) {
      listScrollRef.current.scrollTop = savedScrollPos.current;
    }
  }, [activeQuestion]);

  const handleQuestionSelect = (q: Question) => {
    if (listScrollRef.current) {
      savedScrollPos.current = listScrollRef.current.scrollTop;
    }
    setActiveQuestion(q);
  };

  if (activeQuestion) {
    return (
      <div className="flex flex-col bg-ummah-bg-light dark:bg-ummah-bg-dark h-full scroll-smooth animate-in slide-in-from-right duration-300">
        <div className="p-3 sticky top-0 bg-white/90 dark:bg-ummah-bg-dark/90 backdrop-blur-md z-20 flex items-center justify-between border-b border-black/5 dark:border-white/5">
           <button 
            onClick={() => setActiveQuestion(null)}
            className="flex items-center gap-1.5 text-ummah-icon-active-light font-bold text-[9px] uppercase tracking-widest"
           >
             <ChevronLeft size={14} /> Back
           </button>
           <h4 className="text-[9px] font-black text-ummah-gold uppercase tracking-widest">{activeQuestion.category} • {activeQuestion.ageGroup}</h4>
        </div>

        <div className="p-6 space-y-4 pb-32">
           <h2 className="premium-header text-xl font-black text-ummah-text-light dark:text-ummah-text-dark leading-tight tracking-tighter">
             {activeQuestion.title}
           </h2>

           <div className="flex justify-center">
              <div className="bg-slate-100 dark:bg-ummah-card-dark p-0.5 rounded-xl flex gap-0.5 border border-black/5 dark:border-white/5">
                 {(['Short', 'Long'] as const).map((t) => (
                   <button
                    key={t}
                    onClick={() => setAnswerType(t)}
                    className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                      answerType === t 
                        ? 'bg-ummah-icon-active-light text-white shadow-sm' 
                        : 'text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40'
                    }`}
                   >
                     {t} Response
                   </button>
                 ))}
              </div>
           </div>

           <div className="animate-in fade-up duration-500">
              <div className={`p-6 rounded-[2rem] bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 shadow-soft relative overflow-hidden`}>
                <div className="absolute top-0 left-0 w-1 h-full bg-ummah-icon-active-light/20"></div>
                <p className="text-sm font-medium text-ummah-text-light/90 dark:text-ummah-text-secondary-dark leading-relaxed text-left">
                   {answerType === 'Short' ? activeQuestion.shortAnswer : activeQuestion.longAnswer}
                </p>
              </div>
           </div>

           <div className="pt-6 border-t border-black/5 dark:border-white/5 space-y-3">
              <button 
                onClick={() => onAskAgent?.(`Please provide more authentic Islamic context and sources regarding this topic: ${activeQuestion.title}`)}
                className="w-full py-4 bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark text-white rounded-[1.5rem] font-black text-[9px] uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                Deep Dive with Ummah AI <ArrowRight size={14} />
              </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={listScrollRef} className="h-full bg-ummah-bg-light dark:bg-ummah-bg-dark transition-colors relative scroll-smooth">
      <div className="bg-ummah-bg-light dark:bg-ummah-bg-dark pt-3 px-5 pb-2 space-y-1.5 border-b border-black/5 dark:border-white/5">
        
        <div className="flex items-center gap-1.5 opacity-60">
           <MessageSquareQuote size={10} className="text-ummah-gold" />
           <p className="text-[7px] font-black text-ummah-text-light dark:text-ummah-text-secondary-dark uppercase tracking-widest leading-none">
             Consult with a qualified local scholar for specific guidance.
           </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="premium-header text-lg font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tighter leading-none uppercase">Ask & Learn</h2>
          <div className="p-1 bg-ummah-mint dark:bg-white/5 border border-ummah-icon-active-light/10 rounded-lg flex gap-1 items-center">
             <Info size={10} className="text-ummah-icon-active-light shrink-0" />
             <p className="text-[6px] text-ummah-text-light/60 dark:text-ummah-text-secondary-dark font-black uppercase tracking-widest">
               Curated
             </p>
          </div>
        </div>

        <div className="sticky top-0 z-30 bg-ummah-bg-light dark:bg-ummah-bg-dark py-2 -mx-5 px-5">
           <div className="relative group">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ummah-icon-inactive-light group-focus-within:text-ummah-icon-active-light transition-colors" size={14} />
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full pl-9 pr-6 py-1.5 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-xl focus:ring-1 focus:ring-ummah-icon-active-light/20 outline-none transition-all shadow-soft text-[11px] font-bold text-ummah-text-light dark:text-ummah-text-dark"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
        </div>

        <div className="space-y-1.5 pb-1">
           <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {mainFilters.map(f => (
                <button 
                  key={f}
                  onClick={() => setMf(f)}
                  className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                    mf === f 
                      ? 'bg-ummah-icon-active-light border-ummah-icon-active-light text-white shadow-sm' 
                      : 'bg-white dark:bg-ummah-card-dark border-black/5 dark:border-white/5 text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40'
                  }`}
                >
                  {f}
                </button>
              ))}
           </div>
           <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1 p-0.5 bg-black/5 dark:bg-white/5 rounded-xl px-2">
                <Filter size={8} className="text-ummah-text-light/30" />
                {subFilters.map(f => (
                  <button 
                    key={f}
                    onClick={() => setSf(f)}
                    className={`px-1.5 py-0.5 rounded-lg text-[7px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      sf === f 
                        ? 'bg-ummah-icon-active-light text-white shadow-xs' 
                        : 'text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
           </div>
        </div>
      </div>

      <div className="px-5 pt-3 pb-32 space-y-2.5">
         {filteredQuestions.length === 0 ? (
           <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 bg-ummah-mint dark:bg-white/5 rounded-[1.25rem] flex items-center justify-center mx-auto text-ummah-icon-active-light shadow-inner">
                 <Search size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-[11px] font-black text-ummah-text-light dark:text-ummah-text-dark uppercase tracking-widest">No results</h3>
                <p className="text-[8px] text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40 font-bold uppercase tracking-widest">Adjust your search or filters.</p>
              </div>
           </div>
         ) : (
           filteredQuestions.map(q => (
             <QuestionCard key={q.id} q={q} onClick={() => handleQuestionSelect(q)} />
           ))
         )}
      </div>
    </div>
  );
};

const QuestionCard: React.FC<{ q: Question; onClick: () => void }> = ({ q, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full p-3.5 bg-white dark:bg-ummah-card-dark border border-black/5 dark:border-white/5 rounded-[1.5rem] shadow-soft hover:border-ummah-icon-active-light/20 transition-all text-left flex items-center justify-between group"
  >
     <div className="space-y-1 max-w-[85%]">
        <h3 className="text-[11px] font-bold text-ummah-text-light dark:text-ummah-text-dark leading-snug tracking-tight group-hover:text-ummah-icon-active-light transition-colors">{q.title}</h3>
        <div className="flex gap-1">
           <span className="text-[6px] font-black uppercase tracking-widest text-ummah-gold bg-ummah-gold/5 px-1 py-0.5 rounded-md border border-ummah-gold/10">{q.category}</span>
           <span className="text-[6px] font-black uppercase tracking-widest text-ummah-icon-active-light bg-ummah-icon-active-light/5 px-1 py-0.5 rounded-md border border-ummah-icon-active-light/10">{q.ageGroup}</span>
        </div>
     </div>
     <div className="p-1.5 bg-slate-50 dark:bg-white/5 rounded-lg group-hover:bg-ummah-icon-active-light group-hover:text-white transition-all shadow-inner">
        <ChevronRight size={12} strokeWidth={3} />
     </div>
  </button>
);

export default AskAndLearn;