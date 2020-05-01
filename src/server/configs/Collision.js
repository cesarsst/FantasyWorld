module.exports.calculeteAttack = (self, room) => {

    setInterval(() =>{ 
        room.currentAttacks.forEach(attack => {

            room.currentEnimes.forEach(enime =>{

                var xInterval = [];
                var yInterval = [];

                xInterval.push(attack.x - 20);
                xInterval.push(attack.x + 20);
                yInterval.push(attack.y - 20);
                yInterval.push(attack.y + 20);

                if(enime.x >= xInterval[0] && enime.x <= xInterval[1]){
                    if(enime.y >= yInterval[0] && enime.y <= yInterval[1]){
                        
                        // Ações do inimigo ao ser atingido
                        enime.setDamage(attack);

                        // Ação do ataque após contato
                        if(attack.type == "projetil"){
                            room.removeAttack(attack.id, self);
                        }
                        
                    }
                }

            })
            

            self.emitRoomDataExclusivoAttacks(room.id);
        });

    }, self.fpsTaxa);




}