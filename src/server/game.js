const LoginConfig = require('./configs/Login');
const Lobbyconfig = require('./configs/Lobby');
const PlayerActionConfig = require('./configs/PlayerActions');
const SessionConfig = require('./configs/Session');

class Game {

    constructor(server){
        this.server = server;

        this.io = require('socket.io')(server);

        this.usersConnect = [];
        this.rooms = [];

        this.io.on('connection', async (socket) => {
            console.log('Novo usuario conectado com socket: ' + socket.id);
            

            // Configuração de loggin
            LoginConfig(this, socket);

            // Configuração das Salas e Lobby
            Lobbyconfig(this, socket);
          
            // Configuração das ações dos personagens 
            PlayerActionConfig(this, socket);
    
            // Configuração de sessão
            SessionConfig(this, socket);


        })

        
    }
    // ===============================================================================================================
    // USERS CONTROL
    // ===============================================================================================================
    addUserConnection(player) {

        var permition = true;
        this.usersConnect.forEach(element =>{
            if(element.name == player.name){
                permition = false;
            }
        })

        if(permition){
            this.usersConnect.push(player);
            console.log("Users Connect: " + this.usersConnect);
            this.emmitUsersConnect();
        }

    }

    removeUserConnection(socketId){
        this.usersConnect.forEach(player => {

            if(player.socketId == socketId){
                this.usersConnect.splice(this.usersConnect.indexOf(player), 1);
            }
           
        })
        
        console.log("Users Connect: " + this.usersConnect);
        this.emmitUsersConnect();
    }   

    // Atualiza o estado da lista de usuários para os clients  
    emmitUsersConnect(){
        this.io.emit('userConnectionUpdate', this.usersConnect);
    }


    // ===============================================================================================================
    // ROOMS CONTROL
    // ===============================================================================================================
    addNewRoom(room){
        this.rooms.push(room);
        console.log("Nova sala criada!");
        this.emitRoomsData();
    }

    removeRoom(roomId){

        this.rooms.forEach(room =>{
            if(room.id == roomId){
                this.rooms.splice(this.rooms.indexOf(room), 1);
            } 
        })
        console.log("Sala removida com sucesso!");
        this.emitRoomsData();

    }

    // Atualiza o estado da lista de salas criadas para os clients
    emitRoomsData(){
        this.io.emit('roomsOpen', this.rooms);
    }
  

}

module.exports = Game;