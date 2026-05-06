const errorHandler = (err, req, res, next) => {
  // affichage erreur dans le terminal
  console.error('❌ ERROR:', err.message);

  // Récupération automatique du status ou 500 par défaut
  const status = err.status || 500;
  
  // Construction de la réponse JSON 
  res.status(status).json({
    status: 'error',
    message: err.message || 'Erreur interne du serveur'
  });
};

export default errorHandler;