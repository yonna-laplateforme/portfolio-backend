import express from 'express';
import * as technologyController from '../controllers/technology.controller.js';

const router = express.Router();


router.get('/', technologyController.getAllTechnologies);

export default router;