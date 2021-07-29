const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const app = require("express")();
const http = require("http").Server(app); 

http.listen("3000", function(){
	console.log("Servidor on-line em http://localhost:3000 - para sair Ctrl+C.");
});
app.disable('x-powered-by'); // afastar rotinas mais simples de varredura e ataques automatizados

//Configurando o CORS
app.use(cors());

//Configurando pastas dos arquivos estáticos.
app.use(express.static(__dirname + '/public'));

//Configurando o Morgan
app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Adquirindo as Rotas
const index = require('./router/index');

//Configurando as Rotas
app.use('/', index);

module.exports = app;