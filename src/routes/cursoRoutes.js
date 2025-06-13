const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/curso.Controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, cursoController.crearCurso);
router.get('/profesor/:idProfesor', authMiddleware, cursoController.cursosPorProfesor);

module.exports = router;