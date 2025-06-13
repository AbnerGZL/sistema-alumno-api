const bcrypt = require('bcryptjs');
const { Usuario, TipoUsuario, sequelize } = require('../models');

async function createAdminUser() {
  try {
    await sequelize.sync();

    let adminTipo = await TipoUsuario.findOne({ where: { nombre: 'admin' } });
    if (!adminTipo) {
      adminTipo = await TipoUsuario.create({ nombre: 'admin', estatus: true });
      console.log('TipoUsuario admin creado');
    }

    let adminUser = await Usuario.findOne({ where: { email: 'admin@example.com' } });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await Usuario.create({
        email: 'admin@example.com',
        contraseña: hashedPassword,
        id_tipo: adminTipo.id_tipo,
        nombre: 'Administrador',
        estatus: true,
        codigou: 'admin01',
        dni: '00000000'
      });
      console.log('Usuario administrador creado con email admin@example.com y contraseña admin123');
    } else {
      console.log('Usuario administrador ya existe');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creando usuario administrador:', error);
    process.exit(1);
  }
}

createAdminUser();
