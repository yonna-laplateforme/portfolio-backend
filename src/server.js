import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';


// Imports des routes
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.routes.js';
import aboutRoutes from './routes/about.routes.js'

import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middlewares globaux
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      // Autorise les scripts/styles de votre domaine
      "default-src": ["'self'"],
      // Autorise les images provenant de votre domaine ET de Cloudinary
      "img-src": ["'self'", "https://res.cloudinary.com", "data:"],
      // Autorise les feuilles de style (si vous en chargez depuis des CDN, ajoutez-les ici)
      "style-src": ["'self'", "'unsafe-inline'"],
      // Autorise les scripts (ajoutez 'unsafe-inline' si nécessaire)
      "script-src": ["'self'", "'unsafe-inline'"],
      // Désactive la mise à niveau automatique vers HTTPS si vous êtes en dev local
      "upgrade-insecure-requests": null,
    },
  },
}));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('public/uploads'));

// Branchement des routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes);




// Test de base
app.get('/', (req, res) => {
  res.send('API Portfolio en ligne ✅');
});

// IMPORTANT : Le errorHandler doit être placé APRES toutes les routes
app.use(errorHandler);

// Assure-toi que cette ligne est présente et au-dessus de app.listen
const PORT = process.env.PORT || 3001; 

// Ensuite seulement, tu peux l'utiliser ici :
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur http://0.0.0.0:${PORT}`);
});