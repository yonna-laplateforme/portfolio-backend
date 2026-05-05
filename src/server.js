import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import cors from 'cors';

// Charge les variables du fichier .env dans process.env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});