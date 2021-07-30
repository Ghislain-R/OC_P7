const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

/*Déclaration des routes pour la gestion des posts*/
router.get('/', auth, postCtrl.findAllPosts);
router.get('/:id', auth, postCtrl.findOnePost);
router.post('/', auth, postCtrl.createPost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.put('/like/:id', auth, postCtrl.likePost)

module.exports = router;