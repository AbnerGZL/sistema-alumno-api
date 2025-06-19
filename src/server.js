import 'dotenv/config';
import app from './app.js';
import { sequelize } from './models/index.js';

const PORT = process.env.PORT || 4000;

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a PostgreSQL establecida');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`API corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });