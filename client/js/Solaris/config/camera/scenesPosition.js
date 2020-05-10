/*** Setando matriz da posição das scenes
* [  1,  2,  3,  4,  5
*    6, 7,  8,  9,  10,
*   11, 12, 13, 14, 15,
*   16, 17, 18, 19, 20, 
*   21, 22, 23, 24, 25 ]
*/
var Scenes = function scenesPosition(){

    var scenesPosition = [];

    var scenesWidth = 1000;
    var scenesHeigth = 600; 

    var id = 0
    var x = 0
    var y = 0;

    for(let linha=0; linha<5; linha++){

        for(let col=0; col<5; col++){
            scenesPosition.push({id: id, x: x, y: y, width: 1000, heigth: 600});
            x += scenesWidth;
            id++;
        }

        x = 0;                  // Reseta o valor de X para começar a proxima linha 
        y += scenesHeigth;   
    }

    return scenesPosition;

}