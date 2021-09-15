const { Router } = require('express');
const Evento = require('../models/Evento');
const router = Router();

router.get('/', (req,res) => {

  var eventos1 = []
  var nomealeatorio = {};
  var obj = {}

  Evento.find()
    .then(eventos => {
      
      for(let i =0; i < eventos.length; i++){
        eventos1[i] = {dataValues: {'nome': eventos[i].nome, 'descricao': eventos[i].descricao}}
      }


    Object.assign(obj, eventos1)
    console.log(obj)
    return res.render('index', {eventos: obj});
  })
  .catch(error => res.status(500).json(error));


});




module.exports = router