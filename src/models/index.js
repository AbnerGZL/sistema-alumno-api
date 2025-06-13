const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const models = {
  TipoUsuario: require('./tipousuario')(sequelize, DataTypes),
  Usuario: require('./usuario')(sequelize, DataTypes),
  Profesor: require('./profesor')(sequelize, DataTypes),
  Estudiante: require('./estudiante')(sequelize, DataTypes),
  Carrera: require('./carrera')(sequelize, DataTypes),
  Curso: require('./curso')(sequelize, DataTypes),
  Matricula: require('./matricula')(sequelize, DataTypes),
  Asistencia: require('./asistencia')(sequelize, DataTypes),
  Nota: require('./nota')(sequelize, DataTypes),
  Pago: require('./pago')(sequelize, DataTypes),
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

module.exports = {
  sequelize,
  ...models
};
