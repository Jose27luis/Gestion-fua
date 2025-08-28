const { Sequelize } = require('sequelize');
const config = require('../config/database');
const logger = require('../utils/logger');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Crear instancia de Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    define: dbConfig.define,
    timezone: dbConfig.timezone
  }
);

// Importar modelos
const Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);
const Persona = require('./Persona')(sequelize, Sequelize.DataTypes);
const EstablecimientoSalud = require('./EstablecimientoSalud')(sequelize, Sequelize.DataTypes);
const AseguradoSis = require('./AseguradoSis')(sequelize, Sequelize.DataTypes);
const PersonalSalud = require('./PersonalSalud')(sequelize, Sequelize.DataTypes);
const Servicio = require('./Servicio')(sequelize, Sequelize.DataTypes);
const Fua = require('./Fua')(sequelize, Sequelize.DataTypes);
const FuaDiagnostico = require('./FuaDiagnostico')(sequelize, Sequelize.DataTypes);
const FuaProcedimiento = require('./FuaProcedimiento')(sequelize, Sequelize.DataTypes);
const FuaMedicamento = require('./FuaMedicamento')(sequelize, Sequelize.DataTypes);
const FuaInsumo = require('./FuaInsumo')(sequelize, Sequelize.DataTypes);
const FuaSmi = require('./FuaSmi')(sequelize, Sequelize.DataTypes);
const FuaRecienNacido = require('./FuaRecienNacido')(sequelize, Sequelize.DataTypes);
const DiagnosticoCie10 = require('./DiagnosticoCie10')(sequelize, Sequelize.DataTypes);
const ProcedimientoCpms = require('./ProcedimientoCpms')(sequelize, Sequelize.DataTypes);
const Medicamento = require('./Medicamento')(sequelize, Sequelize.DataTypes);
const Insumo = require('./Insumo')(sequelize, Sequelize.DataTypes);
const AtencionHis = require('./AtencionHis')(sequelize, Sequelize.DataTypes);
const ProduccionDiaria = require('./ProduccionDiaria')(sequelize, Sequelize.DataTypes);
const Indicador = require('./Indicador')(sequelize, Sequelize.DataTypes);
const IndicadorValor = require('./IndicadorValor')(sequelize, Sequelize.DataTypes);
const ImportacionLog = require('./ImportacionLog')(sequelize, Sequelize.DataTypes);
const Role = require('./Role')(sequelize, Sequelize.DataTypes);
const Profesion = require('./Profesion')(sequelize, Sequelize.DataTypes);
const RolProfesion = require('./RolProfesion')(sequelize, Sequelize.DataTypes);

