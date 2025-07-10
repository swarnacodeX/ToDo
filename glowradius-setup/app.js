// app.js

const express = require('express');
const logger = require('morgan');
const path = require('path');
const itemsRouter = require('./routes/items');
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/items', itemsRouter);
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

  const http = require('http');
  const PORT = process.env.PORT || 3000;

  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
  server.on('error', (err) => {
    console.error('Server error:', err);
  });


module.exports = app;
