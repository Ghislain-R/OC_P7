const express = require('express');

const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

/*Déclaration des routes de gestion des commentaires*/
router.get('/:id/display', auth, commentCtrl.findAllComments);
router.get('/:id', auth, commentCtrl.findOneComment);
router.post('/', auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.put('/:id', auth, commentCtrl.modifyComment);

module.exports = router;