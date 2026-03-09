import { useMemo } from 'react';
import { AppLanguage } from '../types';

export const useTranslation = (lang: AppLanguage = 'en') => {
  const t = useMemo(() => (key: string) => {
    // Simple fallback: replace underscores with spaces and capitalize
    const fallback = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Basic English map for common keys
    const basicMap: Record<string, string> = {
      'home': 'Home',
      'quran': 'Quran',
      'ummah_ai': 'Ummah AI',
      'more': 'More',
      'welcome_to_ummah': 'Welcome to Ummah',
      'ummah_lifestyle_companion': 'Your Islamic Lifestyle Companion',
      'daily_essentials': 'Daily Essentials',
      'prayers': 'Prayers',
      'tasbih': 'Tasbih',
      'duas': 'Duas',
      'fasting': 'Fasting',
      'names_of_allah': '99 Names',
      'calendar': 'Calendar',
      'struggles_solutions': 'Struggles & Solutions',
      'life_guidance': 'Life Guidance',
      'islamic_solutions_struggles': 'Islamic solutions for modern struggles',
      'wealth_guidance': 'Wealth & Guidance',
      'zakat_calculator': 'Zakat Calculator',
      'purify_wealth_charity': 'Purify your wealth through charity',
      'learn_reflect': 'Learn & Reflect',
      'prophet_stories': 'Prophet Stories',
      'stories_inspiration': 'Stories of inspiration',
      'hadith_library': 'Hadith Library',
      'ask_learn': 'Ask & Learn',
      'explore_islamic_questions': 'Explore Islamic questions',
      'sincere_guidance_sanctuary': 'A Sincere Guidance Sanctuary',
      'prayer_times': 'Prayer Times',
      'ramadan_log': 'Ramadan Log',
      'digital_tasbih': 'Digital Tasbih',
      'zakat_tool': 'Zakat Tool',
      'search_struggle': 'Search your struggle...',
      'no_results_found': 'No results found',
      'couldnt_find_topic': 'Could not find the topic',
      'min_read': 'min read',
      'didnt_find_question': 'Didn\'t find your question?',
      'expanding_section': 'We are constantly expanding our sections.',
      'question_help_others': 'Your question might help others.',
      'sincere_community_support': 'Sincere Community Support',
      'final_reflection': 'Final Reflection',
      'ai_dive_deeper': 'Dive deeper with Ummah AI',
      'guidance': 'Guidance'
    };

    return basicMap[key] || fallback;
  }, [lang]);

  return { t };
};
