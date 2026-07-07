import express from 'express';
import * as technologyController from '../controllers/technology.controller.js';

const router = express.Router();


router.get('/', technologyController.getAllTechnologies);
router.post('/', technologyController.create);

export default router;