/*imports*/
const { posts } = require("../models");
const models = require("../models");
const post = require("../models/post");
const user = require("../models/user");
const Post = models.posts;
const Comment = models.comments;

/*Recherche de tous les articles*/
exports.findAllPosts = (req, res, next) => {     
  Post.findAll({order: [
    ['createdAt', 'DESC'],
]},

)
      .then((posts) => res.status(200).json(posts))
      .catch(error => res.status(400).json({ error }));
};


/*Recherche d'un post par son id*/
exports.findOnePost = (req, res, next) => {
  Post.findOne({ where: {id: req.params.id} })
  .then(post => {
    console.log(post);
    res.status(200).json(post)
  })
  .catch(error => res.status(404).json({ error }));
};

/*Création d'un post*/
exports.createPost = (req, res, next) => {
  // éléments de la requète
  const content =  req.body.content;

  // vérification que tous les champs sont remplis
  if( content === null || content === '') {
      return res.status(400).json({'error': "Veuillez remplir le champ 'contenu' pour mettre en ligne votre post"});
  }

  const articleObject = req.body;


  const article = new Post({
        ...articleObject,
    });

  article.save()
    .then(() => res.status(201).json({ message: 'Le post a été créé !'}))
    .catch(error => res.status(400).json({ error }));
}

/*Modification d'un post*/
exports.modifyPost = (req, res, next) => {
 
    const content =  req.body.content;
  
    if (content === null || content === '') {
        return res.status(400).json({'error': "Veuillez remplir le champ'contenu' pour modifier votre post"});
    }
    
  const articleObject = req.body;
    
  Post.update({ ...articleObject, id:  req.params.id}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Le post a été modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => { 
  const contentvalue = req.body.content;
  /*const contentvalue = 'MODIFICATION';*/
  /*const first = req.body.firstname;*/
  /*const last = "VVVVVV";
  const first = "CCCCC";*/

  Post.update({content: contentvalue},{ where: {id: req.params.id} } )         
  .then(() => res.status(201).json({ message: 'Message modifié !' }))
.catch(error => res.status(400).json({ error }));

};

/*Supprimer un post*/
exports.deletePost = (req, res, next) => {
    Comment.destroy({where: {postId: req.params.id}})
    .then(() => 
      Post.destroy({ where: {id: req.params.id} })
      .then(() => res.status(200).json({ message: 'Le post a été supprimé !'}))
    )
  .catch(error => res.status(400).json({ error }));
};

/*Liker un post*/
exports.likePost = (req, res, next) => {
     
  Post.findOne({ where: {id: req.params.id} })
  .then((post) => {
    console.log(post+ "NOMBRE DE LIKES!!!"+ post.likes);
    let nblikes = post.likes + 1  
    console.log ("CALCUL DES LIKKKKKKES"+nblikes)
    res.status(200).json(post)

    Post.update({likes : nblikes},{ where: {id: req.params.id} } )
    .then(() => res.status(201).json({ message: 'Post liké !' }))
    .catch(error => res.status(400).json({ error }));

  })
  .catch(error => res.status(404).json({ error }));

  
};


