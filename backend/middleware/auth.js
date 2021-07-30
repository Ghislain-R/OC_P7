
const jwt = require('jsonwebtoken'); 

/*Récupération du token depuis le header Authorization*/
module.exports = (req, res, next) => { 
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId; 
        req.decodedToken = decodedToken
        if (req.body.userId && req.body.userId !== userId) { 
            throw 'User ID non valable'; 
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({ error });
    }
};