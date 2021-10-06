require('dotenv/config');

const cors = require('cors');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Configurando pastas dos arquivos estáticos.
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.disable('x-powered-by'); // afastar rotinas mais simples de varredura e ataques automatizados

//Configurando o CORS
app.use(cors());

//Configurando o Morgan
app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}))
app.use(express.json());

mongoose.connect(`mongodb://root:${process.env.DB_COLECTION}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_USER}`)
  .catch(err => {
    console.log(err)
  })


//Adquirindo as Rotas
const index = require('./router/index');
const eventos = require('./router/evento');
const inscricoes = require('./router/inscricao')
const admin = require('./router/admin')

//Configurando as Rotas
app.use('/', index);
app.use('/eventos', eventos);
app.use('/incricoes', inscricoes);

module.exports = app;