module.exports.logged = function(req, res){

    if(!req.session.autorizado){
        return res.status(400).json({msg: "Você precisa estar logado para realizar essa operação!"});
    }

    

}