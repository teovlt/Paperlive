import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationFR from './languages/french.json';
import translationES from './languages/spanish.json';
import translationGE from './languages/german.json';
import translationEN from './languages/english.json';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR, // Utilisez le fichier de traduction en français
      },
      es: {
        translation: translationES,
      },
      de: {
        translation: translationGE,
      },
    },
  });

export default i18n;
