var socket  = io();
var charName = localStorage.getItem('charName');
var roomId = localStorage.getItem('roomId');

function gameUpdate(self){
    
    // Outros jogadores
    self.otherPlayers = self.physics.add.group();

    // Enimes group
    self.enimesGroup = self.physics.add.group();

    // Attacks group
    self.attacksGroup = self.add.group();
    

    // Atualiza socket do usuario e cadastra na sala
    socket.emit('updateSocket', {name: charName, roomId: roomId});

    // PLAYERS CONTROLLER
    socket.on('roomData', (roomPlayers)=>{
        roomPlayers.forEach(player => {
                playersUpdate(self, player);
        })
    });

    // ENIMES CONTROLLER 
    socket.on('roomDataEnimes', (roomEnimes)=> {
        roomEnimes.forEach(enime => {
                enimesUpdate(self, enime);
        })
    })

    socket.on('removeEnimes', (enime)=>{
        removeEnimes(self, enime);
    })

    // ATTACK CONTROLLER 
    socket.on('roomDataAttacks', (roomAttacks)=>{
        roomAttacks.forEach(attack => {
                attacksUpdate(self, attack);
        })
    })

    socket.on('removeAttack', (attack)=>{
        removeAttacks(self, attack);
    })

}
