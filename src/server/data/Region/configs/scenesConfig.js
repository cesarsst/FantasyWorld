module.exports = (Region, ServerGame) => {

    
    Region.calculeteScene = function(charName){
            
        Region.currentPlayers.forEach(player => {
            if(player.name == charName){
               
                let playerX = player.x;
                let playerY = player.y;

                // Descobrindo qual será a scena que sera enviada para o player
                for(let i = 0; i < this.scenes.length; i++){
                    let { x, y, width, heigth } = this.scenes[i].limitScene;
                    if((playerX >= x && playerX <= width) && (playerY >= y && playerY <= heigth)){
                       
                        // função que seta o canal de comunicação do player vem aqui

                    }
                }

            }
        });
    }

    Region.changeScene = function(oldScene, newScene, socketId){

        console.log("Usuario trocado da sala" + oldScene +" para sala" + newScene);

        Region.currentPlayers.forEach(player => {
            if(player.socketId == socketId){
                Region.scenes[oldScene].removePlayer(socketId);
                Region.scenes[newScene].addNewPlayer(player);
            }
        })
    }



}