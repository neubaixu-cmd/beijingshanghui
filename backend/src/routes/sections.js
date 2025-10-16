import express from 'express';
import * as yup from 'yup';
import db from '../db.js';

const router = express.Router();

const sectionSchema = yup.object({
  key: yup.string().required(),
  content: yup.mixed().required(),
});

router.get('/', (req, res) => {
  const stmt = db.prepare('SELECT * FROM single_sections ORDER BY key ASC');
  const rows = stmt.all();
  const data = rows.map((row) => ({
    key: row.key,
    content: JSON.parse(row.content),
    updatedAt: row.updated_at,
  }));
  res.json(data);
});

router.get('/:key', (req, res) => {
  const { key } = req.params;
  const stmt = db.prepare('SELECT * FROM single_sections WHERE key = ?');
  const row = stmt.get(key);

  if (!row) {
    return res.status(404).json({ message: 'Section not found' });
  }

  res.json({
    key: row.key,
    content: JSON.parse(row.content),
    updatedAt: row.updated_at,
  });
});

router.put('/:key', async (req, res, next) => {
  try {
    const { key } = req.params;
    const payload = await sectionSchema.validate({ key, content: req.body }, { abortEarly: false });

    const stmt = db.prepare(`
      INSERT INTO single_sections (key, content, updated_at)
      VALUES (@key, @content, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET content = excluded.content, updated_at = excluded.updated_at
    `);

    stmt.run({
      key: payload.key,
      content: JSON.stringify(payload.content),
    });

    const row = db.prepare('SELECT * FROM single_sections WHERE key = ?').get(key);

    res.json({
      key: row.key,
      content: JSON.parse(row.content),
      updatedAt: row.updated_at,
    });
  } catch (error) {
    error.status = 400;
    error.details = error.errors || undefined;
    next(error);
  }
});

export default router;
