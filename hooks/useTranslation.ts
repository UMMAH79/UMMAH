
import { translations } from './translations';
import { AppLanguage } from './types';

export const useTranslation = (language: AppLanguage) => {
  const t = (key: string) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return { t };
};
