import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Imports des routes
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
// Import du middleware d'erreur (doit être importé à la fin)
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Branchement des routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

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