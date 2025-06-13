const { Usuario, TipoUsuario } = require('../models');
const bcrypt = require('bcryptjs');

exports.formLogin = (req, res) => {
  res.render('admin/login', { error: null });
};

exports.login = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({
      where: { email },
      include: [{ model: TipoUsuario }]
    });

    if (!usuario) {
      return res.render('admin/login', { error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordMatch) {
      return res.render('admin/login', { error: 'Contraseña incorrecta' });
    }

    if (usuario.TipoUsuario.nombre !== 'admin') {
      return res.render('admin/login', { error: 'No tienes permisos para acceder' });
    }

    req.session.user = {
      id: usuario.id_usuario,
      email: usuario.email,
      tipo: usuario.TipoUsuario.nombre
    };

    res.redirect('/admin/dashboard');
  } catch (error) {
    res.render('admin/login', { error: 'Error en el servidor' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};
