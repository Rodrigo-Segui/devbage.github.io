const mongoose = require('mongoose');
const { Schema } = mongoose;

const carroSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    require: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('eventos', eventosSchema);