const { Router } = require('express');
const router = Router();
const Evento = require('../models/Evento');

router.get('/', (req, res) => {
  Evento.find()
    .then(eventos => {

      let eventosMap = eventos.map(evento => {
        return {
          _id: evento._id,
          nome: evento.nome,
          local: evento.local,
          descricao: evento.descricao
        }
      })
      return res.render('index', { eventos: eventosMap });
    })
    .catch(error => res.status(500).json(error));


});


module.exports = router