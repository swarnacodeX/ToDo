const express = require('express');
const router = express.Router();
const { tasks } = require('../data/tasks&users');

//GET /api/tasks/?email=shubhangandas7366@gmail.com
router.get('/', (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const userTasks = tasks.filter(task => task.email === email);
  res.status(200).json(userTasks);
});

// GET /api/tasks/:id - Fetch single item by ID
router.get('/:id', (req, res) => {
  
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Item not found' });

  res.status(200).json(task);
});

// POST /api/tasks - Create new item
router.post('/', (req, res) => {
  const { name, description, email } = req.body;

  if (!name || !description || !email) {
    return res.status(400).json({ error: 'Name, description, and email are required' });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    name,
    description,
    email,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Update an item (must match email)
router.put('/:id', (req, res) => {
  const { name, description, email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  const task = tasks.find(t => t.id === parseInt(req.params.id) && t.email === email);
  if (!task) return res.status(404).json({ error: 'Item not found' });

  if (name !== undefined) task.name = name;
  if (description !== undefined) task.description = description;

  res.status(200).json(task);
});

// DELETE /api/tasks/:id - Delete an item (must match email)
router.delete('/:id', (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const index = tasks.findIndex(t => t.id === parseInt(req.params.id) && t.email === email);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  tasks.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
