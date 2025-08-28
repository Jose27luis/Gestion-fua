require("dotenv").config();

const config = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "75318092",
    database: process.env.DB_NAME || "posta",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
    timezone: "-05:00", // Zona horaria de Peru
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "75318092",
    database: process.env.DB_NAME_TEST || "posta",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 20,
      min: 5,
      acquire: 60000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
    timezone: "-05:00",
  },
};

module.exports = config;
