// imports
const models = require('../models');
const User = models.users;
const Post = models.posts;
const Comment = models.comments;


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


/*Modification d'un utilisateur*/
exports.modifyUser = (req, res, next) => { 
  const last = req.body.lastname;
  const first = req.body.firstname;

  User.update({lastname: last, firstname: first},{ where: {id: req.params.id} } )         
  .then(() => res.status(201).json({ message: 'Compte modifié !' }))
  .catch(error => res.status(400).json({ error }));        
};


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


/*Modification de l'image d'un utilisateur*/
exports.modifyImageUser = (req, res, next) => { 

  const urlImage = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
 }`

  User.update({imageUrl: urlImage, },{ where: {id: req.params.id} } )         
  .then(() => res.status(201).json({ message: 'Image du compte modifiée !' }))
  .catch(error => res.status(400).json({ error }));
};