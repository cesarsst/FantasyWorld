const mapConfig = require('../../configs/MapConfig');
const Collision = require('../../configs/Collision');

class Sala {

    constructor(id, map){
        this.id = id;
        this.map = map;
        this.currentPlayers = [];
        this.currentEnimes = [];
        this.currentAttacks = [];
    }

    
    addNewPlayer(player){
        this.currentPlayers.push(player);
        console.log("Usuário conectado na sala!");
    }

    removePlayer(socketId){
        this.currentPlayers.forEach(player => {
            if(player.socketId == socketId){
                this.currentPlayers.splice(this.currentPlayers.indexOf(player), 1);
                console.log("Usuário removido da sala!");
            }
        });
        
    }

    updateSocketPlayer(charName, socketId){
        this.currentPlayers.forEach(player =>{
            if(player.name == charName){
                player.socketId = socketId;
                console.log('Socket atualizado com sucesso!');
            }
            
        });

    }

    /**
     * Seta os dados do mapa para a sala em questão
     * @param {String} map Nome do mapa a ser instânciado na sala
     */
    setMapConfig(map){

        let config = mapConfig(map); // Puxando configurações da sala
        
        // Adicionando inimigos na sala 
        config.enimes.forEach(element => {
            this.addNewEnime(element);
        });


    }

    addNewEnime(enime){
        this.currentEnimes.push(enime);
    }

    removeEnime(enimeRemove, self){
        this.currentEnimes.forEach(enime => {
            if(enime.id == enimeRemove.id){
                this.currentEnimes.splice(this.currentEnimes.indexOf(enime), 1);
                self.emitRoomDataExclusivoRemoveEnimes(this.id, enimeRemove);
            }

        });
        
    }

    addNewAttack(attack, self){
        this.currentAttacks.push(attack);
        self.emitRoomDataExclusivoAttacks(this.id);
    }

    removeAttack(attackId, self){
        this.currentAttacks.forEach(attack => {
            if(attack.id == attackId){
                this.currentAttacks.splice(this.currentAttacks.indexOf(attack), 1);
                self.emitRoomDataExclusivoRemoveAttacks(this.id, attack);
            }

        });
        
    }

    getNewAttackId(){
        return this.currentAttacks.length;
    }

    /**
     * Inicia ações dos inimigos da sala
     * @param {Object} self Instância da classe Game
     */
    enimesMov(self){
        this.currentEnimes.forEach(enime => {
            enime.start(self, this);
        })
    }
     
    /**
     * Realiza o cálculo de colisão da sala atual.
     * 
     * @param {Object} self Classe Game
     * 
     */
    colisionCalculete(self){
        Collision.calculeteAttack(self, this);
    }

}

module.exports = Sala;