const LoginConfig = require('./configs/Login');
const Lobbyconfig = require('./configs/Lobby');
const SocketConfig = require('./configs/Socket');
const PlayerActionConfig = require('./configs/PlayerActions');
const SessionConfig = require('./configs/Session');

class Game {

    constructor(server){

        // DADOS GERAIS DO JOGO
        this.io = require('socket.io')(server);

        // Configurações de atualização dos estados
        this.fpsTaxa = 35; // 30 fps por segundo

        // Lista de usuários conectados e sala
        this.usersConnect = [];
        this.rooms = [];

        // RECEBENDO EVENTOS E ATUALIZANDO O JOGO
        this.io.on('connection', async (socket) => {
            
            // Configuração de loggin
            LoginConfig(this, socket);

            // Configuração do Lobby
            Lobbyconfig(this, socket);

            // Configuração do Socket
            SocketConfig(this, socket);
          
            // Configuração das ações dos personagens 
            PlayerActionConfig(this, socket);
    
            // Configuração de sessão
            SessionConfig(this, socket);


        });

        
    }

    // ===============================================================================================================
    // ===============================FUNÇÕES PARA ENVIO DE DADOS AS SALAS============================================
    // ===============================================================================================================


    // ===============================================================================================================
    // USERS CONTROL
    // ===============================================================================================================
    addUserConnection(player, socket) {


        // verifica se usuario já esta na lista, se estiver atualiza seu socketId para o atual
        var permition = true;
        this.usersConnect.forEach(element =>{
            if(element.name == player.name){
                element.setSocketId(socket.id);
                console.log('Socket do usuario:'+ element.name +'atualizado para: '+ socket.id);
                this.emmitUsersConnect();
                permition = false;
            }
        })

        if(permition){
            this.usersConnect.push(player);
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

    // Enviando dados da sala para todos os sockets
    emitRoomsData(){
        this.io.emit('roomsOpen', this.rooms);
    }
    
    // ===============================================================================================================
    // PLAYER CONTROLLER
    // ===============================================================================================================
    emitRoomDataExclusivo(roomId){
        this.rooms.forEach(room =>{
            if(room.id == roomId){
                this.io.to(roomId).emit('roomData', room.currentPlayers);
            }
        });
        
    }


    
    // ===============================================================================================================
    // ENIMES CONTROL
    // ===============================================================================================================
    emitRoomDataExclusivoEnimes(roomId){
        this.rooms.forEach(room => {
            if(room.id == roomId){
                this.io.to(roomId).emit('roomDataEnimes', room.currentEnimes);
            }
        });
        
    }

    emitRoomDataExclusivoRemoveEnimes(roomId, enime){
        this.io.to(roomId).emit('removeEnimes', enime);
    }


    // ===============================================================================================================
    // ATTACK CONTROL
    // ===============================================================================================================
    emitRoomDataExclusivoAttacks(roomId){
        this.rooms.forEach(room =>{
            if(room.id == roomId){
                this.io.to(roomId).emit('roomDataAttacks', room.currentAttacks);
            }
        })
        
    }

    emitRoomDataExclusivoRemoveAttacks(roomId, attack){
        this.io.to(roomId).emit('removeAttack', attack);
    }

}

module.exports = Game;