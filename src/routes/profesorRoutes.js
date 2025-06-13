const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/profesor.Controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', 
  authMiddleware, 
  roleMiddleware(['admin']), 
  profesorController.crearProfesor
);

router.get('/', 
  authMiddleware, 
  roleMiddleware(['admin', 'profesor']), 
  profesorController.listarProfesores
);

module.exports = router;