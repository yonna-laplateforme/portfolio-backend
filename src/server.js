import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.routes.js';
import aboutRoutes from './routes/about.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: '10mb' }));

// 1. Routes API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes);

// 2. Servir les fichiers statiques (images, css, js)
app.use(express.static(path.join(__dirname, '../public')));

// 3. LA SOLUTION SANS ROUTER : Middleware manuel
// Cette méthode n'utilise PAS app.get(), donc aucune erreur de validation
app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    // On demande à Node de nous donner le chemin absolu actuel
    const currentDir = process.cwd();
    console.log("DEBUG: Dossier de travail actuel :", currentDir);
    console.log("DEBUG: Contenu du dossier :", require('fs').readdirSync(currentDir));
    
    // Si tu vois un dossier 'dist' ou 'build' dans les logs, remplace '../public' par '../dist'
    return res.sendFile(path.join(currentDir, 'public', 'index.html'));
  }
  next();
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur port ${PORT}`);
});