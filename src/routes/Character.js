const CharacterController = require('../controller/Character');
const SessionValidate = require('../validation/SessionLogged');

module.exports = function(app){

    app.post('/create', (req, res) =>{
        SessionValidate.logged(req, res),
        CharacterController.create(req, res);
    });

    app.get('/findCharacter', (req, res) => {
        SessionValidate.logged(req, res),
        CharacterController.findCharacter(req, res);
    })


}