const { Usuario, TipoUsuario, Carrera, Profesor, Curso } = require('../models');
const bcrypt = require('bcryptjs');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: TipoUsuario, attributes: ['nombre'] }],
      attributes: { exclude: ['contraseña'] }
    });
    res.render('admin/usuarios/list', { usuarios });
  } catch (error) {
    res.status(500).send('Error al listar usuarios');
  }
};

exports.formCrearUsuario = async (req, res) => {
  try {
    const tipos = await TipoUsuario.findAll();
    res.render('admin/usuarios/form', { usuario: null, tipos });
  } catch (error) {
    res.status(500).send('Error al cargar formulario');
  }
};

exports.crearUsuario = async (req, res) => {
  try {
    const { id_tipo, codigou, dni, email, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    await Usuario.create({ id_tipo, codigou, dni, email, contraseña: hashedPassword, estatus: true });
    res.redirect('/admin/usuarios');
  } catch (error) {
    res.status(500).send('Error al crear usuario');
  }
};

exports.formEditarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    const tipos = await TipoUsuario.findAll();
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    res.render('admin/usuarios/form', { usuario, tipos });
  } catch (error) {
    res.status(500).send('Error al cargar formulario');
  }
};

exports.editarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    const data = req.body;
    if (data.contraseña) {
      data.contraseña = await bcrypt.hash(data.contraseña, 10);
    } else {
      delete data.contraseña;
    }
    await usuario.update(data);
    res.redirect('/admin/usuarios');
  } catch (error) {
    res.status(500).send('Error al actualizar usuario');
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    await usuario.destroy();
    res.redirect('/admin/usuarios');
  } catch (error) {
    res.status(500).send('Error al eliminar usuario');
  }
};

exports.listarCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.findAll();
    res.render('admin/carreras/list', { carreras });
  } catch (error) {
    res.status(500).send('Error al listar carreras');
  }
};

exports.formCrearCarrera = (req, res) => {
  res.render('admin/carreras/form', { carrera: null });
};

exports.crearCarrera = async (req, res) => {
  try {
    await Carrera.create(req.body);
    res.redirect('/admin/carreras');
  } catch (error) {
    res.status(500).send('Error al crear carrera');
  }
};

exports.formEditarCarrera = async (req, res) => {
  try {
    const carrera = await Carrera.findByPk(req.params.id);
    if (!carrera) return res.status(404).send('Carrera no encontrada');
    res.render('admin/carreras/form', { carrera });
  } catch (error) {
    res.status(500).send('Error al cargar formulario');
  }
};

exports.editarCarrera = async (req, res) => {
  try {
    const carrera = await Carrera.findByPk(req.params.id);
    if (!carrera) return res.status(404).send('Carrera no encontrada');
    await carrera.update(req.body);
    res.redirect('/admin/carreras');
  } catch (error) {
    res.status(500).send('Error al actualizar carrera');
  }
};

exports.eliminarCarrera = async (req, res) => {
  try {
    const carrera = await Carrera.findByPk(req.params.id);
    if (!carrera) return res.status(404).send('Carrera no encontrada');
    await carrera.destroy();
    res.redirect('/admin/carreras');
  } catch (error) {
    res.status(500).send('Error al eliminar carrera');
  }
};

exports.listarProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.findAll();
    res.render('admin/profesores/list', { profesores });
  } catch (error) {
    res.status(500).send('Error al listar profesores');
  }
};

exports.formCrearProfesor = (req, res) => {
  res.render('admin/profesores/form', { profesor: null });
};

exports.crearProfesor = async (req, res) => {
  try {
    await Profesor.create(req.body);
    res.redirect('/admin/profesores');
  } catch (error) {
    res.status(500).send('Error al crear profesor');
  }
};

exports.formEditarProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (!profesor) return res.status(404).send('Profesor no encontrado');
    res.render('admin/profesores/form', { profesor });
  } catch (error) {
    res.status(500).send('Error al cargar formulario');
  }
};

exports.editarProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (!profesor) return res.status(404).send('Profesor no encontrado');
    await profesor.update(req.body);
    res.redirect('/admin/profesores');
  } catch (error) {
    res.status(500).send('Error al actualizar profesor');
  }
};

exports.eliminarProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (!profesor) return res.status(404).send('Profesor no encontrado');
    await profesor.destroy();
    res.redirect('/admin/profesores');
  } catch (error) {
    res.status(500).send('Error al eliminar profesor');
  }
};

exports.listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.render('admin/cursos/list', { cursos });
  } catch (error) {
    res.status(500).send('Error al listar cursos');
  }
};

exports.formCrearCurso = (req, res) => {
  res.render('admin/cursos/form', { curso: null });
};

exports.crearCurso = async (req, res) => {
  try {
    await Curso.create(req.body);
    res.redirect('/admin/cursos');
  } catch (error) {
    res.status(500).send('Error al crear curso');
  }
};

exports.formEditarCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) return res.status(404).send('Curso no encontrado');
    res.render('admin/cursos/form', { curso });
  } catch (error) {
    res.status(500).send('Error al cargar formulario');
  }
};

exports.editarCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) return res.status(404).send('Curso no encontrado');
    await curso.update(req.body);
    res.redirect('/admin/cursos');
  } catch (error) {
    res.status(500).send('Error al actualizar curso');
  }
};

exports.eliminarCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) return res.status(404).send('Curso no encontrado');
    await curso.destroy();
    res.redirect('/admin/cursos');
  } catch (error) {
    res.status(500).send('Error al eliminar curso');
  }
};
