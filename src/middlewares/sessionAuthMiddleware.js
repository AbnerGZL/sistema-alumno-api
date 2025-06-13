module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    next();
  } else {
    if (req.accepts('html')) {
      return res.redirect('/admin/login');
    }
    res.status(401).json({ error: 'Acceso no autorizado' });
  }
};
