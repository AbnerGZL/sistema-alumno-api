const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, TipoUsuario } = require('../models');

const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    
    const usuario = await Usuario.findOne({ 
      where: { email },
      include: [TipoUsuario]
    });

    if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, tipo: usuario.TipoUsuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      token,
      tipoUsuario: usuario.TipoUsuario.nombre
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login
};