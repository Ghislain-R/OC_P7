const models = require("../models");
const Comment = models.comments;


/*Recherche des commentaires pour un post*/
exports.findAllComments = (req, res, next) => {
  Comment.findAll({
      where: { postId: req.params.id },      
  },{order: [
    ['createdAt', 'DESC'],
]}
  )
  .then((comments) => res.status(200).json(comments))
  .catch(error => res.status(400).json({ error }));
};


/*Recherche d'un commentaire par son id*/
exports.findOneComment = (req, res, next) => {
  Comment.findOne({ where: {id: req.params.id}})
  .then(comment => {
    console.log(comment);
    res.status(200).json(comment)
  })
  .catch(error => res.status(404).json({ error }));
};


/*Création d'un commentaire*/
exports.createComment = (req, res, next) => {
  const content =  req.body.content;

  /*Vérification que tous les champs sont remplis*/
  if( content === null || content === '') {
      return res.status(400).json({'error': "Veuillez remplir le champ 'contenu' pour mettre en ligne votre post"});
  }

  const commentObject = req.body;

  const comment = new Comment({
        ...commentObject,
    });

  comment.save()
  .then(() => res.status(201).json({ message: 'Commentaire créé !'}))
  .catch(error => res.status(400).json({ error }));
}


/*Modification d'un commentaire*/
exports.modifyComment = (req, res, next) => { 
  const contentvalue = req.body.content;

  Comment.update({content: contentvalue},{ where: {id: req.params.id} } )         
  .then(() => res.status(201).json({ message: 'Commentaire modifié !' }))
  .catch(error => res.status(400).json({ error }));

};


/*Suppression d'un commentaire*/
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
  .catch(error => res.status(400).json({ error }));
};

