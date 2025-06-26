import { where } from "sequelize";
import { models } from "../models/index.js";
import usuario from "../models/usuario.js";
import matricula from "../models/matricula.js";

/**
 * Controlador para manejar las operaciones relacionadas con el alumno.
 * @module controllers/alumno.controller.js
 * @requires models - Modelos de la base de datos.
 * @requires express - Framework para manejar las rutas y respuestas HTTP.
 */

const profesores = async (req, res) => {
  try {
    const { Profesor } = models;
    const content = await Profesor.findAll({
      include: [
        {
          model: models.Usuario,
          attributes: ["CODIGOU"]
        }
      ]
    });

    if (!content || content.length === 0) {
      return res.json({ message: "No se encontraron profesores" });
    }
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
    }
};

const profesorPorId = async (req, res) => {
  try {
    const { Profesor, Usuario } = models;

    const codigo = Usuario.findAll({
      where: { CODIGOU: req.params.id }
    });    
    const content = await Profesor.findAll({
        where: { ID_PROFESOR: codigo.ID_PROFESOR }
    });
    if (!content || content.length === 0) {
        return res.json({ message: "No se encontró profesor" });
    }
    res.json(content);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

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
    const { profesor, curso} = req.query;
    if (curso){
      var idCurso = await models.Curso.findOne({
        where: {CODIGOCU: curso}
      });
      const content = await Estudiante.findAll({
        include: [
          {
            model: models.Matricula,
            where: {ESTADO: "VIGENTE"},
            include: [{
              model: models.Asistencia,
              where: {ID_CURSO: idCurso.ID_CURSO},
            }]
          }
        ]         
      });
      return res.json(content);
    }
    if (profesor){
      var idProfesor = await models.Profesor.findOne({
        include: [{
          model: models.Usuario,
          where: {CODIGOU: profesor}
        }],
      });
      const content = await Estudiante.findAll({
        include: [
          {
            model: models.Matricula,
            where: {ESTADO: "VIGENTE"},
            include: [{
              model: models.Asistencia,
              where: {ID_PROFESOR: idProfesor.ID_PROFESOR},
            }]
          }
        ]         
      });
      return res.json(content);
    }    

    const content = await Estudiante.findAll({
      include: [
        {
          model: models.Usuario,
          attributes: ["CODIGOU"],
        }
      ],
    });



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
    });

    if (!usuario) {
      return res.json({ message: "Código de usuario no válido" });
    }

    const estudiante = await Estudiante.findAll({
      where: { ID_ESTUDIANTE: usuario.ID_USUARIO },
      include: [
        {
          model: models.Usuario,
          attributes: ["CODIGOU"]
        }
      ]       
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

    const matricula = await models.Usuario.findOne({
      where:{CODIGOU: req.params.id},
      include: [{
        model: models.Estudiante,
        include: [{
          model: models.Matricula,
          where: {ESTADO: "VIGENTE"}
        }]
      }]
    });

    const notas = await Nota.findAll({
      where: { ID_MATRICULA: matricula.ESTUDIANTE.MATRICULAs[0].ID_MATRICULA },
      include: [
        {
          model: models.NotaDetalle,
        }
      ]
    });

    if (!notas || notas.length === 0) {
      return res.json({ message: "No se encontraron notas" });
    }

    res.json(notas);
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


const asistenciasPorId = async (req, res) => {
  try {
    const { Asistencia } = models;
    const { idcurso, idprofesor } = req.query;

    const curso = await models.Curso.findOne({
      where: { CODIGOCU: idcurso }
    });

    const codigou = await models.Usuario.findOne({
      where: {CODIGOU: idprofesor}
    });

    const profesor = await models.Profesor.findOne({
      where: { ID_USUARIO: codigou.ID_USUARIO }
    });

    if (!curso) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    if (!profesor) {
      return res.status(400).json({ message: "ID del profesor es requerido" });
    }

    const content = await Asistencia.findAll({
      where: { ID_CURSO: curso.ID_CURSO, ID_PROFESOR: profesor.ID_PROFESOR },
      include: [
        {
          model: models.Matricula,
          // where: {ESTADO: "VIGENTE"},
          include: [
            {
              model: models.Estudiante,
              attributes: ["NOMBRES", "APELLIDOS"]
            }
          ]
        }
      ]
    });

    // if (!content || content.length === 0) {
    //   return res.json({ message: "No se encontró asistencia" });
    // }

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

const cargarNotas = async (req, res) => {
  try {
    const { Nota } = models;
    const { NotaDetalle } = models;
    const { CODIGOU, CODIGOCU, TEORIA, PRACTICA } = req.body;

    if (!CODIGOU && !CODIGOCU) {
      return res.json({ message: "Datos incompletos" });
    }

    const curso = await models.Curso.findOne({
      where: {CODIGOCU: CODIGOCU}
    });

    const matricula = await models.Usuario.findOne({
      where: {CODIGOU: CODIGOU},
      include: [{
        model: models.Estudiante,
        include: [{
          model: models.Matricula,
          where: {ESTADO: "VIGENTE"}
        }]
      }]
    });

    const notaExistente = await Nota.findOne({
      where: { ID_MATRICULA: matricula.ESTUDIANTE.MATRICULAs[0].ID_MATRICULA, ID_CURSO: curso.ID_CURSO }
    });

    if (!notaExistente) {
      return res.status(400).json({ message: "Este curso no cuenta con espacio para cargar notas" });
    }

    const nuevaNota = await NotaDetalle.create({
      ID_NOTA: notaExistente.ID_NOTA,
      TEORIA: TEORIA,
      PRACTICA: PRACTICA,
      FECHA: new Date(),
      ESTATUS: true
    });

    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const cargarAsistencia = async (req, res) => {
  try {
    const { Asistencia } = models;
    const { ID_MATRICULA, ID_PROFESOR, ID_CURSO, FECHA, ESTADO} = req.body;

    if (!ID_MATRICULA) {
      return res.json({ message: "Datos incompletos" });
    }

    const nuevaAsistencia = await Asistencia.bulkcreate(req.body);

    res.status(201).json(nuevaAsistencia);
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
  asistenciasPorId,
  carreras,
  carreraPorId,
  profesores,
  profesorPorId,
  cargarNotas,
  cargarAsistencia
};