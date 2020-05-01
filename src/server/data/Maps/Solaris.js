const Cogumelo = require('../Enimes/Cogumelo');

/**
 * Inimigos presentes na sala 
 */
module.exports.enimes = () => {

    // MOBS DO MAPA SOLARIS
    dataEnime = [
        // ID MOB | Position X | Position Y
        {id: 1, x: 500, y:520},
        {id: 2, x: 550, y:520},
    ]

    let enimes = [];

    dataEnime.forEach(enime =>{
        enimes.push(new Cogumelo(enime.id, enime.x, enime.y));
    });

    return enimes;

}