const express = require('express');
const router = express.Router();

const Evento = require('../models/Evento');

// Retorna um array com todos os documentos do banco de dados
router.get('/', (req, res) => {
  Evento.find()
    .then(eventos => {
      res.json(eventos);
    })
    .catch(error => res.status(500).json(error));
});

// Cria um novo documento e salva no banco
router.post('/novo', (req, res) => {
  const novoEvento = new Evento({
    nome: req.body.nome,
    descricao: req.body.descricao,
    local:  req.body.local
  });

  novoEvento
    .save()
    .then(evento => {
      res.json(evento);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Atualizando dados de um evento já existente
router.put('/editar/:id', (req, res) => {
  const novosDados = { nome: req.body.nome, descricao: req.body.descricao, local: req.body.local };

  Evento.findOneAndUpdate({ _id: req.params.id }, novosDados, { new: true })
    .then(evento => {
      res.json(evento);
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