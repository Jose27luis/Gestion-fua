module.exports = {
  // Estados de usuario
  USER_STATUS: {
    ACTIVE: true,
    INACTIVE: false,
  },

  // Tipos de documento
  DOCUMENT_TYPES: {
    DNI: "DNI",
    CE: "CE",
    PASSPORT: "PASAPORTE",
    RUC: "RUC",
    OTHER: "OTROS",
  },

  // Géneros
  GENDER: {
    MALE: "M",
    FEMALE: "F",
  },

  // Estados FUA
  FUA_STATUS: {
    DIGITADO: "DIGITADO",
    ENVIADO: "ENVIADO",
    OBSERVADO: "OBSERVADO",
    ANULADO: "ANULADO",
  },

  // Tipos de atención
  ATTENTION_TYPES: {
    INTRAMURAL: "INTRAMURAL",
    EXTRAMURAL: "EXTRAMURAL",
  },

  // Estados de asegurado
  INSURED_STATUS: {
    ACTIVE: "ACTIVO",
    INACTIVE: "INACTIVO",
    SUSPENDED: "SUSPENDIDO",
  },

  // Tipos de diagnóstico
  DIAGNOSIS_TYPES: {
    DEFINITIVE: "DEFINITIVO",
    PRESUMPTIVE: "PRESUNTIVO",
    REPETITIVE: "REPETITIVO",
  },

  // Roles del sistema
  ROLES: {
    ADMIN: "admin",
    PERSONAL_HEALTH: "personal_salud",
    DIGITIZER: "digitador",
  },

  // Códigos de respuesta HTTP
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
  },

  // Mensajes de respuesta
  MESSAGES: {
    SUCCESS: "Operación exitosa",
    ERROR: "Error en la operación",
    NOT_FOUND: "Registro no encontrado",
    UNAUTHORIZED: "No autorizado",
    VALIDATION_ERROR: "Error de validación",
    LOGIN_SUCCESS: "Inicio de sesión exitoso",
    LOGIN_ERROR: "Credenciales incorrectas",
  },

  // Límites de archivos
  FILE_LIMITS: {
    MAX_SIZE: parseInt(process.env.MAX_FILE_SIZE) || 10485760, // 10MB
    ALLOWED_TYPES: [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
  },
};
