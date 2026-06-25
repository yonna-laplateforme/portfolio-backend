// On importe la bibliothèque 'mysql2' dans sa version 'promise'.
// L'utilisation des promesses (promises) est cruciale ici car elle nous permettra
// d'utiliser la syntaxe asynchrone moderne (async/await) lors de nos requêtes,
// ce qui évite de bloquer l'application pendant que la base de données répond.
import mysql from 'mysql2/promise';

// On importe et on configure 'dotenv'.
// Cela permet de lire le fichier caché '.env' à la racine de notre projet et 
// d'injecter les variables qu'il contient dans l'environnement Node.js (process.env).
// C'est indispensable pour la sécurité : on ne stocke JAMAIS de mots de passe en clair dans le code.
import 'dotenv/config';

// On crée un "Pool" de connexions plutôt qu'une simple connexion unique (createConnection).
// Un pool gère un groupe de connexions prêtes à l'emploi. Quand un utilisateur fait une requête,
// il prend une connexion du pool, et quand il a fini, il la rend. 
// Cela améliore grandement les performances si plusieurs utilisateurs se connectent en même temps.
const db = mysql.createPool({
  // process.env permet de récupérer les valeurs sécurisées depuis le fichier .env
  host: process.env.DB_HOST,         // L'adresse du serveur de base de données (ex: localhost)
  user: process.env.DB_USER,         // Le nom d'utilisateur (ex: root)
  password: process.env.DB_PASSWORD, // Le mot de passe de la base de données
  database: process.env.DB_NAME,     // Le nom de la base de données à laquelle on veut se connecter
  
  // On force la conversion du port en Nombre (Number) car le fichier .env renvoie du texte (String).
  // Le "|| 8889" est une valeur de repli (fallback) : si process.env.DB_PORT n'existe pas, 
  // on utilise le port 8889 par défaut (souvent utilisé par MAMP).
  port: Number(process.env.DB_PORT) || 3306, 
});

// On exporte notre pool de connexion ('db') par défaut.
// Cela nous permet d'importer cet objet 'db' dans d'autres fichiers de notre application
// (par exemple dans nos modèles) pour pouvoir y exécuter des requêtes SQL.
export default db;