require('dotenv/config');

const cors = require('cors');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('passport');
const flash = require('connect-flash')
require('./config/auth');

const app = express();


app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// afastar rotinas mais simples de varredura e ataques automatizados
app.disable('x-powered-by');

//Configurando pastas dos arquivos estáticos.
app.use(express.static(__dirname + '/public'));

//Configurando o CORS
app.use(cors());

//Configurando o Morgan
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(session({ secret: `${process.env.SECRET}`, resave: false, saveUninitialized: false, cookie: { maxAge: 30 * 60 * 1000 } }));

app.use(passport.initialize());
app.use(passport.authenticate('session'));

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_COLECTION}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.log(err)
  })

app.use(flash())

app.use((req,res,next) =>{
  res.locals.sucess_msg = req.flash("sucess_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error")
  next();
})

//Adquirindo as Rotas
const index = require('./router/index');
const eventos = require('./router/evento');
const inscricoes = require('./router/inscricao')
const admin = require('./router/admin')

//Configurando as Rotas
app.use('/', index);
app.use('/eventos', eventos);
app.use('/inscricoes', inscricoes);
app.use('/admin', admin);

module.exports = app;