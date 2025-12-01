const express = require('express');
const app = express();

// Middleware para poder leer JSON
app.use(express.json());

// Importar rutas de ejemplo
const ejemploRoutes = require('./routes/ejemplo.routes'); 
const authRoutes = require('./routes/auth.routes'); //en esta parte importo las rutas de autenticacion


// Ruta inicial (prueba básica)
app.get('/', (req, res) => {
  res.send('El servidor funciona correctamente');
});

// Usar las rutas de ejemplo con prefijo /api/ejemplos
app.use('/api/ejemplos', ejemploRoutes); 
app.use('/api/auth', authRoutes); //esta linea me sirve para usar las rutas de autenticacion con el prefijo /api/auth


// Puerto donde escuchará la app
const PORT = 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escucha en http://localhost:${PORT}`);
});
