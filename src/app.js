import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.routes.js';
import aboutRoutes from './routes/about.routes.js';
import technologyRoutes from './routes/technology.routes.js';

import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.set('trust proxy', 1);
// Sécurité : headers HTTP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        scriptSrc: [
          "'self'",
          "https://upload-widget.cloudinary.com",
          "https://widget.cloudinary.com",
          "'unsafe-inline'",
          "'unsafe-eval'",
        ],

        styleSrc: [
          "'self'",
          "'unsafe-inline'",
        ],

        imgSrc: [
          "'self'",
          "https://res.cloudinary.com",
          "data:",
          "blob:",
        ],

        mediaSrc: [
          "'self'",
          "https://res.cloudinary.com",
          "blob:",
        ],

        frameSrc: [
          "'self'",
          "https://upload-widget.cloudinary.com",
        ],

        connectSrc: [
          "'self'",
          "https://api.cloudinary.com",
          "https://res.cloudinary.com",
          "https://api.yonnamerlini.com",
        ],
      },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true },
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

// Cookies (pour le token HttpOnly)
app.use(cookieParser());

// CORS (autorise les cookies cross-origin)
app.use(cors({
  origin: [
    'https://yonnamerlini.netlify.app',
    'http://localhost:5173'   // pour ton dev local
  ],
  credentials: true   
}));

app.use(express.json({ limit: '10mb' }));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/technologies', technologyRoutes);

// Gestion erreurs
app.use(errorHandler);

export default app;