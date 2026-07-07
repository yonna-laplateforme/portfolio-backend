import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import axios from 'axios';

// Imports des routes
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import contactRoutes from './routes/contact.routes.js';
import aboutRoutes from './routes/about.routes.js';
import errorHandler from './middlewares/errorHandler.js';
import technologyRoutes from './routes/technology.routes.js';

const app = express();
app.get('/api/video-proxy', async (req, res) => {
  const videoUrl = req.query.url;
  try {
    const response = await axios({
      method: 'get',
      url: videoUrl,
      responseType: 'stream'
    });
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send("Erreur lors du chargement de la vidéo");
  }
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://upload-widget.cloudinary.com", "https://widget.cloudinary.com", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "https://res.cloudinary.com", "data:"],
        mediaSrc: ["'self'", "https://res.cloudinary.com", "blob:"],
        frameSrc: ["'self'", "https://upload-widget.cloudinary.com"],
        connectSrc: ["'self'", "https://api.cloudinary.com", "https://res.cloudinary.com", "https://portfolio-backend-7xj4.onrender.com"],
      },
    },
  })
);

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