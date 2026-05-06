import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si express-validator a trouvé des erreurs, on s'arrête ici
    return res.status(400).json({ errors: errors.array() });
  }
  // Sinon, on passe au middleware suivant (généralement le contrôleur)
  next();
};

export default validate;