const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventoSchema = new Schema({
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

module.exports = mongoose.model('eventos', eventoSchema);