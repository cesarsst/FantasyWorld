 /**
 * Controla o event loops de eventos da sala.
 * 
 * @param {Object} self Classe Game
 * @param {Object} room Intância da sala
 */
 module.exports.startEvents = (self, room)=> {

    let events = room.events;

    setInterval(()=>{

        events.forEach(event => {
            if(event.status == true){
                event.start(self, room, event);
            }
                
        });
         
    }, self.fpsTaxa)

}