const mapConfig = require('../Salas/MapConfig');
const Collision = require('../Salas/Collision');
const EventsRoom = require('../Salas/EventsRoom');

class Sala {

    constructor(id, map){
        this.id = id;
        this.map = map;
        this.currentPlayers = [];
        this.currentEnimes = [];
        this.currentAttacks = [];
        this.events = [];
        this.chat = [];
        this.totalEnimes = 0;
    }


    //==========================================================================================================
    // CONFIGURAÇÕES GERAIS E EVENTOS DA SALA
    //==========================================================================================================

    /**
     * Seta os dados do mapa e eventos para a sala em questão
     * @param {String} map Nome do mapa a ser instânciado na sala
     */
    createRoom(map, self, socket){

        let config = mapConfig(map, this); // Puxando configurações da sala
        
        // Adicionando inimigos na sala 
        config.enimes.forEach(enime => {
            this.addNewEnime(enime, self);
        });

        // Adicionando eventos da sala
        config.events.forEach(event =>{
           this.addNewEvent(event);
        });

        // Inicia o update da sala
        this.updateRoom(self, socket);
    }

    /**
     * Realiza o update da sala
     * 
     * @param {Object} self Classe Game
     * 
     */
    updateRoom(self){
        Collision(self, this);                          // Sistema de colisão dos ataques
        EventsRoom.startEvents(self, this);             // Sistema de eventos da sala
    }

        
    //==========================================================================================================
    // CONFIGURAÇÕES DOS EVENTOS DA SALA
    //==========================================================================================================
    
    /**
     * Adiciona um novo evento a lista de eventos da sala
     * 
     * @param {Object} event Instância do evento
     * 
     */
    addNewEvent(event){
        this.events.push(event);
    }

    /**
     * Remove evento a lista de eventos da sala
     * 
     * @param {Number} eventID ID da instância do evento
     * 
     */
    removeEvent(eventId){
        this.events.forEach(event => {
            if(event.id == eventId){
                this.events.splice(this.events.indexOf(event), 1);
            }
        });
    }
    
    //==========================================================================================================
    // CONFIGURAÇÕES DOS PLAYERS DA SALA
    //==========================================================================================================

    /**
     * Adiciona um novo player a lista de players da sala
     * 
     * @param {Object} player Instância do player
     * 
     */
    addNewPlayer(player){
        this.currentPlayers.push(player);
        console.log("Usuário conectado na sala!");
    }

    /**
     * Remove um player da lista de players da sala
     * 
     * @param {String} socketId Numero da conexão do socket do player
     * 
     */
    removePlayer(socketId){
        this.currentPlayers.forEach(player => {
            if(player.socketId == socketId){
                this.currentPlayers.splice(this.currentPlayers.indexOf(player), 1);
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
    updateSocketPlayer(charName, socketId){
        this.currentPlayers.forEach(player =>{
            if(player.name == charName){
                player.socketId = socketId;
                console.log('Socket atualizado com sucesso!');
            }
            
        });

    }

    //==========================================================================================================
    // CONFIGURAÇÕES DOS INIMIGOS DA SALA
    //==========================================================================================================

     /**
     * Adiciona um enimigo para a lista de currentEnimes
     * 
     * @param {Object} enime Instância do enimigo
     * @param {Object} self Instância da classe Game
     */
    addNewEnime(enime, self){
        var id = this.getEnimeId();
        enime.setId(id);
        this.currentEnimes.push(enime);
        enime.start(self, this);            // Inicia a movimentação do inimigo
    }

     /**
     * Remove um enimigo da lista de currentEnimes
     * 
     * @param {Object} enime Instância do enimigo
     * @param {Object} self Instância da classe Game
     */
    removeEnime(enimeRemove, self){
        this.currentEnimes.forEach(enime => {
            if(enime.id == enimeRemove.id){
                this.currentEnimes.splice(this.currentEnimes.indexOf(enime), 1);
                self.emitRoomDataExclusivoRemoveEnimes(this.id, enimeRemove);
            }

        });
        
    }

     /**
     * Gera uma nova ID de inimigo de acordo com a variavel totalEnimes da sala
     */
    getEnimeId(){
        this.totalEnimes++;
        return this.totalEnimes;
    }

    /**
     * Retorna TRUE caso o enimeId exista na lista, e FALSE caso não exista.
     * 
     * @param {Object} self Classe Game
     * 
     */
    findEnimeById(enimeId){
        let enimes = this.currentEnimes;
        let findEnime = false;
    
        for(let i =0; i < enimes.length; i++){
            if(enimes[i].id == enimeId){
                findEnime = true;
            }
        }
        
        return findEnime;
    }


    //==========================================================================================================
    // CONFIGURAÇÕES DOS ATAQUES DA SALA
    //==========================================================================================================

     /**
     * Adiciona um novo ataque a lista de currentAttacks
     * 
     * @param {Object} attack Instância do attack
     * @param {Object} self Instância da classe Game
     */
    addNewAttack(attack, self){
        this.currentAttacks.push(attack);
        self.emitRoomDataExclusivoAttacks(this.id);
    }

     /**
     * Adiciona um novo ataque a lista de currentAttacks
     * 
     * @param {Number} attackId ID da nstância do attack
     * @param {Object} self Instância da classe Game
     */
    removeAttack(attackId, self){
        this.currentAttacks.forEach(attack => {
            if(attack.id == attackId){
                this.currentAttacks.splice(this.currentAttacks.indexOf(attack), 1);
                self.emitRoomDataExclusivoRemoveAttacks(this.id, attack);
            }

        });
        
    }

     /**
     * Gera um novo id para um ataque
     */
    getNewAttackId(){
        return this.currentAttacks.length;
    }

    //==========================================================================================================
    // CONFIGURAÇÕES DO CHAT
    //==========================================================================================================
    
     /**
     * Adiciona uma nova mensagem na lista do chat
     * 
     * @param {Object} msg Isntância da mensagem
     */
    addNewMsg(msg, self){
        this.chat.push(msg);
        self.emitRoomDataExclusivoChat(this.id);
    }

    removeMsg(msgId){
        let msg = this.chat;
        for(let i=0; i<msg.length; i++){
            if(msg[i].id == msgId){
                this.chat.splice(this.chat.indexOf(msg[i]), 1);
            }
        }
    }

}

module.exports = Sala;