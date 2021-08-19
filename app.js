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

mongoose.connect('mongodb://db:27017/mongo')
  .catch(err => {
    console.log(err)
  })


//Adquirindo as Rotas
const index = require('./router/index');
const eventos = require('./router/evento');
//Configurando as Rotas
app.use('/', index);
app.use('/eventos', eventos);

module.exports = app;