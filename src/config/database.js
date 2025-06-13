const { Sequelize } = require('sequelize');
require('dotenv').config();

const sqliteConfig = {
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
};

const postgresConfig = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false
  }
};

const config = process.env.NODE_ENV === 'production' ? postgresConfig : sqliteConfig;

const sequelize = new Sequelize(config);

(async () => {
  try {
    await sequelize.authenticate();
    console.log(process.env.NODE_ENV === 'production' ? 'Conexión a PostgreSQL establecida' : 'Conexión a SQLite establecida');
    
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ force: true });
      console.log('Modelos sincronizados con la base de datos');
    }
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
})();

module.exports = sequelize;
