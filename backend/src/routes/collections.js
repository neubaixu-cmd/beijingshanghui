import express from 'express';
import * as yup from 'yup';
import db from '../db.js';

const router = express.Router({ mergeParams: true });

const stringOrNull = () =>
  yup
    .string()
    .transform((value) => (value === undefined || value === null || value === '' ? null : value));

const collectionSchema = yup.object({
  title: yup.string().required(),
  summary: stringOrNull(),
  body: stringOrNull(),
  imageUrl: stringOrNull().nullable().url('无效的图片地址'),
  link: stringOrNull().nullable().url('无效的链接地址'),
  eventDate: stringOrNull(),
  orderIndex: yup
    .number()
    .transform((value) => (Number.isNaN(value) || value === undefined || value === null ? null : value))
    .integer('排序必须为整数')
    .min(0, '排序不能为负数')
    .nullable(),
  visible: yup.boolean().default(true),
});

function mapRow(row) {
  return {
    id: row.id,
    collection: row.collection,
    title: row.title,
    summary: row.summary,
    body: row.body,
    imageUrl: row.image_url,
    link: row.link,
    eventDate: row.event_date,
    orderIndex: row.order_index,
    visible: Boolean(row.visible),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

router.get('/', (req, res) => {
  const { collection } = req.params;
  const showHidden = req.query.showHidden === 'true';

  const stmt = db.prepare(
    `SELECT * FROM collections
     WHERE collection = ?
     ${showHidden ? '' : 'AND visible = 1'}
     ORDER BY order_index ASC, created_at DESC`
  );

  const rows = stmt.all(collection);
  res.json(rows.map(mapRow));
});

router.post('/', async (req, res, next) => {
  try {
    const payload = await collectionSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
    const { collection } = req.params;

    const insert = db.prepare(`
      INSERT INTO collections (collection, title, summary, body, image_url, link, event_date, order_index, visible)
      VALUES (@collection, @title, @summary, @body, @imageUrl, @link, @eventDate, @orderIndex, @visible)
    `);

    const result = insert.run({
      collection,
      title: payload.title,
      summary: payload.summary ?? null,
      body: payload.body ?? null,
      imageUrl: payload.imageUrl ?? null,
      link: payload.link ?? null,
      eventDate: payload.eventDate ?? null,
      orderIndex: payload.orderIndex ?? 0,
      visible: payload.visible ? 1 : 0,
    });

    const item = db.prepare('SELECT * FROM collections WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(mapRow(item));
  } catch (error) {
    error.status = 400;
    error.details = error.errors || undefined;
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payload = await collectionSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
    const { collection, id } = req.params;

    const existing = db.prepare('SELECT * FROM collections WHERE id = ? AND collection = ?').get(id, collection);
    if (!existing) {
      return res.status(404).json({ message: 'Content item not found' });
    }

    const update = db.prepare(`
      UPDATE collections
      SET title = @title,
          summary = @summary,
          body = @body,
          image_url = @imageUrl,
          link = @link,
          event_date = @eventDate,
          order_index = @orderIndex,
          visible = @visible,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = @id
    `);

    update.run({
      id,
      title: payload.title,
      summary: payload.summary ?? null,
      body: payload.body ?? null,
      imageUrl: payload.imageUrl ?? null,
      link: payload.link ?? null,
      eventDate: payload.eventDate ?? null,
      orderIndex: payload.orderIndex ?? 0,
      visible: payload.visible ? 1 : 0,
    });

    const item = db.prepare('SELECT * FROM collections WHERE id = ?').get(id);
    res.json(mapRow(item));
  } catch (error) {
    error.status = 400;
    error.details = error.errors || undefined;
    next(error);
  }
});

router.delete('/:id', (req, res) => {
  const { collection, id } = req.params;
  const stmt = db.prepare('DELETE FROM collections WHERE id = ? AND collection = ?');
  const result = stmt.run(id, collection);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Content item not found' });
  }

  res.status(204).end();
});

export default router;
