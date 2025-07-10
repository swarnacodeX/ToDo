const express = require('express');
const logger = require('morgan');
const app = express();
const cors=require('cors');
const authRoutes = require('./routes/authentication'); // ✅ Updated
const tasksRoutes = require('./routes/tasks');
const authentication = require('./middleware/auth');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/tasks', authentication, tasksRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
const http = require('http');
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
