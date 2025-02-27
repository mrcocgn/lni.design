const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Datenbankverbindung
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Datenbankverbindungsfehler:', err.message);
  } else {
    console.log('Mit der SQLite-Datenbank verbunden');
    db.run(`CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT
    )`);
  }
});

// API-Endpunkte

// Alle Items abrufen
app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM items', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Einzelnes Item erstellen
app.post('/api/items', (req, res) => {
  const { title, description } = req.body;
  db.run(
    'INSERT INTO items (title, description) VALUES (?, ?)',
    [title, description],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});