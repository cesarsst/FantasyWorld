const Sala = require('../data/Salas/Sala');
const Errors = require('../configs/logs/Errors');

module.exports = (self, socket) => {

    // Recebendo solicitação de salas
    socket.on('requestRooms', ()=>{
        // Removendo de possiveis salas antes conectada.
        self.rooms.forEach(room =>{
            room.currentPlayers.forEach(player=>{
                console.log(player, socket.id);
                if(player.socketId == socket.id){
                    room.removePlayer(player);
                }
            })
        })

        self.emitRoomsData();
        
    })

    // Criando uma sala no servidor
    socket.on('createSala', (map)=>{
        const room = new Sala(self.rooms.length, map, socket);
        self.addNewRoom(room);
        console.log(self.rooms);

        // Teste Remove Room
        //self.removeRoom(room.id);
        //console.log(self.rooms);
    });

   // Entrando em uma sala especifica
   socket.on('enterRoom', (data) => {
        
        console.log('enter room: '+ data)
        // Verifica se o usuario já não esta em uma sala
        if( enterPermision() ){
            self.rooms.forEach(room => {
                if(room.id == data.roomId){
                    self.usersConnect.forEach(player=>{
                        
                        if(player.socketId == socket.id){
                                room.addNewPlayer(player);
                        }
                            
                    })
                }
            });

            // enviando dados atualizados para os outros clientes
            self.emitRoomsData();

            // Redireciona para a sala 
            socket.emit('redirectRoom', data.roomMap);

        } else {
            // Log Error Emit
            Errors.emitError("Você já está conectado em uma sala!", socket);
        }
        
       

    });


    // Validações para entrar na sala
    function enterPermision(){

        var permition = true;

        self.rooms.forEach(room => {
            room.currentPlayers.forEach(player =>{
                if(player.socketId == socket.id){
                    permition = false;
                }
            })
        })

        return permition;

    }





}


