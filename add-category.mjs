import 'dotenv/config';   // ← CHARGE LE .ENV (c'était ça le manque !)
import db from './src/config/db.js';

const [cols] = await db.execute("SHOW COLUMNS FROM category");
console.log('Colonnes :', cols.map((c) => c.Field).join(', '));

await db.execute("INSERT INTO category (name) VALUES ('Vidéo')");

const [rows] = await db.execute("SELECT * FROM category");
console.table(rows);
process.exit(0);
