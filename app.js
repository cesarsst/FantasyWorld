const app = require('./server');
const port = process.env.PORT ||  3000;

const Game = require('./src/server/game');

// Configurações do servidor
const server = app.listen(port, ()=>{
    console.log('Servidor online na porta: ' + port);
})


// Inicia o game
const world  = new Game(server);



