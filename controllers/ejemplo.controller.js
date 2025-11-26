// controllers/ejemplo.controller.js

// Simularemos una "base de datos" en memoria por ahora
let ejemplos = [
  { id: 1, nombre: "Ejemplo 1", descripcion: "Primer elemento de prueba" },
  { id: 2, nombre: "Ejemplo 2", descripcion: "Segundo elemento de prueba" },
];

// Obtener todos los ejemplos (GET /api/ejemplos)
function obtenerEjemplos(req, res) {
  res.json(ejemplos);
}

// Obtener un ejemplo por id (GET /api/ejemplos/:id)
function obtenerEjemploPorId(req, res) {
  const id = parseInt(req.params.id);
  const ejemplo = ejemplos.find((e) => e.id === id);

  if (!ejemplo) {
    return res.status(404).json({ mensaje: "Ejemplo no encontrado" });
  }

  res.json(ejemplo);
}

// Crear un nuevo ejemplo (POST /api/ejemplos)
function crearEjemplo(req, res) {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res
      .status(400)
      .json({ mensaje: "Nombre y descripción son obligatorios" });
  }

  const nuevoEjemplo = {
    id: ejemplos.length + 1,
    nombre,
    descripcion,
  };

  ejemplos.push(nuevoEjemplo);
  res.status(201).json(nuevoEjemplo);
}

// Actualizar un ejemplo (PUT /api/ejemplos/:id)
function actualizarEjemplo(req, res) {
  const id = parseInt(req.params.id);
  const { nombre, descripcion } = req.body;

  const index = ejemplos.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Ejemplo no encontrado" });
  }

  // Actualizamos solo si vienen los campos
  if (nombre) ejemplos[index].nombre = nombre;
  if (descripcion) ejemplos[index].descripcion = descripcion;

  res.json(ejemplos[index]);
}

// Eliminar un ejemplo (DELETE /api/ejemplos/:id)
function eliminarEjemplo(req, res) {
  const id = parseInt(req.params.id);
  const existe = ejemplos.some((e) => e.id === id);

  if (!existe) {
    return res.status(404).json({ mensaje: "Ejemplo no encontrado" });
  }

  ejemplos = ejemplos.filter((e) => e.id !== id);
  res.json({ mensaje: `Ejemplo con id ${id} eliminado` });
}

// Exportamos las funciones para usarlas en las rutas
module.exports = {
  obtenerEjemplos,
  obtenerEjemploPorId,
  crearEjemplo,
  actualizarEjemplo,
  eliminarEjemplo,
};
