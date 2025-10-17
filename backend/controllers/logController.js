// controllers/logController.js
const Log = require('../models/logModel');

/**
 * Creates an audit log entry.
 * @param {string} action - The action performed (e.g., 'Create Task').
 * @param {ObjectId} taskId - The ID of the task involved.
 * @param {object} updatedContent - The details of the change.
 */
const createLog = async (action, taskId, updatedContent) => {
  try {
    const log = new Log({
      action,
      taskId,
      updatedContent,
    });
    await log.save();
  } catch (error) {
    console.error('Failed to create log entry:', error);
    // In a real app, you might have more robust error logging here
  }
};

module.exports = { createLog };