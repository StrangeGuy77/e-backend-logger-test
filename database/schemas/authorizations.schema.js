const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorizationsSchema = new Schema({
  application_id: { type: Schema.ObjectId },
  token: { type: String },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Authorizations', authorizationsSchema);
