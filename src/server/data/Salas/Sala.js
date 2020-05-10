const Collision = require('./configs/Collision');3

const chatConfig = require('./configs/chatConfig');
const attackConfig = require('./configs/attackConfig');
const playerConfig = require('./configs/playerConfig');
const enimeConfig = require('./configs/enimeConfig');
const eventsConfig = require('./configs/eventsConfig');
const setMapConfig = require('./configs/setMapConfig');

class Sala {

    constructor(id, map, x, y, width, heigth){
        this.id = id;
        this.map = map;
        this.currentPlayers = [];
        this.currentEnimes = [];
        this.currentAttacks = [];
        this.events = [];
        this.chat = [];
        this.totalEnimes = 0;
        this.limitScene = {x:x, y:y, width:width, heigth:heigth}
    }


    //==========================================================================================================
    // CONFIGURAÇÕES GERAIS E EVENTOS DA SALA
    //==========================================================================================================

    /**
     * Seta os dados do mapa e eventos para a sala em questão
     * @param {String} map Nome do mapa a ser instânciado na sala
     */
    createRoom(map, ServerGame){
        
        //==========================================================================================================
        // CONFIGURAÇÕES DO CHAT
        //==========================================================================================================
        chatConfig(this, ServerGame);

        //==========================================================================================================
        // CONFIGURAÇÕES DOS PLAYERS DA SALA
        //==========================================================================================================
        playerConfig(this, ServerGame);

        //==========================================================================================================
        // CONFIGURAÇÕES DOS INIMIGOS DA SALA
        //==========================================================================================================
        enimeConfig(this, ServerGame);

        //==========================================================================================================
        // CONFIGURAÇÕES DOS ATAQUES DA SALA
        //==========================================================================================================
        attackConfig(this, ServerGame);

        //==========================================================================================================
        // CONFIGURAÇÕES DOS EVENTOS DA SALA
        //==========================================================================================================
        eventsConfig(this);

        //==========================================================================================================
        // INICIANDO UPDATE DA SALA
        //==========================================================================================================
        this.updateRoom(ServerGame);

        //==========================================================================================================
        // SETANDO INIMIGOS E EVENTOS DA SALA
        //==========================================================================================================
        setMapConfig(this, map, ServerGame);
    }

    /**
     * Realiza o update da sala X vez por segundo (x = fpsTaxa);
     * 
     * @param {Object} ServerGame Classe ServerGame
     * 
     */
    updateRoom(ServerGame){

        setInterval(()=>{

            Collision(ServerGame, this);                    // Sistema de colisão dos ataques
            this.startEvents(ServerGame, this);             // Sistema de eventos da sala
            this.enimesUpdate(ServerGame, this);            // Sistema de atualização dos inimigos
        
        }, ServerGame.fpsTaxa);
      
    }

}

module.exports = Sala;