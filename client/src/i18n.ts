import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import authEN from '../public/locales/en/auth.json';
import navigationEN from '../public/locales/en/navigation.json';
import translationEN from '../public/locales/en/translation.json';
import authFR from '../public/locales/fr/auth.json';
import navigationFR from '../public/locales/fr/navigation.json';
import translationFR from '../public/locales/fr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr-CA',
    resources: {
      en: {
        translation: translationEN,
        auth: authEN,
        navigation: navigationEN
      },
      fr: {
        translation: translationFR,
        auth: authFR,
        navigation: navigationFR
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: false },
    supportedLngs: ['en', 'fr', 'fr-CA', 'en-CA'],
  });

export default i18n;
