var charName = localStorage.getItem('charName');
var socket = io();

// Arrumar aqui
if(localStorage.getItem('socket') == null){
    localStorage.setItem('socket', socket)
} else {
    socket = localStorage.setItem('socket', socket)
}

 
var indexRoom = [];

// Character login in Lobby
socket.emit('logingCharacter', {name: charName});

// Recive new connections 
socket.on('userConnectionUpdate', (usersConnect)=>{
    console.log('Usuarios no lobby:',  usersConnect);
});


// Solicitando sala já criadas
socket.emit('requestRooms');

// Recebendo Salas criadas
socket.on('roomsOpen', (rooms)=>{
    console.log('Salas Status:', rooms);

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
function createRoom(){
    // Create new Room
    socket.emit('createSala', map="Solaris");

}

//Entrando em uma sala
function enterRoom(id, map){
    socket.emit('enterRoom', {roomId: id, roomMap: map});

}

// Desconectar
function sair(){
    socket.emit('sair');
    location.href = '/sair';
}

