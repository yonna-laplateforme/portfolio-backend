import homeValidator from '../validators/home.validator.js';
import { validate } from '../middlewares/validate.middleware.js'; // ← adapte : le nom exact chez toi

router.put('/',
  authenticate,
  authorize('admin'),
  homeValidator.rules,
  validate,                       // ← celui qui renvoie les erreurs (errors.array())
  homeController.updateHomeContent
);