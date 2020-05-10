module.exports = (Region, ServerGame) => {

     /**
     * Adiciona um novo player na região
     * Automaticamente é calculado para qual Sala (Scene) o player será enviado de acordo com sua posição na região.
     * 
     * @param {Object} player Nome do player a ser adicionado.
     */
    Region.addNewPlayer = function(player){

        console.log("Detectando scena atual")
        // Adicionando player na região
        Region.currentPlayers.push(player);

        let playerX = player.x;
        let playerY = player.y;

        // Descobrindo qual será a scena que sera enviada para o player
        for(let i = 0; i < Region.scenes.length; i++){
            let { x, y, width, heigth } = Region.scenes[i].limitScene;
            if((playerX >= x && playerX <= width) && (playerY >= y && playerY <= heigth)){
                Region.scenes[i].addNewPlayer(player); // Adiciona o player na scene e seta o canal de comunicação
            }
        }

    }


    /**
     * Realiza o update do socket do player alvo na REGIÃO.
     * Após a atualização já é enviado um uma notificação para todos os cliente com a lista de players atualizado
     * 
     * @param {Object} charName Nome do player a ser atualizado.
     * @param {Object} socketId Novo socket a ser atualizado.
     */
    Region.updateSocketPlayer = function(charName, socketId){
        
        Region.currentPlayers.forEach(player=>{
            if(player.name == charName){
                player.setSocketId(socketId);
            }
        })
        
        Region.emitRegionsPlayers();

    }


     // EMITINDO PLAYERS PARA DETERMINADA REGIÃO
    Region.emitRegionsPlayers = function(){
        console.log('Enviando dados da região atualizado:' + Region.id);
        ServerGame.io.to(Region.id).emit('regionsPlayers', Region.currentPlayers);
    }




}