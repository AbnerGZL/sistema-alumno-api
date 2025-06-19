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
};

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

models.Usuario.belongsTo(models.TipoUsuario, { foreignKey: 'id_tipo' });
models.Profesor.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
models.Curso.belongsTo(models.Profesor, { foreignKey: 'id_profesor' });
models.Matricula.belongsTo(models.Carrera, { foreignKey: 'id_carrera' });
models.Asistencia.belongsTo(models.Matricula, { foreignKey: 'id_matricula' });
models.Asistencia.belongsTo(models.Curso, { foreignKey: 'id_curso' });
models.Nota.belongsTo(models.Matricula, { foreignKey: 'id_matricula' });
models.Nota.belongsTo(models.Curso, { foreignKey: 'id_curso' });
models.Pago.belongsTo(models.Matricula, { foreignKey: 'id_matricula' });

export {
  sequelize,
  models,
  // Si quieres exportar cada modelo individualmente:
  // ...models
};
