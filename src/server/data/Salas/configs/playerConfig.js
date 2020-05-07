/**
 * Toda configuração dos Personagens na sala é feita nesse arquivo
 * 
 * @param {Object} room Isntância da sala
 * @param {Object} Game Isntância da classe Game
 */
module.exports = (room, Game) => {

    /**
     * Adiciona um novo player a lista de players da sala
     * 
     * @param {Object} player Instância do player
     * 
     */
    room.addNewPlayer = function(player){
        room.currentPlayers.push(player);
        console.log("Usuário conectado na sala!");
    }

    /**
     * Remove um player da lista de players da sala
     * 
     * @param {String} socketId Numero da conexão do socket do player
     * 
     */
    room.removePlayer = function(socketId){
        room.currentPlayers.forEach(player => {
            if(player.socketId == socketId){
                room.currentPlayers.splice(room.currentPlayers.indexOf(player), 1);
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
    room.updateSocketPlayer = function (charName, socketId){
        room.currentPlayers.forEach(player =>{
            if(player.name == charName){
                player.socketId = socketId;
                console.log('Socket atualizado com sucesso!');
            }
            
        });

    }


    room.emitRoomPlayers = function(){
        Game.io.to(this.id).emit('roomData', room.currentPlayers);
    }


}