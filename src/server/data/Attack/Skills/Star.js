module.exports = (player, room, attack, self) => {

    var demage = 10;                                   // Dano base do projetil
    var launchTime = 1500;                             // Tempo de lance da skill
    var alcance = 400;                                 // Alcance da skill
    var velX = (alcance * 50)/launchTime;              // Velocidade do projetil no eixo X
    var sprite = "star";                               // Nome do sprite a ser usado no projetil
    var type = "projetil"                              // Tipo da skill 

    attack.setDemage(demage);                          // Setando o dano do projetil no attack
    attack.setSprite(sprite);                          // Setando o sprite da skill
    attack.setType(type);                              // Setando o tipo da skill

    // Calculando o valor final em X
    var xFinal = [];
    xFinal.push(attack.x + 400);
    xFinal.push(attack.x - 400);

    // Descobrindo orientação do projetil;
    var direction = player.direction;

    // Execução da movimentação do projetil;
    var func = () => {

        if(direction == 0){ // =>
            if(attack.x <= xFinal[0]){
                attack.x += velX; 
            }
        } else if (direction == 1){ // <=
            if(attack.x >= xFinal[1]){
                attack.x -= velX; 
            }
        }

    }

    var timer = setInterval(func, self.fpsTaxa);
    
    // Esperando pelo tempo de execução da skill
    setTimeout(()=>{
        clearInterval(timer);
        player.attack = false; // Controlando tempo de animação do ataque do player
        room.removeAttack(attack.id, self);
    }, launchTime);

}
