 /**
 * Inicia calculo de colisões.
 * Essa função é responsavel por iniciar todos os calculos de colisões da sala:
 * Ataque a inimigos, ataque a players, contato com cenário, etc.
 * 
 * O cálculo de colisões é feita de acordo com o fpsTaxa definido na classe Game
 * 
 * @param {Object} self Instância da classe Game
 * @param {Object} room Instância da sala
 */
module.exports = (self, room) => {

    setInterval(() =>{ 
        calculeteAttack(self, room);

        self.emitRoomDataExclusivoAttacks(room.id);
    }, self.fpsTaxa);

}

/**
 * Inicia calculo da colisão entre ataque e os inimigos da sala
 * 
 * Toda logica de atribuição de dano a um inimigo vindo de um player, assim como a remoção
 * do ataque após atingir um inimigo é feita aqui.
 * @param {Object} self Instância da classe Game
 * @param {Object} room Instância da sala
 */
function calculeteAttack(self, room) {
    room.currentAttacks.forEach(attack => {

        room.currentEnimes.forEach(enime =>{

            // Setando box do ataque
            var xInterval = [];
            var yInterval = [];
            xInterval.push(attack.x - attack.size.x/2);
            xInterval.push(attack.x + attack.size.x/2);
            yInterval.push(attack.y - attack.size.y/2);
            yInterval.push(attack.y + attack.size.y/2);


            // Colision Attack/Enime
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

        });

    });
};