// Definir asociaciones entre modelos
const defineAssociations = () => {

  // ASOCIACIONES DE USUARIOS Y ROLES  
  // Usuario - Role (muchos a uno)
  Usuario.belongsTo(Role, { 
    foreignKey: 'rol_id', 
    as: 'rol' 
  });
  Role.hasMany(Usuario, { 
    foreignKey: 'rol_id', 
    as: 'usuarios' 
  });

  // Usuario - EstablecimientoSalud (muchos a uno)
  Usuario.belongsTo(EstablecimientoSalud, { 
    foreignKey: 'establecimiento_id', 
    as: 'establecimiento' 
  });
  EstablecimientoSalud.hasMany(Usuario, { 
    foreignKey: 'establecimiento_id', 
    as: 'usuarios' 
  });

  // Role - Profesion (muchos a muchos)
  Role.belongsToMany(Profesion, {
    through: RolProfesion,
    foreignKey: 'rol_id',
    otherKey: 'profesion_id',
    as: 'profesiones'
  });
  Profesion.belongsToMany(Role, {
    through: RolProfesion,
    foreignKey: 'profesion_id',
    otherKey: 'rol_id',
    as: 'roles'
  });

  // ASOCIACIONES DE PERSONAL DE SALUD 
  // PersonalSalud - Profesion (muchos a uno)
  PersonalSalud.belongsTo(Profesion, { 
    foreignKey: 'profesion_id', 
    as: 'profesion' 
  });
  Profesion.hasMany(PersonalSalud, { 
    foreignKey: 'profesion_id', 
    as: 'personal' 
  });

  // PersonalSalud - EstablecimientoSalud (muchos a uno)
  PersonalSalud.belongsTo(EstablecimientoSalud, { 
    foreignKey: 'establecimiento_id', 
    as: 'establecimiento' 
  });
  EstablecimientoSalud.hasMany(PersonalSalud, { 
    foreignKey: 'establecimiento_id', 
    as: 'personal' 
  });


  // ASOCIACIONES DE ASEGURADOS
  // AseguradoSis - Persona (muchos a uno)
  AseguradoSis.belongsTo(Persona, { 
    foreignKey: 'persona_id', 
    as: 'persona' 
  });
  Persona.hasMany(AseguradoSis, { 
    foreignKey: 'persona_id', 
    as: 'seguros' 
  });

  // AseguradoSis - EstablecimientoSalud (muchos a uno)
  AseguradoSis.belongsTo(EstablecimientoSalud, { 
    foreignKey: 'establecimiento_adscrito_id', 
    as: 'establecimientoAdscrito' 
  });

  
  // ASOCIACIONES DE FUA (CORE) 
  // Fua - Persona (muchos a uno)
  Fua.belongsTo(Persona, { 
    foreignKey: 'persona_id', 
    as: 'persona' 
  });
  Persona.hasMany(Fua, { 
    foreignKey: 'persona_id', 
    as: 'fuas' 
  });

  // Fua - AseguradoSis (muchos a uno)
  Fua.belongsTo(AseguradoSis, { 
    foreignKey: 'asegurado_id', 
    as: 'asegurado' 
  });
  AseguradoSis.hasMany(Fua, { 
    foreignKey: 'asegurado_id', 
    as: 'fuas' 
  });

  // Fua - EstablecimientoSalud (muchos a uno)
  Fua.belongsTo(EstablecimientoSalud, { 
    foreignKey: 'establecimiento_id', 
    as: 'establecimiento' 
  });
  EstablecimientoSalud.hasMany(Fua, { 
    foreignKey: 'establecimiento_id', 
    as: 'fuas' 
  });

  // Fua - Servicio (muchos a uno)
  Fua.belongsTo(Servicio, { 
    foreignKey: 'servicio_id', 
    as: 'servicio' 
  });
  Servicio.hasMany(Fua, { 
    foreignKey: 'servicio_id', 
    as: 'fuas' 
  });

  // Fua - PersonalSalud (muchos a uno) - quien atiende
  Fua.belongsTo(PersonalSalud, { 
    foreignKey: 'personal_atiende_id', 
    as: 'personalAtiende' 
  });

  // Fua - Usuario (muchos a uno) - quien digita
  Fua.belongsTo(Usuario, { 
    foreignKey: 'digitador_id', 
    as: 'digitador' 
  });
  Usuario.hasMany(Fua, { 
    foreignKey: 'digitador_id', 
    as: 'fuasDigitadas' 
  });

  // ASOCIACIONES DE DIAGNÓSTICOS Y PROCEDIMIENTOS
  // FuaDiagnostico - Fua (muchos a uno)
  FuaDiagnostico.belongsTo(Fua, { 
    foreignKey: 'fua_id', 
    as: 'fua' 
  });
  Fua.hasMany(FuaDiagnostico, { 
    foreignKey: 'fua_id', 
    as: 'diagnosticos' 
  });

  // FuaDiagnostico - DiagnosticoCie10 (muchos a uno)
  FuaDiagnostico.belongsTo(DiagnosticoCie10, { 
    foreignKey: 'diagnostico_id', 
    as: 'diagnostico' 
  });

  // FuaProcedimiento - Fua (muchos a uno)
  FuaProcedimiento.belongsTo(Fua, { 
    foreignKey: 'fua_id', 
    as: 'fua' 
  });
  Fua.hasMany(FuaProcedimiento, { 
    foreignKey: 'fua_id', 
    as: 'procedimientos' 
  });

  // FuaProcedimiento - ProcedimientoCpms (muchos a uno)
  FuaProcedimiento.belongsTo(ProcedimientoCpms, { 
    foreignKey: 'procedimiento_id', 
    as: 'procedimiento' 
  });

  
  // ASOCIACIONES DE MEDICAMENTOS E INSUMOS
 // FuaMedicamento - Fua (muchos a uno)
  FuaMedicamento.belongsTo(Fua, { 
    foreignKey: 'fua_id', 
    as: 'fua' 
  });
  Fua.hasMany(FuaMedicamento, { 
    foreignKey: 'fua_id', 
    as: 'medicamentos' 
  });

  // FuaMedicamento - Medicamento (muchos a uno)
  FuaMedicamento.belongsTo(Medicamento, { 
    foreignKey: 'medicamento_id', 
    as: 'medicamento' 
  });

  // FuaInsumo - Fua (muchos a uno)
  FuaInsumo.belongsTo(Fua, { 
    foreignKey: 'fua_id', 
    as: 'fua' 
  });
  Fua.hasMany(FuaInsumo, { 
    foreignKey: 'fua_id', 
    as: 'insumos' 
  });

  // FuaInsumo - Insumo (muchos a uno)
  FuaInsumo.belongsTo(Insumo, { 
    foreignKey: 'insumo_id', 
    as: 'insumo' 
  });

  
  // ASOCIACIONES ESPECIALES DE FUA
  // FuaSmi - Fua (muchos a uno)
  FuaSmi.belongsTo(Fua, { 
    foreignKey: 'fua_id', 
    as: 'fua' 
  });
  Fua.hasMany(FuaSmi, { 
    foreignKey: 'fua_id', 
    as: 'smi' 
  });

  // FuaRecienNacido - Fua (muchos a uno)
  FuaRecienNacido.belongsTo(Fua, { 
    foreignKey: 'fua_id', 
    as: 'fua' 
  });
  Fua.hasMany(FuaRecienNacido, { 
    foreignKey: 'fua_id', 
    as: 'recienNacidos' 
  });

  
  // ASOCIACIONES DE ATENCIÓN HIS
  // AtencionHis - Persona (muchos a uno)
  AtencionHis.belongsTo(Persona, { 
    foreignKey: 'persona_id', 
    as: 'persona' 
  });
  Persona.hasMany(AtencionHis, { 
    foreignKey: 'persona_id', 
    as: 'atenciones' 
  });

  // AtencionHis - EstablecimientoSalud (muchos a uno)
  AtencionHis.belongsTo(EstablecimientoSalud, { 
    foreignKey: 'establecimiento_id', 
    as: 'establecimiento' 
  });

  // AtencionHis - Usuario (muchos a uno) - digitador
  AtencionHis.belongsTo(Usuario, { 
    foreignKey: 'digitador_id', 
    as: 'digitador' 
  });


  // ASOCIACIONES DE PRODUCCIÓN E INDICADORES
  // ProduccionDiaria - EstablecimientoSalud (muchos a uno)
  ProduccionDiaria.belongsTo(EstablecimientoSalud, { 
    foreignKey: 'establecimiento_id', 
    as: 'establecimiento' 
  });

  // ProduccionDiaria - Usuario (muchos a uno) - digitador
  ProduccionDiaria.belongsTo(Usuario, { 
    foreignKey: 'digitador_id', 
    as: 'digitador' 
  });

  // IndicadorValor - Indicador (muchos a uno)
  IndicadorValor.belongsTo(Indicador, { 
    foreignKey: 'indicador_id', 
    as: 'indicador' 
  });
  Indicador.hasMany(IndicadorValor, { 
    foreignKey: 'indicador_id', 
    as: 'valores' 
  });

  // IndicadorValor - EstablecimientoSalud (muchos a uno)
  IndicadorValor.belongsTo(EstablecimientoSalud, { 
    foreignKey: 'establecimiento_id', 
    as: 'establecimiento' 
  });

  
  // ASOCIACIONES DE IMPORTACIÓN
  // ImportacionLog - Usuario (muchos a uno)
  ImportacionLog.belongsTo(Usuario, { 
    foreignKey: 'usuario_id', 
    as: 'usuario' 
  });
  Usuario.hasMany(ImportacionLog, { 
    foreignKey: 'usuario_id', 
    as: 'importaciones' 
  });
};

