class Cogumelo{

    constructor(x, y){
        this.id;
        this.name = 'Cogumelo';
        this.hp = 10;
        this.sprite = 'cogumelo';
        this.x = x;
        this.y =  y;
        this.direction = 0;
        this.command = 0;
        this.animations = {
            attack: 'attack/cogumelo'
        };
        this.velX = (600 * 35)/ 10000;    // 600 px em 10 segundos (30fps);
    }

    setId(id){
        this.id = id;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    setDamage(attack){
        this.hp -= attack.damage;
    }

    // INTELIGENCIA ARTIFICIAL DO MOB
    start(self, room){

        //  CONTROLE DO HP DO MOB
        if(this.hp <= 0){
            room.removeEnime(this);
        }

        // CONTROLE DA MOVIMENTAÇÃO -- DIRECTION => 0 right , 1 left;
        if(this.x > 900){
            this.direction = 1;
        } else if(this.x < 300){
            this.direction = 0;
        } 
        
        if (this.direction == 0){
            this.setPosition(this.x + this.velX, this.y);
            this.command = 0;
        } else {
            this.setPosition(this.x - this.velX, this.y);
            this.command = 1;
        } 

        
    }

}

module.exports = Cogumelo;