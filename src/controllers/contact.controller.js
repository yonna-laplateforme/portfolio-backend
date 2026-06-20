// On importe le service qui contient la logique métier pour l'envoi d'emails.
import * as ContactService from '../services/contact.service.js';

// On importe une fonction utilitaire (helper) pour harmoniser le format
// des réponses de succès renvoyées au client (le front-end).
import { sendSuccess } from '../utils/responseHandler.js';

/**
 * Contrôleur qui gère la soumission du formulaire de contact.
 * Il prend 3 paramètres : 
 * - req : l'objet de la requête HTTP (contient les données reçues)
 * - res : l'objet de la réponse HTTP (permet de renvoyer une réponse)
 * - next : une fonction Express pour passer au middleware suivant (très important pour les erreurs !)
 */
export const sendContactMessage = async (req, res, next) => {
  // On utilise un bloc try...catch pour sécuriser l'opération.
  // Si tout se passe bien, on exécute le 'try'. Si une erreur survient, on bascule dans le 'catch'.
  try {
    // 1. Extraction (déstructuration) des données envoyées par l'utilisateur dans le formulaire
    const { name, email, message } = req.body;

    // 2. Appel asynchrone (await) du service métier pour traiter l'envoi de l'email
    await ContactService.sendContactEmail({ name, email, message });

    // 3. Si l'envoi réussit, on utilise notre utilitaire pour renvoyer une réponse JSON standardisée
    sendSuccess(res, "Votre message a été envoyé avec succès !");
    
  } catch (error) {
    // 4. Si une erreur survient (ex: problème de serveur SMTP, BDD, etc.), 
    // on la passe à la fonction next(). Cela dit à Express : "Une erreur est survenue, 
    // envoie-la directement au middleware global de gestion des erreurs".
    next(error);
  }
};