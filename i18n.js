import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'intl-pluralrules';


import en from './locales/en.json';
import uk from './locales/uk.json';

const resources = {
  en: { translation: en },
  uk: { translation: uk },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uk', // мова за замовчуванням
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React автоматично захищає від XSS
    },
  });

export default i18n;
