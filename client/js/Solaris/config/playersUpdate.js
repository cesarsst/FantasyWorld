function playersUpdate(self, player){
    
    // Verifica se o player é o atual
    if(player.socketId == socket.id){
        // Se o player já estiver instanciado, atualiza
        if(self.playerActive){
            setPlayerAnimation(self.playerActive, player);
        } else {
            addPlayer(player, self);
        }
        
    } else {
        // Se não for o player ativo, verifica se  já foi instanciado
        var instanciaPlayer = true;
        self.otherPlayers.getChildren().forEach(playerContainer => {
            // se ja foi instanciado, atualiza 
            if(playerContainer.name == player.name){
                setPlayerPosition(playerContainer, player);
                setPlayerAnimation(playerContainer, player)
                instanciaPlayer = false;
            }
        });

        if(instanciaPlayer){
            addOtherPlayer(player, self);
        }
        
        
    }

  

}

// ATUALIZAÇÃO DOS PLAYERS

/**
 * Altera a posição do container do player 
 *
 * @param {Object} playerContainer Container do player
 * @param {Object} player Dados do player
 * 
 */
function setPlayerPosition(playerContainer, playerData){

    playerContainer.body.setVelocity(0);
    if(playerData.command == 100 ){
        playerContainer.body.setVelocityX(playerData.velocityX); // D
    } else if(playerData.command == 97){
        playerContainer.body.setVelocityX(-playerData.velocityX); // A
    } else if ( playerData.command == 119){
        playerContainer.body.setVelocityY(playerData.sVelocityY); // W
    }

    // Position update
    playerContainer.x = playerData.x;
    playerContainer.y = playerData.y;
    
}

/**
 * Altera animação do player: 
 *  
 * 0 - Turn, 1- Right , 2- Left
 * @param {Object} playerContainer Container do player
 * @param {Object} playerData Dados do player
 * 
 */
function setPlayerAnimation(playerContainer, playersData){
   
    let playerSprite = playerContainer.first; // pegando sprite do container

    if(playersData.animation == 0){
            playerSprite.anims.play('turn', true);
    } else if (playersData.animation == 1){
            playerSprite.anims.play('right', true);
    } else if (playersData.animation == 2){
            playerSprite.anims.play('left', true);
    }
}


// INSTANCIAS DOS PLAYERS

/**
 * Instancia o container do player ativo pela primeira vez
 *
 * @param {Object} player Dados dos player
 * @param {Object} self Intancia da classe Phaser
 * 
 */
function addPlayer(player, self){
     // Players info view
     self.playerActiveSprite = self.add.sprite(0, 0, 'player');
     self.playerActiveData = {
         velocityX: player.velocityX,
         velocityY:player.velocityY
     }

     const name = self.add.text(-50, -40, player.name, {
         fontSize: '14px',
         fill: 'black',
         fontStyle: 'bold'
     });

   

     // Container Props
     const container = self.add.container(player.x, player.y);
     container.setSize(40, 40);
     container.add(self.playerActiveSprite);
     container.add(name);
     

     // Colliders sets
     self.physics.world.enable(container);
     container.body.collideWorldBounds=true;
     self.physics.add.collider(container, self.piso);
     
     // Adicionando container para variavel do usuario ativo
     self.playerActive = container;

}


/**
 * Instancia o container dos outros players online
 * 
 * @param {Object} player Dados dos player
 * @param {Object} self Intancia da classe Phaser
 * 
 */
function addOtherPlayer(player, self){
    // Players info view
    const otherPlayer = self.add.sprite(0, 0, 'player');
    const name = self.add.text(-50, -40, player.name, {
        fontSize: '14px',
        fill: 'black',
        fontStyle: 'bold'
    });

    // Container Props
    const container = self.add.container(player.posx, player.posy);
    container.setSize(40, 40);
    container.add(otherPlayer);
    container.add(name);

    // Seta socketId para controle
    container.name = player.name;

    // Colliders sets
    self.physics.world.enable(container);
    container.body.setCollideWorldBounds(true);
    self.physics.add.collider(container, self.piso);

    // Setando group
    self.otherPlayers.add(container);
}