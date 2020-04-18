const SessionValidate = require('../validation/SessionLogged');

module.exports = function(app){

   app.get('/', (req, res) =>{
        res.render('home');
   });

    app.get('/register', (req, res) =>{
        res.render('register');
    });

    app.get('/login', (req, res) =>{
        res.render('login');
    });

    app.get('/character', (req, res) =>{
        SessionValidate.logged(req, res),
        res.render('character');
    });
  
    app.get('/lobby', (req, res) =>{
        SessionValidate.logged(req, res),
        res.render('lobby');
    })


}