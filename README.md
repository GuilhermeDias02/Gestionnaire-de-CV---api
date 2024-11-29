ROSTANE RAYANE  
De Oliveira Dias Guilherme
 
 Fonctionnalités principales
1. Inscription et Connexion :
   Les utilisateurs peuvent s'inscrire avec leur adresse email et un mot de passe. Une fois enregistrés, ils peuvent se connecter pour accéder à leur tableau de bord personnalisé.
2. Création de CV :
   Depuis le tableau de bord, les utilisateurs connectés peuvent créer un CV en remplissant un formulaire comprenant des informations comme le titre, les compétences techniques, les expériences professionnelles, et bien plus encore.
3. Gestion des CV :
   Les utilisateurs peuvent visualiser tous les CV qu'ils ont créés dans leur espace personnel. Ils ont également la possibilité de modifier ou supprimer des CV existants.
4. Recherche de CV :
   Une barre de recherche est disponible pour permettre de filtrer les CV en fonction de leur titre (il faut taper un mot, et tous les cv contenant ce mot apparaitront (uniquement les cv ayant la visibilité cochée. Si un utilisateur est connecté alors il pourra cliquer sur un cv pour en voir ses détails. Si aucun utilisateur n’est connecté, alors il sera redirigé vers la page de login). Cela facilite l'accès aux CV spécifiques.
5. Visualisation des CV publics :
   Même sans être connecté, un utilisateur peut consulter une liste de CV publics (avec l'attribut 'visible'). Cependant, pour accéder aux détails d'un CV, une connexion est requise.
5. Gestion des recommendations :
   Lorsqu’on accède à un cv on peut voir les recommandations. On peut en écrire pour donner une note et mettre un commentaire. Le créateur du cv et les auteurs peuvent ensuite gérer leurs recommandations (supprimer).
Détails techniques
L'application est développée en utilisant les technologies suivantes :
- Frontend : React.js avec React Router pour la gestion des routes.
- Backend : Node.js avec Express.js pour la création des API.
- Base de données : MongoDB pour stocker les utilisateurs, les CV et leurs attributs.
- Sécurité : Les tokens JWT (JSON Web Token) sont utilisés pour sécuriser les routes nécessitant une authentification.
Fonctionnement de l'application
1. Lorsqu'un utilisateur arrive sur la page d'accueil, il peut soit s'inscrire, soit se connecter. Une fois connecté, il est redirigé vers le tableau de bord.
2. Depuis le tableau de bord, l'utilisateur peut :
   - Créer un CV via un formulaire.
   - Visualiser, modifier ou supprimer les CV existants.
3. La page d'accueil permet également aux visiteurs de rechercher et de visualiser des CV publics (il faut écrire un mot présent dans le titre d’un cv exemple : si l’on écrit « Développeur » alors tous les cv contenant le mot « Développeur » dans leurs titres apparaitront (uniquement les cv dont la visibilité a été autorisé au moment de sa création). Si un utilisateur non connecté tente de voir les détails d'un CV, il est redirigé vers la page de connexion.
4. Une fois dans le Cv on peut voir et rédiger les recommandations. Les personnes autorisées peuvent aussi les supprimer.





Le déploiement
Dans le cas où vous voulez exécuter le projet vous même il vous faudra suivre ces étapes :
-	Télécharger les deux projets présents sur github (api et front)
-	Créer une base de données MongoDB
-	Remplir un fichier .env en suivant le modèle présent dans le fichier .env.local.exemple présent dans l’api
-	Lancer l’api avec npm run start
-	Modifier le lien de l’api dans la variable API_URL du fichier api.js du projet front afin de le mettre en localHost
-	Lancer le front avec npm run start

Sinon le projet est disponible sur le lien suivant : https://gestionnaire-de-cv-front.onrender.com/

(lien pour exécuter les requête de l’api https://gestionnaire-de-cv-api.onrender.com/api/)
