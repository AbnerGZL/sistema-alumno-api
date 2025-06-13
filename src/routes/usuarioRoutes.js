const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.Controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registrar', usuarioController.registrarUsuario);
router.get('/', authMiddleware, usuarioController.listarUsuarios);
router.get('/:id', authMiddleware, usuarioController.obtenerUsuario);
router.put('/:id', authMiddleware, usuarioController.actualizarUsuario);
router.delete('/:id', authMiddleware, usuarioController.desactivarUsuario);
router.get('/tipo/:tipoId', authMiddleware, usuarioController.listarUsuariosPorTipo);

module.exports = router;