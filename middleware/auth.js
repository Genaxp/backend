const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
 
module.exports = async (req, res,next) => {
   try {
        const token =  req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
        const userIdDecoded = await decodedToken.userId;
    
        userIdParams = req.originalUrl.split("=")[1]
  
        if (req._body === true){
            if ( req.body.userId === userIdDecoded){
            next()
            } else {
                throw "erreur identification userID"
            } 
        } else if(userIdParams === userIdDecoded){
            next()
        } else{
            throw "erreur identification frm data"
        }
 
    } catch(error) {
        res.status(500).json({
            message :"Echec authentification" ,
            error : error })
    }
}
 