const express = require("express");
const router = express.Router();
const personaController = require("../controllers/persona.controller");
const { body, query } = require("express-validator");
const {
  handleValidationErrors,
} = require("../middlewares/validation.middleware");

// Validaciones para crear persona
const createPersonaValidation = [
  body("numero_documento")
    .notEmpty()
    .withMessage("El número de documento es requerido"),
  body("apellido_paterno")
    .notEmpty()
    .withMessage("El apellido paterno es requerido"),
  body("apellido_materno")
    .notEmpty()
    .withMessage("El apellido materno es requerido"),
  body("nombres").notEmpty().withMessage("Los nombres son requeridos"),
  body("fecha_nacimiento")
    .isISO8601()
    .withMessage("Fecha de nacimiento inválida"),
  body("sexo").isIn(["M", "F"]).withMessage("El sexo debe ser M o F"),
  handleValidationErrors,
];

// Rutas
router.get("/", personaController.getAll);
router.get("/:id", personaController.getById);
router.get("/documento/:numero", personaController.getByDocument);
router.post("/", createPersonaValidation, personaController.create);
router.put("/:id", createPersonaValidation, personaController.update);
router.delete("/:id", personaController.delete);
router.get("/search/query", personaController.search);

module.exports = router;
