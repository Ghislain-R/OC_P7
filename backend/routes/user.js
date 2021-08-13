const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/*Déclaration des routes pour la gestion de utilisateurs*/
router.get('/', auth, userCtrl.findAllUsers);
router.get('/:id', auth, userCtrl.findOneUser);
router.put('/:id', auth, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id/image', auth, multer, userCtrl.modifyImageUser);

module.exports = router;
