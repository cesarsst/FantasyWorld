/**
 * Cadastra o socket atual para escutar os dados do canal da sala. 
 * Responsável por atualizar um socket de um player em uma determiada sala caso de refresh na pagina do jogo
 * ou se desconecte por fatores externos.
 * 
 * @param {Object} Game Classe Game
 * @param {Object} socket Socket da conexão ativa
 * 
 */
module.exports = (Game, socket) => {

    // Atualizando o socket do personagem da sala
    socket.on('updateSocket', (data) =>{

        let { charName, regionId, sceneId } = data;

        let region = Game.regions[regionId]; // Buscando a região que o player esta conectado
        let scene = region.scenes[sceneId];

        socket.join(scene.id);
        region.updateSocketPlayer(charName, socket.id); // REALIZA O UPDATE DO PLAYER NA REGIAO
        scene.updateSocketPlayer(charName, socket.id);  // REALIZA O UPDATE DO PLAYER NA SCENE
        
    });

    socket.on('changeChannel', (data) => {
        let {oldScene, newScene, regionId} = data;
         
        // Trocando os canais de comunicação
        socket.leaveAll();
        socket.join(newScene);
        let socketId =socket.id;

        Game.regions[regionId].changeScene(oldScene, newScene, socketId);
    });
            
}

    



