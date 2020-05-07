const Cogumelo = require('../Enimes/Cogumelo');
const randomPosition = require('../../configs/utils/randomPosition');

/**
 * Inimigos presentes na sala 
 */
module.exports.enimes = (room) => {

    // MOBS INICIAIS DO MAPA SOLARIS
    dataEnime = [
        // ID MOB | Position X | Position Y
        {enime: new Cogumelo(500, 520)},
        {enime: new Cogumelo(550, 520)},
        {enime: new Cogumelo(530, 520)}
    ]

    let enimes = [];

    dataEnime.forEach(enime =>{
        enimes.push(enime.enime);
    });

    return enimes;

}

/**
 * Gera os eventos do mapa Solaris
 */
module.exports.events = () => {
    events = [
        { 
            id: 1,
            start: spotCogumelo,
            status: true
        },
        { 
            id:2,
            start: dieMotherFuck,
            status: true
        },
    ]

    return events;

}

/**
 * Evento que controla o spot de cogumelo 
 * 
 * @param {Object} self Classe Game
 * @param {Object} room Intância da sala
 * @param {Object} event Intância do evento
 */
function spotCogumelo(self, room, event) {

        if(room.currentEnimes.length < 3){
            
           setTimeout(()=>{
                room.addNewEnime(new Cogumelo(randomPosition.positionX(300, 900), 520), self);
                event.status = true;
           }, 5000);

           event.status = false;

        } 
}

function dieMotherFuck(self, room, event){
    setTimeout(()=>{
        for(let i=0; i<100; i++){
            room.addNewEnime(new Cogumelo(randomPosition.positionX(300, 900), 520), self);
        }
    }, 10000);

    event.status = false;

}
