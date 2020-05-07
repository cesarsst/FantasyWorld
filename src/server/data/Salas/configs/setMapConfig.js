const mapConfig = require('../MapConfig');

module.exports = (room, map, Game)=>{
    let config = mapConfig(map, room); // Puxando configurações da sala
        
    // Adicionando inimigos na sala 
    config.enimes.forEach(enime => {
        room.addNewEnime(enime);
    });

    // Adicionando eventos da sala
    config.events.forEach(event =>{
       room.addNewEvent(event);
    });
}