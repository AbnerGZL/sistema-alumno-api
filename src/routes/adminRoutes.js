const express = require('express');
const router = express.Router();
const sessionAuthMiddleware = require('../middlewares/sessionAuthMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/admin.Controller');

router.use(sessionAuthMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/', (req, res) => {
  res.render('admin/dashboard');
});

router.get('/usuarios', adminController.listarUsuarios);
router.get('/usuarios/nuevo', adminController.formCrearUsuario);
router.post('/usuarios/nuevo', adminController.crearUsuario);
router.get('/usuarios/editar/:id', adminController.formEditarUsuario);
router.post('/usuarios/editar/:id', adminController.editarUsuario);
router.post('/usuarios/eliminar/:id', adminController.eliminarUsuario);

router.get('/carreras', adminController.listarCarreras);
router.get('/carreras/nuevo', adminController.formCrearCarrera);
router.post('/carreras/nuevo', adminController.crearCarrera);
router.get('/carreras/editar/:id', adminController.formEditarCarrera);
router.post('/carreras/editar/:id', adminController.editarCarrera);
router.post('/carreras/eliminar/:id', adminController.eliminarCarrera);

router.get('/profesores', adminController.listarProfesores);
router.get('/profesores/nuevo', adminController.formCrearProfesor);
router.post('/profesores/nuevo', adminController.crearProfesor);
router.get('/profesores/editar/:id', adminController.formEditarProfesor);
router.post('/profesores/editar/:id', adminController.editarProfesor);
router.post('/profesores/eliminar/:id', adminController.eliminarProfesor);

router.get('/cursos', adminController.listarCursos);
router.get('/cursos/nuevo', adminController.formCrearCurso);
router.post('/cursos/nuevo', adminController.crearCurso);
router.get('/cursos/editar/:id', adminController.formEditarCurso);
router.post('/cursos/editar/:id', adminController.editarCurso);
router.post('/cursos/eliminar/:id', adminController.eliminarCurso);

module.exports = router;
