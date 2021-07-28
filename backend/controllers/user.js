// imports
const models = require('../models');
const User = models.users;
const Post = models.posts;
const Comment = models.comments;



/*const db = require("../models");

const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');*/

/*const Like = models.likes;*/


const fs = require('fs');
const { Console } = require('console');

/*Lecture de tous les utilisateurs*/
exports.findAllUsers = (req, res, next) => {
    User.findAll()
    .then(users => {
        console.log(users);
        res.status(200).json({data: users});
    })
    .catch(error => res.status(400).json({ error }));
};

/*Recherche d'un utilisateur par son id*/
exports.findOneUser = (req, res, next) => {
  
  User.findOne({ where: {id: req.params.id} })
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => res.status(404).json({ error }));
};

/*Recherche d'un utilisateur par son nom*/
exports.findAllUserByName = (req, res, next) => {
  
  User.findAll({ where: {firstname: req.params.name}})
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => res.status(404).json({ error }));
};


/*Modification d'un user*/
/*exports.modifyUser = (req, res, next) => {
  const userObject = req.file ?
    {
      ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  User.update({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'L utilisateur a bien été modifié !'}))
    .catch(error => res.status(400).json({ error }));
};*/

/*exports.modifyUser = (req, res, next) => {
  // éléments de la requète
  const firstname = req.body.firstname;
  const lastname =  req.body.lastname;

  console.log("firstname"+ req.body.firstname)
  console.log("Lastname"+ req.body.lastname)

  // vérification que tous les champs sont remplis
  if(firstname === null || firstname === '' || lastname === null ||lastname === '') {
      return res.status(400).json({'error': "Les champs 'nom' et 'prénom' doivent être remplis "});
  }
// gestion d'ajout/modification image de profil
const userObject = req.file ?
{
  ...req.body.user,
  imageUrl: req.file.filename
} : { ... req.body};

User.update({ ...userObject, id:  req.params.id}, { where: {id: req.params.id} })
.then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
.catch(error => res.status(400).json({ error }));
};*/


/*Modification d'un user*/
/*exports.modifyUser = (req, res, next) => { 
  User.findOne({ where: { id: req.params.id }})
      .then((user) => {*/
          /*lastname == req.body.lastname;
          firstname == req.body.firstname;*/
          /*lastname = 'NEW';
          firstname = 'new';
          console.log(lastname + firstname)

          User.Update({lastname:'NEW'}, { where: {id: req.params.id} })         
      .then(() => res.status(201).json({ message: 'Compte modifié !' }))
      .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error}));
};*/




//modify message
/*exports.modifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
  const decodedToken = jwt.verify(token, 'bWFzdXBlcmNsZXNlY3JldGVwb3VydG9rZW5tYWdpcXVlcXVlcGVyc29ubmVpbHBldXRsYWRldmluZXI=');
  const userId = decodedToken.userId;

  User.update(
     { lastname: req.body.lastname, firstname: req.body.firstname },
     {
        where: {
           id: userId
        },
     }
  )
     .then((message) => res.status(201).json({ message }))
     .catch((error) => res.status(500).json(error));
};*/

/*exports.modifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // on recupére le token(2eme élément du headers)
  const decodedToken = jwt.verify(token, 'bWFzdXBlcmNsZXNlY3JldGVwb3VydG9rZW5tYWdpcXVlcXVlcGVyc29ubmVpbHBldXRsYWRldmluZXI=');
  const userId = decodedToken.userId;

  User.update(
     { firstname: req.body.firstname, lastname: req.body.lastname } || {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
           req.file.filename
        }`,
     },
     {
        where: {
           userId: userId,
        },
     }
  )
     .then((message) => res.status(201).json({ message }))
     .catch((error) => res.status(500).json(error));
};*/

/*exports.modifyUser = (req, res, next) => {
User.update({firstname: req.body.firstname},{where: {_id: req.params.id}})
.then((message) => res.status(201).json({ message }))
.catch((error) => res.status(500).json(error));
};*/

