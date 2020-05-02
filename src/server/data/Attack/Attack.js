const findSkill = require('../Attack/findSkill');
const Projetil = require('../Attack/Skills/Projetil');


class Attack{

    constructor(id, player, skillName){
        this.id = id;
        this.x = player.x;
        this.y = player.y;
        this.player = player.name;
        this.skillName = skillName;
        this.damage = 0;
        this.sprite = "";
        this.type = "";
        this.size = {x: 0, y: 0};
    }

    trigger(room, self, player){

        // Encontrando skill correspondente e iniciando trigger
        findSkill(player, room, this, self);
        
        // Enviando ataque para a lista da sala
        room.addNewAttack(this, self);
    }

    setDemage(demage){
        this.damage = demage;
    }

    setSprite(spriteName){
        this.sprite = spriteName;
    }

    setType(type){
        this.type = type;
    }

    setSize(x, y){
        this.size.x = x;
        this.size.y = y;
    }

}

module.exports = Attack;