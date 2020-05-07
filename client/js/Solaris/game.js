class gameStart extends Phaser.Scene{

    constructor(){
        super('gameStart');
    }

    create(){
        
        // Criação do mapa
        this.createMap();

         // Animations
        this.createAnimations();
        
        // Socket game 
        this.socketConfigs();
        
        // Create Chat
        this.createUI();
    }

    update(){

        // Effects background
        this.background.tilePositionX -= 0.5;
        
        // Recebendo dados do teclado
        playerAction(this);
        
        
    }

    // Funções da Scene
    createMap(){
         // Céu
         this.background = this.add.tileSprite(0, 0, config.width, config.height, 'solaris', "background.png");
         this.background.setOrigin(0,0);
 
         // Plataformas
         this.piso = this.physics.add.staticGroup();
         this.piso.create(0, 540,'solaris','piso.png').setOrigin(0,0);
         this.piso.create(250,280,'solaris','plataform.png');
         this.piso.create(650,387,'solaris','plataform.png');
         this.piso.refresh();
     
         // Árvores
         this.arvore1 = this.add.sprite(10,290, 'solaris','arvore1.png').setOrigin(0,0);
         
         // Pedras
         this.pedra1 = this.add.sprite(120,490, 'solaris','pedra1.png').setOrigin(0,0);
         this.pedra2 = this.add.sprite(580,490, 'solaris','pedra1.png').setOrigin(0,0);
         
         // Moitas
         this.moita1 = this.add.sprite(680,465, 'solaris','moita1.png').setOrigin(0,0);
    }

   
     // Animations
     createAnimations(){
        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {
            start: 0, end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
    
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {
            start:5, end: 8
            }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [{key: 'player', frame:4}],
            frameRate: 10,
            repeat: -1
        });
    
        var frameNames = this.anims.generateFrameNames('solaris', {
            start: 1,
            end: 5, 
            zeroPad:1,
            prefix: 'cogumelo/mov', suffix: '.png',
        });

        this.anims.create({ key: 'attack/cogumelo', frames: frameNames, frameRate: 10, repeat: -1 });
        
    }

    // Sockets config
    socketConfigs(){
        gameUpdate(this);
    }

   // Função da UI
    createUI(){

        // Keyboard Controller
        this.cursors = this.input.keyboard.addKeys('W,S,A,D,R');

        var chat = this.add.dom(10, 450).createFromCache('chat');
        var inputTextValue = chat.getChildByName('textInput');
        var textArea = document.getElementById('textArea');

        chat.setOrigin(0,0);
        
        chat.addListener('click');
        chat.on('click', (event) => {

            $(textArea).animate({ scrollTop: 99999999 }, 'slow');
            this.chatOpen = true;
            this.input.keyboard.removeCapture('W,S,A,D,R');
            
            if(event.target.name == 'enviar'){
                this.chatOpen = false;
                this.cursors = this.input.keyboard.addKeys('W,S,A,D,R');
                if(inputTextValue.value != ""){
                    //Socket Chat Emmiter
                    this.socket.emit('msgPlayer', {msg:inputTextValue.value});
                }
                inputTextValue.value = "";
            } 
            
        });

        this.chatButton = this.add.image(0,300, "star").setOrigin(0,0).setInteractive();
        this.chatButton.on('pointerup', function(){
            if(chat._visible == false){
                chat.setVisible(true);
            } else {
                chat.setVisible(false);
            }
            
        })
    
        
    }
        
    

}
