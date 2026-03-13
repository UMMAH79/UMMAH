import React, { useState, useEffect } from 'react';
import { 
  BookMarked, 
  Calendar as CalendarIcon, 
  ChevronLeft,
  Sparkles,
  ArrowRight,
  Clock,
  Library,
  CalendarCheck,
  Zap,
  MessageCircle,
  ChevronRight,
  Calculator,
  Heart,
  Star,
  Search,
  Shield,
  Activity,
  UserCheck,
  HeartPulse,
  Brain,
  Timer,
  Compass,
  ChevronDown,
  Flame,
  CloudSun,
  Users,
  MessageSquareQuote,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import DuaCollection from './DuaCollection';
import IslamicCalendar from './IslamicCalendar';
import FastingTracker from './FastingTracker';
import PrayerTimes from './PrayerTimes';
import PrayerTrackerCard from './PrayerTrackerCard';
import HadithBrowser from './HadithBrowser';
import TasbihCounter from './TasbihCounter';
import AskAndLearn from './AskAndLearn';
import ZakatCalculator from './ZakatCalculator';
import NamesOfAllah from './NamesOfAllah';
import ProphetStories from './ProphetStories';
import { useTranslation } from '../hooks/useTranslation';
import { LocationData, PrayerTimes as IPrayerTimes, UserSettings, HomeSubFeature, AppMode } from '../types';

interface ArticleSection {
  heading: string;
  content: string;
}

interface Article {
  id: string;
  title: string;
  category: string;
  intro: string; 
  sections: ArticleSection[];
  reflection?: string;
  tags?: string[]; // Hidden keywords for smart search
}

const MARRIAGE_ARTICLES: Article[] = [
{
  id: 'marriage-pressure',
  title: 'What if I’m not ready but everyone is pressuring me to marry?',
  category: 'Marriage',
  intro: 'Marriage in Islam is described as sakinah — tranquility. But pressure creates the opposite of sakinah. It creates anxiety, guilt, and internal conflict.',
  sections: [
    { heading: 'INTRODUCTION', content: 'Marriage in Islam is described as sakinah — tranquility. But pressure creates the opposite of sakinah. It creates anxiety, guilt, and internal conflict. When everyone around you says, “It’s time,” but your heart whispers, “I’m not ready,” the tension becomes exhausting. You start questioning yourself. Am I immature? Am I sinful for delaying? Am I overthinking? Or am I protecting something fragile inside me? This question is not rebellion. It is responsibility. Wanting to enter marriage with awareness rather than pressure shows that you understand the seriousness of the commitment.' },

    { heading: 'WHAT DOES “NOT READY” ACTUALLY MEAN?', content: 'Not ready does not always mean rejecting marriage. Often it means you recognize its weight. Marriage is not only love or attraction. It requires emotional stability, financial responsibility, patience during conflict, and the ability to compromise. It means sharing your life with someone and being accountable for their emotional well-being as well. Some people delay marriage because they are still healing from past experiences, trying to stabilize their career, strengthening their faith, or learning how to manage their own emotions. Recognizing these realities is not weakness. It is maturity.' },

    { heading: 'WHY DOES PRESSURE FEEL SO HEAVY?', content: 'Family pressure often comes from concern, culture, and fear. Parents may worry about your future, your reputation, or the possibility of falling into sinful relationships. In many cultures, marriage is seen as a life milestone that must happen within a certain age. When someone delays it, people become anxious and start applying pressure. However, emotional readiness does not follow a calendar. Pressure feels heavy because it removes your sense of choice and replaces it with guilt. Instead of seeing marriage as a meaningful step, you begin to see it as something you must do to satisfy others.' },

    { heading: 'THE DEEPER INTERNAL CONFLICT', content: 'When pressure increases, the mind becomes divided. One part of you fears marrying too early and entering a relationship you are not prepared to sustain. Another part fears waiting too long and losing a good opportunity or disappointing your family. This internal conflict can create anxiety, overthinking, and emotional exhaustion. You may start imagining worst-case scenarios from both directions. The mind becomes noisy because it is trying to protect you from regret.' },

    { heading: 'THE PATH FORWARD', content: 'The healthiest step is to define readiness for yourself. Sit quietly and think about what emotional, financial, and spiritual stability would make you confident entering marriage. Write these things down. Work toward them gradually. Strengthen your character, patience, communication skills, and relationship with Allah. Marriage does not automatically fix personal struggles; it often magnifies them. When you become stronger as a person, you become a better partner. At the same time, communicate respectfully with your family. Explain your reasons calmly and show them that your delay comes from responsibility, not rebellion.' },

    { heading: 'BALANCING RESPONSIBILITY AND TRUST', content: 'While preparation is important, perfection is not required for marriage. No one enters marriage completely ready. What matters is sincere effort, willingness to grow, and trust in Allah. If a good opportunity appears and you feel reasonably prepared, do not let fear prevent you from moving forward. Preparation and trust should exist together.' }
  ],
  reflection: 'Marriage is sunnah. But justice is fard. Entering a marriage unprepared and harming someone emotionally is not righteousness. Delay is not sinful when the intention is growth and responsibility. True readiness appears when marriage stops feeling like pressure and starts feeling like a responsibility you are willing to carry.',
  tags: ['marriage', 'pressure', 'ready', 'age', 'parents', 'guilt', 'anxiety', 'timeline', 'responsibility', 'family']
},
{
  id: 'love-vs-attachment',
  title: 'How do I know if this is love or attachment?',
  category: 'Marriage',
  intro: 'Love feels intense. Attachment feels intense. Both make your heart race. Both keep you awake at night. But only one brings peace.',
  sections: [
    { heading: 'INTRODUCTION', content: 'Love feels intense. Attachment feels intense. Both can make your heart race, distract your thoughts, and keep you awake at night. You may replay conversations, wait for messages, and feel emotionally invested in the other person. Because the emotions feel similar, many people confuse attachment with love. The difference is not always obvious at first, but the long-term effects are very different.' },

    { heading: 'UNDERSTANDING THE EMOTIONAL DIFFERENCE', content: 'Love tends to be calm and stable over time. It grows through respect, trust, shared values, and patience. It allows both people to maintain their identity while caring deeply for each other. Attachment, however, often feels unstable. It creates emotional highs when the person gives attention and emotional lows when they do not. Love says, “I value you.” Attachment says, “I cannot function without you.” Love supports independence. Attachment creates dependency.' },

    { heading: 'WHY ATTACHMENT FEELS SO POWERFUL', content: 'Attachment often develops when someone fills an emotional gap in your life. If a person feels lonely, insecure, or emotionally neglected, attention from someone new can feel extremely powerful. The brain begins to associate that person with comfort and validation. Over time this creates dependency. Instead of simply appreciating the person, you begin to rely on them to regulate your emotions and self-worth.' },

    { heading: 'THE SPIRITUAL DIMENSION', content: 'One of the most honest ways to evaluate a relationship is to look at its effect on your spiritual life. Does this relationship bring you closer to Allah or distract you from Him? Does it encourage honesty, modesty, and responsibility? Or does it lead to secrecy, guilt, and emotional chaos? Love that is aligned with halal intentions usually brings peace and clarity. Attachment often creates anxiety and secrecy.' },

    { heading: 'HEALING THE ATTACHMENT', content: 'If you suspect the feeling is attachment, focus on strengthening yourself first. Rebuild your routines, goals, friendships, and personal growth. Strengthen your connection with Allah through prayer, reflection, and learning. When your life becomes balanced and full, your emotions become healthier as well. From that place of stability, love becomes a conscious choice rather than an emotional dependency.' },

    { heading: 'WHEN LOVE IS REAL', content: 'Real love does not demand constant emotional reassurance. It respects boundaries and values long-term commitment. It grows through patience, honesty, and responsibility. When love is genuine and halal, it brings sakinah — a sense of calm, security, and trust.' }
  ],
  reflection: 'Love and attachment can feel similar in the beginning, but their outcomes are different. Love brings stability, respect, and peace. Attachment brings anxiety and dependency. The more a relationship aligns with honesty, faith, and commitment, the more likely it is to be real love.',
  tags: ['love', 'attachment', 'relationship', 'feelings', 'peace', 'dependency', 'obsession', 'emotional', 'security']
},
  {
    id: 'love-marriage',
    title: 'Is doing love marriage haram in Islam?',
    category: 'Marriage',
    intro: 'The phrase “love marriage” creates emotional reactions in many Muslim communities. The real issue is how that love developed and how it is handled.',
    sections: [
      { heading: 'INTRODUCTION', content: 'The phrase “love marriage” creates emotional reactions in many Muslim communities. Some immediately label it haram. Others defend it strongly. But the real issue is not whether two people love each other before marriage. The real issue is how that love developed and how it is handled. Islam does not oppose love. Islam regulates relationships to protect dignity, faith, and emotional well-being.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'When someone asks this question, they are usually afraid that choosing their own spouse based on feelings may be sinful. They may have grown up hearing that only arranged marriage is “Islamic.” They may also feel guilty if they developed feelings before involving family. The deeper fear is this: “Did my emotions already make me sinful?”' },
      { heading: 'WHY DOES THIS CONFUSION HAPPEN?', content: 'This confusion happens because culture and religion are mixed together. In some societies, arranged marriages are traditional, so anything outside that structure feels rebellious. At the same time, modern society promotes dating culture — private relationships, physical closeness, emotional attachment without commitment. People assume that rejecting Western dating automatically means rejecting love-based choice. But Islam does not demand blind marriage decisions. Nor does it allow uncontrolled romantic freedom. It creates a balanced path.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam allows a person to choose their spouse. Consent is required for both man and woman. A forced marriage is not valid. The Prophet (PBUH) approved marriages based on mutual interest and compatibility. Khadijah (RA) chose the Prophet (PBUH). Many companions married people they personally desired. However, Islam forbids haram interactions before marriage. Secret dating, physical intimacy before nikah, emotional relationships that lead toward zina are prohibited. If “love marriage” means two people developed feelings but maintained modesty, involved guardians, and proceeded properly—it is not haram. If it was built upon private dating and intimacy, the sin lies in those actions, not the marriage itself.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'If someone has feelings for another person, the first step is honesty with oneself. Has the interaction been within Islamic limits? If mistakes occurred, repent sincerely. Then correct the path. Remove secrecy. Involve families or guardians. Set clear intentions toward marriage. Reduce unnecessary interaction until engagement becomes formal. Seek istikhara and advice.' }
    ],
    reflection: 'Islam does not fear love. It fears chaos. Love within boundaries becomes mercy. Love without boundaries becomes destruction. The goal is not to suppress the heart — it is to discipline it.',
    tags: ['love marriage', 'haram', 'dating', 'choosing', 'spouse', 'zina', 'feelings', 'sin', 'halal', 'romance']
  },
  {
    id: 'proposing-marriage',
    title: 'Is proposing someone haram in Islam?',
    category: 'Marriage',
    intro: 'Marriage cannot happen without initiative. Yet many Muslims hesitate, fearing that expressing interest may be immodest or sinful.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Marriage cannot happen without initiative. Someone must take the first step. Yet many Muslims hesitate, fearing that expressing interest may be immodest or sinful. Cultural shyness is sometimes mistaken for religious prohibition.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'This question often reflects insecurity. A man may fear appearing desperate. A woman may fear being judged. The real concern is whether initiating interest crosses Islamic modesty.' },
      { heading: 'WHY DOES THIS CONFUSION HAPPEN?', content: 'In some cultures, marriage discussions are fully handled by families. So direct expression feels inappropriate. For women especially, societal expectations may discourage initiative. But Islam is not built on cultural embarrassment. It is built on dignity and clarity.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'There is nothing haram about proposing marriage respectfully. A man may approach a woman’s guardian. A woman may express interest through a trusted intermediary. Khadijah (RA) did exactly this. What is forbidden is flirtation, seduction, or emotional manipulation disguised as “proposal.” The intention must be serious and directed toward nikah. Communication must remain modest and purposeful.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'If you are interested in someone, <article class=""></article>urify your intention. Ask yourself whether you are ready for marriage emotionally and financially. If yes, approach respectfully. Involve guardians early. Keep conversations limited to necessary topics about compatibility, values, and life goals. Avoid private emotional bonding before commitment. Seek istikhara. Accept the outcome gracefully. Rejection is not obedience. It is redirection by Allah.' }
    ],
    reflection: 'Proposing is not haram. Playing with hearts is. When done with sincerity and modesty, proposal is the first step toward halal companionship.',
    tags: ['proposing', 'interest', 'modesty', 'marriage', 'initiative', 'khadijah', 'halal', 'asking']
  },
{
  id: 'alone-in-marriage',
  title: 'I Feel Completely Alone in My Marriage',
  category: 'Marriage',
  intro: 'There are marriages where two people share the same home yet feel emotionally distant. You may fulfill responsibilities yet feel invisible.',
  sections: [
    { heading: 'INTRODUCTION', content: 'There are marriages where two people share the same home yet feel emotionally distant. You may speak every day and fulfill responsibilities, yet feel invisible inside the relationship. The loneliness is not physical absence but emotional absence. Over time, this quiet distance becomes heavier than open conflict.' },

    { heading: 'WHAT DOES THIS MEAN?', content: 'Feeling alone in marriage often means emotional connection has weakened. Conversations may have become transactional rather than meaningful. You might hesitate to share your struggles because you expect dismissal or indifference. Emotional safety may no longer exist, even though the marriage technically continues.' },

    { heading: 'WHY DOES THIS HAPPEN?', content: 'Emotional distance in marriage usually develops slowly. Stress, work pressure, unresolved arguments, lack of communication, and unmet expectations can gradually create walls between spouses. Sometimes both partners assume the other person no longer cares, so they withdraw even more. In other cases, one partner may simply be unaware of how lonely the other feels.' },

    { heading: 'ISLAMIC PERSPECTIVE', content: 'Marriage in Islam is meant to provide tranquility, love, and mercy. Emotional presence is part of responsibility, not optional kindness. The Prophet ﷺ showed patience, gentleness, and emotional attentiveness toward his family. Islam does not define marriage as simply sharing a household. A healthy marriage requires compassion, communication, and mutual care.' },

    { heading: 'WHAT CAN YOU DO?', content: 'If you feel alone in your marriage, try to address the problem calmly rather than silently carrying the pain. Honest conversation can sometimes reveal misunderstandings that built up over time. Express your feelings clearly without accusation. Focus on rebuilding small moments of connection such as shared time, respectful conversation, and mutual understanding.' },

    { heading: 'WHEN THE PROBLEM CONTINUES', content: 'If the loneliness continues despite sincere effort, it may help to involve a trusted mediator, counselor, or family elder who understands the importance of fairness and privacy. Islam encourages reconciliation and wise guidance when a marriage faces emotional difficulty.' }
  ],
  reflection: 'Loneliness in marriage is painful but not always permanent. Many relationships revive when humility replaces pride and when both partners become willing to listen again. Turn to Allah for guidance while also taking thoughtful steps toward healing.',
  tags: ['marriage', 'alone', 'lonely', 'distance', 'disconnect', 'invisible', 'communication', 'unhappy']
},
  {
    id: 'lost-attraction',
    title: 'I Have Lost Emotional and Physical Attraction Toward My Spouse',
    category: 'Marriage',
    intro: 'Attraction in marriage is emotional, intellectual, and physical. Over time, you may notice a decline in desire and connection.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Attraction in marriage is emotional, intellectual, and physical. Over time, you may notice a decline in desire and connection. This can create guilt and confusion. You may question whether something is wrong with you. Avoidance of intimacy may increase. This internal struggle can damage trust if ignored. It often feels isolating and difficult to admit.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'Loss of attraction often signals deeper emotional issues. It may reflect unresolved resentment or emotional hurt. Stress and exhaustion can drain desire. Unrealistic expectations influenced by media can <article class=""></article>istort perception. Emotional disconnection reduces physical closeness naturally. When admiration fades, attraction weakens. This does not always mean love is gone, but it signals underlying imbalance.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'Routine can reduce novelty in long-term relationships. Unresolved conflicts erode respect. Negative comparisons poison perception. Personal insecurity may project onto the spouse. Lack of appreciation transforms affection into indifference. Stress reduces emotional energy. Spiritual stagnation can affect emotional vitality. Attraction weakens when emotional warmth declines. Respect and gratitude are essential foundations.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam recognizes intimacy as an important right and responsibility within marriage. Mutual satisfaction strengthens bonds and protects modesty. Neglecting intimacy can create harm. However, physical changes over time are natural. True companionship extends beyond appearance. Attraction must be nurtured through kindness, appreciation, and emotional safety. Islam promotes fairness, effort, and mercy in maintaining marital harmony.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'Reflect privately on whether expectations are realistic. Identify unresolved resentment that may block attraction. Communicate respectfully about emotional needs. Increase positive interactions intentionally. Avoid constant criticism. Reduce unhealthy comparisons. Reintroduce small romantic gestures. Strengthen spiritual connection through shared worship. Prioritize emotional and physical self-care. If deeper psychological barriers exist, seek qualified counseling. Attraction often rebuilds when respect and appreciation are restored.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'If attraction continues to decline despite sincere effort, reassess underlying emotional wounds. Avoid applicant decisions based on temporary states. Long-term commitment includes difficult seasons. Seek mediation before considering separation. Approach major decisions with prayer and consultation.' }
    ],
    reflection: 'Loss of attraction does not automatically mean the end of marriage. It often signals areas needing attention and repair. Emotional and spiritual reconnection can restore warmth. Focus on gratitude and respect. With sincere effort and dua, balance can return.',
    tags: ['attraction', 'spouse', 'desire', 'physical', 'emotional', 'intimacy', 'resentment', 'marriage', 'sex', 'interest']
  },
  {
    id: 'polygyny-perception',
    title: 'Why do people think second marriage is cheating with the first wife while in Islam it’s halal?',
    category: 'Marriage',
    intro: 'Few topics create as much emotional reaction as polygyny. This tension comes from misunderstanding, cultural shifts, and misuse of the ruling.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Few topics create as much emotional reaction as polygyny. When people hear about a man taking a second wife, many immediately label it betrayal or cheating. Yet Islam clearly permits a man to marry up to four wives under strict conditions. So why is there such a strong emotional clash between Islamic law and modern perception? This tension comes from misunderstanding, cultural shifts, emotional pain, and misuse of the ruling.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'When someone says “second marriage is cheating,” they usually mean it feels like emotional betrayal. They are not necessarily arguing about legality. They are reacting to the emotional impact on the first wife. In modern society, marriage is strongly associated with exclusivity — one man, one woman. So when polygyny is mentioned, it clashes with the romantic ideal of “you are enough for me forever.” The conflict is not just legal. It is emotional.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'There are several layers behind this reaction. First, cultural conditioning. Many Muslim societies today function monogamously. So polygyny feels abnormal even though it is Islamically allowed. Second, emotional insecurity. A wife may feel replaced, compared, or no longer valued. Jealousy itself is natural — even the wives of the Prophet ﷺ experienced it. Third, abuse of the ruling. Some men misuse the permission by hiding marriages, neglecting justice, or emotionally abandoning the first wife. Fourth, modern romantic ideology promotes emotional exclusivity as proof of love.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam permits a man to marry up to four wives under one strict condition: justice. Allah says if you fear you cannot be just, then marry only one. Justice includes financial responsibility, equal time, fair treatment, and protection of rights. Polygyny is a permission, not an obligation. Cheating in Islam means secret betrayal or unlawful relationship. A second marriage done openly, lawfully, with nikah, rights fulfilled, and no deception is not cheating in Islamic law. However, if a man lies or causes injustice, then the sin is in the injustice — not in the existence of a second wife.' },
      { heading: 'STEP-BY-STEP UNDERSTANDING', content: 'First, understand that halal does not mean easy. Something can be lawful but emotionally difficult. Second, separate cultural reaction from Islamic ruling. Third, understand that justice is not optional. If a man cannot handle financial and emotional balance, he should not pursue it. Fourth, recognize that jealousy is natural. Islam does not blame a wife for feeling hurt. Sin is in injustice, not in emotion.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'If the concept continues to create anger, study it deeply rather than emotionally reacting. Many people <article class=""></article>eject polygyny without studying its historical and social context. If someone is personally facing this situation, consultation with scholars and counselors is necessary. Each case is unique. Polygyny is not a universal solution. Nor is it automatically oppression. It depends on justice and intention.' }
    ],
    reflection: 'Islam allows what humans sometimes struggle to accept emotionally. Polygyny is halal — but it is heavy with responsibility. When justice is absent, it becomes harmful. When justice is upheld, it remains within the boundaries Allah permitted. The real issue is not whether it is allowed. The real issue is whether it is practiced with taqwa.',
    tags: ['second wife', 'cheating', 'polygyny', 'justice', 'rights', 'halal', 'jealousy', 'betrayal', 'multiple wives']
  },
  {
    id: 'arranged-vs-love',
    title: 'Is arranged marriage more Islamic than love marriage?',
    category: 'Marriage',
    intro: 'This question comes from confusion between culture and religion. Many Muslims grow up hearing that arranged marriage is the “Islamic way,” while love marriage is seen as modern, risky, or less religious.',
    sections: [
      { heading: 'INTRODUCTION', content: 'This question comes from confusion between culture and religion. Many Muslims grow up hearing that arranged marriage is the “Islamic way,” while love marriage is seen as modern, risky, or less religious. Because of this, people begin to feel guilty for developing feelings for someone, even when their intention is marriage. The real issue is not arranged versus love. The real issue is whether the path taken is <article class=""></article>alal, respectful, and responsible.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'When someone asks this question, they are usually asking whether Islam prefers family-arranged proposals over individuals choosing their own spouse. It reflects fear — fear that choosing someone yourself might be sinful, less blessed, or less accepted by Allah. Some people also worry that loving someone before marriage automatically makes the relationship haram.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'This belief exists mainly because many Muslim societies traditionally practice arranged marriages. Over generations, culture and religion became blended. What was cultural became labeled as religious. Additionally, there is fear that love leads to zina, emotional attachment, and loss of control. To prevent sin, people sometimes conclude that eliminating love altogether is the safest religious position. But Islam does not erase human emotions. It regulates them.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam does not command arranged marriage as the only valid form of marriage. Nor does it forbid choosing your own spouse. What Islam requires is consent from both individuals, the presence of a guardian for the bride according to the majority of scholars, witnesses, mahr, and public acknowledgment. The method of meeting is not the deciding factor. The boundaries maintained during the process are what matter. The Prophet ﷺ never declared that arranged marriage is superior in reward to a marriage initiated by mutual interest. What Islam prohibits is secret dating, physical intimacy before nikah, emotional dependency that leads to sin, and relationships that lack seriousness.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'If you are struggling with guilt, first examine your intention. Are you seeking companionship for the sake of stability and deen, or are you seeking emotional excitement? If you genuinely want marriage, then involve families early. Avoid secrecy. Limit unnecessary interaction. Perform istikhara. Seek advice from trusted elders. Keep dignity in the process. Islam honors choice, and forced marriage is not valid in Islam.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'If society continues to shame love marriages as un-Islamic without understanding Islamic law properly, young people will not stop loving. Instead, they will hide. Secrecy increases sin. Transparency protects dignity. Islam encourages structured, halal pathways — not emotional suppression.' }
    ],
    reflection: 'The most Islamic marriage is not defined by how it started. It is defined by how it is maintained. A marriage filled with taqwa, mercy, patience, and responsibility is the one that earns Allah’s blessing — regardless of whether it was arranged or chosen.',
    tags: ['arranged', 'chosen', 'islamic', 'culture', 'tradition', 'love', 'marriage', 'guilt', 'parents']
  },
  {
    id: 'secret-nikah',
    title: 'Is secret nikah valid?',
    category: 'Marriage',
    intro: 'Secret nikah is often discussed in whispers. Some people defend it as a solution to strict families. Others criticize it as irresponsible.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Secret nikah is often discussed in whispers. Some people defend it as a solution to strict families. Others criticize it as irresponsible. The truth lies in understanding both its legal validity and its moral consequences. Marriage in Islam is not meant to be hidden like a wrongdoing. It is meant to be dignified and publicly recognized.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'This question usually means whether a marriage performed quietly without informing family or the community is Islamically acceptable. Sometimes it involves a proper wali and witnesses but is hidden socially. Other times it is done without fulfilling all conditions, under the excuse of urgency or fear.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'Secret nikah usually happens because of fear. Fear of parental rejection, cultural barriers, financial instability, or social judgment. Sometimes it is an attempt to quickly make a relationship halal without preparing for the responsibilities of marriage. In some cases, it is done sincerely. In others, it is used to avoid accountability.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'For a nikah to be valid according to the majority of scholars, the bride’s guardian must be present, two witnesses must observe the contract, mahr must be agreed upon, and clear offer and acceptance must occur. If these conditions are fulfilled, the marriage can technically be valid. However, Islam strongly encourages public announcement of marriage to protect the rights of both spouses and prevent suspicion. A marriage that is hidden in order to deny rights, avoid financial responsibility, or manipulate a partner contradicts the spirit of Islamic marriage.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'If someone is considering secret nikah, they must examine their reasons honestly. Is it genuinely impossible to inform family, or is it simply uncomfortable? Are both partners prepared to fulfill financial and emotional obligations? Can this marriage withstand public knowledge? If it cannot survive transparency, it may not be built on strong foundations.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'When secret marriages become common without responsibility, they create emotional trauma, legal confusion, and broken trust within families. Islam aims to build stable communities, not hidden structures.' }
    ],
    reflection: 'Nikah is an act of worship. Worship is not meant to be hidden out of shame. It is meant to be honored with dignity, clarity, and responsibility.',
    tags: ['nikah', 'secret', 'hidden', 'valid', 'wali', 'witnesses', 'family', 'marriage', 'secrecy']
  }
];

