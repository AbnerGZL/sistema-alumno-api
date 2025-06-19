import express from 'express';
import profesorController from '../controllers/alumno.controller';

const router = express.Router();

router.post('/login', profesorController.login);

router.get('/matriculas', profesorController.matriculas);
router.get('/matricula/:id', profesorController.matriculaPorId);

router.get('/profesores', profesorController.profesores);
router.get('/profesor/:id', profesorController.profesorPorId);

router.get('/alumnos', profesorController.alumnos);
router.get('/alumno/:id', profesorController.alumnoPorId);

router.get('/cursos', profesorController.cursos);
router.get('/curso/:id', profesorController.cursoPorId);

router.get('/notas', profesorController.notas);
router.get('/notas/:id', profesorController.notasPorId);
router.post('/notas/:id', profesorController.cargarNotas);

router.get('/asistencias', profesorController.asistencias);
router.get('/asistencia/:id', profesorController.asistenciaPorId);
router.post('/asistencias/:id', profesorController.cargarAsistencia);

router.get('/carreras', profesorController.carreras);
router.get('/carreras/:id', profesorController.carreraPorId);

export default router;
