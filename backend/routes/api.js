// routes/api.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// --- Basic Authentication Middleware ---
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized access. Please provide valid credentials." });
  }

  // The header should be in the format "Basic <base64-encoded-credentials>"
  const [scheme, credentials] = authHeader.split(' ');
  
  if (scheme !== 'Basic') {
      return res.status(401).json({ error: "Malformed authorization header." });
  }

  // Decode the base64 credentials
  const decoded = Buffer.from(credentials, 'base64').toString();
  const [username, password] = decoded.split(':');

  // Check against the static credentials [cite: 219, 220]
  if (username === 'admin' && password === 'password123') {
    next(); // Credentials are valid, proceed to the next middleware/handler
  } else {
    res.status(401).json({ error: "Unauthorized access. Please provide valid credentials." });
  }
};

// Apply the authentication middleware to all routes in this file
router.use(authMiddleware);

// --- Task Routes ---
router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

// --- Log Routes ---
router.get('/logs', taskController.getLogs);

module.exports = router;