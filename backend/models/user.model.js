const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Notes = require('./notes.model');
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notes' }]
  
});

module.exports = mongoose.model('User', userSchema);

