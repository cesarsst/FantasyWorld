/**
 * Cadastra o socket atual para escutar os dados do canal da sala. 
 * Responsável por atualizar um socket de um player em uma determiada sala caso de refresh na pagina do jogo
 * ou se desconecte por fatores externos.
 * 
 * @param {Object} self Classe Game
 * @param {Object} socket Socket da conexão ativa
 * 
 */
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