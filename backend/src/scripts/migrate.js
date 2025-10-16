import db from '../db.js';

db.exec(`
  CREATE TABLE IF NOT EXISTS collections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    collection TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    body TEXT,
    image_url TEXT,
    link TEXT,
    event_date TEXT,
    order_index INTEGER DEFAULT 0,
    visible INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS single_sections (
    key TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_collections_collection ON collections(collection);
  CREATE INDEX IF NOT EXISTS idx_collections_visible ON collections(collection, visible);
`);

db.close();
console.log('Database migrated successfully');
