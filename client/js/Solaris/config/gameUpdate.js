var socket  = io();

var charName = localStorage.getItem('charName');
var regionId = localStorage.getItem('regionId');
var sceneId = localStorage.getItem('sceneId');

function gameUpdate(self){
    
    self.socket = socket;

    // Outros jogadores
    self.otherPlayers = self.physics.add.group();

    // Enimes group
    self.enimesGroup = self.physics.add.group();

    // Attacks group
    self.attacksGroup = self.add.group();
    

    // TIRAR O JOIN DO UPDATE!
    // Atualiza socket do usuario e cadastra na sala 
    socket.emit('updateSocket', {charName, regionId, sceneId});


     // Recebendo atualizações da região
     socket.on('regionsPlayers', (roomPlayers)=>{
        roomPlayers.forEach(player => {
                playersUpdate(self, player);
        })
    });

    // PLAYERS CONTROLLER
    socket.on('roomDataPlayers', (roomPlayers)=>{
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

    // CHAT CONTROLLER
    socket.on('roomDataChat', (message)=>{
        var textArea = document.getElementById('textArea');
        $(textArea).animate({ scrollTop: 99999999 }, 'slow');
        $(textArea).append(message.player + ': '+ message.msg + '<br>');
    })


}
