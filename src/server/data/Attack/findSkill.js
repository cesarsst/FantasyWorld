const Projetil = require('../Attack/Skills/Projetil');
const Star = require('../Attack/Skills/Star');

/**
 * Procura pela skill e puxa seus dados
 *
 * Ex de metadados: Inimigos presentes na sala, itens, baus, npcs, etc
 * @param {Object} player Instância do player
 * @param {Object} room Instância da sala
 * @param {Object} attack Instância do attack
 * @param {Object} self Instância da classe Game
 */
module.exports = (player, room, attack, self) => {

    switch(attack.skillName){

        case "Projetil":
            return Projetil(player, room, attack, self);
            break;
        
        case "Star":
            return Star(player, room, attack, self);
            break;
    }       



}