const ADDICTION_ARTICLES: Article[] = [
  {
    id: 'porn-addiction',
    title: 'I Am Addicted to Pornography and Masturbation and I Feel Ashamed',
    category: 'Addiction',
    intro: 'Many teenagers and even adults silently struggle with pornography and masturbation. It often begins with curiosity and slowly turns into habit.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Many teenagers and even adults silently struggle with pornography and masturbation. It often begins with curiosity and slowly turns into habit. Over time, guilt increases but stopping feels difficult. The shame can make a person feel isolated and spiritually distant.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam commands modesty and lowering the gaze. Protecting chastity is a serious responsibility. Pornography is clearly forbidden because it harms the heart, mind, and society. However, Islam does not close the door of repentance.' },
      { heading: 'PRIMARY SOLUTION: PRAYER', content: 'Consistent prayer is the strongest shield against this addiction. Salah disciplines the body and purifies the heart. When prayer becomes sincere and focused, the desire for sin weakens.' }
    ],
    tags: ['porn', 'pornography', 'addiction', 'masturbation', 'lust', 'sexual temptation', 'haram content', 'shame', 'guilt', 'habit']
  },
  {
    id: 'smoking-drugs-addiction-v2',
    title: 'I Am Addicted to Smoking or Drugs and I Cannot Stop',
    category: 'Addiction',
    intro: 'Smoking and drug addiction affect many teenagers and adults. It may begin due to peer pressure, curiosity, or stress relief.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Smoking and drug addiction affect many teenagers and adults. It may begin due to peer pressure, curiosity, or stress relief. What starts casually can quickly become dependency. BREAKING IT REQUIRES more than willpower alone.' }
    ],
    tags: ['smoking', 'drugs', 'addiction', 'dependency', 'health', 'habit', 'stop', 'quit', 'cigarettes', 'vape']
  }
];

