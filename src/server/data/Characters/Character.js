const Character = require('../../../models/Character');


class Personagem {

    constructor(name, socketId){
        this.name = name;
        this.socketId = socketId;
        this.level = 1;
        this.classe = null;
        this.x = 0;
        this.y= 0;
        this.velocityX = 160;
        this.velocityY = -330;
        this.attack = false; // {objeto}
        this.command = 0;
        this.animation = 0;
        this.direction = 0;

    }

    async setStatus() {
        const char = await Character.find({name: this.name});
        this.level = char[0].level;
        this.classe = char[0].classe;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    setVelocity(x, y){
        this.velocityX = x;
        this.velocityY = y;
    }

    setAttack(attack){
        this.attack = attack;
    }

    setCommand(command){
        this.command = command;
    }

    setSocketId(socketId){
        this.socketId = socketId;
    }

    setAnimation(animation){
        this.animation = animation;
    }

    setDirection(direction){
        this.direction = direction;
    }
}

module.exports = Personagem;