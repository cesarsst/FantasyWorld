module.exports = (self, socket) => {

   
    // Encerrando sessão forçada
    socket.on('sair', ()=>{
        console.log('Usuário desconectado!');
        self.removeUserConnection(socket.id);
        
        // Desconectando das salas 
        self.rooms.forEach(room => {
                room.removePlayer(socket.id);  
        });
        self.emitRoomsData();
    });

      // Encerrando sessão automatica
      socket.on('disconnect', ()=>{
        console.log('Usuário desconectado!');
        self.removeUserConnection(socket.id);
    });

}