/**
 * Toda configuração dos ataques é feita nesse arquivo
 * 
 * @param {Object} room Isntância da sala
 * @param {Object} Game Isntância da classe Game
 */
module.exports = (room, Game) =>{

     /**
     * Adiciona um novo ataque a lista de currentAttacks
     * 
     * @param {Object} attack Instância do attack
     * @param {Object} Game Instância da classe Game
     */
    room.addNewAttack = function(attack){
        room.currentAttacks.push(attack);
        room.emitRoomAttacks();
    }

     /**
     * Remove um ataque da lista de currentAttacks
     * 
     * @param {Number} attackId ID da nstância do attack
     * @param {Object} Game Instância da classe Game
     */
    room.removeAttack= function(attackId){
        room.currentAttacks.forEach(attack => {
            if(attack.id == attackId){
                room.currentAttacks.splice(room.currentAttacks.indexOf(attack), 1);
                room.emitRoomRemoveAttacks(attack);
            }

        });
        
    }

     /**
     * Gera um novo id para um ataque
     */
    room.getNewAttackId = function(){
        return room.currentAttacks.length;
    }


    room.emitRoomAttacks = function(){
        Game.io.to(room.id).emit('roomDataAttacks', room.currentAttacks); 
    }

    room.emitRoomRemoveAttacks = function(attack){
        Game.io.to(room.id).emit('removeAttack', attack);
    }

}