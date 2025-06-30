import express from 'express';
import profesorController from '../controllers/profesor.controller.js';

const router = express.Router();

router.get('/matriculas', profesorController.matriculas);
router.get('/matricula/:id', profesorController.matriculaPorId);

router.get('/profesores', profesorController.profesores);
router.get('/profesor/:id', profesorController.profesorPorId);

router.get('/alumnos', profesorController.alumnos);
router.get('/alumno/:idprofesor/:idcurso', profesorController.alumnoPorId);

router.get('/cursos', profesorController.cursos);
router.get('/curso/:id', profesorController.cursoPorId);

router.get('/notas', profesorController.notas);
router.get('/nota/:idprofesor/:idcurso', profesorController.notasPorId);
router.get('/nota/alumno/:idalumno/:idcurso', profesorController.notasPorAlumno);
router.get('/detalles/nota/:id', profesorController.detallesPorNota);
router.post('/notas', profesorController.cargarNotas);

router.get('/asistencias', profesorController.asistencias);
router.get('/asistencia/:id', profesorController.asistenciaPorId);
router.get('/asistencia/:idprofesor/:idcurso', profesorController.asistenciaPorCurso);
router.post('/asistencias/:id', profesorController.cargarAsistencia);

router.get('/carreras', profesorController.carreras);
router.get('/carreras/:id', profesorController.carreraPorId);

export default router;
