// import de bcrypt
const bcrypt = require("bcrypt")

//import jsonwebtoken
const jwt = require("jsonwebtoken");

// const users = require("../models/users");

// import données users
const Users = require("../models/users");

//enregistrement nouvel utilisateur
exports.signup = async (req,res)  => {
    try{
        let hash = await bcrypt.hash (req.body.password, 10)
        const user = new Users({
            email : req.body.email,
            password : hash
        })
        await user.save() 
        res.status(201).json({message:"Nouvel utilisateur créé"})
    } 
    catch (error) {
        res.status(400).json({error})
    }  
};

//authentification
exports.login = async (req,res) => {
    try{
        let user = await Users.findOne({email:req.body.email})
        
            if(!user){
                return res.status(401).json({ error : "user not find"})
            }
        // contrôle password
        let controlPassword = await bcrypt.compare(req.body.password,user.password)
            if(!controlPassword){
                return res.status(401).json({error : "password not valid"})
            }
            res.status(200).json({ 
                userId : user._id,
                token: jwt.sign(
                    { userId: user._id},
                    `${process.env.JWT_KEY_TOKEN}`,
                    { expiresIn :"24h"}
                )
            })
    }   
    catch (error) {
        res.status(400).json({error})
    }
}