const DOUBT_ARTICLES: Article[] = [
{
  id: 'hijab-struggle',
  title: 'I Believe in Islam, But I Struggle With Wearing Hijab',
  category: 'Doubt',
  intro: 'Many Muslim women sincerely believe in Islam yet struggle with wearing hijab. The conflict is often emotional and social rather than a rejection of faith.',
  sections: [
    { heading: 'INTRODUCTION', content: 'Many Muslim women believe in Allah and respect Islamic teachings, yet they struggle with the idea of wearing hijab. This struggle is often quiet and internal. Some feel pressure from society, friends, school, or workplace environments. Others worry about how people will judge them or whether they will lose confidence or opportunities.' },
    { heading: 'WHAT DOES THIS STRUGGLE MEAN?', content: 'This struggle usually means that a person believes in the importance of modesty but feels emotionally unprepared or afraid to practice it fully. The heart may accept the command, but the mind worries about social reactions, personal identity, and life changes that might come with wearing hijab.' },
    { heading: 'WHY DO MANY PEOPLE FEEL THIS WAY?', content: 'There are many reasons this struggle happens. In some societies hijab attracts criticism or misunderstanding. Social media also promotes strong beauty standards that make modesty feel difficult. Sometimes family expectations, cultural pressure, or fear of standing out make the decision feel overwhelming.' },
    { heading: 'ISLAMIC PERSPECTIVE', content: 'In Islam, hijab is part of the broader principle of modesty and obedience to Allah. However, Islam also understands the human journey of growth. Faith does not always develop instantly. Many companions of the Prophet ﷺ gradually strengthened their practice as their faith grew. Experiencing struggle does not mean someone has no faith. Often it shows that the person still cares deeply about doing what is right.' },
    { heading: 'A HEALTHIER WAY TO APPROACH IT', content: 'Instead of seeing hijab only as a burden, it can help to view it as part of a personal spiritual journey. Learning the wisdom behind modesty, strengthening the relationship with Allah, and building confidence slowly can make the decision easier. Many people find that when their faith deepens, practicing hijab becomes more natural and meaningful.' },
    { heading: 'IF THE STRUGGLE CONTINUES', content: 'If someone continues to struggle, they should not allow guilt to push them away from Allah. Continue praying, learning, and reflecting sincerely. Faith grows step by step, and many believers gradually develop the strength to practice what once felt difficult.' }
  ],
  reflection: 'Struggling with a command of Islam does not automatically mean weak faith. Sometimes it means the heart is caught between fear and obedience. Growth takes time, but continuing to turn toward Allah is always the right direction.',
  tags: ['hijab', 'headscarf', 'struggle', 'modesty', 'faith', 'confidence', 'pressure', 'identity']
},
  {
    id: 'teenage-adult-love',
    title: 'Is teenage/adult love haram in Islam?',
    category: 'Doubt',
    intro: 'Love is one of the strongest human emotions. The challenge is not the emotion, it is managing it responsibly within Islamic boundaries.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Love is one of the strongest human emotions. Teenagers especially experience it intensely due to emotional and biological development. Adults also feel deep attachment. The question is not whether love exists — it is how Islam regulates its expression.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'Often, this question comes from someone feeling attraction and fearing they are sinful just for feeling it. Attraction itself is not a crime. Islam does not punish involuntary emotions. Accountability begins with action.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'Teenage years bring hormonal intensity, curiosity, and desire for validation. Media romanticizes relationships. Without strong spiritual grounding, emotional attachment forms quickly. Adults also experience loneliness, workplace interactions, or online connections that trigger feelings. The challenge is not the emotion. It is managing it responsibly.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam acknowledges love as natural. The Prophet (PBUH) loved deeply. However, Islam strictly forbids zina, physical intimacy outside marriage, private seclusion, and ongoing romantic relationships without nikah. Even if zina does not occur, prolonged emotional intimacy between non-mahram individuals is discouraged because it weakens boundaries and leads toward greater sin.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'If you are young and not ready for marriage, protect your heart. Lower your gaze. Limit unnecessary private conversation. Avoid environments that increase temptation. If you are ready for marriage, channel feelings properly. Involve family. Keep interaction dignified. Move toward commitment quickly instead of building years of emotional attachment without direction.' }
    ],
    reflection: 'Love is not haram. Losing discipline is. Islam does not kill emotion — it protects it until it can exist in a stable, lawful structure.',
    tags: ['love', 'teenagers', 'attraction', 'feelings', 'haram', 'boundaries', 'emotions', 'crush']
  },
  {
    id: 'gf-bf-haram',
    title: 'Is making a girlfriend/boyfriend haram in Islam?',
    category: 'Doubt',
    intro: 'Modern culture normalizes boyfriend-girlfriend relationships as casual steps. But Islam approaches intimacy differently.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Modern culture normalizes boyfriend-girlfriend relationships as casual, necessary steps before marriage. But Islam approaches intimacy differently. It prioritizes commitment before emotional and physical closeness.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'A boyfriend/girlfriend relationship usually involves romantic communication, private messaging, emotional dependency, and often physical interaction — without marriage. The question is whether this structure aligns with Islamic teachings.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'Humans desire companionship. Delayed marriage increases temptation. Media presents dating as placeholder exploration. Peer pressure makes abstaining feel strange. Gradually, what Islam restricts becomes socially normalized.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam does not permit romantic relationships outside marriage. The Qur’an commands believers not to approach zina. This includes behaviors that emotionally and physically lead toward it. Even if a couple claims “we won’t cross limits,” continuous romantic involvement softens boundaries. Emotional intimacy often becomes stronger than physical restraint.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'If someone is in such a relationship, evaluate honestly. Is marriage realistic soon? If yes, correct the path immediately — involve families, reduce secrecy, establish boundaries. If marriage is not realistic, end the relationship respectfully. Repent sincerely. It will hurt temporarily, but prolonged attachment outside halal structure causes deeper harm. Replace the emotional void with growth.' }
    ],
    reflection: 'Islam does not deny the need for love. It insists that love be honored with commitment. Temporary romance may feel exciting, but halal commitment carries barakah, stability, and dignity.',
    tags: ['girlfriend', 'boyfriend', 'dating', 'commitment', 'intimacy', 'relationship', 'haram', 'dating culture']
  },
  {
    id: 'doubt-allah-listening',
    title: 'Sometimes I Doubt Whether Allah Is Really Listening to Me',
    category: 'Doubt',
    intro: 'There are moments when prayers feel unanswered. Hardship continues despite dua. The heart begins to whisper questions.',
    sections: [
      { heading: 'INTRODUCTION', content: 'There are moments when prayers feel unanswered. Hardship continues despite dua. The heart begins to whisper questions. You may feel guilty for even thinking this way. Doubting whether Allah is listening can feel frightening. This internal struggle is more common than many admit.' },
      { heading: 'WHAT IS THIS DOUBT REALLY ABOUT?', content: 'This doubt is usually about expectation versus reality. When outcomes do not match desires, logic is often absent. When results do not match desires, confusion grows. It is less about denying Allah’s existence and more about misunderstanding divine wisdom. Emotional pain clouds spiritual clarity. The heart seeks immediate results.' },
      { heading: 'WHY DOES THIS DOUBT DEVELOP?', content: 'Repeated hardship without visible relief weakens patience. Comparing your life to others increases frustration. Lack of deeper knowledge about divine wisdom creates confusion. Emotional exhaustion amplifies negative thoughts. Shaytan exploits vulnerable moments to plant whispers.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Allah promises that He hears every supplication. However, response does not always mean immediate fulfillment. Sometimes dua is answered by delay, protection from harm, or reward in the hereafter. Hardship is not abandonment. Tests are part of spiritual growth.' },
      { heading: 'DEEP CLARIFICATION', content: 'Listening does not always mean granting exactly what we want. A parent may deny a child something harmful out of love. Similarly, divine wisdom may withhold what appears good but is not beneficial. Faith requires trust beyond immediate emotion.' },
      { heading: 'STEP-BY-STEP STRENGTHENING PLAN', content: 'Improve focus during prayer. Reflect on past moments where difficulties later revealed wisdom. Increase gratitude practice daily. Read stories of prophets who endured hardship. Reduce comparison with others. Make dua with humility rather than demand. Seek knowledge about divine decree. Surround yourself with positive believers. Maintain consistency even when feelings fluctuate.' },
      { heading: 'IF YOU STILL FEEL UNSURE', content: 'Doubts do not destroy faith unless you choose to feed them. Seek knowledge instead of isolating yourself. Talk to knowledgeable people. Continue praying even when emotionally tired. Faith strengthens through persistence.' }
    ],
    reflection: 'Moments of doubt do not mean loss of belief. They often signal emotional exhaustion. Allah hears even the silent whisper of your heart. Continue turning toward Him, especially when confused. Clarity often follows patience.',
    tags: ['doubt', 'listening', 'prayer', 'unanswered', 'hardship', 'testing', 'wisdom', 'atheism', 'faith', 'waswas']
  },
  {
    id: 'question-scholars',
    title: 'Is it wrong to question scholars?',
    category: 'Doubt',
    intro: 'In many communities, questioning a scholar is seen as disrespect. People are sometimes told that asking too many questions shows weak faith.',
    sections: [
      { heading: 'INTRODUCTION', content: 'In many communities, questioning a scholar is seen as disrespect. People are sometimes told that asking too many questions shows weak faith. This creates confusion because Islam itself encourages seeking knowledge. So where is the line between respectful inquiry and arrogance?' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'This question usually comes from someone who heard a ruling or opinion that did not fully make sense to them. They are not necessarily rejecting it. They simply want clarification. But they fear being labeled rebellious or disrespectful.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'Some communities confuse respect with silence. There is also fear that questioning scholars might lead to doubting religion itself. However, history shows that Islamic scholarship developed through questions, debates, and intellectual discussion. The great imams themselves differed in opinions respectfully.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam does not forbid asking questions. In fact, the companions asked the Prophet ﷺ many questions for clarity. Scholars are human beings who interpret evidence. They are respected for their knowledge, but they are not infallible. Questioning with sincerity and humility is part of learning.' },
      { heading: 'CONT.', content: 'What is wrong is questioning with arrogance, mockery, or the intention to prove oneself superior. There is a difference between seeking understanding and seeking ego satisfaction. The heart’s intention defines the action.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'If you want to question a scholar, do it respectfully. Ask for evidence. Request clarification gently. Be open to learning rather than debating for victory. If you still disagree after sincere effort, understand that scholarly differences exist in Islamic tradition.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'If communities suppress sincere questions, people may seek answers from unreliable sources. Open, respectful dialogue protects faith.' }
    ],
    reflection: 'Questioning is not disbelief. Arrogance is. Islam encourages thinking, reflecting, and understanding. Respect and inquiry can coexist beautifully.',
    tags: ['scholars', 'questioning', 'respect', 'inquiry', 'knowledge', 'logic', 'rebellion', 'disagreement', 'learning']
  }
];

