const Character = require('../../../models/Character');


class Personagem {

    constructor(name, socketId){
        this.name = name;
        this.socketId = socketId;
        this.level = 1;
        this.classe = null;
        this.x = 0;
        this.y= 0;

    }

    async setStatus() {
        const char = await Character.find({name: this.name});
        this.level = char[0].level;
        this.classe = char[0].classe;
    }

    setPosition(x, y){
        this.x += x;
        this.y += y;
    }


}

module.exports = Personagem;