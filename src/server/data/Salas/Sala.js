const Collision = require('./configs/Collision');3

const chatConfig = require('./configs/chatConfig');
const attackConfig = require('./configs/attackConfig');
const playerConfig = require('./configs/playerConfig');
const enimeConfig = require('./configs/enimeConfig');
const eventsConfig = require('./configs/eventsConfig');
const setMapConfig = require('./configs/setMapConfig');

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
    createRoom(map, Game, socket){
        
        //==========================================================================================================
        // CONFIGURAÇÕES DO CHAT
        //==========================================================================================================
        chatConfig(this, Game);

        //==========================================================================================================
        // CONFIGURAÇÕES DOS PLAYERS DA SALA
        //==========================================================================================================
        playerConfig(this, Game);

        //==========================================================================================================
        // CONFIGURAÇÕES DOS INIMIGOS DA SALA
        //==========================================================================================================
        enimeConfig(this, Game);

        //==========================================================================================================
        // CONFIGURAÇÕES DOS ATAQUES DA SALA
        //==========================================================================================================
        attackConfig(this, Game);

        //==========================================================================================================
        // CONFIGURAÇÕES DOS EVENTOS DA SALA
        //==========================================================================================================
        eventsConfig(this);

        //==========================================================================================================
        // INICIANDO UPDATE DA SALA
        //==========================================================================================================
        this.updateRoom(Game, socket);

        //==========================================================================================================
        // SETANDO INIMIGOS E EVENTOS DA SALA
        //==========================================================================================================
        setMapConfig(this, map, Game);
    }

    /**
     * Realiza o update da sala X vez por segundo (x = fpsTaxa);
     * 
     * @param {Object} Game Classe Game
     * 
     */
    updateRoom(Game){

        setInterval(()=>{

            Collision(Game, this);                    // Sistema de colisão dos ataques
            this.startEvents(Game, this);             // Sistema de eventos da sala
            this.enimesUpdate(Game, this);            // Sistema de atualização dos inimigos
        
        }, Game.fpsTaxa);
      
    }

    


}

module.exports = Sala;