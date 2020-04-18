const User = require('../models/User');


module.exports.register = async (req, res) => {

    const {name, email, password } = req.body;

    // Verificando se existe conta com email
    const userExist = await User.find({email});
    if(userExist.length != 0){
        return res.status(403).json({msg: "Já existe uma conta criada com esse email!"});
    }

    const userCreate = await User.create({
        name, email, password
    });

    if(userCreate.email = email){
        res.status(200).json({msg: "Conta criada com sucesso!"});
    } else {
        res.status(400).json({msg: "Erro ao criar a conta! Tente novamente mais tarde!"});
    }

}