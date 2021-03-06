const Personagem = require('../data/Characters/Character');


/**
 * Recebe o evento de login, cria uma instância de um Player, atualiza os dados que estão no banco de dados referente
 * personagem e adiciona na lista de usuários online global
 * 
 * @param {Object} Region Classe Region
 * @param {Object} socket Socket conectado atual
 * 
 */
module.exports = (ServerGame, socket) => {

    // Logando com um personagem e adicionando na lista de usuarios ativo do LOBBY.
    // Se o usuario já estiver na lista de usuarios do lobby, só atualiza seu socketId. 
    socket.on('loginCharacter', async (data)=>{
        const player = new Personagem(data.name, socket.id)
        await player.setStatus();                                // Atualiza com os dados do BD;
        ServerGame.addUserConnection(player);                     
    });



}