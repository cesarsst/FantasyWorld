const Sala = require('../data/Salas/Sala');
const Errors = require('./logs/Errors');

/**
 * Responsável pela criação de salas e suas inicializações (Trigger de mapa, movimentações de inimigos e colisões),
 * adicionar um usuário que deseja conectar em uma sala específica e redirecionar para a sala em questão.
 * 
 * 
 * @param {Object} Game Classe Game
 * @param {Object} socket Socket da conexão ativa
 * 
 */
module.exports = (Game, socket) => {

    // Recebendo solicitação de salas quando entra no lobby
    socket.on('requestRegions', ()=>{
        Game.emitRegionsData();
    })

  
   // Entrando em uma sala especifica
   socket.on('enterRegion', (data) => {
        
        let { charName, regionId, nameMap} = data;

        // Verifica se o usuario já não esta na região
        if( enterPermision(charName) ){

            // Buscando a sala clicada
            Game.regions.forEach(region => {
                if(region.id == regionId){
                    // Buscando o usuario que irá se conectar na sala
                    Game.currentUsers.forEach(player=>{
                        if(player.socketId == socket.id){
                                
                                // adicionando player na região clicada
                                region.addNewPlayer(player);
                                
                                nameMap = region.nameMap;

                                // retirando usuario do lobby
                                Game.removeUserConnection(charName);
                        }
                            
                    })
                }
            });

            // enviando dados atualizados para os outros clientes
            Game.emitRegionsData();

            // Redireciona para a sala 
            socket.emit('redirectRegion', nameMap);

        } else {
            // Log Error Emit
            Errors.emitError("Você já está conectado em uma sala!", socket);
        }
        
       

    });


    
    // Verifica se o o usuarios já não esta conectado em uma regiao
    function enterPermision(charName){

        var permition = true;

        Game.regions.forEach(region => {
            region.currentPlayers.forEach(player =>{
                if(player.name == charName){
                    permition = false;
                }
            })
        })

        return permition;

    }





}


