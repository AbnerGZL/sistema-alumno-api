import express from 'express';
import session from 'express-session';

import authRoutes from './routes/authRoutes.js';
import alumnoApiRoutes from './routes/alumno.routes.js';
import profesorApiRoutes from './routes/profesor.routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'tu_secreto_de_sesion',
    resave: false,
    saveUninitialized: false
}));

app.use('/api', alumnoApiRoutes);
app.use('/api', profesorApiRoutes);
app.use('/auth', authRoutes);

export default app;