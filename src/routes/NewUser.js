const NewUserController = require('../controller/NewUser');

module.exports = function(app){

    app.post('/register', (req, res) =>{
        NewUserController.register(req, res)
    });




}