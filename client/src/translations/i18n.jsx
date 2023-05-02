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
          },
          sideBar: {
            edit: 'Edit Profile',
            visibility: 'Visibility',
            cancel: 'Cancel',
            save: 'Save',
            description: 'Description',
            location: 'Location',
            webSite: 'Website',
            public: 'public',
            private: 'private',
          },
          avatar: {
            hover: 'Change your profile picture',
          },
          login: {
            welcome: 'Welcome',

            signIn: 'Sign In',
            signUp: 'Sign Up',
            textSignUp: 'New to PaperLive ?',

            loginError: 'Login Failed',
            invalidLogin: 'Invalid Credentials',
          },
          register: {
            welcome: 'Create your profile',

            password2: 'Confirm your password',
            signIn: 'Sign In',
            signUp: 'Sign Up',
            textSignIn: 'Already have an account? ',

            errorPasswordFormat:
              'The password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character. Please try again.',
            errorPasswordConf: 'The passwords do not match. Please try again.',
            registerError: 'Register Failed',
          },
          authentication: {
            servorError: 'No Server Response',
            bottom:
              'By creating an account, you agree to the terms of service. For more information about PaperLive’s privacy practices, see the privacy Statement.',
            teamName: 'Team name',
            password: 'Password',
          },
          footer: {
            label: 'Copyright © 2023 PaperLive. All rights reserved.',
          },
          language: {
            current: 'Current language',
            english: 'English',
            french: 'French',
          },
        },
      },
      fr: {
        translation: {
          navbar: {
            search: 'Rechercher',
          },
          sideBar: {
            edit: 'Modifier votre profil',
            visibility: 'Visibilité',
            cancel: 'Annuler',
            save: 'Enregistrer',
            description: 'Description',
            location: 'Localisation',
            webSite: 'Site internet',
            public: 'public',
            private: 'privé',
          },
          avatar: {
            hover: 'Changer votre photo de profil',
          },
          login: {
            welcome: 'Bienvenue',

            signIn: 'Se connecter',
            signUp: "S'enregistrer",
            textSignUp: 'Nouveau sur PaperLive ?',
            loginError: 'Erreur lors de la connexion',
            invalidLogin: 'Identifiants invalides',
          },
          register: {
            welcome: 'Créer votre compte',
            password2: 'Confirmer votre mot de passe',
            signIn: 'Se connecter',
            signUp: "S'inscrire",
            textSignIn: 'Vous possèdez déja un compte? ',
            errorPasswordFormat:
              'Le mot de passe doit avoir au moins 8 caractères, contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial. Veuillez réessayer.',
            errorPasswordConf: 'Les mots de passe ne correspondent pas. Veuillez réessayer.',
            registerError: "Erreur lors de l'enregistrement",
          },
          authentication: {
            servorError: 'Le serveur ne répond pas',
            bottom:
              "En créant un compte, vous acceptez les conditions d'utilisation. Pour plus d'informations sur les pratiques de confidentialité de PaperLive, consultez la déclaration de confidentialité.",
            teamName: "Nom de l'équipe",
            password: 'Mot de passe',
          },
          footer: {
            label: 'Copyright © 2023 PaperLive. Tout droits réservés.',
          },
          language: {
            current: 'Langue actuelle',
            english: 'Anglais',
            french: 'Français',
          },
        },
      },
    },
  });

export default i18n;
