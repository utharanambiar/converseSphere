import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import englishTranslation from './src/locales/en.json'
import frenchTranslation from './src/locales/fr.json'
import germanTranslation from './src/locales/de.json'

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug : true, 
    fallbackLng: "en",
    resources : {
        en : {
            translation : englishTranslation
        },
        fr : {
            translation : frenchTranslation
        },
        de : {
            translation : germanTranslation
        }
    }
})

export default i18n;