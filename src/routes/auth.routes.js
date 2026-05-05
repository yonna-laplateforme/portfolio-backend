import express from 'express';
const router = express.Router();

// Route temporaire pour pas que ça crash
router.get('/', (req, res) => res.send("Auth route active"));

export default router;