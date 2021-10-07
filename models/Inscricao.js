const mongoose = require('mongoose');
const { Schema } = mongoose;

const inscricaoSchema = new Schema({
  nome: {
    type: String,
  },
  email: {
    type: String,
  },
  idEvento:{
    type: String,
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('inscricao', inscricaoSchema);