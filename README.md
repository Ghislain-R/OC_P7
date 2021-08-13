# OC_P7
Projet Openclassrooms N° 7      

INFORMATIONS POUR L'INSTALLATION ET L'UTILISATION DU PROJET     

1 - Cloner ce repository depuis Github      

2 - Mise en place du Frontend     

* Se positionner sur le dossier "frontend"      
* Executer npm install      
* Pour lancer le frontend, executer la commande  "npm run serve"      

3 - Mise en place du Backend      

* Se positionner sur le dossier "backend"     
* Executer npm install      
* Installer nodemon avec la commande "npm install -g nodemon"    
* Pour lancer le backend, executer la commande "nodemon server"     

4 - Mise en place de la base de données     

Pour mettre en place la base de données, 2 méthodes sont possibles :      

* 1ère Méthode :      

    - Installer Mysql     

    - Sur Mysql, créer une base de données "database_development"     

    - Dans le fichier "backend/config/config.json" du projet, renseignez votre username et votre mot de passe Mysql pour la base de donnée "database_development"     

    - Vérifier que  Sequelize-cli est installé (npm install --save sequelize-cli)     

    - Se positionner sur le dossier "Backend"     

    - Executer la commande suivante pour créer les tables dans la base de données :  "npx sequelize-cli db:migrate"         

    - Executer la commande suivante pour ajouter le compte administrateur dans la table "users" : "npx sequelize-cli db:seed:all"    

* 2ème méthode :      

    - Installer Mysql     

    - Sur Mysql, créer une base de données "database_development"     

    - Dans le fichier "backend/config/config.json" du projet, renseignez votre username et votre mot de passe Mysql pour la base de donnée "database_development"     

    - Dans la base de données, executer le script présent dans le fichier "backend/database_backup/database_development.sql"      

      Ce script génère les tables de la base de données et créé le compte administrateur dans la tables "users"     


5 - Pour lancer l'application, ouvrir le navigateur à la l'adresse : http://localhost:8080      

Créez votre compte dans l'application.      
NB : Pour s'inscrire sur l'application, saisir un mot de passe contenant 8 caractères minimum (dont 1 Majuscule, 1 minuscule, 1 chiffre)      

Le compte administrateur, qui permet de modérer les messages et commentaires est le suivant :     
email : admin@gmail.com	      
mdp : AdmingroupoP7     

Autres informations :     

Le framework utilisé pour le frontend est VueJs avec vue@cli      

La partie backend du projet est développée avec NodeJS (v12.22.1), Express , Sequelize et Mysql.
