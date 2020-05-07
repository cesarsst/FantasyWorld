module.exports = (room) => {

     /**
     * Adiciona um novo evento a lista de eventos da sala
     * 
     * @param {Object} event Instância do evento
     * 
     */
    room.addNewEvent = function(event){
        room.events.push(event);
    }

    /**
     * Remove evento a lista de eventos da sala
     * 
     * @param {Number} eventID ID da instância do evento
     * 
     */
    room.removeEvent= function(eventId){
        room.events.forEach(event => {
            if(event.id == eventId){
                room.events.splice(room.events.indexOf(event), 1);
            }
        });
    }

    /**
     * Inicia o event loops de eventos da sala.
     * 
     * @param {Object} self Classe Game
     * @param {Object} room Intância da sala
     */
    room.startEvents = function(self, room){

        let events = room.events;
        events.forEach(event => {
            if(event.status == true){
                event.start(self, room, event);
            }
                
        });    

    }


}