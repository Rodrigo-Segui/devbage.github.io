const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventoSchema = new Schema({
  nome: {
    type: String,
    
  },
  descricao: {
    type: String,
  },
  local: {
    type: String,
  },
  data: {
    type: Date,
  },
  ativo: {
    type: Boolean,
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('eventos', eventoSchema);