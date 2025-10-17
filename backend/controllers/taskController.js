// controllers/taskController.js
const Task = require('../models/taskModel');
const Log = require('../models/logModel');
const { createLog } = require('./logController');

// Sanitize user input to prevent XSS
const sanitize = (value) => {
  if (typeof value !== 'string') return value;
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// GET all tasks with filtering and pagination
exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    // Create a search query
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalTasks = await Task.countDocuments(query);
    const totalPages = Math.ceil(totalTasks / limit);

    res.json({
      tasks,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Backend Validation [cite: 212]
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }
    
    // Sanitize inputs [cite: 214]
    const sanitizedTitle = sanitize(title);
    const sanitizedDescription = sanitize(description);

    const newTask = new Task({ title: sanitizedTitle, description: sanitizedDescription });
    await newTask.save();

    // Create Audit Log [cite: 195, 208]
    createLog('Create Task', newTask._id, {
      title: newTask.title,
      description: newTask.description,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create task.', details: error.message });
  }
};

// PUT (update) an existing task
exports.updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Fetch the task before updating to find the changes
    const oldTask = await Task.findById(req.params.id);
    if (!oldTask) {
        return res.status(404).json({ error: 'Task not found.' });
    }

    const updatedFields = {};
    if (title && title !== oldTask.title) updatedFields.title = sanitize(title);
    if (description && description !== oldTask.description) updatedFields.description = sanitize(description);
    
    // If no fields to update, just return the old task
    if (Object.keys(updatedFields).length === 0) {
        return res.json(oldTask);
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true } // Return the updated document
    );

    // Create Audit Log only for changed fields 
    createLog('Update Task', updatedTask._id, updatedFields);

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update task.', details: error.message });
  }
};


// DELETE a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Create Audit Log [cite: 195, 209]
    createLog('Delete Task', task._id, {}); // updatedContent can be empty

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET all audit logs
exports.getLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Let's show 10 logs per page
    const skip = (page - 1) * limit;

    const logs = await Log.find()
      .sort({ timestamp: -1 }) // Show the newest logs first
      .skip(skip)
      .limit(limit);
      
    const totalLogs = await Log.countDocuments();
    const totalPages = Math.ceil(totalLogs / limit);

    res.json({
      logs,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};