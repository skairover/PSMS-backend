const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true
  },

  batchNumber: {
    type: String,
  },

  expDate: {
    type: Date,
    required: true
  },

  quantity: {
    type: Number,
    required: true,
    min: 0
  },

  supplier: {
    type: String
  },

  price: {
    type: Number,
    min: 0
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model('Medicine', medicineSchema);