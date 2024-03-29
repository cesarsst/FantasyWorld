const Attack = require('../data/Attack/Attack');
const Message = require('../data/Chat/Menssage');

/**
 * Responsável pela: 
 * -Movimentação, animação dos Player
 * -Instancia de Ataques, Animação de skills e cooldown
 * -Mensagens do chat
 * 
 * @param {Object} Game Classe Game
 * @param {Object} socket Socket da conexão ativa
 * 
 */
module.exports = (Game, socket) => {

    // Moviment Player precisa ser tratado para verificar se as posições X, Y e COMMAND são válidas.
    socket.on('movimentPlayer', (data)=>{

        let {x, y , command, regionId, sceneId } = data;
        let animation = 0; 
        let direction = 0;

        switch(command){
            
            case 100: // D
                animation = 1;
                direction = 0; // =>
                break;
            
            case 97: // A
                animation = 2;
                direction = 1; // <=
                break;

            case 119: // W 
                animation = 0;
                break;

            case 115: // S
                animation = 0;
                break;
            
            default:
                animation = 0;
                break;
        }

        
        // Buscando onde o player esta e atualizando sua posição

        let Room = Game.regions[regionId].scenes[sceneId];
        Room.currentPlayers.forEach(player=>{
            
            if(player.socketId == socket.id){
                player.setCommand(command);
                player.setPosition(x, y);               // Atualizando posição do player
                player.setAnimation(animation);         // Atualiza animação do player
                player.setDirection(direction);
                Room.emitRoomPlayers();           // Emitindo novos dados da sala
            }
        })

    });

    socket.on('attackPlayer', (data)=>{

        let { attack, skillName, regionId, sceneId } = data;

        let Room = Game.regions[regionId].scenes[sceneId];
        Room.currentPlayers.forEach(player=>{
            if(player.socketId == socket.id){
                
                // Se player não estiver em ataque, permite nova instancia.
                if(player.attack == false){
                    player.setAttack(attack); // Setando player attack em false
                    
                    // Instanciando ataque
                    let attackInstancia = new Attack(Room.getNewAttackId(), player, skillName);
                    attackInstancia.trigger(Room, Game, player); // Executa trigger do attack e adiciona a lista de current attacks

                }

            }
        })

    });

    socket.on('msgPlayer', (data)=>{
        let Room = Game.regions[data.regionId].scenes[data.sceneId];
        
        Room.currentPlayers.forEach(player=>{
            if(player.socketId == socket.id){
                let message = new Message(player.name, data.msg);
                Room.addNewMsg(message, Game);
            }
        })
    })
 
}