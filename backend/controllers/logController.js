const Log = require('../models/logModel');

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
  }
};

module.exports = { createLog };