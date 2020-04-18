module.exports = (app)=> {
    
    app.get('/game', (req, res) => {
        res.render('index');
    });

}
