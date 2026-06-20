// On importe toutes les fonctions exportées du fichier 'auth.service.js' 
// sous un espace de noms (namespace) appelé 'authService'.
// Cela permet de séparer la logique de routage/contrôle (ici) de la logique métier (le service).
import * as authService from '../services/auth.service.js';

/**
 * Contrôleur gérant la connexion (login) de l'utilisateur.
 * Il est exporté pour être utilisé par le routeur (ex: auth.routes.js).
 * La fonction est 'async' car elle va attendre une réponse asynchrone du service (la vérification en BDD).
 */
export const login = async (req, res) => {
  // On utilise la déstructuration (ES6) pour extraire 'email' et 'password'
  // directement depuis le corps de la requête HTTP (req.body).
  const { email, password } = req.body;

  // On appelle la méthode 'loginUser' de notre service en lui passant les identifiants.
  // L'utilisation du mot-clé 'await' met la fonction en pause jusqu'à ce que la promesse du service soit résolue.
  // Si le service lève une erreur (ex: mauvais mot de passe via AppError), 
  // le middleware global de gestion des erreurs (errorHandler) interceptera automatiquement l'exception.
  const token = await authService.loginUser({ email, password });

  // Si tout s'est bien passé (pas d'erreur levée), on renvoie une réponse HTTP
  // au format JSON contenant le jeton d'authentification (Token JWT généralement) avec un statut 200 par défaut.
  res.json({ token });
};