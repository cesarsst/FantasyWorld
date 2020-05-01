var charName = localStorage.getItem('charName');
var socket = io();

var indexRoom = [];

// Character login in Lobby
socket.emit('loginCharacter', {name: charName});


// Rebendo novas conexões do lobby
socket.on('userConnectionUpdate', (usersConnect)=>{
    console.log('Usuarios no lobby:',  usersConnect);
});


// Solicitando sala já criadas
socket.emit('requestRooms');

// Recebendo Salas criadas
socket.on('roomsOpen', (rooms)=>{
    console.log('Salas Status:', rooms);

    // Adicionado botões para entrar na sala 
    const lobbyContainer = document.getElementsByClassName('lobby-container');
    if(rooms.length != 0){
        rooms.forEach(room => {

            if(indexRoom.indexOf(room.id) == -1){
                
                // Adicionando no indice de salar
                indexRoom.push(room.id)
                
                let func = 'enterRoom('+ room.id +',"'+ room.map +'");'
                let sala = "<button onclick="+ func +">Sala:"+ room.id +"</button>"
                 $(lobbyContainer).append(sala);
    
            }

        });
    }

});

// Redirecionando para sala
socket.on('redirectRoom', (map)=>{
    location.href = '/'+ map +'';
})

// Recebendo mensagens de erro
socket.on('msgErro', (data) =>{
    alert(data.msg);
})

// Criando uma nova sala
function createRoom(mapName){
    // Create new Room
    socket.emit('createSala', map=mapName);

}

//Entrando em uma sala
function enterRoom(id, map){

    localStorage.setItem('roomId', id); // Salva sala atual
    socket.emit('enterRoom', {roomId: id, roomMap: map, charName});
    
}

// Desconectar
function sair(){
    socket.emit('sair');
    localStorage.removeItem('roomId');
    localStorage.removeItem('charName');
    location.href = '/sair';
}

