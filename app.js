//import express
const express = require("express");

// gérer le CORS
const cors = require("cors")

const morgan = require("morgan");

// const nodemon = require("nodemon");

const bodyParser = require("body-parser")

//création app express
const app = express();
const port = 3000

//import connexion base de données
const mongoose = require("./mongo/mongo");

const usersRoutes = require("./routes/users")
const saucesRoutes = require("./routes/sauces")
const sauceRoutes = require("./routes/sauces")
const idRoutes = require ("./routes/sauces")
const deleteRoutes = require ("./routes/sauces")

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
app.use ("/api",saucesRoutes)

app.use("/api",sauceRoutes)

app.use("/sauces",idRoutes)

app.use("/sauces",deleteRoutes)

app.get("/",(req,res) => res.send("Hello World"))
// app.listen(port, ()=> console.log("listening on port" + port))

//export app.js pour les autres fichiers
module.exports = app;