const http =  require ('http');

//import application app.js
const app = require ('./app');

const dotenv = require("dotenv")
const result = dotenv.config()

//paramétrage du port avec méthode set
app.set('port',3000)

//creation du server et appel fonction
const server = http.createServer(app);

// démarre l'écoute des requêtes sur le port
server.listen( 3000 )
