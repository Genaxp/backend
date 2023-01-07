//import express
const express = require("express");

//création app express
const app = express();
const port = 3000

// gérer le CORS
const cors = require("cors")

const morgan = require("morgan");

const bodyParser = require("body-parser")

const path =require("path")

//import connexion base de données
const mongoose = require("./mongo/mongo");

const usersRoutes = require("./routes/users")
const saucesRoutes = require("./routes/sauces")

//Middleware
app.use(cors());

app.use(morgan("dev"));

app.use(bodyParser.json());  // changement du body en JSON
 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//Route authentification
app.use ("/api/auth", usersRoutes)

 //Route sauces
app.use ("/api/sauces",saucesRoutes)

app.use("/images", express.static(path.join(__dirname,"images")))
//export app.js pour les autres fichiers
module.exports = app;