import { where } from "sequelize";
import bcrypt from "bcryptjs";
import { models } from "../models/index.js";
import nota from "../models/nota.js";

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
    const content = await Estudiante.findAll({
      include: [
        {
          model: models.Usuario,
          attributes: ["CODIGOU"]
        }
      ]      
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
    const { ciclo } = req.query;

    const usuario = await Usuario.findOne({
      where: { CODIGOU: req.params.id }    
    });

    
    if (!usuario) {
      return res.json({ message: "Código de usuario no válido" });
    }
    
    const estudiante = await Estudiante.findAll({
      where: { ID_USUARIO: usuario.ID_USUARIO },
      include: [
        {
          model: models.Usuario,
          attributes: ["CODIGOU"],
        },
        {
          model: models.Matricula,
          where: ciclo ? {CICLO: ciclo} : {ESTADO: 'VIGENTE'},
          // attributes: ['CICLO'],
          include:[{
            model: models.Carrera,
            attributes:['NOMBRE']
          }]
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
    const { ciclo } = req.query;
    
    const estudiante = await models.Estudiante.findOne({
      include: [{
        model: models.Usuario,
        where: {CODIGOU: req.params.id}
      },
      {
        model: models.Matricula,
        where: ciclo ? {CICLO: ciclo} : {ESTADO: 'VIGENTE'},
      }
    ]
    });

    const cursos = await models.Cronograma.findAll({
      where: {ID_MATRICULA: estudiante.MATRICULAs[0].ID_MATRICULA},
      include: [{
        model: models.Curso,
        include: [{
          model: models.Profesor
        }]
      }]
    });    

    if (!cursos || cursos.length === 0) {
      return res.json({ message: "No se encontró ningún curso" });
    }

    res.json(cursos);
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
    const { NotaDetalle } = models;
    // const { userId, cursoId } = req.query;
    
    const estudiante = await models.Estudiante.findOne({
      include: [{
        model: models.Usuario,
        where: {CODIGOU: req.params.id}
      },
      {
        model: models.Matricula,
        where: {ESTADO: 'VIGENTE'},
      }
    ]
    });

    const notas = await models.Cronograma.findAll({
      where: {ID_MATRICULA: estudiante.MATRICULAs[0].ID_MATRICULA},
      include: [{
        model: models.Nota
      },
      {
        model: models.Curso
      },
      {
        model: models.Profesor
      }
    ]
    });
    // // return res.json(estudiante);

    // const cronograma = await models.Cronograma.findOne({
    //   include: [{
    //       model: models.Curso,
    //       where: {CODIGOCU: cursoId},
    //   },
    //   {
    //       model: models.Matricula,
    //       where: {ID_MATRICULA: estudiante.MATRICULAs[0].ID_MATRICULA}
    //   }
    // ]
    // })
    
    // // return res.json(cronograma)

    // const notas = await models.Cronograma.findOne({
    //   where: { ID_CRONOGRAMA: cronograma.ID_CRONOGRAMA},
    //   include: [
    //     {
    //       model: models.Nota,
    //       order: [
    //         ['FECHA_ACTUALIZACION', 'DESC']
    //       ],
    //       include: [{
    //         model: models.NotaDetalle
    //       }]
    //     },
    //     {
    //       model: models.Curso
    //     }
    //   ]
    // });
    
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


const asistenciaPorId = async (req, res) => {
  try {
    const { ciclo } = req.query;

    const estudiante = await models.Estudiante.findOne({
      include:[{
        model: models.Usuario,
        where: {CODIGOU: req.params.id}
      },
      {
        model: models.Matricula,
        where: ciclo ? {CICLO: ciclo} : {ESTADO: 'VIGENTE'}
      }
    ]
    })
    // return res.json(estudiante);
    const asistencias = await models.Cronograma.findAll({
      where: {ID_MATRICULA: estudiante.MATRICULAs[0].ID_MATRICULA},
      include: [{
        model: models.Curso,
      },
      {
        model: models.Asistencia,
        order: [['FECHA', 'ASC']],
      }
    ]
    })

    if (!asistencias || asistencias.length === 0) {
      return res.json({ message: "No se encontró asistencia" });
    }

    res.json(asistencias);

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