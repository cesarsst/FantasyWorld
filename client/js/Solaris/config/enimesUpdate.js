function enimesUpdate(self, enimeData){

   
    // verifica se enime ja foi instanciado
    var instanciaEnime = true;
    self.enimesGroup.getChildren().forEach(enimeContainer =>{
        if(enimeContainer.id == enimeData.id){
            setEnimePosition(enimeContainer, enimeData);

            if(enimeContainer.animation != enimeData.animations.attack){
                enimeContainer.animation == enimeData.animations.attack;
                setEnimeAnimation(enimeContainer, enimeData);
            }
        
            instanciaEnime = false;
        }
    });

    if(instanciaEnime){
        addEnime(enimeData, self);
    }


}


function setEnimePosition(enimeContainer, enimeData){

    //enimeContainer.body.setVelocity(0); // Right
    if(enimeData.command == 0){
        //enimeContainer.body.setVelocityX(5); // Right
    } else {
        //enimeContainer.body.setVelocityX(-5); // Left
    }

    // Setando posição
    enimeContainer.x = enimeData.x;
    enimeContainer.y = enimeData.y;

    // Setando HP do mob
    if(enimeContainer.hp != enimeData.hp){
        enimeContainer.hp = enimeData.hp
        enimeContainer.getAt(2).setText(enimeData.hp);
    }
    

}

function setEnimeAnimation(enimeContainer, enimeData){
    
    let enimeSprite = enimeContainer.first;
    enimeSprite.anims.play(enimeData.animations.attack, true);
    
}

function addEnime(enimeData, self){
    // Enime info view
    const newEnime = self.add.sprite(0, 0, 'solaris', enimeData.sprite + '/mov1.png');
   
    const name = self.add.text(-35, -40, enimeData.name, {
        fontSize: '14px',
        fill: 'yellow',
        fontStyle: 'bold'
    });

    const hp = self.add.text(-35, -50, enimeData.hp, {
        fontSize: '14px',
        fill: 'red',
        fontStyle: 'bold'
    });

  

    // Propriedades do container do inimigo 
    const container = self.add.container(enimeData.x, enimeData.y);
    container.id = enimeData.id;
    container.animation = "";
    container.hp = "";
    container.setSize(40, 40);
    container.add(newEnime);
    container.add(name);
    container.add(hp);
    

    // Colliders sets
    self.physics.world.enable(container);
    container.body.setCollideWorldBounds(true);
    self.physics.add.collider(container, self.piso);
    
    self.enimesGroup.add(container);
}

function removeEnimes(self, enime){
    self.enimesGroup.getChildren().forEach(enimeContainer =>{ 
        if(enimeContainer.id == enime.id){
            self.enimesGroup.remove(enimeContainer, true, true);
        }
    });
}