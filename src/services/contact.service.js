export const sendContactEmail = async ({ name, email, message }) => {
  try {
    console.log("DEBUG: Tentative de ping vers Google...");
    // Fetch est natif, pas besoin d'import
    const response = await fetch('https://www.google.com');
    console.log("DEBUG: Réponse de Google reçue :", response.status);
    return true;
  } catch (error) {
    console.error("DEBUG: ERREUR RÉSEAU :", error.message);
    throw new Error("Problème réseau détecté");
  }
};