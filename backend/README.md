# 🏥 Sistema FUA - Backend

Backend para el Sistema de Formato Único de Atención (FUA) del sector salud.

## 🚀 Características

- **Node.js** con Express
- **MySQL** con Sequelize ORM
- **JWT** para autenticación
- **Validaciones** con express-validator
- **Upload** de archivos con Multer
- **Logging** con Winston
- **Rate limiting** y seguridad

## 📋 Prerrequisitos

- Node.js >= 16.0.0
- MySQL >= 8.0
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio

```bash
git clone <repository-url>
cd backend-sistema-fua
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. Crear base de datos

```bash
mysql -u root -p
CREATE DATABASE sistema_fua;
```

5. Ejecutar migraciones

```bash
npm run migrate
```

6. Ejecutar seeders

```bash
npm run seed
```

## 🚀 Uso

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

## 📁 Estructura

```
src/
├── config/          # Configuraciones
├── models/          # Modelos Sequelize
├── controllers/     # Controladores
├── services/        # Lógica de negocio
├── routes/          # Rutas de la API
├── middlewares/     # Middlewares
├── validators/      # Validaciones
├── utils/           # Utilidades
├── seeders/         # Datos iniciales
├── app.js           # Configuración Express
└── server.js        # Punto de entrada
```

## 📚 API Endpoints

- `POST /api/auth/login` - Iniciar sesión
- `GET /api/usuarios` - Listar usuarios
- `POST /api/fua` - Crear FUA
- `GET /api/reportes` - Generar reportes

## 🧪 Testing

```bash
npm test
```

## 🔒 Seguridad

- Helmet para headers de seguridad
- Rate limiting
- Validación de entrada
- JWT para autenticación
- CORS configurado

## 📝 Licencia

MIT

````

## 📦 COMANDOS PARA INICIALIZAR

```bash
# 1. Crear carpeta del proyecto
mkdir backend-sistema-fua
cd backend-sistema-fua

# 2. Inicializar npm
npm init -y

# 3. Instalar dependencias
npm install express mysql2 sequelize bcryptjs jsonwebtoken cors helmet express-rate-limit express-validator multer csv-parser moment dotenv winston compression morgan

# 4. Instalar dependencias de desarrollo
npm install -D nodemon jest supertest eslint

# 5. Crear estructura de carpetas
mkdir -p src/{config,models,controllers,services,routes,middlewares,validators,utils,seeders}
mkdir -p uploads/{imports,temp,reports}
mkdir -p logs

# 6. Crear archivos iniciales
touch src/{app.js,server.js}
touch .env .env.example .gitignore nodemon.json .eslintrc.js README.md
````
