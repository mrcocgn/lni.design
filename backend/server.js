// server.js
import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// MySQL Verbindung herstellen
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test-Route
app.get('/', (req, res) => {
  res.send('Backend läuft!');
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
