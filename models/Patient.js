const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String },
  age: {type: Number},
  condition: {type: String},
  doctor: {type: String},
  arrival: {type: Date},
  priority: {type: String},
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);