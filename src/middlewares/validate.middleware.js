import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
 
    return res.status(400).json({ errors: errors.array() });
  }
  // Sinon, on passe au middleware suivant 
  next();
};

export default validate;