const FAMILY_ARTICLES: Article[] = [
  {
    id: 'parental-distance',
    title: 'I feel emotionally distant from my parents. Why does it hurt so much?',
    category: 'Family',
    intro: 'Emotional distance inside a family is one of the most painful experiences a person can go through.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Emotional distance inside a family is one of the most painful experiences a person can go through. A home is supposed to be a place of safety, understanding and comfort, yet sometimes it becomes a place where silence feels heavy.' }
    ],
    tags: ['parents', 'distance', 'lonely', 'family', 'emotional', 'hurt', 'silence', 'estrangement']
  },
  {
    id: 'toxic-home',
    title: 'My home feels toxic. How do I protect my peace without breaking my family?',
    category: 'Family',
    intro: 'Not every home feels peaceful. Some homes are filled with constant tension, criticism, or emotional pressure.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Not every home feels peaceful. Some homes are filled with constant tension, criticism, or emotional pressure. When negativity becomes normal, a person begins to feel drained inside their own house. This creates deep exhaustion because home should be a place of safety, not survival.' },
      { heading: 'WHAT DOES IT MEAN', content: 'Toxicity in a family can mean constant shouting, emotional manipulation, favoritism, unfair comparison, or harsh criticism. It may not always be physical harm, but emotional harm can be just as heavy. Words repeated over time shape self-worth and create invisible scars.' },
      { heading: 'WHY DOES THIS HAPPEN', content: 'Many times this behavior comes from stress, unhealed trauma, financial pressure, or lack of emotional education. Some parents repeat patterns they experienced in their own childhood. Others misunderstand authority and think control equals respect. Often there is pain behind the harshness.' },
      { heading: 'DEEP REALITY', content: 'Living in such an environment can slowly damage confidence, increase anxiety, and even affect faith. A person may begin doubting their own value. They may struggle with anger or sadness but feel unable to speak. The hardest part is feeling trapped between wanting peace and wanting to preserve family bonds.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam does not allow oppression, even within families. Obedience has limits when harm becomes serious. Justice and mercy are foundations of Islamic teaching. Protecting one’s mental well-being is not rebellion. It is responsibility. However, Islam also encourages patience and wisdom before cutting ties.' },
      { heading: 'SOLUTION', content: 'Protecting peace begins with emotional control. Reacting with anger fuels conflict. Responding with calm firmness sets boundaries. It is important to recognize what is your responsibility and what is not. Strengthen your connection with Allah through prayer, especially in quiet moments. Build personal growth, education, and independence. Seek trusted guidance if needed. Respect does not mean accepting humiliation. Boundaries can exist without hatred.' }
    ],
    reflection: 'Family tests are among the hardest tests in life. But hardship does not last forever. With patience, wisdom, and faith, peace can be built slowly. Protect your heart while maintaining dignity. Allah knows what happens behind closed doors.',
    tags: ['toxic', 'home', 'family', 'shouting', 'manipulation', 'pressure', 'peace', 'abuse', 'control', 'safety']
  },
  {
    id: 'disagree-parents',
    title: 'Can I disagree with my parents respectfully?',
    category: 'Family',
    intro: 'Disagreeing with parents can feel like standing on the edge of guilt. You fear hurting them, disappointing them, or being labeled ungrateful.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Disagreeing with parents can feel like standing on the edge of guilt. You fear hurting them, disappointing them, or being labeled ungrateful. At the same time, you feel a strong need to express your own thoughts and choices. The tension between obedience and individuality becomes emotionally exhausting.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'This question usually means you are growing. As you mature, you develop independent thinking. Having different views does not mean you love your parents less. It means you are transitioning from dependence to responsibility. The struggle is not about rebellion; it is about balance.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'Parents often see disagreement as rejection of their experience and sacrifice. They fear you will make mistakes. On the other hand, you may feel unheard or controlled. Generational gaps, cultural expectations, and emotional attachment intensify conflict. Both sides may speak from fear rather than understanding.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam commands kindness, humility, and respect toward parents. However, obedience is not absolute in every personal decision. If something is not sinful and relates to your life choices, you are allowed to think independently. Islam teaches firmness with gentleness. Disrespect is prohibited, but thoughtful disagreement is not.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'Clarify your intention first. Your goal should be preserving both truth and relationship. Choose the right timing for discussion. Speak calmly and avoid emotional reactions. Acknowledge their sacrifices before expressing your view. Explain your reasoning logically, not defensively. Continue showing respect in actions even if disagreement remains. Consistent kindness reduces resistance over time.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'If they remain firm, assess whether patience or compromise is wiser. Not every disagreement requires immediate victory. In serious matters, seek advice from a trusted elder or scholar. Avoid cutting ties over differences unless there is real harm involved.' }
    ],
    reflection: 'You can honor your parents without silencing yourself. True maturity is standing firm without becoming harsh. Respect is not weakness, and independence is not rebellion.',
    tags: ['disagree', 'parents', 'respectfully', 'obedience', 'independence', 'boundaries', 'guilt', 'growth']
  },
  {
    id: 'alone-in-house',
    title: 'Why do I feel alone in my own house?',
    category: 'Family',
    intro: 'Feeling lonely outside is painful. Feeling lonely at home is heavier. You may sit in the same room as your family yet feel emotionally invisible.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Feeling lonely outside is painful. Feeling lonely at home is heavier. You may sit in the same room as your family yet feel emotionally invisible. Conversations happen, but connection feels absent. You are physically present, but internally distant.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'This does not automatically mean your family does not care. It often means emotional needs are not being met. You may crave deeper understanding, empathy, or meaningful conversation. When those needs remain unfulfilled, loneliness grows even in crowded spaces.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'Family members may be busy, stressed, or emotionally unavailable. Generational differences can make vulnerability uncommon. Past misunderstandings may have created silent walls. Sometimes personal struggles like anxiety or overthinking intensify feelings of isolation. The issue is often emotional disconnect, not lack of love.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam values family bonds but acknowledges human imperfection. Emotional hardship within family does not mean weak faith. The Prophet ﷺ experienced family-related difficulties as well. Islam encourages maintaining ties while seeking emotional strength through connection with Allah and righteous companionship.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'Start by building small bridges. Initiate light but meaningful conversations. Express appreciation openly. Share your thoughts gradually instead of expecting instant understanding. Strengthen your relationship with Allah; spiritual connection reduces emotional emptiness. Build healthy friendships outside the home while maintaining family respect.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'If emotional distance continues, focus on internal growth rather than forcing transformation. Not every household becomes deeply expressive. Acceptance sometimes brings more peace than constant struggle. If loneliness becomes overwhelming, consider seeking counseling or trusted guidance.' }
    ],
    reflection: 'Even if people around you do not fully understand you, Allah understands you completely. You are never truly unseen. Sometimes loneliness becomes a doorway to a deeper relationship with your Creator.',
    tags: ['alone', 'home', 'house', 'family', 'connection', 'isolation', 'disconnect', 'invisible', 'lonely']
  },
  {
    id: 'toxic-parents',
    title: 'How to deal with toxic parents?',
    category: 'Family',
    intro: 'This is one of the most painful struggles a person can face. Islam teaches immense respect, obedience, and kindness toward parents. But what happens when the parents themselves are abusive?',
    sections: [
      { heading: 'INTRODUCTION', content: 'This is one of the most painful struggles a person can face. Islam teaches immense respect, obedience, and kindness toward parents. But what happens when the parents themselves are emotionally abusive, manipulative, controlling, or constantly humiliating? The heart becomes torn between religious duty and personal emotional survival. Many people suffer silently because they fear that even acknowledging parental toxicity is sinful.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'When someone asks this question, they usually mean parents who insult constantly, invalidate feelings, compare unfairly, manipulate with guilt, control adult decisions excessively, or create a home environment filled with fear rather than peace. Toxicity does not necessarily mean physical abuse. Sometimes it is emotional suffocation, constant criticism, or religious manipulation. The person feels trapped — unable to speak and unable to breathe.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'Toxic behavior often comes from unresolved trauma, cultural expectations, generational wounds, or misunderstanding of authority. Some parents believe strict control equals good parenting. Some project their own failures onto their children. Others use religion incorrectly to demand blind obedience. None of this justifies harm, but understanding the roots can reduce hatred in the heart. Hurt people sometimes hurt others without realizing the damage they cause.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam commands kindness to parents, even if they are difficult. The Quran tells believers not to even say “uff” to them. But Islam does not command enduring injustice without boundaries. If parents command something sinful, obedience is not required. If parents are emotionally damaging, maintaining respect does not mean allowing abuse. Respect is an attitude of dignity, not submission to harm. The Prophet ﷺ faced hostility from his own uncle Abu Lahab, yet he maintained composure. Islam balances mercy with justice. You are required to honor your parents, but you are not required to destroy your mental health to prove loyalty. Setting boundaries respectfully is not rebellion. It is wisdom.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'The first step is internal stability. Do not respond with anger. Emotional reactions usually worsen toxicity. Speak calmly, choose timing wisely, and avoid confrontation in moments of high tension. If direct communication fails, reduce unnecessary engagement in topics that trigger conflict. Seek support from a trusted elder, counselor, or scholar who understands family dynamics. If you are financially independent and the environment is severely damaging, creating healthy distance can be permissible while still maintaining basic respect and communication. Continue making dua for them. Sometimes Allah changes hearts slowly. But also protect your own heart. Islam does not ask you to hate yourself to prove you love your parents.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'If parents refuse to change, your responsibility remains respectful conduct, not fixing their personality. You will not be questioned about their behavior on the Day of Judgment. You will be questioned about yours. Maintaining dignity without hatred is spiritual strength.' }
    ],
    reflection: 'You can honor your parents while also honoring your own mental well-being. Boundaries with respect are not disobedience. They are balance. And Allah sees the silent patience you carry.',
    tags: ['toxic', 'abusive', 'manipulative', 'parents', 'boundaries', 'respect', 'obedience', 'abuse', 'mental health', 'humiliating']
  }
];

