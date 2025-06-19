export default (sequelize, DataTypes) => {
  const Pago = sequelize.define('Pago', {
    id_pago: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_matricula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'matriculas',
        key: 'id_matricula'
      }
    },
    fecha_pago: {
      type: DataTypes.DATE,
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    formato: {
      type: DataTypes.STRING(45)
    },
    recibo: {
      type: DataTypes.STRING(45)
    },
    observacion: {
      type: DataTypes.STRING(100)
    },
    estatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'pagos',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  });

  return Pago;
};