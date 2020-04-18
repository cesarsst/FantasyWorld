const SessionController = require('../controller/SessionController');

module.exports = function(app){

   app.post('/login', (req, res) =>{
        SessionController.login(req, res);
   });

   app.get('/sair', (req, res)=>{
       SessionController.sair(req, res);
   })



}