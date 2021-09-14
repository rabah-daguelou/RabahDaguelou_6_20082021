So pekocko est une application web permettant aux utilisateurs d’afficher toutes les sauces existantes dans sa base de donnée, de consulter une en particulier, de rajouter des sauces, d’en  modifier ou de supprimer celles qu’ils auraient publiées.


Pour lancer l'application:

1- Accédez à votre terminal ( cmd, gitbush, shell ...)
2- Clonez le repos GitHub: git clone https://github.com/rabah-daguelou/RabahDaguelou_p6_20082021.git
3- Créez un fichier .env dans le dossier backend et renseignez l'url de votre base de donnée, votre token et éventuellement le PORT.

exemple:
DatabaseUrl="mongodb+srv://<votre login>:<mot de passe>@peckoko.yjtim.mongodb.net/peckoko?retryWrites=true&w=majority"
TokenSecret="GVxODN08"
PORT="3000"

4- Accédez au dossier frontend: cd frontend
5- Exécuter npm install.
6- Lancez la commande: npm start
7- Accédez au dossier backend: cd backend 
8- Lancez la commande: nodemon server

Si vous n'arrivez pas à vous connecter à l'application, merci d'envoyer un mail
à l'adresse suivante: lounislina@yahoo.fr