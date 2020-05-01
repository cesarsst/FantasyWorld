const Personagem = require('../data/Characters/Character');

module.exports = (self, socket) => {


    // Logando com um personagem e adicionando na lista de usuarios ativo do LOBBY.
    // Se o usuario já estiver na lista de usuarios do lobby, só atualiza seu socketId. 
    socket.on('loginCharacter', async (data)=>{
        const player = new Personagem(data.name, socket.id)
        await player.setStatus();               // Atualiza com os dados do BD;
        self.addUserConnection(player, socket);
    });



}