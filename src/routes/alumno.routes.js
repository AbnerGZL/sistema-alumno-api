import express from 'express';
import alumnoController from '../controllers/alumno.controller';

const router = express.Router();

router.post('/login', alumnoController.login);

router.get('/matriculas', alumnoController.matriculas);
router.get('/matricula/:id', alumnoController.matriculaPorId);

router.get('/alumnos', alumnoController.alumnos);
router.get('/alumno/:id', alumnoController.alumnoPorId);

router.get('/cursos', alumnoController.cursos);
router.get('/curso/:id', alumnoController.cursoPorId);

router.get('/notas', alumnoController.notas);
router.get('/notas/:id', alumnoController.notasPorId);

router.get('/asistencias', alumnoController.asistencias);
router.get('/asistencia/:id', alumnoController.asistenciaPorId);

router.get('/carreras', alumnoController.carreras);
router.get('/carreras/:id', alumnoController.carreraPorId);

router.get('/pagos', alumnoController.pagos);
router.get('/pago/:id', alumnoController.pagoPorId);

export default router;
