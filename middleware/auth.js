const jwt = require('jsonwebtoken');
 
module.exports = (req, res) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'JWT_KEY_TOKEN');
       const userId = decodedToken.userId;
       req.auth = {
        userId : user._id
       };
   } catch(error) {
       res.status(401).json({ error });
   }
};