// Llamar a la función de asociaciones
defineAssociations();

// Objeto con todos los modelos y configuración
const db = {
  sequelize,
  Sequelize,
  // Modelos principales
  Usuario,
  Persona,
  EstablecimientoSalud,
  AseguradoSis,
  PersonalSalud,
  Servicio,
  // Modelos FUA
  Fua,
  FuaDiagnostico,
  FuaProcedimiento,
  FuaMedicamento,
  FuaInsumo,
  FuaSmi,
  FuaRecienNacido,
  // Catálogos
  DiagnosticoCie10,
  ProcedimientoCpms,
  Medicamento,
  Insumo,
  // Otros modelos
  AtencionHis,
  ProduccionDiaria,
  Indicador,
  IndicadorValor,
  ImportacionLog,
  Role,
  Profesion,
  RolProfesion
};

// Función para probar la conexión
db.testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('✅ Conexión a la base de datos establecida correctamente');
    return true;
  } catch (error) {
    logger.error('❌ No se pudo conectar a la base de datos:', error);
    return false;
  }
};

// Función para sincronizar modelos (solo desarrollo)
db.sync = async (force = false) => {
  try {
    await sequelize.sync({ force, alter: !force });
    logger.info(`✅ Modelos sincronizados ${force ? 'con reconstrucción' : 'exitosamente'}`);
    return true;
  } catch (error) {
    logger.error('❌ Error al sincronizar modelos:', error);
    return false;
  }
};

module.exports = db;

// 3. Crear carpeta uploads con estructura
// Función para crear estructura de carpetas de uploads
const fs = require('fs');
const path = require('path');

const createUploadDirectories = () => {
  const uploadPaths = [
    path.join(__dirname, '../../uploads'),
    path.join(__dirname, '../../uploads/imports'),
    path.join(__dirname, '../../uploads/temp'),
    path.join(__dirname, '../../uploads/reports'),
    path.join(__dirname, '../../logs')
  ];

  uploadPaths.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Directorio creado: ${dir}`);
    }
  });

  // Crear archivo .gitkeep en uploads para mantener la estructura en git
  const gitkeepPaths = [
    path.join(__dirname, '../../uploads/.gitkeep'),
    path.join(__dirname, '../../uploads/imports/.gitkeep'),
    path.join(__dirname, '../../uploads/temp/.gitkeep'),
    path.join(__dirname, '../../uploads/reports/.gitkeep'),
    path.join(__dirname, '../../logs/.gitkeep')
  ];

  gitkeepPaths.forEach(file => {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, '');
    }
  });
};
// Llamar la función al cargar el módulo
createUploadDirectories();