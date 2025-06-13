const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'tu_secreto_de_sesion',
  resave: false,
  saveUninitialized: false
}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profesores', require('./routes/profesorRoutes'));
app.use('/api/cursos', require('./routes/cursoRoutes'));

app.use('/admin', require('./routes/adminAuthRoutes'));

app.use('/admin', require('./routes/adminRoutes'));

app.use((err, req, res, next) => {
  console.error('Error capturado en middleware:', err);
  if (req.accepts('html')) {
    res.status(500).render('error', { error: err });
  } else {
    res.status(500).json({ error: 'Error interno del servidor', details: err.message });
  }
});

module.exports = app;
