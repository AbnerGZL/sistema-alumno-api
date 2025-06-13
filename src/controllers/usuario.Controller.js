const { Usuario, TipoUsuario, Profesor, Estudiante } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  async registrarUsuario(req, res) {
    try {
      const { id_tipo, codigou, dni, email, contraseña } = req.body;

      const tipoValido = await TipoUsuario.findByPk(id_tipo);
      if (!tipoValido) {
        return res.status(400).json({ error: 'Tipo de usuario no válido' });
      }

      const hashedPassword = await bcrypt.hash(contraseña, 10);

      const usuario = await Usuario.create({
        id_tipo,
        codigou,
        dni,
        email,
        contraseña: hashedPassword,
        estatus: true
      });

      if (id_tipo === 2) {
        await Profesor.create({
          id_usuario: usuario.id_usuario,
          nombre: req.body.nombre,
          apellidos: req.body.apellidos,
          especialidad: req.body.especialidad,
          estado: 'activo',
          correo: email,
          estatus: true
        });
      } else if (id_tipo === 3) {
        await Estudiante.create({
          id_usuario: usuario.id_usuario,
        });
      }

      res.status(201).json({
        id_usuario: usuario.id_usuario,
        codigou: usuario.codigou,
        email: usuario.email,
        tipo_usuario: tipoValido.nombre
      });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        include: [
          {
            model: TipoUsuario,
            attributes: ['nombre']
          },
          {
            model: Profesor,
            required: false
          },
          {
            model: Estudiante,
            required: false
          }
        ],
        attributes: { exclude: ['contraseña'] }
      });

      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async obtenerUsuario(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id, {
        include: [
          {
            model: TipoUsuario,
            attributes: ['nombre']
          },
          {
            model: Profesor,
            required: false,
            include: ['especialidad']
          },
          {
            model: Estudiante,
            required: false,
            include: ['carrera']
          }
        ],
        attributes: { exclude: ['contraseña'] }
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      let response = {
        ...usuario.toJSON(),
        perfil: null
      };

      if (usuario.id_tipo === 2 && usuario.Profesor) {
        response.perfil = {
          tipo: 'profesor',
          datos: usuario.Profesor
        };
      } else if (usuario.id_tipo === 3 && usuario.Estudiante) {
        response.perfil = {
          tipo: 'estudiante',
          datos: usuario.Estudiante
        };
      }

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async actualizarUsuario(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      if (req.body.contraseña) {
        req.body.contraseña = await bcrypt.hash(req.body.contraseña, 10);
      }

      await usuario.update(req.body);

      if (usuario.id_tipo === 2) {
        const profesor = await Profesor.findOne({ where: { id_usuario: usuario.id_usuario } });
        if (profesor) {
          await profesor.update({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            especialidad: req.body.especialidad
          });
        }
      } else if (usuario.id_tipo === 3) {
      }

      res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async desactivarUsuario(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      await usuario.update({ estatus: false });

      if (usuario.id_tipo === 2) {
        await Profesor.update({ estatus: false }, { where: { id_usuario: usuario.id_usuario } });
      } else if (usuario.id_tipo === 3) {
      }

      res.json({ message: 'Usuario desactivado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async listarUsuariosPorTipo(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        where: { id_tipo: req.params.tipoId },
        include: [
          {
            model: TipoUsuario,
            attributes: ['nombre']
          }
        ],
        attributes: { exclude: ['contraseña'] }
      });

      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};