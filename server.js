require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign'); 
const mongoose = require('mongoose');
const expressSession = require('express-session');

const app = express();

// setup mongo connection
mongoose.connect(process.env.BD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('Conectado a base da dados com sucesso!');
});
mongoose.set('useFindAndModify', false);


// Body-parser
app.use(bodyParser.urlencoded({extended: true}));
const jsonParser = bodyParser.json();
app.use(jsonParser); 


// Config EJS enginer
app.set('view engine', 'ejs');
app.set('views', ['./client/views']);

// Configurando arquivos estaticos
app.use(express.static('./client'));


// configura o middleware expression Sesion
app.use(expressSession({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
  }))


consign()
    .include('./src/routes')
    .into(app);

module.exports = app; 
