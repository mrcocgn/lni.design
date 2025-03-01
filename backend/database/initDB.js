import { connectDB } from "./db.js";

async function initDB() {
  const db = await connectDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK( role IN ('admin', 'manager', 'customer', 'model') ) NOT NULL
    );
  `);
  console.log("Datenbank initialisiert.");
}

initDB();
