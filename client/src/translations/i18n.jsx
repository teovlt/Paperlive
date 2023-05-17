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
          global: {
            back: 'Back',
            cancel: 'Cancel',
            next: 'Next',
            previous: 'Previous',
            save: 'Save',
            download: 'Download',
            contribution: 'Contribution',
            contributions: 'Contribution(s)',
            submission: 'Submission',
            search: 'Search',
            confirm: 'Confirm',
            beta: 'Beta',
          },
          layout: {
            overview: 'Overview',
            statistics: 'Statistics',
          },
          sideBar: {
            edit: 'Edit Profile',
            visibility: 'Visibility',
            description: 'Description',
            location: 'Location',
            webSite: 'Website',
            public: 'Public',
            private: 'Private',
          },
          avatar: {
            hover: 'Change your profile picture',
          },
          login: {
            welcome: 'Welcome',

            textSignUp: 'New to PaperLive ?',
            loginError: 'Login Failed',
            invalidLogin: 'Invalid Credentials',
            bottom:
              "The login is required to access PaperLive's services and to securely manage your account.",
          },
          register: {
            welcome: 'Create your profile',
            password2: 'Confirm your password',
            textSignIn: 'Already have an account? ',
            errorPasswordFormat:
              'The password must have least 8 characters long, one lowercase letter, one uppercase letter, one digit, and one special character. Please try again.',
            errorPasswordConf: 'The passwords do not match. Please try again.',
            registerError: 'Register Failed',
            bottom:
              'By creating an account, you agree to the terms of service. For more information about PaperLive’s privacy practices, see the privacy Statement.',
          },
          authentication: {
            servorError: 'No Server Response',
            teamName: 'Team name',
            password: 'Password',
            signIn: 'Sign In',
            signUp: 'Sign Up',
          },
          language: {
            current: 'Current language',
            english: 'English',
            french: 'French',
            spanish: 'Spanish',
          },
          dropDown: {
            signedAs: 'Signed in as',
            profile: 'Profile',
            statistics: 'Statistics',
            logout: 'Logout',
            settings: 'Settings',
            newContribution: 'New contribution',
            newSubmission: 'New submission',
          },
          home: {
            desc: 'About us',
            activity: 'Recent activity',
            noDesc:
              "You don't have a description yet, edit your profile to add one. This will allow other teams to better know what you do and what field you are in.",
            noActivity: 'Nothing here for the moment',
          },
          contribution: {
            title: 'Title',
            date: 'Date',
            role: 'Role',
            state: 'State',
            count: 'Count:',
            searchBar: 'Search contributions by title',
            stats: 'Show the statistics',
            editContribution: 'Edit the contribution',
            delete: 'Delete the contribution',
            inProgress: 'In progress',
            approved: 'Approved',
            dropped: 'Dropped',
            leader: 'Leader',
            coLeader: 'Co-leader',
            guest: 'Guest',
            startDate: 'Start date',
            related: 'Related contribution',
            related2: 'Related contribution(s)',
            noRelated: 'No contributions are linked to this contribution',
            previous: 'Previous',
            teamRole: 'Team role',
            step: 'Step',
            informations: 'Informations',
            files: 'Files',
            recap: 'Summary',
            errorMsg: 'Please fill in the following field(s): ',
            errorMsgAbstract: 'Please fill in the following field: Abstract',
            editForm: 'Edit this section',
            newContribution: 'New contribution',
            fileSupported: 'Files supported',
            suppTitle: 'Delete Contribution',
            suppCaption:
              'Once deleted, there will be no way to undo this action and retrieve any information related to this contribution. Are you sure you want to delete this contribution from PaperLive?',
            noResults: 'Sorry, no results found.',
          },
          submission: {
            newSubmission: 'New submission',
          },
          fileInput: {
            success: 'Successfully uploaded',
            drag: 'Drag and drop your file here',
            or: 'or',
            browse: 'Browse files',
          },
        },
      },
      fr: {
        translation: {
          global: {
            back: 'Retour',
            cancel: 'Annuler',
            next: 'Suivant',
            previous: 'Précédent',
            save: 'Sauvegarder',
            download: 'Telecharger',
            contribution: 'Contribution',
            contributions: 'Contribution(s)',
            submission: 'Soumission',
            search: 'Rechercher',
            confirm: 'Confirmer',
            beta: 'Bêta',
          },
          layout: {
            overview: "Vue d'ensemble",
            statistics: 'Statistiques',
          },
          sideBar: {
            edit: 'Modifier votre profil',
            visibility: 'Visibilité',
            description: 'Description',
            location: 'Localisation',
            webSite: 'Site internet',
            public: 'Public',
            private: 'Privé',
          },
          avatar: {
            hover: 'Changer votre photo de profil',
          },
          login: {
            welcome: 'Bienvenue',
            textSignUp: 'Nouveau sur PaperLive ?',
            loginError: 'Erreur lors de la connexion',
            invalidLogin: 'Identifiants invalides',
            bottom:
              'La connexion est nécessaire pour accéder aux services de PaperLive et pour gérer votre compte en toute sécurité.',
          },
          register: {
            welcome: 'Créer votre compte',
            password2: 'Confirmer votre mot de passe',
            textSignIn: 'Vous possèdez déja un compte? ',
            errorPasswordFormat:
              'Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.',
            errorPasswordConf: 'Les mots de passe ne correspondent pas. Veuillez réessayer.',
            registerError: "Erreur lors de l'enregistrement",
            bottom:
              "En créant un compte, vous acceptez les conditions d'utilisation. Pour plus d'informations sur les pratiques de confidentialité de PaperLive, consultez la déclaration de confidentialité.",
          },
          authentication: {
            servorError: 'Le serveur ne répond pas',
            teamName: "Nom de l'équipe",
            password: 'Mot de passe',
            signIn: 'Se connecter',
            signUp: "S'enregistrer",
          },
          language: {
            current: 'Langue actuelle',
            english: 'Anglais',
            french: 'Français',
            spanish: 'Espagnol',
          },
          dropDown: {
            signedAs: 'Connecté en tant que',
            profile: 'Profil',
            statistics: 'Statistiques',
            logout: 'Deconnexion',
            settings: 'Paramètres',
            newContribution: 'Nouvelle contribution',
            newSubmission: 'Nouvelle soumission',
          },
          home: {
            desc: 'A propos de nous',
            activity: 'Activité récente',
            noDesc:
              'Vous ne possédez pas encore de description, modifier votre profil pour en rajouter une. Cela permettra aux autres équipes de mieux savoir ce que vous faites et dans quel domaine êtes vous.',
            noActivity: "Rien ici pour l'instant",
          },
          contribution: {
            title: 'Titre',
            date: 'Date',
            role: 'Rôle',
            state: 'Etat',
            count: 'Décompte :',
            searchBar: 'Rechercher des contributions par titre',
            stats: 'Voir les statistiques',
            edit: 'Modifier la contribution',
            delete: 'Supprimer la contribution',
            inProgress: 'En cours',
            approved: 'Approuvée',
            dropped: 'Abandonnée',
            leader: 'Meneur',
            coLeader: 'Co-meneur',
            guest: 'Invité',
            startDate: 'Date de départ',
            related: 'Contribution en lien',
            related2: 'Contribution(s) en lien',
            noRelated: "Aucune contribution n'est liée à cette contribution",
            teamRole: "Role de l'équipe",
            step: 'Etape',
            informations: 'Informations',
            files: 'Documents',
            recap: 'Récapitulatif',
            errorMsg: 'Merci de remplir le(s) champ(s) suivant(s): ',
            errorMsgAbstract: 'Merci de remplir le champ suivant: Abstract',
            editForm: 'Changer cette section',
            newContribution: 'Nouvelle contribution',
            fileSupported: 'Fichiers supportés',
            suppTitle: 'Supprimer la contribution',
            suppCaption:
              "Une fois supprimée, il n'y aura aucun moyen de revenir en arrière et de retrouver une quelconque informations sur cette contribution. Souhaitez vous vraiment supprimer cette contribution de PaperLive ?",
            noResults: 'Désolé, aucun résultat trouvé.',
          },
          submission: {
            newSubmission: 'Nouvelle soumission',
          },
          fileInput: {
            success: 'Importé avec succès',
            drag: 'Faites glisser votre fichier ici',
            or: 'ou',
            browse: 'Parcourir les fichiers',
          },
        },
      },
      es: {
        translation: {
          global: {
            back: 'Volver',
            cancel: 'Cancelar',
            next: 'Siguiente',
            previous: 'Anterior',
            save: 'Guardar',
            download: 'Descargar',
            contribution: 'Contribución',
            contributions: 'Contribución(es)',
            submission: 'Presentación',
            search: 'Buscar en',
            confirm: 'Confirme',
            beta: 'Beta',
          },
          layout: {
            overview: 'Visión general',
            statistics: 'Estadísticas',
          },
          sideBar: {
            edit: 'Editar perfil',
            visibility: 'Visibilad',
            description: 'Descripción',
            location: 'Ubicación',
            webSite: 'Página web',
            public: 'Público',
            private: 'Privado',
          },
          avatar: {
            hover: 'Cambia tu foto de perfil',
          },
          login: {
            welcome: 'Bienvenido',

            textSignUp: '¿Eres nuevo en PaperLive?',
            loginError: 'Error de inicio de sesión',
            invalidLogin: 'Credenciales no válidas',
            bottom:
              'El inicio de sesión es necesario para acceder a los servicios de PaperLive y gestionar de forma segura su cuenta.',
          },
          register: {
            welcome: 'Cree su perfil',
            password2: 'Confirme su contraseña',
            textSignIn: '¿Ya tiene una cuenta? ',
            errorPasswordFormat:
              'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una mayúscula, un dígito y un carácter especial. Por favor, inténtelo de nuevo.',
            errorPasswordConf: 'Las contraseñas no coinciden. Vuelva a intentarlo.',
            registerError: 'Registro fallido',
            bottom:
              'Al crear una cuenta, aceptas las condiciones del servicio. Para obtener más información sobre las prácticas de privacidad de PaperLive, consulte la Declaración de privacidad.',
          },
          authentication: {
            servorError: 'Sin respuesta del servidor',
            teamName: 'Nombre del equipo',
            password: 'Contraseña',
            signIn: 'Iniciar sesión',
            signUp: 'Registrarse',
          },
          language: {
            current: 'Idioma actual',
            english: 'Inglés',
            french: 'Francés',
            spanish: 'Español',
          },
          dropDown: {
            signedAs: 'Firmado como',
            profile: 'Perfil',
            statistics: 'Estadísticas',
            logout: 'Cerrar sesión',
            settings: 'Ajustes',
            newContribution: 'Nueva contribución',
            newSubmission: 'Nuevo envío',
          },
          home: {
            desc: 'Sobre nosotros',
            activity: 'Actividad reciente',
            noDesc:
              'Todavía no tienes una descripción, edita tu perfil para añadir una. Esto permitirá que otros equipos sepan mejor a qué te dedicas y en qué campo estás.',
            noActivity: 'Nada aquí por el momento',
          },
          contribution: {
            title: 'Título',
            date: 'Fecha',
            role: 'Rol',
            state: 'Estado',
            count: 'Count:',
            searchBar: 'Buscar contribuciones por título',
            stats: 'Mostrar las estadísticas',
            editContribution: 'Editar la contribución',
            delete: 'Borrar la contribución',
            inProgress: 'En curso',
            approved: 'Aprobada',
            dropped: 'Abandonada',
            leader: 'Líder',
            coLeader: 'Co-líder',
            guest: 'Invitado',
            startDate: 'Fecha de inicio',
            related: 'Contribución relacionada',
            related2: 'Contribución(es) relacionada(s)',
            noRelated: 'No hay contribuciones relacionadas con esta contribución',
            previous: 'Anterior',
            teamRole: 'Rol del equipo',
            step: 'Paso',
            informations: 'Informationes',
            files: 'Archivos',
            recap: 'Resumen',
            errorMsg: 'Por favor, rellene el(los) siguiente(s) campo(s): ',
            errorMsgAbstract: 'Por favor, rellene el siguiente campo: Abstract',
            editForm: 'Edite esta sección',
            newContribution: 'Nueva contribución',
            fileSupported: 'Archivos admitidos',
            suppTitle: 'Eliminar contribución',
            suppCaption:
              'Una vez eliminada, no habrá forma de deshacer esta acción y recuperar cualquier información relacionada con esta contribución. ¿Estás seguro de que quieres eliminar esta contribución de PaperLive?',
            noResults: 'Lo sentimos, no se encontraron resultados.',
          },
          submission: {
            newSubmission: 'Nuevo envío',
          },
          fileInput: {
            success: 'SSubido con éxito',
            drag: 'Arrastre y suelte su archivo aquí',
            or: 'o',
            browse: 'Examinar archivos',
          },
        },
      },
    },
  });

export default i18n;
