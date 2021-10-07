const express = require('express');
const router = express.Router();

const Inscricao = require('../models/Inscricao');

// Retorna um array com todos os documentos do banco de dados
router.get('/', (req, res) => {
  Inscricao.find()
    .then(inscricoes => {
      res.json(inscricoes);
    })
    .catch(error => res.status(500).json(error));
});


// Cria um novo documento e salva no banco
router.post('/nova', (req, res) => {
  const novaInscricao = new Inscricao({
    nome: req.body.nome,
    email: req.body.email,
    idEvento: req.body.id
  });

  novaInscricao
    .save()
    .then(inscricao => {
      res.json(inscricao);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Atualizando dados de um inscricao já existente
router.put('/editar/:id', (req, res) => {
  const novosDados = { nome: req.body.nome, email: req.body.email};

  Evento.findOneAndUpdate({ _id: req.params.id }, novosDados, { new: true })
    .then(inscricao => {
      res.json(inscricao);
    })
    .catch(error => res.status(500).json(error));
});

// Deletando uma inscricao do banco de dados
router.delete('/delete/:id', (req, res) => {
  Inscricao.findOneAndDelete({ _id: req.params.id })
    .then(inscricao => {
      res.json(inscricao);
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;