const { Profesor, Usuario } = require('../models');

module.exports = {
  async listarProfesores(req, res) {
    try {
      const profesores = await Profesor.findAll({
        include: [{
          model: Usuario,
          attributes: ['codigou', 'email', 'estatus']
        }]
      });
      res.json(profesores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async crearProfesor(req, res) {
    try {
      const { nombre, apellidos, especialidad, email, password } = req.body;
      
      const usuario = await Usuario.create({
        id_tipo: 2,
        codigou: 'PROF-' + Math.random().toString(36).substr(2, 4),
        email,
        contraseña: password,
        estatus: true
      });

      const profesor = await Profesor.create({
        id_usuario: usuario.id_usuario,
        nombre,
        apellidos,
        especialidad,
        estado: 'activo',
        correo: email
      });

      res.status(201).json(profesor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};