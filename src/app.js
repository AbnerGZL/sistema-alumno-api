import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import alumnoApiRoutes from './routes/alumno.routes.js';
import profesorApiRoutes from './routes/profesor.routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', alumnoApiRoutes);
app.use('/api', profesorApiRoutes);
app.use('/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Modo desarrollador activado');
} else {
  console.log('');
}

// app.use(cors({
//   origin: process.env.ALLOWED_ORIGINS || '*',
//   methods: process.env.CORS_METHODS || 'GET',
// }));

export default app;