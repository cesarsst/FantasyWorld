class Cogumelo{

    constructor(id, x, y){
        this.id = id;
        this.name = 'Cogumelo';
        this.hp = 100;
        this.sprite = 'cogumelo';
        this.x = x;
        this.y =  y;
        this.direction = 0;
        this.command = 0;
        this.animations = {
            attack: 'attack/cogumelo'
        };
        this.velX = (600 * 50)/ 5000;    // 600 px em 5 segundos (20fps);
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    setDamage(attack){
        this.hp -= attack.damage;
    }

    start(self, room){

        setInterval(()=>{

            //  CONTROLE DO HP DO MOB
            if(this.hp <= 0){
                room.removeEnime(this, self);
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
            
            self.emitRoomDataExclusivoEnimes(room.id);          // Emitindo novo estado do mob

        }, self.fpsTaxa);
    }

}

module.exports = Cogumelo;