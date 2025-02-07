import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import authEN from './locales/en/auth.json';
import navigationEN from './locales/en/navigation.json';
import translationEN from './locales/en/translation.json';
import dashboardEN from './locales/en/dashboard.json';
import authFR from './locales/fr/auth.json';
import navigationFR from './locales/fr/navigation.json';
import translationFR from './locales/fr/translation.json';
import dashboardFR from './locales/fr/dashboard.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr-CA',
    resources: {
      en: {
        translation: translationEN,
        auth: authEN,
        navigation: navigationEN,
        dashboard: dashboardEN
      },
      fr: {
        translation: translationFR,
        auth: authFR,
        navigation: navigationFR,
        dashboard: dashboardFR
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: false },
    supportedLngs: ['en', 'fr', 'fr-CA', 'en-CA'],
  });

export default i18n;
