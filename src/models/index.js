import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

import defineTipoUsuario from './tipousuario.js';
import defineUsuario from './usuario.js';
import defineProfesor from './profesor.js';
import defineEstudiante from './estudiante.js';
import defineCarrera from './carrera.js';
import defineCurso from './curso.js';
import defineMatricula from './matricula.js';
import defineAsistencia from './asistencia.js';
import defineNota from './nota.js';
import definePago from './pago.js';
import defineCronograma from './cronograma.js';
import NotaDetalle from './NotaDetalle.js';


const models = {
  TipoUsuario: defineTipoUsuario(sequelize, DataTypes),
  Usuario: defineUsuario(sequelize, DataTypes),
  Profesor: defineProfesor(sequelize, DataTypes),
  Estudiante: defineEstudiante(sequelize, DataTypes),
  Carrera: defineCarrera(sequelize, DataTypes),
  Curso: defineCurso(sequelize, DataTypes),
  Cronograma: defineCronograma(sequelize, DataTypes),
  Matricula: defineMatricula(sequelize, DataTypes),
  Asistencia: defineAsistencia(sequelize, DataTypes),
  Nota: defineNota(sequelize, DataTypes),
  Pago: definePago(sequelize, DataTypes),
  NotaDetalle: NotaDetalle(sequelize, DataTypes),
};

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

models.TipoUsuario.hasMany(models.Usuario, { foreignKey: 'ID_TIPO' });
models.Usuario.belongsTo(models.TipoUsuario, { foreignKey: 'ID_TIPO' });

models.Usuario.hasOne(models.Profesor, { foreignKey: 'ID_USUARIO' });
models.Estudiante.belongsTo(models.Usuario, { foreignKey: 'ID_USUARIO' });

models.Usuario.hasOne(models.Estudiante, { foreignKey: 'ID_USUARIO' });
models.Profesor.belongsTo(models.Usuario, { foreignKey: 'ID_USUARIO' });

models.Profesor.hasMany(models.Curso, { foreignKey: 'ID_PROFESOR' });
models.Curso.belongsTo(models.Profesor, { foreignKey: 'ID_PROFESOR' });

models.Carrera.hasMany(models.Matricula, { foreignKey: 'ID_CARRERA' });
models.Matricula.belongsTo(models.Carrera, { foreignKey: 'ID_CARRERA' });

models.Matricula.hasMany(models.Cronograma, { foreignKey: 'ID_MATRICULA' });
models.Cronograma.belongsTo(models.Matricula, { foreignKey: 'ID_MATRICULA' });

models.Curso.hasMany(models.Cronograma, { foreignKey: 'ID_CURSO' });
models.Cronograma.belongsTo(models.Curso, { foreignKey: 'ID_CURSO' });

models.Cronograma.hasMany(models.Asistencia, { foreignKey: 'ID_CRONOGRAMA' });
models.Asistencia.belongsTo(models.Cronograma, { foreignKey: 'ID_CRONOGRAMA' });

models.Cronograma.hasMany(models.Nota, { foreignKey: 'ID_CRONOGRAMA' });
models.Nota.belongsTo(models.Cronograma, { foreignKey: 'ID_CRONOGRAMA' });

models.Profesor.hasMany(models.Cronograma, { foreignKey: 'ID_PROFESOR' });
models.Cronograma.belongsTo(models.Profesor, { foreignKey: 'ID_PROFESOR' });

models.Estudiante.hasMany(models.Matricula, { foreignKey: 'ID_ESTUDIANTE' });
models.Matricula.belongsTo(models.Estudiante, { foreignKey: 'ID_ESTUDIANTE' });

models.Nota.hasMany(models.NotaDetalle, { foreignKey: 'ID_NOTA' });
models.NotaDetalle.belongsTo(models.Nota, { foreignKey: 'ID_NOTA' });

models.Matricula.hasOne(models.Pago, { foreignKey: 'ID_MATRICULA' });
models.Pago.belongsTo(models.Matricula, { foreignKey: 'ID_MATRICULA' });


export {
  sequelize,
  models,
  // Si quieres exportar cada modelo individualmente:
  // ...models
};
