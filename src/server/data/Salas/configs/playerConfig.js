/**
 * Toda configuração dos Personagens na sala é feita nesse arquivo
 * 
 * @param {Object} Room Isntância da sala
 * @param {Object} ServerGame Isntância da classe ServerGame
 */
module.exports = (Room, ServerGame) => {

    /**
     * Adiciona um novo player a lista de players da sala
     * 
     * @param {Object} player Instância do player
     * 
     */
    Room.addNewPlayer = function(player){
        Room.currentPlayers.push(player);
        Room.emitRoomPlayers();
        console.log("Usuário conectado na sala!");
    }

    /**
     * Remove um player da lista de players da sala
     * 
     * @param {String} socketId Numero da conexão do socket do player
     * 
     */
    Room.removePlayer = function(socketId){
        Room.currentPlayers.forEach(player => {
            if(player.socketId == socketId){
                Room.currentPlayers.splice(Room.currentPlayers.indexOf(player), 1);
                console.log("Usuário removido da sala!");
            }
        });
        
    }

     /**
     * Atualiza o socket de um player na lista de currentPlayers
     * 
     * @param {String} charName Nome do personagem conectado
     * @param {String} socketId Numero da conexão do socket do playe
     */
    Room.updateSocketPlayer = function (charName, socketId){
        Room.currentPlayers.forEach(player =>{
            if(player.name == charName){
                player.socketId = socketId;
            }
        });
        
        console.log("Emitindo dados do player depois de atualizado socket");
        Room.emitRoomPlayers()
    }


    /**
     * Envia dados dos player atualizado para o cliente.
     * Sempre que um player tem seu socket, movimentação, ataque ou qualquer dado referente a si mesmo,
     * essa função deve ser chamada para atualizar em todos os outros clientes os dados. 
     */
    Room.emitRoomPlayers = function(){
        ServerGame.io.to(Room.id).emit('roomDataPlayers', Room.currentPlayers);
    }


}