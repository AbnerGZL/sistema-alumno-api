const { Curso, Profesor } = require('../models');

module.exports = {
  async crearCurso(req, res) {
    try {
      const { id_profesor, codigou, nombre, creditos } = req.body;
      
      const curso = await Curso.create({
        id_profesor,
        codigou,
        nombre,
        creditos,
        estatus: true
      });

      res.status(201).json(curso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async cursosPorProfesor(req, res) {
    try {
      const cursos = await Curso.findAll({
        where: { id_profesor: req.params.idProfesor },
        include: [{
          model: Profesor,
          attributes: ['nombre', 'apellidos']
        }]
      });
      res.json(cursos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};