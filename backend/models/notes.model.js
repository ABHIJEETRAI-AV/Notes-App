const mongoose = require('mongoose');
const User = require('./user.model');
const Schema = mongoose.Schema;


const notesSchema = new Schema({
    // noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String , required: true },
    user: {  type : mongoose.Schema.Types.Mixed , required: true}
})

module.exports = mongoose.model('Notes', notesSchema);
