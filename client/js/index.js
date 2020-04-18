var socket = io();

socket.on('userConnectionUpdate', (usersConnect)=>{
    console.log('Usuarios no lobby:',  usersConnect);
});

// Character connect
socket.emit('logingCharacter', {name: "Nagazak"});

// Create new Room
socket.emit('createSala', {map: "Solaris"});

// Recebendo Salas criadas
socket.on('roomsOpen', (rooms)=>{
    console.log('Salas Status:', rooms);
});

// Entrando em uma sala
setTimeout(()=>{
    socket.emit('enterRoom', {roomId: 0});
}, 3000);


// Recebendo dados do teclado
document.body.onkeypress = tecla;
function tecla(){
    socket.emit('movimentPlayer', event.keyCode);
}

