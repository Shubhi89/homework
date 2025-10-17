const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
    enum: ['Create Task', 'Update Task', 'Delete Task'],
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
  updatedContent: {
    type: mongoose.Schema.Types.Mixed, // Allows for flexible object storage
  },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;