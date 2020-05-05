const Solaris = require('../Maps/Solaris');

/**
 * Procura pelo MetaDado da sala a ser instânciada
 *
 * Ex de metadados: Inimigos presentes na sala, itens, baus, npcs, etc
 * @param {String} map Nome do mapa a ser instânciado
 * 
 */
module.exports = (map, room) => {

    switch(map){

        case "Solaris":
            return { 
                enimes: Solaris.enimes(room), 
                events: Solaris.events()
            };
            break;
            
    }       



}