const FAITH_ARTICLES: Article[] = [
  {
    id: 'remember-allah-pain',
    title: 'Why do I only remember Allah when I’m in pain?',
    category: 'Faith',
    intro: 'This question comes from a sincere heart. Many believers feel spiritually intense during hardship but spiritually numb during <article class=""></article>ase.',
    sections: [
      { heading: 'INTRODUCTION', content: 'This question comes from a sincere heart. Many believers feel spiritually intense during hardship but spiritually numb during ease. When life collapses, dua flows. When life stabilizes, dhikr fades. It feels HYPOCRITICAL. But it is deeply human.' },
      { heading: 'THE PSYCHOLOGY OF HARDSHIP', content: 'Pain removes illusion. When everything is going well, you feel control. Success whispers, “You did this.” Hardship shatters that illusion and reminds you how fragile you are. In pain, ego disappears. Pride dissolves. And when the heart softens, it naturally turns to Allah.' },
      { heading: 'WHY COMFORT MAKES US FORGET', content: 'Comfort creates distraction. Work. Entertainment. Social life. We become busy managing blessings and forget the One who gave them. It is not always arrogance. Sometimes it is simply heedlessness. When there is no crisis, urgency disappears.' },
      { heading: 'THE HIDDEN MERCY IN PAIN', content: 'The fact that you remember Allah in pain means your heart still recognizes Him as refuge. That is not hypocrisy. That is iman. Some people run away from Allah during hardship. You run toward Him. But maturity is remembering Him before the crisis.' },
      { heading: 'DEEPENING THE RELATIONSHIP', content: 'Shift your mindset. Do not see Allah as emergency support. See Him as constant companionship. Practice gratitude intentionally. Gratitude strengthens remembrance in ease. Also build small, consistent acts — consistency builds intimacy with Allah.' }
    ],
    reflection: 'You turn to Him when you are broken. He stays with you even when you forget. And the fact that you are worried about this question means your heart is alive.',
    tags: ['pain', 'remember', 'hardship', 'ease', 'hypocrisy', 'comfort', 'gratitude', 'iman', 'distraction']
  },
  {
    id: 'repentance-accepted',
    title: 'Is my repentance truly accepted?',
    category: 'Faith',
    intro: 'One of the heaviest feelings a believer can carry is the fear that Allah may not have forgiven them.',
    sections: [
      { heading: 'INTRODUCTION', content: 'One of the heaviest feelings a believer can carry is the fear that Allah may not have forgiven them. After committing a sin — especially repeated sins — the heart whispers, “What if Allah is tired of forgiving me? What if my tawbah isn’t real? What if I’ve crossed the limit?” This question does not come from disbelief. It comes from a heart that still cares.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'When someone asks whether their repentance is accepted, what they really mean is: “Am I still loved by Allah? Or have I ruined my relationship with Him?” It reflects guilt, regret, and a deep desire to return. Sometimes it also reflects shame — a feeling that “I am too dirty to be forgiven.” The struggle is not just about the sin; it is about worthiness.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'This doubt usually happens for three reasons. First, when a person repeats the same sin again and again, they begin to feel hypocritical. Second, when someone learns how severe a sin is, fear can turn into despair. Third, Shaytan attacks the believer after repentance more than before sin. Before sin, he whispers temptation. After repentance, he whispers hopelessness. Because if he cannot make you sin comfortably, he tries to make you despair permanently.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam does not teach us that forgiveness is limited. Allah describes Himself as Ar-Rahman, Ar-Raheem, Al-Ghaffar — the One who forgives repeatedly. The Prophet ﷺ told us that even if a servant sins again and again but sincerely repents each time, Allah continues forgiving. True tawbah has three conditions: stop the sin, feel genuine regret, and intend not to return. If these are present at the moment of repentance, it is accepted — even if you fall again later out of weakness. Falling again does not cancel the previous repentance. It only means you must repent again. Despair is actually more dangerous than the sin itself because it questions Allah’s mercy.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'First, renew your tawbah calmly. Do not rush it. Pray two rak’ah and speak to Allah honestly. Use your own words. Admit your weakness without excuses. Second, separate guilt from hopelessness. Guilt pushes you toward Allah; hopelessness pushes you away. Keep the first, reject the second. Third, change at least one practical trigger that leads you back to sin. Repentance without effort is incomplete. Fourth, increase small consistent good deeds. Good deeds strengthen identity. When you see yourself improving, doubt decreases. Finally, remind yourself daily that Allah’s mercy is greater than your sin — not equal to it, greater.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'If you keep doubting even after repentance, understand this may be waswas (spiritual whispering). Do not keep repeating tawbah obsessively. At some point, you must trust Allah more than you trust your fear. Obsession with “Is it accepted?” can itself become a trap. Acceptance is not always felt emotionally. Sometimes it is shown through increased softness in the heart, more awareness, and discomfort with sin. Those are signs of life in the soul.' }
    ],
    reflection: 'The fact that you are worried about whether Allah forgave you is itself a sign that your heart is not dead. A person abandoned by Allah does not feel guilt. They feel indifference. If you still feel pain after sin, it means your connection is alive. Do not measure Allah’s mercy by your weakness. Measure it by His names. Keep returning. Even if you return a thousand times. Because the door of tawbah closes only when life ends — not when you fail.',
    tags: ['repentance', 'forgiveness', 'sin', 'tawbah', 'mercy', 'despair', 'guilt', 'hopelessness', 'accepted']
  },
  {
    id: 'fear-vs-mercy',
    title: 'What if I fear Allah’s punishment more than His mercy?',
    category: 'Faith',
    intro: 'Many believers grow up hearing about hellfire, punishment, and divine anger more than mercy and forgiveness. Over time, this creates anxiety.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Many believers grow up hearing about hellfire, punishment, and divine anger more than mercy and forgiveness. Over time, this creates a relationship with Allah built on fear alone. Instead of love, there is anxiety. Instead of hope, there is panic. A person begins to worship not out of closeness, but out of terror.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'This question usually reflects spiritual imbalance. The person believes Allah is always watching to punish rather than to forgive. They feel that one mistake will erase all good deeds. They cannot relax in worship because they are overwhelmed by fear of rejection.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'This often happens due to upbringing focused heavily on warning rather than hope. It can also happen after committing a sin, when guilt magnifies the image of punishment. Sometimes personality plays a role — anxious individuals tend to focus on danger more than mercy. But Islam was never meant to create despair.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'Islam teaches balance between fear and hope. Fear protects from sin. Hope protects from despair. Allah describes Himself repeatedly as Most Merciful, Most Forgiving. His mercy is mentioned far more often than His punishment. Even in hadith, Allah says His mercy prevails over His wrath. A believer should fear Allah enough to avoid wrongdoing, but love Him enough to run toward repentance. Excessive fear that leads to hopelessness is spiritually unhealthy. It can even be a trick of Shaytan, who wants believers to think they are beyond forgiveness.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'Start learning about Allah’s names related to mercy, forgiveness, gentleness, and compassion. Reflect on how many times Allah forgave people in the Quran after major mistakes. Practice sincere repentance regularly. When fear overwhelms you, remind yourself that the One you fear is also the One who created you with weakness and knows your struggles. Shift your dua from only asking protection from punishment to asking closeness and love.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'If fear dominates completely, worship may become heavy and exhausting. Over time, this can lead to burnout. Balance is necessary to sustain faith long-term.' }
    ],
    reflection: 'The healthiest relationship with Allah is built on three pillars: fear, hope, and love. If one becomes too heavy, the heart tilts. Allah does not want you paralyzed in terror. He wants you walking toward Him with humility and trust.',
    tags: ['fear', 'mercy', 'punishment', 'hell', 'hope', 'love', 'anxiety', 'worship', 'terror', 'hellfire']
  },
  {
    id: 'depression-faith',
    title: 'Is depression a sign of weak faith?',
    category: 'Faith',
    intro: 'Many people silently suffer because they are told that sadness equals weak iman. This statement has caused countless believers to feel guilty for emotions they cannot control.',
    sections: [
      { heading: 'INTRODUCTION', content: 'Many people silently suffer because they are told that sadness equals weak iman. This statement has caused countless believers to feel guilty for emotions they cannot control. Mental health struggles are often misunderstood in religious communities, leading people to confuse spiritual weakness with psychological pain.' },
      { heading: 'WHAT DOES THIS MEAN?', content: 'When someone asks this question, they are usually experiencing sadness, numbness, hopelessness, or emotional exhaustion. They begin to question whether their mental state means Allah is displeased with them. They fear that a strong believer should always feel spiritually high and emotionally stable.' },
      { heading: 'WHY DOES THIS HAPPEN?', content: 'This misunderstanding happens because faith is often portrayed as constant peace. People assume that a believer who prays regularly should never feel lost or empty. But human beings are complex. Depression can be influenced by trauma, chemical imbalances, prolonged stress, grief, or environmental pressures. Not every emotional struggle is spiritual failure.' },
      { heading: 'ISLAMIC PERSPECTIVE', content: 'The Prophets themselves experienced deep sorrow. Prophet Yaqub (AS) grieved intensely for years. The Prophet Muhammad ﷺ experienced the Year of Sorrow after losing his wife Khadijah (RA) and his uncle Abu Talib. Emotional pain did not make them weak believers. Islam recognizes the human condition. Feeling sadness does not remove iman. What weakens faith is turning away from Allah completely. Even struggling while still holding onto salah, even imperfectly, is a sign of strength. Faith can be a source of healing, but it does not eliminate all psychological conditions.' },
      { heading: 'STEP-BY-STEP SOLUTION', content: 'If someone feels depressed, they should not immediately blame their spirituality. They should continue small acts of worship without overwhelming themselves. They should speak to someone trustworthy. They should consider professional help if symptoms persist. They should take care of their physical health because body and mind are connected. Islam encourages balance, not self-blame.' },
      { heading: 'IF THINGS DO NOT CHANGE', content: 'If communities continue labeling depression as weak faith, people will hide their suffering and may lose hope. Islam is a religion of mercy. Mercy includes understanding mental struggles.' }
    ],
    reflection: 'Depression does not make you a bad Muslim. It makes you a human being facing a heavy test. Faith is not the absence of pain. It is continuing to turn toward Allah even while carrying that pain.',
    tags: ['depression', 'faith', 'iman', 'mental health', 'sadness', 'prophets', 'sorrow', 'test', 'weak faith']
  }
];

