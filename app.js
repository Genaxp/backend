//import express
const express = require("express");

const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const morgan = require("morgan");
const bodyParser = require("body-parser")
const path =require("path")

//import connexion base de données
const mongoose = require("./mongo/mongo");

const usersRoutes = require("./routes/users")
const saucesRoutes = require("./routes/sauces")

const app = express();
const port = 3000;

app.use(helmet());
app.use(mongoSanitize())
app.use(morgan("dev"));
app.use(express.json()); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH,OPTIONS');
  res.header("Cross-Origin-Resource-Policy", "cross-origin")
  next();
});

//Route Image
app.use("/images", express.static(path.join(__dirname,"images")))

//Route authentification
app.use ("/api/auth", usersRoutes)

 //Route sauces
app.use ("/api/sauces",saucesRoutes)

app.use(({res}) => {
  const message = "Impossible de trouver la ressource demandée"
  res.status(404).json({message})
})

//export app.js pour les autres fichiers
module.exports = app;