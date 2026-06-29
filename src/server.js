import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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

app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    const currentDir = process.cwd();
    // On liste les fichiers sans utiliser 'require'
    const files = fs.readdirSync(currentDir);
    console.log("DEBUG: Dossier actuel :", currentDir);
    console.log("DEBUG: Contenu du dossier :", files);
    
    // On tente d'envoyer index.html s'il est à la racine ou dans 'public'
    if (files.includes('index.html')) {
       return res.sendFile(path.join(currentDir, 'index.html'));
    } else if (fs.existsSync(path.join(currentDir, 'public', 'index.html'))) {
       return res.sendFile(path.join(currentDir, 'public', 'index.html'));
    }
    
    return res.status(404).send("Index.html introuvable dans la liste : " + files.join(', '));
  }
  next();
});
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur port ${PORT}`);
});