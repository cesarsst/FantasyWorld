/**
 * Toda configuração do chat é feita nesse arquivo
 * 
 * @param {Object} room Isntância da sala
 * @param {Object} Game Isntância da classe Game
 */
module.exports = (room, Game) => {
    
    /**
     * Adiciona uma nova mensagem na lista do chat
     * 
     * @param {Object} msg Isntância da mensagem
     */
    room.addNewMsg = function (msg, Game){
        room.chat.push(msg);
        Game.emitRoomDataExclusivoChat(room.id);
    }

    room.removeMsg = function(msgId){
        let msg = room.chat;
        for(let i=0; i<msg.length; i++){
            if(msg[i].id == msgId){
                room.chat.splice(room.chat.indexOf(msg[i]), 1);
            }
        }
    }

    room.emitRoomChat= function(){
        Game.io.to(roomId).emit('roomDataChat', room.chat); 
    }

}