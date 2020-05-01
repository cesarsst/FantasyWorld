const SessionValidate = require('../validation/SessionLogged');

module.exports = (app)=> {
    
    app.get('/Solaris', (req, res)=>{
        SessionValidate.logged(req, res);
        res.render('solaris');
    });

}
