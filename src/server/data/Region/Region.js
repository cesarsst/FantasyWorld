const Sala = require('../Salas/Sala');
const ScenesPosition = require('./ScenesPosition');

const PlayerConfig = require('./configs/playerConfig');
const ScenesConfig = require('./configs/scenesConfig');

/***
 * Uma região é um mapa na qual tem um tamanho de 5000x3000 px. 
 * Scenes é uma referencia para todas as 25 Scenas dessa região. Cada Região tem o tamanho de 1000x600px.
 * 
* [  1,  2,  3,  4,  5
*    6, 7,  8,  9,  10,
*   11, 12, 13, 14, 15,
*   16, 17, 18, 19, 20, 
*   21, 22, 23, 24, 25]

 * Quando uma região é iniciada, todas suas scenas são inciadas no servidor desde que possua pelo menos 1 usuario ativo.
 * Cada Scena possui suas proprias lista de usuario, eventos, colisões, attacks, chat, etc. 
 * Os usuários de cada scene recebem somente os dados da scena em questao.
 * 
*/

class Region{
    
    constructor(id, nameMap, scenesNumber){
        this.id = id;
        this.nameMap = nameMap;
        this.scenesNumber = scenesNumber;
        this.scenes = [];      
        this.currentPlayers = [];
    }

    // Adiciona todas as Scenes da região
    createScenes(ServerGame){

        let scenesPosition = ScenesPosition();
        
        // CRIANDO SCENES DA REGIÃO
        for(let i=0; i < this.scenesNumber; i++){
            let position = scenesPosition[i];
            let sala = new Sala(position.id, this.nameMap, position.x, position.y, position.width, position.heigth);
            sala.createRoom(this.nameMap, ServerGame);
            this.scenes.push(sala);
        }

        // Todas as configurações que alteram na lista de players da região ficam aqui
        PlayerConfig(this, ServerGame);

        ScenesConfig(this, ServerGame);

    }

  

}

module.exports = Region;