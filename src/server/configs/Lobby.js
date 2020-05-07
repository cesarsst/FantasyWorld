const Sala = require('../data/Salas/Sala');
const Errors = require('../configs/logs/Errors');

/**
 * Responsável pela criação de salas e suas inicializações (Trigger de mapa, movimentações de inimigos e colisões),
 * adicionar um usuário que deseja conectar em uma sala específica e redirecionar para a sala em questão.
 * 
 * 
 * @param {Object} Game Classe Game
 * @param {Object} socket Socket da conexão ativa
 * 
 */
module.exports = (Game, socket) => {

    // Recebendo solicitação de salas quando entra no lobby
    socket.on('requestRooms', ()=>{
        Game.emitRoomsData();
    })

    // Criando uma sala no servidor e iniciando a atualização
    socket.on('createSala', (map)=>{

        let room = new Sala(Game.rooms.length, map);
        room.createRoom(map, Game, socket);                          // Iniciando configurações da sala
        Game.addNewRoom(room);                                       // Adicionando sala a lista de salas globais

        // Teste Remove Room
        //Game.removeRoom(room.id);
        //console.log(Game.rooms);
    });

   // Entrando em uma sala especifica
   socket.on('enterRoom', (data) => {
        
        console.log('enter room: '+ data)
        // Verifica se o usuario já não esta na sala
        if( enterPermision(data.charName) ){

            // Buscando a sala clicada
            Game.rooms.forEach(room => {
                if(room.id == data.roomId){
                    // Buscando o usuario que irá se conectar na sala
                    Game.usersConnect.forEach(player=>{
                        if(player.socketId == socket.id){
                                // adicionando player na sala
                                room.addNewPlayer(player);
                                // retirando usuario do lobby
                                Game.removeUserConnection(socket.id);
                        }
                            
                    })
                }
            });

            // enviando dados atualizados para os outros clientes
            Game.emitRoomsData();

            // Redireciona para a sala 
            socket.emit('redirectRoom', data.roomMap);

        } else {
            // Log Error Emit
            Errors.emitError("Você já está conectado em uma sala!", socket);
        }
        
       

    });


    // Validações para entrar na sala
    // Verifica se o o usuarios já não esta conectado em uma sala 
    function enterPermision(charName){

        var permition = true;

        Game.rooms.forEach(room => {
            room.currentPlayers.forEach(player =>{
                if(player.name == charName){
                    permition = false;
                }
            })
        })

        return permition;

    }





}