/*exports.modifyUser = (req, res, next) => { 
  User.findOne({ where: { id: req.params.id }})
      .then((user) => {
          lastname == req.body.lastname;
          firstname == req.body.firstname;
          User.update()         
      .then(() => res.status(201).json({ message: 'Compte modifié !' }))
      .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};*/

// Modification d'un compte //
/*exports.modifyUser = (req, res, next) => { 

  User.findOne({ where: { id: req.params.id }})
      .then(() => {
        firstname == req.body.firstname;
        lastname == req.body.firstname;
        User.update({ where: { id: req.params.id }})
        .then(() => res.status(201).json({ message: 'Compte modifié !' }))
        .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(400).json({ error }));
};*/

/*exports.modifyUser = (req, res, next) => { 
const user = {firstname: req.body.firstname, lastname: req.body.lastname}; 

  User.update(user,{where: {userId: req.params.id}} )
      .then(() => res.status(201).json({ message: "Compte modifié!" }))
      .catch(error => res.status(400).json({ error }));
  };
  */


  /*exports.modifyUser = (req, res, next) => {
    // éléments de la requète
    const firstname = req.body.firstname;
    const lastname =  req.body.lastname;
  
    // vérification que tous les champs sont remplis
    if(firstname === null || firstname === '' || lastname === null ||lastname === '') {
        return res.status(400).json({'error': "Les champs 'nom' et 'prénom' doivent être remplis "});
    }
  // gestion d'ajout/modification image de profil
  const userObject = req.file ?
    {
      ...req.body.user,
      imageUrl: req.file.filename
    } : { ... req.body};

  User.update({ ...userObject, id:  req.params.id}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
  .catch(error => res.status(400).json({ error }));
  };*/

/*****Modification d'un compte*******/
exports.modifyUser = (req, res, next) => { 
          const last = req.body.lastname;
          const first = req.body.firstname;
          /*const last = "VVVVVV";
          const first = "CCCCC";*/

          User.update({lastname: last, firstname: first},{ where: {id: req.params.id} } )         
      .then(() => res.status(201).json({ message: 'Compte modifié !' }), console.log("INFO!!!!"+ req.body.lastname +"/"+ req.body.firstname))
      .catch(error => res.status(400).json({ error }));
        
};
/*************************************/

/*exports.modifyUser = (req, res, next) => {
  const userObject = req.file ?
    {
      ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'La compte a bien été modifié !'}))
    .catch(error => res.status(400).json({ error }));
};*/


/*Suppression d'un utilisateur*/
exports.deleteUser = (req, res, next) => {
    Comment.destroy({where: {userId: req.params.id}})
    .then(() => 
      Post.findAll({where: {userId: req.params.id}})
        .then(
          (posts) => {
            posts.forEach(
              (post) => {
                Comment.destroy({where: {PostId: post.id}})
                Post.destroy({where: {id: post.id}})
              }
            )
          }
        )
        .then(() =>
        User.findOne({ where: {id: req.params.id} })
          .then(user => {
            const filename = user.imageUrl;
            fs.unlink(`images/${filename}`, () => {
              User.destroy({ where: {id: req.params.id} })
              .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
            })
          })
        )
      )
  .catch(error => res.status(400).json({ error }));
};

exports.modifyImageUser = (req, res, next) => { 
  /*const urlImage = req.file.filename;*/

  const urlImage = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
 }`
  /*const first = req.body.firstname;*/
  /*const last = "VVVVVV";
  const first = "CCCCC";*/

  User.update({imageUrl: urlImage, },{ where: {id: req.params.id} } )         
.then(() => res.status(201).json({ message: 'Avatar modifié !' }), console.log("INFO!!!!"+ req.body.lastname +"/"+ req.body.firstname))
.catch(error => res.status(400).json({ error }));

};