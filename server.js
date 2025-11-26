const express = require('express');
const app = express();

// Middleware para poder leer JSON
app.use(express.json());

// Importar rutas de ejemplo
const ejemploRoutes = require('./routes/ejemplo.routes');

// Ruta inicial (prueba básica)
app.get('/', (req, res) => {
  res.send('El servidor funciona correctamente');
});

// Usar las rutas de ejemplo con prefijo /api/ejemplos
app.use('/api/ejemplos', ejemploRoutes);

// Puerto donde escuchará la app
const PORT = 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escucha en http://localhost:${PORT}`);
});
