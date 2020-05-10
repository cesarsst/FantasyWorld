var scenesList = Scenes();

function cameraUpdate(self, camera){


    if(self.playerActive) {

        let playerX = self.playerActive.x;
        let playerY = self.playerActive.y;


        for(let i = 0; i < scenesList.length; i++){

            let {id, x, y, width, heigth} = scenesList[i];
            if((playerX >= x && playerX <= x+width) && (playerY >= y && playerY <= y+heigth)){
                    
                    let oldScene = localStorage.getItem('sceneId');
                    let oldRegion = localStorage.getItem('regionId');
                    if(oldScene != id){
                        camera.setScroll(x, y);
                        localStorage.setItem('sceneId', id);
                        changeCam(self, oldScene, id, oldRegion);
                    }
            }   
        }
        
    }

}

function changeCam(self, oldScene, newScene, regionId){
    console.log('Inimigos scena anterior'+self.enimesGroup.getChildren().length);
    self.enimesGroup.clear(true, true);
    self.socket.emit('changeChannel', {oldScene, newScene, regionId});
    console.log('Inimigos scena nova'+self.enimesGroup.getChildren().length);
}