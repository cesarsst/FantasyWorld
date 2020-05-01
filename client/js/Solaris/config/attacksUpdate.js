function attacksUpdate(self, attackData){

    // verifica se ataque ja foi instanciado
    var instanciaAttack = true;

    self.attacksGroup.getChildren().forEach(attackContainer =>{    
                    
        // Se o ataque estiver instanciado e ainda no tempo de lance
        if(attackContainer.id == attackData.id){
            setAttackPosition(attackContainer, attackData);
            instanciaAttack = false;  
        } 


    });

    if(instanciaAttack){
        addAttack(attackData, self);
    } 
    
}

function setAttackPosition(attackContainer, attackData){
        
        let attackSprite = attackContainer.first;
        if(attackData.direction == 1){
            attackSprite.setFlipX(true);
        }

        attackContainer.x = attackData.x;
        attackContainer.y = attackData.y;

}

function addAttack(attackData, self){

     // Enime info view
     const newAttack = self.physics.add.sprite(0, 0, attackData.sprite);
     newAttack.setGravityY(-600);
     
     // Propriedades do container do inimigo 
     const container = self.add.container(attackData.x, attackData.y);
     container.id = attackData.id;
     container.setSize(40, 40); // dinamico
     container.add(newAttack);
     
     self.attacksGroup.add(container);

}

function removeAttacks(self, attack){
    
    self.attacksGroup.getChildren().forEach(attackContainer =>{ 
        if(attackContainer.id == attack.id){
            self.attacksGroup.remove(attackContainer, true, true);
        }
    });


}