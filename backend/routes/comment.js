const express = require('express');

const router = express.Router();
const commentCtrl = require('../controllers/comment');

/*Déclaration des routes de gestion des commentaires*/
router.get('/:id/display', commentCtrl.findAllComments);
router.get('/:id', commentCtrl.findOneComment);
router.post('/', commentCtrl.createComment);
router.delete('/:id', commentCtrl.deleteComment);
router.put('/:id', commentCtrl.modifyComment);

module.exports = router;