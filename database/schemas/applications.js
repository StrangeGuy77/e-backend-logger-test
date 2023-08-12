const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationsSchema = new Schema({
  name: { type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Applications', applicationsSchema);
