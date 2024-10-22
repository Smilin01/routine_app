const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path'); // Required for serving static files

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database and store it in a file called 'tasks.db'
const db = new sqlite3.Database('tasks.db', (err) => {
  if (err) {
    return console.error('Database connection failed:', err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create Tasks table with a 'completed' field
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  time TEXT NOT NULL,
  date TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0
)`);

// API Routes

// Get all tasks
app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const { title, description, time, date } = req.body;
  const sql = 'INSERT INTO tasks (title, description, time, date) VALUES (?, ?, ?, ?)';
  const params = [title, description, time, date];
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', id, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Task deleted' });
  });
});

// Update task completion status
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
  db.run(sql, [completed, id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Task updated' });
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Catch-all handler to serve the React app for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
