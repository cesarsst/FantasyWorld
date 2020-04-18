class Sala {

    constructor(id, map){
        this.id = id;
        this.map = map;
        this.currentPlayers = [];
    }

    addNewPlayer(player){
        this.currentPlayers.push(player);
        console.log("Usuário conectado na sala!");
    }

    removePlayer(socketId){
        this.currentPlayers.forEach(player => {
            if(player.socketId == socketId){
                this.currentPlayers.splice(this.currentPlayers.indexOf(player), 1);
                console.log("Usuário removido da sala!");
            }
        });
        
    }



}

module.exports = Sala;