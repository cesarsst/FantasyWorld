const Projetil = require('../Attack/Skills/Projetil');
const Star = require('../Attack/Skills/Star');

/**
 * Procura pela skill e puxa seus dados
 *
 * Ex de metadados: Inimigos presentes na sala, itens, baus, npcs, etc
 * @param {String} skillName Nome da skill a ser instânciado
 * 
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