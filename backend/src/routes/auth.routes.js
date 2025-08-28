const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { body } = require("express-validator");
const {
  handleValidationErrors,
} = require("../middlewares/validation.middleware");

// Validaciones para login
const loginValidation = [
  body("dni")
    .isLength({ min: 8, max: 8 })
    .withMessage("El DNI debe tener 8 dígitos")
    .isNumeric()
    .withMessage("El DNI debe ser numérico"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
  handleValidationErrors,
];

// Validaciones para registro
const registerValidation = [
  body("dni")
    .isLength({ min: 8, max: 8 })
    .withMessage("El DNI debe tener 8 dígitos")
    .isNumeric()
    .withMessage("El DNI debe ser numérico"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("nombres").notEmpty().withMessage("Los nombres son requeridos"),
  body("apellidos").notEmpty().withMessage("Los apellidos son requeridos"),
  body("rol_id").isInt().withMessage("El rol es requerido"),
  handleValidationErrors,
];

// Rutas
router.post("/login", loginValidation, authController.login);
router.post("/register", registerValidation, authController.register);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = router;
