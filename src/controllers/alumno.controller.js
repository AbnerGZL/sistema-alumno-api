import { models } from "../models/index.js";

/**
 * Controlador para manejar las operaciones relacionadas con el alumno.
 * @module controllers/alumno.controller.js
 * @requires models - Modelos de la base de datos.
 * @requires express - Framework para manejar las rutas y respuestas HTTP.
 */

const matriculas = async (req, res) => {
  try {
    const { Matricula } = models;
    const content = await Matricula.findAll();

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontraron matrículas" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const matriculaPorId = async (req, res) => {
  try {
    const { Matricula } = models;
    const content = await Matricula.findAll({
      where: { ID_MATRICULA: req.params.id }
    });

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontró matrícula" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const alumnos = async (req, res) => {
  try {
    const { Estudiante } = models;
    const content = await Estudiante.findAll();

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontraron alumnos" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const alumnoPorId = async (req, res) => {
  try {
    const { Estudiante, Usuario } = models;

    const usuario = await Usuario.findOne({
      where: { CODIGOU: req.params.id }
    });

    if (!usuario) {
      return res.json({ message: "Código de usuario no válido" });
    }

    const estudiante = await Estudiante.findAll({
      where: { ID_ESTUDIANTE: usuario.ID_USUARIO }
    });

    if (!estudiante || estudiante.length === 0) {
      return res.json({ message: "No se encontró ningún alumno" });
    }

    res.json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const cursos = async (req, res) => {
  try {
    const { Curso } = models;
    const content = await Curso.findAll();

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontraron cursos" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const cursoPorId = async (req, res) => {
  try {
    const { Curso } = models;
    const content = await Curso.findAll({
      where: { CODIGOCU: req.params.id }
    });

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontró ningún curso" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const notas = async (req, res) => {
  try {
    const { Nota } = models;
    const content = await Nota.findAll();

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontraron notas" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const notasPorId = async (req, res) => {
  try {
    const { Nota } = models;

    const notas = await Nota.findAll({
      where: { ID_MATRICULA: req.params.id },
      include: [
        {
          model: models.NotaDetalle, // usa alias si lo definiste
        }
      ]
    });

    if (!notas || notas.length === 0) {
      return res.json({ message: "No se encontraron notas" });
    }

    const resultado = notas.map(nota => ({
      ID_NOTA: nota.ID_NOTA,
      ID_MATRICULA: nota.ID_MATRICULA,
      PROMEDIOT: nota.PROMEDIOT,
      PROMEDIOP: nota.PROMEDIOP,
      FECHA_CREACION: nota.FECHA_CREACION,
      FECHA_MODIFICACION: nota.FECHA_ACTUALIZACION,
      NOTAS: nota.NotaDetalles // usa el nombre exacto según el alias o la relación
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const asistencias = async (req, res) => {
  try {
    const { Asistencia } = models;
    const content = await Asistencia.findAll();

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontraron asistencias" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};


const asistenciaPorId = async (req, res) => {
  try {
    const { Asistencia } = models;
    const content = await Asistencia.findAll({
      where: { ID_MATRICULA: req.params.id }
    });

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontró asistencia" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const carreras = async (req, res) => {
  try {
    const { Carrera } = models;
    const content = await Carrera.findAll();

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontraron carreras" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const carreraPorId = async (req, res) => {
  try {
    const { Carrera } = models;
    const content = await Carrera.findOne({
      where: { ID_CARRERA: req.params.id }
    });

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontró carrera" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const pagos = async (req, res) => {
  try {
    const { Pago } = models;
    const content = await Pago.findAll();

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontraron pagos" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const pagoPorId = async (req, res) => {
  try {
    const { Pago } = models;
    const content = await Pago.findOne({
      where: { ID_MATRICULA: req.params.id }
    });

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontró pago" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

export default {
  matriculas,
  alumnos,
  alumnoPorId,
  matriculaPorId,
  cursos,
  cursoPorId,
  notas,
  notasPorId,
  asistencias,
  asistenciaPorId,
  carreras,
  carreraPorId,
  pagos,
  pagoPorId
};