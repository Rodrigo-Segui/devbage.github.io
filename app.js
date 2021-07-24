const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser'); const app = express();
app.set('port',process.env.PORT || 3000);
app.disable('x-powered-by')
//Configurando o cors 
app.use(cors())//Configurando pastas dos arquivos estáticos.
app.use(express.static(path.join(__dirname,'/public/')));//Configurando o Morgan
app.use(morgan('dev'));//Configurando o Body-parser
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());//Adquirindo as Rotas
const index = require('./router/index');//Configurando as rotas
app.use('/',index);
module.exports = app;