const models = require("../models");
const Comment = models.comments;


/*REcherche de les commentaires pour un post*/
/*exports.findAllComments = (req, res, next) => {
  Comment.findAll({where: {postId: req.params.id}})
  .then(comments => {
      console.log(comments);
      res.status(200).json({data: comments});
  })
  .catch(error => res.status(400).json({ error }));
};*/


/*Recherche des commentaires pour un post*/
exports.findAllComments = (req, res, next) => {
  Comment.findAll({
      where: { postId: req.params.id },
      
     //include: ["user", "messages"]
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
/*exports.createComment = (req, res, next) => {

  const commentObject = req.body;

  const comment = new Comment({
    ...commentObject
  });

  Comment.save()
  .then(() => {
    Comment.findAll({
      where: {postId: req.body.postId}
    })
    .then((comments) => {
      res.status(200).json(comments);
    })
  })
  .catch(error => res.status(400).json({ error }));
}*/

/*Création d'un commentaire*/
/*exports.createComment = (req, res, next) => {
  const comment = {
      content: req.body.content,
      postId: req.body.postId,
      userId: "15"         
  };
  console.log("INFO COMMENTAIRE !!!!" + req.decodedToken.userId + "/"+ req.body.postId + "/"+ req.body.content )
  Comment.create(comment)
      .then(() => res.status(201).json({ message: "Réponse envoyée !" }))
      .catch(error => res.status(400).json({ error }));
      
};*/

/*Création d'un commentaire*/
exports.createComment = (req, res, next) => {
  // éléments de la requète
  const content =  req.body.content;

  // vérification que tous les champs sont remplis
  if( content === null || content === '') {
      return res.status(400).json({'error': "Veuillez remplir le champ 'contenu' pour mettre en ligne votre post"});
  }

  const commentObject = req.body;


  const comment = new Comment({
        ...commentObject,
    });

  comment.save()
    .then(() => res.status(201).json({ message: 'Le commentaire a été créé !'}))
    .catch(error => res.status(400).json({ error }));
}

/*Modification d'un commentaire*/
exports.modifyComment = (req, res, next) => { 
  const contentvalue = req.body.content;
  /*const contentvalue = 'MODIFICATION';*/
  /*const first = req.body.firstname;*/
  /*const last = "VVVVVV";
  const first = "CCCCC";*/

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

