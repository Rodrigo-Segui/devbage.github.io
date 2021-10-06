const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('admin', adminSchema);