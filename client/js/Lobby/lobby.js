var charName = localStorage.getItem('charName');
var socket = io();

var indexregion = [];

// Character login in Lobby
socket.emit('loginCharacter', {name: charName});


// Rebendo novas conexões do lobby
socket.on('usersServer', (usersConnect)=>{
    console.log('Usuarios no servidor: ',  usersConnect);
});


// Solicitando sala já criadas
socket.emit('requestRegions');

// Recebendo Salas criadas
socket.on('regionsData', (regions)=>{
    console.log('Regiões online:', regions);

    // Adicionado botões para entrar na sala 
    const lobbyContainer = document.getElementsByClassName('lobby-container');
    if(regions.length != 0){
        regions.forEach(region => {

            if(indexregion.indexOf(region.id) == -1){
                
                // Adicionando no indice de salar
                indexregion.push(region.id)
                
                let func = 'enterRegion('+ region.id +',"'+ region.nameMap +'");'
                let regionButton = "<button onclick="+ func +">"+ region.nameMap +"</button>"
                 $(lobbyContainer).append(regionButton);
    
            }

        });
    }

});

// Redirecionando para sala
socket.on('redirectRegion', (map)=>{
    location.href = '/'+ map +'';
})

// Recebendo mensagens de erro
socket.on('msgErro', (data) =>{
    alert(data.msg);
})


//Entrando em uma sala
function enterRegion(id, nameMap){

    let regionId = id;
    localStorage.setItem('regionId', id); // Salva sala atual
    localStorage.setItem('sceneId', 0); // Salva sala atual
    socket.emit('enterRegion', {charName, regionId, nameMap});
    
}

// Desconectar
function sair(){
    socket.emit('sair');
    localStorage.removeItem('regionId');
    localStorage.removeItem('charName');
    location.href = '/sair';
}

