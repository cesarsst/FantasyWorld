function playerAction(self){

    var command = 0;

     // Player movs
     if (self.playerActive) {
        
        self.playerActive.body.setVelocityX(0);
        // Horizontal movement
        if (self.cursors.A.isDown) {
            self.playerActive.body.setVelocityX(-self.playerActiveData.velocityX);
            command = 97;
        } else if (self.cursors.D.isDown) {
            self.playerActive.body.setVelocityX(self.playerActiveData.velocityX);
            command = 100;
        } else {
         
        }
        // Vertical movement
        if (self.cursors.W.isDown && self.playerActive.body.touching.down) {
            self.playerActive.body.setVelocityY(self.playerActiveData.velocityY);
            command = 119;

        } else if (self.cursors.W.isDown && (self.playerActive.body.touching.left ||self.playerActive.body.touching.right)){
            self.playerActive.body.setVelocityY(self.playerActiveData.velocityY);
            command = 119;
        } 
        
        var x = self.playerActive.x;
        var y = self.playerActive.y;
     
        if (self.playerActive.oldPosition && (x !== self.playerActive.oldPosition.x || y !== self.playerActive.oldPosition.y)) {
            socket.emit('movimentPlayer', { x, y, command });
        }

        // save old position data
        self.playerActive.oldPosition = {
            x: self.playerActive.x,
            y: self.playerActive.y,
        };


        // ATTACK CONTROLLER
        if(self.cursors.R.isDown){
            socket.emit('attackPlayer', {attack: true, skillName: 'Star'});   
        }



    }
     
         
        
        

        
    
   

    
    


}