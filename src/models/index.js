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
import NotaDetalle from './NotaDetalle.js';


const models = {
  TipoUsuario: defineTipoUsuario(sequelize, DataTypes),
  Usuario: defineUsuario(sequelize, DataTypes),
  Profesor: defineProfesor(sequelize, DataTypes),
  Estudiante: defineEstudiante(sequelize, DataTypes),
  Carrera: defineCarrera(sequelize, DataTypes),
  Curso: defineCurso(sequelize, DataTypes),
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

models.Usuario.belongsTo(models.TipoUsuario, { foreignKey: 'ID_TIPO' });
models.Profesor.hasOne(models.Usuario, { foreignKey: 'ID_USUARIO' });
models.Estudiante.hasOne(models.Usuario, { foreignKey: 'ID_USUARIO' });
models.Curso.belongsTo(models.Profesor, { foreignKey: 'ID_PROFESOR' });
models.Matricula.belongsTo(models.Carrera, { foreignKey: 'ID_CARRERA' });
models.Matricula.belongsTo(models.Estudiante, { foreignKey: 'ID_ESTUDIANTE' });
models.Asistencia.belongsTo(models.Matricula, { foreignKey: 'ID_MATRICULA' });
models.Asistencia.belongsTo(models.Curso, { foreignKey: 'ID_CURSO' });
models.Asistencia.belongsTo(models.Profesor, { foreignKey: 'ID_PROFESOR' });
models.Nota.belongsTo(models.Matricula, { foreignKey: 'ID_MATRICULA' });
models.Nota.belongsTo(models.Curso, { foreignKey: 'ID_CURSO' });

models.Nota.hasMany(models.NotaDetalle, { foreignKey: 'ID_NOTA' });
models.Pago.hasOne(models.Matricula, { foreignKey: 'ID_MATRICULA' });

models.NotaDetalle.belongsTo(models.Nota, { foreignKey: 'ID_NOTA' });

export {
  sequelize,
  models,
  // Si quieres exportar cada modelo individualmente:
  // ...models
};
