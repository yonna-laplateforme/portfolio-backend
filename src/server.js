import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

// Imports des routes
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.routes.js';
import aboutRoutes from './routes/about.routes.js';
import errorHandler from './middlewares/errorHandler.js';
import technologyRoutes from './routes/technology.routes.js';

const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' https://upload-widget.cloudinary.com https://widget.cloudinary.com 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' https://res.cloudinary.com data:; " +
    "media-src 'self' https://res.cloudinary.com blob:; " +
    "frame-src https://upload-widget.cloudinary.com; " +
    "connect-src 'self' https://api.cloudinary.com https://res.cloudinary.com https://portfolio-backend-7xj4.onrender.com;"
  );
  next();
});

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: '10mb' }));

// SEULEMENT LES API
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/technologies', technologyRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API Backend prête sur le port ${PORT}`);
});