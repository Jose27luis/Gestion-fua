const moment = require('moment');

class DateUtil {
  // Formatear fecha para MySQL
  static toMySQLDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  static toMySQLDateTime(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  // Formatear fecha para mostrar
  static toDisplayDate(date) {
    return moment(date).format('DD/MM/YYYY');
  }

  static toDisplayDateTime(date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  }

  // Validar formato de fecha
  static isValidDate(date, format = 'YYYY-MM-DD') {
    return moment(date, format, true).isValid();
  }

  // Calcular edad
  static calculateAge(birthDate) {
    return moment().diff(moment(birthDate), 'years');
  }

  // Obtener rango de fechas
  static getDateRange(startDate, endDate) {
    const start = moment(startDate);
    const end = moment(endDate);
    
    return {
      start: start.format('YYYY-MM-DD'),
      end: end.format('YYYY-MM-DD'),
      days: end.diff(start, 'days') + 1
    };
  }

  // Obtener fecha actual en zona horaria de Perú
  static nowPeru() {
    return moment().utcOffset(-5);
  }

  // Formatear para periodo (YYYY-MM)
  static toPeriod(date) {
    return moment(date).format('YYYY-MM');
  }
}

module.exports = DateUtil;