const jwt = require('jsonwebtoken');
 
module.exports = async (req, res,next) => {
   try {
        const token = await  req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
        const userId = await decodedToken.userId;

        userIdParams = req.originalUrl.split("=")[1];
        if (req.body === true){
            if ( req._body.userId === decodedToken)
            next()
        } else {
            throw "erreur authentification"
        }


        }
        



        // req.auth = {
        // userId : userId
        // }
        // next()
   
    
    catch(error) {
        res.status(500).json({ error });
    }
}
