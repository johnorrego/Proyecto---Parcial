
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
router.get('/',usersController.index);
router.get('/users', usersController.list);
router.post('/users/add', usersController.add);
router.get('/users/eliminar_usu/:id_noticia', usersController.eliminar_usu);
router.get('/login', usersController.index);
router.post('/login', usersController.login);
router.get('/home/dashboard', usersController.dashboard);
router.get('/signup', usersController.signup);
router.post('/signup', usersController.signup);
router.get('/logout', usersController.logout);
router.get('/ir', usersController.ir);
router.get('/ir_usuario', usersController.ir_usuario);
router.get('/users/update_user/:id', usersController.update_user);
router.post('/users/update_user/:id', usersController.save_user);
router.get('/motos', usersController.listM);
router.post('/motos/addmoto', usersController.addmoto);
router.get('/ir_moto', usersController.ir_moto);
router.get('/motos/eliminar_moto/:id_noticia', usersController.eliminar_moto);
router.get('/motos/update_moto/:id', usersController.update_moto);
router.post('/motos/update_moto/:id', usersController.save_moto);

module.exports= router;
