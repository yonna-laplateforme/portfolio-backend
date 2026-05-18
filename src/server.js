import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Imports des routes
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.routes.js';

import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middlewares globaux
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));

// Branchement des routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);


// Test de base
app.get('/', (req, res) => {
  res.send('API Portfolio en ligne ✅');
});

// IMPORTANT : Le errorHandler doit être placé APRES toutes les routes
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});