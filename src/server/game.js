const Region = require('./data/Region/Region');
const Login = require('./events/Login');
const Lobby = require('./events/Lobby');
const Socket = require('./events/Socket');
const PlayerActions = require('./events/PlayerActions');

class Game {

    constructor(server){

        // Configurações de atualização dos estados
        this.fpsTaxa = 35; // 30 fps por segundo

        this.regions = [];

        this.currentUsers = [];

        // Iniciando Socket
        this.io = require('socket.io')(server);

        // SETANDO EVENTOS QUE SERAM RECEBIDO DOS PLAYERS
        this.io.on('connection', async (socket) => {

            // ESCUTA UM LOGGIN E PUXA O PLAYER PARA A LISTA DE CURRENT USERS
            Login(this, socket);
            Lobby(this, socket);
            Socket(this, socket);
            PlayerActions(this, socket);

        })

        this.startServer();
    }

    startServer(){

        var Solaris = new Region(this.regions.length, 'Solaris', 25);
        Solaris.createScenes(this);
        this.regions.push(Solaris);

    }

    addUserConnection(player){

        var permition = true;
        this.currentUsers.forEach(playerOnline =>{
            if(playerOnline.name == player.name){
                playerOnline.setSocketId(player.socketId);
                permition= false;
            }
        })

        if(permition){
            this.currentUsers.push(player);
        }
        
        this.io.emit('usersServer', this.currentUsers);
    }

    // Remove do lobby o usuario
    removeUserConnection(charName){

        let playerList = this.currentUsers;
        for(let i=0; i<playerList.length; i++){
            if(playerList[i].name == charName){
                playerList.splice(playerList.indexOf(playerList[i]), 1);
            }
        }
    }

    updateSocketConnection(charName, socketId){
        this.currentUsers.forEach(playerOnline => {
            if(playerOnline.name == charName){
                playerOnline.setSocketId(socketId);
            }
        })
    }

    // EMITINDO DADOS DE TODAS AS REGIÕES
    emitRegionsData(){
        this.io.emit('regionsData', this.regions);
    }

}

module.exports = Game;