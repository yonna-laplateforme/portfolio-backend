import app from './app.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API Backend prête sur le port ${PORT}`);
});