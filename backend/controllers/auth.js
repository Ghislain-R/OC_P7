const db = require("../models");
const User = db.users;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*Enregistrement d'un nouvel utilisateur*/
exports.signup = (req, res, next) => {
    
    const firstname = req.body.firstname;
    const lastname =  req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const imageurl = req.body.imageUrl;

    /*Vérification des champs*/
    if(firstname === null || firstname === '' || lastname === null || lastname === '' 
        || email === null || email === '' || password === null || password === '') {
        return res.status(400).json({'error': "Veuillez remplir l'ensemble des champs du formulaire"});
    }

    /*Cryptage de l'adresse mail*/
    let buff = new Buffer(email);
    let emailInbase64 = buff.toString('base64');

    /*Vérification si le user existe déjà*/
    db.User.findOne({
        attributes: ['email'],
        where: {email: emailInbase64}
    })
    .then((userFound) =>{
        /*Si l'utilisateur n'existe pas*/
        if(!userFound) {
            /*Cryptage du mot de passe avec bcrypt*/
            bcrypt.hash(password, 10)
            .then(hash => {
                /*Cryptage de l'adresse mail*/
                let buff = new Buffer(email);
                let emailInbase64 = buff.toString('base64');

                /*Enregistrement de l'utilisateur*/
                const user = new db.User({
                    firstname: firstname,
                    lastname: lastname,
                    email: emailInbase64,
                    password: hash,
                    imageUrl: imageurl
                })
                user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }));
            })
        } else if(userFound) {
            return res.status(409).json({error: "L'utilisateur existe déjà !"})
        }
    })
    .catch(error => res.status(500).json({ error }));
};

/*Connexion d'un utilisateur*/
exports.login = (req, res, next) => {
    
    /*Cryptage de l'adresse mail*/
    let buff = new Buffer(req.body.email);
    let emailInbase64 = buff.toString('base64');

    /*Recherche de l'utilisateur dans la base de données*/
    db.User.findOne({where: { email: emailInbase64 }})
    .then(user => {
        /*Si l'utilisateur n'est pas trouvé*/
        if(!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'})
        }
        /*Comparaison des mots de passe*/
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'})
            }
            res.status(200).json({
                userId: user.id,
                userAdmin: user.isAdmin,
                /*Création du token*/
                token: jwt.sign(
                    { 
                        userId: user.id, 
                        isAdmin : user.isAdmin 
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}; 