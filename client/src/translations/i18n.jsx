import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
        translation: {
          navbar: {
            search: 'Search',
            english: 'English',
            french: 'French',
          },
          sideBar: {
            edit: 'Edit Profile',
            visibility: 'Visibility',
            cancel: 'Cancel',
            save: 'Save',
            webSite: 'Website',
            public: 'public',
            private: 'private',
          },
          avatar: {
            hover: 'Change your profile picture',
          },
          login: {
            welcome: 'Welcome',
            teamName: 'TeamName',
            password: 'Password',
            signIn: 'Sign In',
            signUp: 'Sign Up',
            textSignUp: 'New to PaperLive ?',
            bottom:
              'By creating an account, you agree to the terms of service. For more information about PaperLive’s privacy practices, see the privacy Statement.',
          },
          register: {
            welcome: 'Create your profile',
            teamName: 'TeamName',
            password: 'Password',
            password2: 'Confirm your password',
            signIn: 'Sign In',
            signUp: 'Sign Up',
            textSignIn: 'Already have an account? ',
            bottom:
              'By creating an account, you agree to the terms of service. For more information about PaperLive’s privacy practices, see the privacy Statement.',
          },
          footer: {
            label: 'Copyright © 2023 PaperLive. All rights reserved.',
          },
        },
      },
      fr: {
        translation: {
          navbar: {
            search: 'Rechercher',
            english: 'Anglais',
            french: 'Français',
          },
          sideBar: {
            edit: 'Modifier votre profil',
            visibility: 'Visibilité',
            cancel: 'Annuler',
            save: 'Enregistrer',
            webSite: 'Site internet',
            public: 'public',
            private: 'privé',
          },
          avatar: {
            hover: 'Changer votre photo de profil',
          },
          login: {
            welcome: 'Bienvenue',
            teamName: "Nom de l'équipe",
            password: 'Mot de passe',
            signIn: 'Se connecter',
            signUp: "S'enregistrer",
            textSignUp: 'Nouveau sur PaperLive ?',
            bottom:
              "En créant un compte, vous acceptez les conditions d'utilisation. Pour plus d'informations sur les pratiques de confidentialité de PaperLive, consultez la déclaration de confidentialité.",
          },
          register: {
            welcome: 'Créer votre compte',
            teamName: "Nom de l'équipe",
            password: 'Mot de passe',
            password2: 'Confirmer votre mot de passe',
            signIn: 'Se connecter',
            signUp: "S'inscrire",
            textSignIn: 'Vous possèdez déja un compte? ',
            bottom:
              "En créant un compte, vous acceptez les conditions d'utilisation. Pour plus d'informations sur les pratiques de confidentialité de PaperLive, consultez la déclaration de confidentialité.",
          },
          footer: {
            label: 'Copyright © 2023 PaperLive. Tout droits réservés.',
          },
        },
      },
    },
  });

export default i18n;
