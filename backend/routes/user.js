const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
/*const postCtrl = require('../controllers/post');*/

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, userCtrl.findAllUsers);
router.get('/:id', auth, userCtrl.findOneUser);
/*router.get('/:id/posts', postCtrl.findArticlesByUserId);*/
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id/image', auth, multer, userCtrl.modifyImageUser);

module.exports = router;
