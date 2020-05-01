module.exports = (self, socket) => {

    // Atualizando o socket do personagem da sala
    socket.on('updateSocket', (data) =>{

        self.rooms.forEach(room => {
            if(room.id == data.roomId){
                socket.join(room.id);   // Cadastrando para ouvir a sala
                room.updateSocketPlayer(data.name, socket.id); // update do socket id
                self.emitRoomDataExclusivo(room.id); // Emitindo atualização somente para usuarios cadastrados da sala;
            }
            
        })

    });



}