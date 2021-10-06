const { Router } = require('express');
const Evento = require('../models/Evento');
const router = Router();

router.get('/', (req,res) => {

  Evento.find()
    .then(eventos => {
      
      let eventosMap = eventos.map(evento =>{
        return {
          _id : evento._id,
          nome: evento.nome,
          descricao: evento.descricao
        }
      })
    console.log(eventosMap)
    return res.render('index', { eventos: eventosMap});
  })
  .catch(error => res.status(500).json(error));


});




module.exports = router