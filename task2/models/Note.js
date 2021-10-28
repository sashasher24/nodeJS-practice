const {Schema, model} = require('mongoose');

const Note = new Schema({
  userId: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  text: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = model('Note', Note);

