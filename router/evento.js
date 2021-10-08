const express = require('express');
const router = express.Router();
const { format } = require('date-fns');

const Evento = require('../models/Evento');

// Retorna um array com todos os documentos do banco de dadoss
router.get('/', (req, res) => {
  Evento.find()
    .then(eventos => {
      res.json(eventos);
      console.log(eventos);
    })
    .catch(error => res.status(500).json(error));
});
// Cria um novo documento e salva no banco
router.post('/novo', (req, res) => {
  const novoEvento = new Evento({
    nome: req.body.nome,
    descricao: req.body.descricao,
    local:  req.body.local,
    data: req.body.data,
    ativo: req.body.ativo
  });

  novoEvento
    .save()
    .then(evento => {
      res.redirect('/admin/eventos')
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


router.get('/:id', async (req,res)=>{
  let evento = await Evento.findOne({ _id: req.params.id })
  
    let eventosMap = {
        id: evento._id,
        nome: evento.nome,
        descricao: evento.descricao,
        local: evento.local,
        data: format(evento.data, 'yyyy-MM-dd'),
        ativo: evento.ativo,
    }
    return res.json(eventosMap);
})

// Atualizando dados de um evento já existente
router.post('/editar/:id', (req, res) => {
  const novosDados = { nome: req.body.nome, descricao: req.body.descricao, local: req.body.local, data: req.body.data, ativo: req.body.ativo };

  Evento.updateOne({ _id: req.params.id }, novosDados, { new: true })
    .then(evento => {
      res.redirect('/admin/eventos');
    })
    .catch(error => res.status(500).json(error));
});

// Deletando um eventp do banco de dados
router.delete('/delete/:id', (req, res) => {
  Evento.findOneAndDelete({ _id: req.params.id })
    .then(evento => {
      res.json(evento);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;