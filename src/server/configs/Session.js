module.exports = (self, socket) => {

    // Encerrando sessão
    socket.on('sair', ()=>{
        console.log('Usuário desconectado!');
        self.removeUserConnection(socket.id);
        
        // Desconectando das salas 
        self.rooms.forEach(room => {
                room.removePlayer(socket.id);  
        });
        self.emitRoomsData();
    });


}