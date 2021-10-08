const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

const Admin = require('../models/Admin');
const Evento = require('../models/Evento');

const { format } = require('date-fns');

const authenticationMiddleware = require('../middleware/autentic')

router.get('/login/', (req, res) => {
  return res.render('login', { layout: 'admin' });
})

router.get('/eventos/', (req, res) => {
  Evento.find()
    .then(eventos => {
      let eventosMap = eventos.map(evento => {
        return {
          _id: evento._id,
          nome: evento.nome,
          descricao: evento.descricao,
          local: evento.local,
          data: format(evento.data, 'MM/dd/yyyy HH:MM'),
          ativo: evento.ativo ? "Ativo" : "Desativado",
        }
      })
      console.log(eventosMap)
      return res.render('listEventos', { layout: 'admin', eventos: eventosMap });
    })
    .catch(error => res.status(500).json(error));
})


router.post('/login/', passport.authenticate('local', {
  successRedirect: '/admin/eventos',
  failureRedirect: '/admin/login',
  failureFlash: true
}));

router.post('/cadastrar', authenticationMiddleware, async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);

  const adm = new Admin({
    username: req.body.username,
    password: password,
  });

  adm
    .save()
    .then(adm => {
      res.json(adm);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;