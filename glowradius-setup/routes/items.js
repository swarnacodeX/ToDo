// routes/items.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

let items = require('../data/items');

// Middleware applied to all /api/items routes
router.use(auth);

// GET /api/items - Fetch all items
router.get('/', (req, res) => {
  res.setHeader('X-Custom-Header', 'HelloWorld');
  res.status(200).json(items);
});

// GET /api/items/:id - Fetch item by ID
router.get('/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });

  res.status(200).json(item);
});

// POST /api/items - Create new item
router.post('/', (req, res) => {
  const { name, price } = req.body;
  if (typeof name !== 'string' || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name,
    price,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /api/items/:id - Update item
router.put('/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const { name, price } = req.body;
  if (name !== undefined) item.name = name;
  if (price !== undefined) item.price = price;

  res.status(200).json(item);
});

// DELETE /api/items/:id - Delete item
router.delete('/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  items.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
