** GROUPOMANIA - Réseau social d'entreprise **

Etape de mise en route :

### Initialisation du projet: 📁

créer un dossier en local

y cloner le repository à l'aide de votre CLI avec cette commande:
git clone https://github.com/abidisalma/GroupamaniaProjet7.git

### Installation des packages : 📦

se positionner avec le CLI sur le dossier backend ET lancer la commande :

### npm install

se positionner sur le dossier frontend et lancer la commande :
npm install

### Définition des Variables d'environnement : 📝

-   Backend
    copier le fichier .env du dossier \backend
    le coller au même endroit puis renommer celui-ci par ".env"
    Ouvrir ce fichier .env et remplacer les variables par vos propres valeurs,ex:
    SECRET_KEY_SALTED = CleSecrete12
    PORT = 5000

\*Frontend
copier le fichier .env du dossier \frontend
le coller au même endroit puis renommer celui-ci par ".env"
Ouvrir ce fichier .env et remplacer les variables par vos propres valeurs,ex:
REACT_APP_API_URL= http://localhost:3000/

ATTENTION le port doit correspondre avec celui choisit dans le backend (PORT)

### Lancement de l'application 🚀

-se positionner sur le dossier \backend et lancer : npm start

-se positionner sur le dossier \frontend et lancer : npm start

l'application sera lancé sur http://localhost:3000