const ALL_ARTICLES = [...MARRIAGE_ARTICLES, ...ADDICTION_ARTICLES, ...DOUBT_ARTICLES, ...FAMILY_ARTICLES, ...FAITH_ARTICLES];

const DashboardCard = ({ 
  icon: Icon, 
  label, 
  onClick,
  fullWidth = false,
  accent = false
}: { 
  icon: any, 
  label: string, 
  onClick: () => void,
  fullWidth?: boolean,
  accent?: boolean
}) => (
  <button 
    onClick={onClick}
    className={`group flex flex-col items-center justify-center p-6 bg-white dark:bg-ummah-card-dark rounded-2xl border border-black/[0.03] dark:border-white/[0.05] shadow-soft hover:shadow-premium dark:hover:shadow-glow active:scale-[0.98] transition-all duration-300 ${fullWidth ? 'col-span-2' : ''} ${accent ? 'ring-2 ring-ummah-icon-active-light/5 border-ummah-icon-active-light/10' : ''}`}
  >
    <div className={`mb-3 p-3 rounded-2xl ${accent ? 'bg-ummah-icon-active-light text-white' : 'bg-ummah-mint dark:bg-emerald-500/10 text-ummah-icon-active-light dark:text-ummah-icon-active-dark'} group-hover:scale-110 transition-transform duration-300`}>
      <Icon size={24} strokeWidth={1.5} />
    </div>
    <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${accent ? 'text-ummah-icon-active-light dark:text-ummah-icon-active-dark' : 'text-ummah-text-light dark:text-ummah-text-dark'}`}>
      {label}
    </span>
  </button>
);

const HorizontalCard = ({ 
  icon: Icon, 
  label, 
  subtitle,
  onClick,
  accent = false
}: { 
  icon: any, 
  label: string, 
  subtitle?: string, 
  onClick: () => void,
  accent?: boolean
}) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-5 w-full p-6 rounded-[1.5rem] border transition-all duration-300 active:scale-[0.99] text-left group overflow-hidden relative ${
      accent 
        ? 'bg-white dark:bg-ummah-card-dark border-emerald-500/10 dark:border-emerald-500/20 shadow-md' 
        : 'bg-white dark:bg-ummah-card-dark border-black/[0.03] dark:border-white/[0.03] shadow-soft'
    }`}
  >
    <div className={`shrink-0 p-4 rounded-2xl ${accent ? 'bg-ummah-icon-active-light dark:bg-ummah-icon-active-dark text-white' : 'bg-ummah-mint dark:bg-white/5 text-ummah-icon-active-light dark:text-ummah-icon-active-dark'}`}>
      <Icon size={24} strokeWidth={accent ? 2.5 : 2} />
    </div>
    <div className="flex-1">
      <h4 className="font-black text-sm text-ummah-text-light dark:text-ummah-text-dark uppercase tracking-wider">{label}</h4>
      {subtitle && <p className="text-[10px] text-ummah-text-light/50 dark:text-ummah-text-secondary-dark font-medium mt-0.5">{subtitle}</p>}
    </div>
    <ChevronRight size={18} className="text-ummah-icon-inactive-light dark:text-ummah-icon-inactive-dark group-hover:translate-x-1 transition-transform" />
  </button>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-ummah-text-light/30 dark:text-ummah-text-secondary-dark/40 mb-5 px-1">
    {title}
  </h3>
);

const GlowingHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[14px] md:text-base font-black uppercase tracking-[0.2em] text-ummah-icon-active-light dark:text-ummah-icon-active-dark mb-4 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
    {children}
  </h3>
);

const ArticleBody = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] md:text-sm text-black dark:text-white leading-relaxed font-medium mb-8">
    {children}
  </p>
);

interface HomeProps {
  location: LocationData | null;
  timings: IPrayerTimes | null;
  settings: UserSettings;
  onUpdateSettings: (s: Partial<UserSettings>) => void;
  onSetLocation: (l: LocationData) => void;
  onAskAgent: (query: string) => void;
  setActiveAdhan: (adhan: {name: string, voiceId: string} | null) => void;
  initialSubFeature?: HomeSubFeature;
  appMode: AppMode;
}

const Home: React.FC<HomeProps> = ({ 
  location, 
  timings, 
  settings, 
  onUpdateSettings, 
  onSetLocation,
  onAskAgent, 
  setActiveAdhan,
  initialSubFeature = 'main'
}) => {
  const { t } = useTranslation(settings.language);
  const [activeSubFeature, setActiveSubFeature] = useState<HomeSubFeature>(initialSubFeature);
  const [guidanceFilter, setGuidanceFilter] = useState('All');
  const [guidanceSearch, setGuidanceSearch] = useState('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (initialSubFeature !== activeSubFeature) {
      setActiveSubFeature(initialSubFeature);
      setActiveArticle(null);
    }
  }, [initialSubFeature]);

  const LifeGuidanceView = () => {
    if (activeArticle) {
      return (
        <div className="animate-fade-up bg-ummah-bg-light dark:bg-ummah-bg-dark min-h-full pb-32">
          <div className="sticky top-0 z-40 bg-white/80 dark:bg-ummah-bg-dark/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 p-4 flex items-center gap-4">
            <button 
              onClick={() => setActiveArticle(null)}
              className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors"
            >
              <ChevronLeft size={20} className="text-ummah-text-light dark:text-ummah-text-dark" />
            </button>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-ummah-text-light/40 dark:text-ummah-text-secondary-dark/40">
              {activeArticle.category} {t('guidance')}
            </h4>
          </div>

          <div className="px-6 pt-8 max-w-2xl mx-auto">
            <h1 className="premium-header text-3xl font-black text-black dark:text-white mb-10 leading-tight">
              {activeArticle.title}
            </h1>

            {activeArticle.sections.map((sec, idx) => (
              <React.Fragment key={idx}>
                <GlowingHeader children={sec.heading} />
                <ArticleBody children={sec.content} />
              </React.Fragment>
            ))}

            {activeArticle.reflection && (
              <>
                <GlowingHeader children={t('final_reflection')} />
                <ArticleBody children={activeArticle.reflection} />
              </>
            )}

            <div className="mt-16 flex justify-center">
              <button 
                onClick={() => onAskAgent?.(`I have read the guidance on "${activeArticle.title}". Can you help me dive deeper into my specific situation and provide personalized Islamic advice?`)}
                className="group relative px-10 py-5 rounded-2xl border border-ummah-icon-active-light/50 text-ummah-icon-active-light dark:text-ummah-icon-active-dark font-black text-[11px] uppercase tracking-[0.25em] shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-ummah-icon-active-light/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {t('ai_dive_deeper')}
              </button>
            </div>
          </div>
        </div>
      );
    }

    const getFilteredArticles = () => {
      const q = guidanceSearch.trim().toLowerCase();
      let initialList = ALL_ARTICLES;
      if (guidanceFilter !== 'All') {
        initialList = ALL_ARTICLES.filter(a => a.category === guidanceFilter);
      }
      if (!q) return initialList;
      const scoredResults = initialList.map(article => {
        let score = 0;
        const title = article.title.toLowerCase();
        const intro = article.intro.toLowerCase();
        const tags = (article.tags || []).map(t => t.toLowerCase());
        const allContent = article.sections.map(s => s.content.toLowerCase()).join(' ');
        if (title === q) score += 100;
        else if (title.includes(q)) score += 40;
        if (tags.includes(q)) score += 30;
        else if (tags.some(t => t.includes(q))) score += 20;
        if (intro.includes(q)) score += 10;
        if (allContent.includes(q)) score += 5;
        return { article, score };
      }).filter(res => res.score > 0);
      scoredResults.sort((a, b) => b.score - a.score);
      return scoredResults.map(res => res.article);
    };

    const filtered = getFilteredArticles();

    return (
      <div className="px-5 pt-4 pb-20 space-y-4">
        <div className="space-y-0.5">
          <h2 className="premium-header text-lg font-black text-ummah-text-light dark:text-ummah-text-dark tracking-tighter uppercase">{t('life_guidance')}</h2>
          <p className="text-[8px] text-ummah-text-light/40 dark:text-ummah-text-secondary-dark font-black leading-tight uppercase tracking-[0.1em]">
            {t('islamic_solutions_struggles')}
          </p>
        </div>

        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ummah-icon-inactive-light group-focus-within:text-ummah-icon-active-light transition-colors" size={14} />
          <input 
            type="text" 
            placeholder={t('search_struggle')}
            value={guidanceSearch}
            onChange={(e) => setGuidanceSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-ummah-card-dark border border-black/[0.03] dark:border-white/[0.05] rounded-xl outline-none focus:ring-1 focus:ring-ummah-icon-active-light/20 transition-all shadow-soft text-[10px] font-bold text-ummah-text-light dark:text-ummah-text-dark"
          />
        </div>

        <div className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar py-2">
          {['All', 'Marriage', 'Addiction', 'Doubt', 'Family', 'Faith'].map((filter) => (
            <button 
              key={filter}
              onClick={() => setGuidanceFilter(filter)}
              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border whitespace-nowrap ${
                guidanceFilter === filter 
                  ? 'bg-ummah-icon-active-light border-ummah-icon-active-light text-white shadow-md scale-105' 
                  : 'bg-white dark:bg-ummah-card-dark border-black/[0.03] dark:border-white/[0.05] text-ummah-text-light/60 dark:text-ummah-text-secondary-dark/60 hover:border-ummah-icon-active-light/20'
              }`}
            >
              {t(filter.toLowerCase())}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-4">
          {filtered.length > 0 ? (
            <>
              {filtered.map((article) => (
                <button 
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="group text-left p-6 bg-white dark:bg-ummah-card-dark border border-black/[0.03] dark:border-white/[0.05] rounded-[2rem] shadow-soft hover:shadow-premium hover:border-ummah-icon-active-light/20 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg ${
                      article.category === 'Marriage' ? 'bg-ummah-mint text-ummah-icon-active-light' : 
                      article.category === 'Addiction' ? 'bg-rose-50 text-rose-600' : 
                      article.category === 'Doubt' ? 'bg-indigo-50 text-indigo-600' : 
                      article.category === 'Family' ? 'bg-amber-50 text-amber-600' : 
                      article.category === 'Faith' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {article.category}
                    </span>
                    {article.category === 'Marriage' ? <Heart size={16} className="text-ummah-gold opacity-30 group-hover:opacity-100 transition-opacity" /> : 
                     article.category === 'Addiction' ? <Flame size={16} className="text-rose-500 opacity-30 group-hover:opacity-100 transition-opacity" /> :
                     article.category === 'Family' ? <Users size={16} className="text-amber-500 opacity-30 group-hover:opacity-100 transition-opacity" /> :
                     <CloudSun size={16} className="text-indigo-500 opacity-30 group-hover:opacity-100 transition-opacity" />}
                  </div>
                  <h3 className="font-black text-base text-ummah-text-light dark:text-ummah-text-dark leading-tight group-hover:text-ummah-icon-active-light transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-[11px] text-ummah-text-light/50 dark:text-ummah-text-secondary-dark font-medium line-clamp-2 leading-relaxed">
                    {article.intro}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[9px] font-black text-ummah-text-light/20 dark:text-white/20 uppercase tracking-widest">
                      <Timer size={12} /> 12 {t('min_read')}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-ummah-mint dark:bg-white/5 flex items-center justify-center text-ummah-icon-active-light">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </button>
              ))}

              <div className="mt-12 mb-20 p-8 bg-ummah-mint dark:bg-white/5 rounded-[2.5rem] border border-black/5 dark:border-white/5 animate-fade-up">
                 <h4 className="text-sm font-black uppercase tracking-widest text-ummah-icon-active-light dark:text-ummah-icon-active-dark mb-4">{t('didnt_find_question')}</h4>
                 <div className="space-y-4">
                    <p className="text-[11px] text-ummah-text-light/70 dark:text-ummah-text-secondary-dark leading-relaxed font-medium">
                      {t('expanding_section')}
                    </p>
                    <p className="text-[11px] text-ummah-text-light/70 dark:text-ummah-text-secondary-dark leading-relaxed font-black">
                      {t('question_help_others')}
                    </p>
                    <div className="pt-2">
                       <div className="flex items-center gap-2 opacity-20">
                          <MessageSquareQuote size={18} className="text-ummah-gold" />
                          <span className="text-[8px] font-black uppercase tracking-[0.3em]">{t('sincere_community_support')}</span>
                       </div>
                    </div>
                 </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-10 animate-in fade-in zoom-in duration-500 text-center">
               <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-[1.5rem] flex items-center justify-center text-ummah-icon-inactive-light mb-6 border border-black/5 dark:border-white/5">
                 <AlertCircle size={32} />
               </div>
               <h3 className="text-sm font-black text-ummah-text-light dark:text-ummah-text-dark uppercase tracking-widest mb-3">{t('no_results_found')}</h3>
               <p className="text-[11px] text-ummah-text-light/40 dark:text-ummah-text-secondary-dark font-medium leading-relaxed mb-8 max-w-[240px]">
                 {t('couldnt_find_topic')}
               </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (activeSubFeature !== 'main') {
    const renderSubFeature = () => {
      switch (activeSubFeature) {
        case 'duas': return <DuaCollection language={settings.language} />;
        case 'calendar': return <IslamicCalendar onAskAgent={onAskAgent} />;
        case 'fasting': return <FastingTracker onAskAgent={onAskAgent} />;
        case 'hadith': return <HadithBrowser onAskAgent={onAskAgent} language={settings.language} />;
        case 'tasbih': return <TasbihCounter />;
        case 'ask-learn': return <AskAndLearn onAskAgent={onAskAgent} />;
        case 'zakat': return <ZakatCalculator onAskAgent={onAskAgent} />;
        case 'names': return <NamesOfAllah onAskAgent={onAskAgent} />;
        case 'stories': return <ProphetStories onAskAgent={onAskAgent} />;
        case 'life-guidance': return <LifeGuidanceView />;
        case 'prayers': return (
          <PrayerTimes 
            location={location} 
            initialTimings={timings} 
            settings={settings}
            onUpdateSettings={onUpdateSettings}
            onSetLocation={onSetLocation}
            onAskAgent={onAskAgent} 
            setActiveAdhan={setActiveAdhan}
          />
        );
        default: return null;
      }
    };

    return (
      <div className="animate-fade-up flex flex-col h-full bg-ummah-bg-light dark:bg-ummah-bg-dark overflow-hidden">
        <div className="shrink-0 bg-white/80 dark:bg-ummah-bg-dark/80 backdrop-blur-xl p-5 flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.05] z-50">
          <button 
            onClick={() => setActiveSubFeature('main')} 
            className="flex items-center gap-2 p-2 rounded-2xl bg-ummah-mint dark:bg-white/5 text-ummah-icon-active-light dark:text-ummah-icon-active-dark transition-all"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
            <span className="text-xs font-bold uppercase tracking-widest">{t('home')}</span>
          </button>
          <h3 className="premium-header text-base font-bold text-ummah-text-light dark:text-ummah-text-dark">
            {activeSubFeature === 'prayers' ? t('prayer_times') : 
              activeSubFeature === 'hadith' ? t('hadith_library') :
              activeSubFeature === 'fasting' ? t('ramadan_log') :
              activeSubFeature === 'tasbih' ? t('digital_tasbih') :
              activeSubFeature === 'ask-learn' ? t('ask_learn') :
              activeSubFeature === 'zakat' ? t('zakat_tool') :
              activeSubFeature === 'names' ? t('names_of_allah') :
              activeSubFeature === 'stories' ? t('prophet_stories') :
              activeSubFeature === 'life-guidance' ? t('life_guidance') :
              activeSubFeature.charAt(0).toUpperCase() + activeSubFeature.slice(1)}
          </h3>
          <div className="w-16"></div>
        </div>
        <div className="flex-1 overflow-y-auto green-scrollbar relative scroll-smooth">
          {renderSubFeature()}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto green-scrollbar bg-ummah-bg-light dark:bg-ummah-bg-dark pattern-bg pb-32 scroll-smooth">
      <div className="pt-12 pb-6 text-center flex flex-col items-center">
        <h1 className="premium-header text-xl md:text-2xl font-bold uppercase tracking-[0.3em] text-black dark:text-white">
          {t('welcome_to_ummah')}
        </h1>
        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-ummah-gold mt-2">
          {t('ummah_lifestyle_companion')}
        </p>
      </div>

      <div className="animate-fade-up">
        <PrayerTrackerCard timings={timings} />
      </div>

      <div className="px-6 py-10 space-y-12">
        <section className="animate-fade-up [animation-delay:100ms]">
          <SectionTitle title={t('daily_essentials')} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <DashboardCard icon={Clock} label={t('prayers')} onClick={() => setActiveSubFeature('prayers')} />
            <DashboardCard icon={Zap} label={t('tasbih')} onClick={() => setActiveSubFeature('tasbih')} />
            <DashboardCard icon={BookMarked} label={t('duas')} onClick={() => setActiveSubFeature('duas')} />
            <DashboardCard icon={CalendarCheck} label={t('fasting')} onClick={() => setActiveSubFeature('fasting')} />
            <DashboardCard icon={Star} label={t('names_of_allah')} onClick={() => setActiveSubFeature('names')} fullWidth accent />
            <DashboardCard icon={CalendarIcon} label={t('calendar')} onClick={() => setActiveSubFeature('calendar')} fullWidth />
          </div>
        </section>

        <section className="animate-fade-up [animation-delay:150ms]">
          <SectionTitle title={t('struggles_solutions')} />
          <HorizontalCard 
            icon={Compass} 
            label={t('life_guidance')} 
            subtitle={t('islamic_solutions_struggles')}
            onClick={() => setActiveSubFeature('life-guidance')}
            accent
          />
        </section>

        <section className="animate-fade-up [animation-delay:200ms]">
          <SectionTitle title={t('wealth_guidance')} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <button 
              onClick={() => setActiveSubFeature('zakat')}
              className="flex items-center gap-6 p-6 bg-gradient-to-br from-ummah-icon-active-light to-[#043326] dark:from-ummah-card-dark dark:to-[#0F172A] rounded-[2rem] border border-emerald-500/20 text-white shadow-premium group transition-all active:scale-[0.98]"
            >
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 group-hover:scale-110 transition-transform">
                <Calculator size={32} strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-black text-lg uppercase tracking-tight">{t('zakat_calculator')}</h4>
                <p className="text-[10px] text-emerald-100/60 font-bold uppercase tracking-widest mt-1">{t('purify_wealth_charity')}</p>
              </div>
              <ArrowRight size={20} className="text-emerald-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        <section className="animate-fade-up [animation-delay:250ms]">
          <SectionTitle title={t('learn_reflect')} />
          <div className="space-y-4">
            <HorizontalCard 
              icon={BookOpen} 
              label={t('prophet_stories')} 
              subtitle={t('stories_inspiration')}
              onClick={() => setActiveSubFeature('stories')} 
            />
            <HorizontalCard 
              icon={Library} 
              label={t('hadith_library')} 
              onClick={() => setActiveSubFeature('hadith')} 
            />
            <HorizontalCard 
              icon={MessageCircle} 
              label={t('ask_learn')} 
              subtitle={t('explore_islamic_questions')}
              onClick={() => setActiveSubFeature('ask-learn')}
            />
          </div>
        </section>

        <div className="py-8 flex flex-col items-center text-center opacity-20">
          <Sparkles size={18} className="text-ummah-gold mb-3" />
          <p className="text-[9px] font-black uppercase tracking-[0.6em] text-ummah-text-light dark:text-ummah-text-dark">{t('sincere_guidance_sanctuary')}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
