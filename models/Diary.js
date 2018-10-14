const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DiarySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  checked:{
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Diary = mongoose.model('diary', DiarySchema);
