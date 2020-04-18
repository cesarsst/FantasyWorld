const User = require('../models/User');
const Characater = require('../models/Character');

module.exports.create = async (req, res)=>{

    const { name, classe } = req.body;
   
    const userExist = await User.find({ email: req.session.email});
    if(userExist.length == 0){
        return res.status(401).json({msg: "Usuário não encontrado!"});
    }

    let characterCreate = await Characater.find({name});
    if(characterCreate.length != 0){
        return res.status(400).json({msg: "Este nome já esta sendo utilizado!"});
    }

    characterCreate = await Characater.create({
        name: name,
        user: userExist[0]._id,
        classe: classe
    });


    return res.status(200).json({msg: "Personagem criado com sucesso!", characterCreate});


}


module.exports.findCharacter = async (req, res) => {

    const findCharList = await Characater.find({user: req.session.user});
    
    const charList = []
    findCharList.forEach(char =>{
        
        let data = {
            name: char.name,
            level: char.level,
            classe: char.classe
        };
        charList.push(data);

    })


    return res.status(200).json({charList});

}