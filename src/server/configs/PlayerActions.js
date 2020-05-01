const Attack = require('../data/Attack/Attack');

module.exports = (self, socket) => {

    // Moviment Player precisa ser tratado para verificar se as posições X, Y e COMMAND são válidas.
    socket.on('movimentPlayer', (data)=>{

        let {x, y , command } = data;
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
        self.rooms.forEach(room => {
            room.currentPlayers.forEach(player =>{
                if(player.socketId == socket.id){
                    player.setCommand(command);
                    player.setPosition(x, y);   // Atualizando posição do player
                    player.setAnimation(animation); // Atualiza animação do player
                    player.setDirection(direction);
                    self.emitRoomDataExclusivo(room.id); // Emitindo novos dados da sala
                }
            })
        });

        

    });

    socket.on('attackPlayer', (data)=>{

        let { attack, skillName } = data;

         // Buscando onde o player esta e adicionando attack
         self.rooms.forEach(room => {
            room.currentPlayers.forEach(player =>{
                if(player.socketId == socket.id){
                    
                    // Se player não estiver em ataque, permite nova instancia.
                    if(player.attack == false){
                        player.setAttack(attack); // Setando player attack em false
                        
                        // Instanciando ataque
                        let attackInstancia = new Attack(room.getNewAttackId(), player, skillName);
                        attackInstancia.trigger(room, self, player); // Executa trigger do attack

                    }

                }
            })
        });
    });

}