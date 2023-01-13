const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
 
module.exports = async (req, res,next) => {
   try {
        const token =  req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
        const userIdDecoded = await decodedToken.userId;
        req.auth = {
            userId: userIdDecoded
        }
        next()
    } catch(error) {
        res.status(301).json({message :"Echec authentification"})
    }
}
 