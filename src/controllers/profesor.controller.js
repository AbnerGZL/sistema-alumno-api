import { where, fn, col } from "sequelize";
import { models } from "../models/index.js";

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

    const codigo = await Usuario.findOne({
      where: { CODIGOU: req.params.id },
    });

    // return res.json(codigo);
    const content = await Profesor.findOne({
      where: { ID_USUARIO: codigo.ID_USUARIO },
      include: [
        {
          model: models.Usuario,
          attributes: ["CODIGOU"],
        },
      ]
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
    const { idprofesor, idcurso } = req.params;
    

    const profesor = await models.Profesor.findOne({
      include: [{
        model: models.Usuario,
        where: {CODIGOU: idprofesor}
      }]
    });

    const curso = await models.Curso.findOne({
      where: {CODIGOCU: idcurso}
    })
    

    if (!profesor && !curso) {
      return res.json({ message: "Profesor y curso no encontrados" });
    }

    const estudiantes = await models.Cronograma.findAll({
      where: {ID_PROFESOR:profesor.ID_PROFESOR, ID_CURSO: curso.ID_CURSO},
      include: [{
        model: models.Matricula,
        where: {ESTADO: 'VIGENTE'},
        include: [{
          model: models.Estudiante
        }]
      },
      {
        model: models.Curso
      }
    ]
    })

    if (!estudiantes || estudiantes.length === 0) {
      return res.json({ message: "No se encontró ningún alumno" });
    }

    res.json(estudiantes);
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
    const profesor = await models.Profesor.findOne({
      include: [{
        model: models.Usuario,
        where: {CODIGOU: req.params.id}
      }]
    });

    if (!profesor || profesor.length === 0) {
      return res.json({ message: "No se encontró ningún profesor" });
    }    
    
    const cursos = await models.Cronograma.findAll({
      where: {
        ID_PROFESOR: profesor.ID_PROFESOR
      },
      attributes: [
        'ID_CURSO',
        'ID_PROFESOR',
        [fn('COUNT', col('MATRICULA.ID_MATRICULA')), 'MATRICULAS']
      ],
      include: [
        {
          model: models.Matricula,
          attributes: [],
          where: { ESTADO: 'VIGENTE' },
          required: false
        },
        {
          model: models.Curso,
          // attributes: ['NOMBRE', 'CODIGOCU']
        }
      ],
      group: ['CRONOGRAMA.ID_CURSO', 'CURSO.ID_CURSO', 'CRONOGRAMA.ID_PROFESOR']
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
    const { idprofesor, idcurso} = req.params;
    // console.log(idcurso);
    // console.log(idprofesor);
    const profesor = await models.Profesor.findOne({
      include: [{
        model: models.Usuario,
        where: {CODIGOU: idprofesor}
      }]
    });

    if (!profesor || profesor.length === 0) {
      return res.json({ message: "No se encontó al docente" });
    }

    const curso = await models.Curso.findOne({
      where: {CODIGOCU: idcurso}
    });

    if (!curso || curso.length === 0) {
      return res.json({ message: "No se encontró el curso" });
    }    

    const cronograma = await models.Cronograma.findAll({
      where: {ID_PROFESOR: profesor.ID_PROFESOR, ID_CURSO: curso.ID_CURSO},
      include: [{
        model: models.Nota,
        order: ['FECHA_ACTUALIZACION', 'DESC']
      },
      {
        model: models.Matricula,
        where: {ESTADO: 'VIGENTE'},
        include: [{
          model: models.Estudiante,
          attributes: ['NOMBRES', 'APELLIDOS','DNI']
        }]
      }
    ]
    });

    if (!cronograma || cronograma.length === 0) {
      return res.json({ message: "No se encontraron notas" });
    }

    res.json(cronograma);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};


const detallesPorNota = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length === 0) {
      return res.json({ message: "No se proporionó la unidad" });
    }

    const notas = await models.Nota.findOne({
      where: {ID_NOTA: id},
      include: [{
        model: models.NotaDetalle
      }]
    });

    if (!notas || notas.length === 0) {
      return res.json({ message: "No se encontraron detalles" });
    }

    res.json(notas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const notasPorAlumno = async (req, res) => {
  try {
    const { idalumno, idcurso} = req.params;

    const cronograma = await models.Cronograma.findOne({
      where: {ID_MATRICULA: idalumno},
      include: [{
        model: models.Nota,
        order: ['FECHA_ACTUALIZACION', 'DESC']
      },
      {
        model: models.Curso,
        where: {CODIGOCU: idcurso},
      },
      {
        model: models.Matricula,
        include: [{
          model: models.Estudiante,
          include: [{
            model: models.Usuario,
            attributes: ['CODIGOU']
          }]
        },
        {
          model: models.Carrera,
          attributes: ['NOMBRE']
        }
      ]
      }
    ]
    });
    if (!cronograma || cronograma.length === 0) {
      return res.json({ message: "No se encontro registro del estudiante o sus notas" });
    }
    return res.json(cronograma);
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


const asistenciaPorCurso = async (req,res) => {
    try {
    const { Nota } = models;
    const { idprofesor, idcurso} = req.params;

    const profesor = await models.Profesor.findOne({
      include: [{
        model: models.Usuario,
        where: {CODIGOU: idprofesor}
      }]
    });

    if (!profesor || profesor.length === 0) {
      return res.json({ message: "No se encontó al docente" });
    }

    const curso = await models.Curso.findOne({
      where: {CODIGOCU: idcurso}
    });

    if (!curso || curso.length === 0) {
      return res.json({ message: "No se encontró el curso" });
    }

    const asistencias = await models.Asistencia.findAll({
      include: [
        {
          model: models.Cronograma,
          where: {ID_PROFESOR: profesor.ID_PROFESOR, ID_CURSO: curso.ID_CURSO},
          attributes: ['ID_MATRICULA'],
          required: true,
          include: [{
            model: models.Matricula,
            attributes: ['ID_ESTUDIANTE'],
            include: [{
              model: models.Estudiante
            }]
          },
          {
            model: models.Curso
          }
        ]
        }
      ],
      order: [['FECHA', 'ASC']]
    });

    // Agrupar por fecha
    const agrupadoPorFecha = Object.values(
      asistencias.reduce((acc, asistencia) => {
        const fechaKey = asistencia.FECHA.toISOString().split('T')[0];

        if (!acc[fechaKey]) {
          acc[fechaKey] = {
            FECHA: fechaKey,
            ASISTENCIAS: []
          };
        }

        acc[fechaKey].ASISTENCIAS.push(asistencia);

        return acc;
      }, {})
    );

    if (!asistencias || asistencias.length === 0) {
      return res.json({ message: "No se encontraron asistencias" });
    }

    res.json(agrupadoPorFecha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
}


const asistenciaPorId = async (req, res) => {
  try {
    const { ciclo } = req.query;

    const profesor = await models.Profesor.findOne({
      include:[{
        model: models.Usuario,
        where: {CODIGOU: req.params.id}
      }
    ]
    });
    // return res.json(profesor);
    // return res.json(estudiante);
    const asistencias = await models.Cronograma.findAll({
      where: {ID_PROFESOR: profesor.ID_PROFESOR},
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

const calcularPromedios = async (idNota) => {
  const [promediot, promediop] = await Promise.all([
    models.NotaDetalle.findOne({
      where: { ID_NOTA: idNota },
      attributes: [[fn('AVG', col('TEORIA')), 'avg_teoria']],
      raw: true
    }),
    models.NotaDetalle.findOne({
      where: { ID_NOTA: idNota },
      attributes: [[fn('AVG', col('PRACTICA')), 'avg_practica']],
      raw: true
    })
  ]);

  return models.Nota.update({
    PROMEDIOT: parseFloat(promediot.avg_teoria || 0),
    PROMEDIOP: parseFloat(promediop.avg_practica || 0)
  }, {
    where: { ID_NOTA: idNota }
  });
};

const cargarNotas = async (req, res) => {
  try {
    const { MATRICULA, CODIGOCU, TEORIA, PRACTICA, UNIDAD, TIPO } = req.body;

    if (!MATRICULA || !CODIGOCU) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const cronograma = await models.Cronograma.findOne({
      where: { ID_MATRICULA: MATRICULA },
      include: [{ model: models.Curso, where: { CODIGOCU } }]
    });

    if (!cronograma) {
      return res.status(400).json({ message: "Este curso no existe" });
    }

    let nota = await models.Nota.findOne({
      where: { ID_CRONOGRAMA: cronograma.ID_CRONOGRAMA, UNIDAD }
    });

    // Si no existe la nota, se crea junto con el primer detalle
    if (!nota) {
      nota = await models.Nota.create({
        ID_CRONOGRAMA: cronograma.ID_CRONOGRAMA,
        PROMEDIOP: TIPO === 'Practica' ? PRACTICA : null,
        PROMEDIOT: TIPO === 'Teoria' ? TEORIA : null,
        UNIDAD,
        ESTATUS: 1
      });

      const detalle = await models.NotaDetalle.create({
        ID_NOTA: nota.ID_NOTA,
        TEORIA: TIPO === 'Teoria' ? TEORIA : null,
        PRACTICA: TIPO === 'Practica' ? PRACTICA : null,
        FECHA: new Date(),
        ESTATUS: 1
      });

      await calcularPromedios(nota.ID_NOTA);
      return res.status(201).json(detalle);
    }

    // Buscar espacios nulos para la unidad correspondiente
    const notaVaciaP = await models.NotaDetalle.findOne({
      where: { ID_NOTA: nota.ID_NOTA, PRACTICA: null },
      order: [['FECHA_ACTUALIZACION', 'ASC']]
    });

    const notaVaciaT = await models.NotaDetalle.findOne({
      where: { ID_NOTA: nota.ID_NOTA, TEORIA: null },
      order: [['FECHA_ACTUALIZACION', 'ASC']]
    });

    // Si ya no hay campos nulos, se crea un nuevo detalle
    if (
      (TIPO === 'Practica' && (!notaVaciaP || notaVaciaP.PRACTICA !== null)) ||
      (TIPO === 'Teoria' && (!notaVaciaT || notaVaciaT.TEORIA !== null))
    ) {
      const nuevoDetalle = await models.NotaDetalle.create({
        ID_NOTA: nota.ID_NOTA,
        TEORIA: TIPO === 'Teoria' ? TEORIA : null,
        PRACTICA: TIPO === 'Practica' ? PRACTICA : null,
        FECHA: new Date(),
        ESTATUS: 1
      });

      await calcularPromedios(nota.ID_NOTA);
      return res.status(201).json(nuevoDetalle);
    }

    // Si existe campo nulo, se actualiza
    if (TIPO === 'Practica' && notaVaciaP) {
      await models.NotaDetalle.update({
        PRACTICA: PRACTICA,
        FECHA_ACTUALIZACION: new Date()
      }, {
        where: { ID_NOTA_DETALLE: notaVaciaP.ID_NOTA_DETALLE }
      });
    }

    if (TIPO === 'Teoria' && notaVaciaT) {
      await models.NotaDetalle.update({
        TEORIA: TEORIA,
        FECHA_ACTUALIZACION: new Date()
      }, {
        where: { ID_NOTA_DETALLE: notaVaciaT.ID_NOTA_DETALLE }
      });
    }

    await calcularPromedios(nota.ID_NOTA);
    return res.status(200).json({ message: "Nota actualizada correctamente" });

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
  asistenciaPorId,
  carreras,
  carreraPorId,
  profesores,
  profesorPorId,
  cargarNotas,
  cargarAsistencia,
  asistenciaPorCurso,
  notasPorAlumno,
  detallesPorNota
};