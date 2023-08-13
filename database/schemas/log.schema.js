const mongoose = require('mongoose');
const { Schema } = mongoose;

const logsSchema = new Schema({
  application_id: { type: Schema.ObjectId },
  type: { type: String, enum: ['error', 'info', 'warning'] },
  priority: { type: String, enum: ['lowest', 'low', 'medium', 'high', 'highest'] },
  path: { type: String },
  message: { type: String },
  request: { type: Object },
  response: { type: Object },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Logs', logsSchema);
