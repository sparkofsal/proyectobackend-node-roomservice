// routes/ejemplo.routes.js
const express = require('express');
const router = express.Router();

const {
  obtenerEjemplos,
  obtenerEjemploPorId,
  crearEjemplo,
  actualizarEjemplo,
  eliminarEjemplo,
} = require('../controllers/ejemplo.controller');

// Ruta para obtener todos los ejemplos
router.get('/', obtenerEjemplos);

// Ruta para obtener un ejemplo por id
router.get('/:id', obtenerEjemploPorId);

// Ruta para crear un nuevo ejemplo
router.post('/', crearEjemplo);

// Ruta para actualizar un ejemplo existente
router.put('/:id', actualizarEjemplo);

// Ruta para eliminar un ejemplo
router.delete('/:id', eliminarEjemplo);

module.exports = router;
