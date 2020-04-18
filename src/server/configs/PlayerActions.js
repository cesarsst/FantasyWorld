module.exports = (self, socket) => {

    socket.on('movimentPlayer', (comamand )=>{

        var x, y = 0; 

        console.log(comamand);
        switch(comamand){
            
            case 100: // D
                x = 10;
                y = 0;
                break;
            
            case 97: // A
                x = -10;
                y = 0 ;
                break;

            case 119: // W 
                y = 10;
                x = 0;
                break;

            case 115: // S
                y = -10;
                x = 0;
                break;

            default:
                x, y = 0;
        }

        
        // Buscando onde o player esta e atualizando sua posição
        self.rooms.forEach(room => {
            room.currentPlayers.forEach(player =>{
                if(player.socketId == socket.id){
                    player.setPosition(x, y);
                    console.log(player.x, player.y);
                }
            })
        });

        self.emitRoomsData();

    });


}