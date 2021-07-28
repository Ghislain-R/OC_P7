
/*const jwt = require('jsonwebtoken');

// Validation userId et isAdmin en comparaison avec le token
module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'bWFzdXBlcmNsZXNlY3JldGVwb3VydG9rZW5tYWdpcXVlcXVlcGVyc29ubmVpbHBldXRsYWRldmluZXI=');
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        if (req.body.userId && req.body.userId !== userId) {
            return res.status(401).json({error: "User ID non valable !"})
        } else if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
            console.log(isAdmin)
            return res.status(401).json({error: "User role non valable !"})
        } else{
            console.log(decodedToken)
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};*/

const jwt = require('jsonwebtoken'); // On a besoin du package jwt //

module.exports = (req, res, next) => { // On exporte un middleware //
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1]; // Récupération du token dans le header dans un tableau split et on retourne le 2ème élément //
        console.log(token)
        /*const decodedToken = jwt.verify(token, 'bWFzdXBlcmNsZXNlY3JldGVwb3VydG9rZW5tYWdpcXVlcXVlcGVyc29ubmVpbHBldXRsYWRldmluZXI=');*/ // On décode le token, la clé doit correspondre à celle de la fontion login //
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken)
        const userId = decodedToken.userId; // On récupére l'userId //
        console.log(userId)
        req.decodedToken = decodedToken
        console.log("DECODEDTOKENUSERID"+ userId)
        if (req.body.userId && req.body.userId !== userId) { // Si l'userId du corps de la requête est différent de userId //
            throw 'User ID non valable'; // Throw pour renvoyer l'erreur //
        } else {
            next();// Tout est ok donc, on passe au prochain middleware //
        }
    } catch(error) {
        res.status(401).json({ error });
    }
};