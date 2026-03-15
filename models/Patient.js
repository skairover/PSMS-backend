const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  age: {type: Number},
  condition: {type: String},
  doctor: {String},
  arrival: {Date},
  priority: {String},
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true });

module.exports = mongoose.model('User', userSchema);