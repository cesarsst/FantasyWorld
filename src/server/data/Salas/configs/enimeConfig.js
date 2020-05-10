/**
 * Toda configuração dos inimigos é feita nesse arquivo
 * 
 * @param {Object} room Isntância da sala
 * @param {Object} Game Isntância da classe Game
 */
module.exports = (room, Game)=>{

    /**
     * Adiciona um enimigo para a lista de currentEnimes
     * 
     * @param {Object} enime Instância do enimigo
     * @param {Object} Game Instância da classe Game
     */
    room.addNewEnime= function(enime){
        var id = room.getEnimeId();
        enime.setId(id);
        room.currentEnimes.push(enime);
    }

     /**
     * Remove um enimigo da lista de currentEnimes
     * 
     * @param {Object} enime Instância do enimigo
     */
    room.removeEnime = function(enimeRemove){
        room.currentEnimes.forEach(enime => {
            if(enime.id == enimeRemove.id){
                room.currentEnimes.splice(room.currentEnimes.indexOf(enime), 1);
                room.emitRemoveEnimes(enimeRemove);
            }

        });
        
    }

     /**
     * Gera uma nova ID de inimigo de acordo com a variavel totalEnimes da sala
     */
    room.getEnimeId = function(){
        room.totalEnimes++;
        return room.totalEnimes;
    }

    /**
     * Retorna TRUE caso o enimeId exista na lista, e FALSE caso não exista.
     * 
     * @param {Object} Game Classe Game
     * 
     */
    room.findEnimeById = function(enimeId){
        let enimes = room.currentEnimes;
        let findEnime = false;
    
        for(let i =0; i < enimes.length; i++){
            if(enimes[i].id == enimeId){
                findEnime = true;
            }
        }
        
        return findEnime;
    }

     
    /**
     * Realiza a movimentação dos inimigos na sala e envia os dados dos inimigos para o cliente.
     * Toda a lógica dos inimigos deve ser adiciona na propria instância, porém inicializada aqui.
     * 
     * @param {Object} Game Instância da classe Game
     * @param {Object} room Instância da sala
     */
    room.enimesUpdate = function(Game, room){

        let enimes = room.currentEnimes;
        enimes.forEach(enime =>{
            enime.start(Game, room);            // Inicia a movimentação do inimigo
        })

        room.emitRoomEnimes(room.id)  // Envia dados para o servidor

    }


    room.emitRoomEnimes = function(){
         Game.io.to(room.id).emit('roomDataEnimes', room.currentEnimes);        
    }

    room.emitRemoveEnimes = function(enime){
        Game.io.to(room.id).emit('removeEnimes', enime);
    }

}
