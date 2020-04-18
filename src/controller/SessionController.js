const User = require('../models/User');


module.exports.login = async (req, res)=>{

    const { email, password } = req.body;

    const userExist = await User.find({email, password});
    if(userExist.length == 0){
        return res.status(400).json({msg: "Email ou senha incorretos!"});
    }

    req.session.email = email;
    req.session.user = userExist[0]._id;
    req.session.autorizado = true;

    return res.status(200).json({msg: "Bem vindo, " + req.session.email});

}

module.exports.sair = async (req, res) =>{
    req.session.destroy();
    return res.render('home');
}