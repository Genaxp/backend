// import package dotenv
const dotenv = require("dotenv");
const result = dotenv.config();

// connexion base de données
const mongoose = require("mongoose");

mongoose.connect(   
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.7xfdesu.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`
    ,{ useNewUrlParser: true,
      useUnifiedTopology: true  
    })
    try{
      console.log("Connexion à Mongo réussie")
    }catch (error) {
      console.log("Connexion à Mongo échouée")
     }
     
module.exports = mongoose;
