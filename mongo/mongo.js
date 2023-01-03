// import package dotenv
const dotenv = require("dotenv");
const result = dotenv.config();

// connexion base de données
const mongoose = require("mongoose");

mongoose.connect = async(req,res) =>{
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.7xfdesu.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`
    try{
        res.status(201).send({message:"Connexion à Mongo"})
    }
    catch (err) {
        res.status(500).json({err})
    }
}

module.exports = mongoose;
