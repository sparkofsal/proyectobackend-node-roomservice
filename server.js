require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const pool = require('./config/db'); // esto es para la base de datos

const ejemploRoutes = require('./routes/ejemplo.routes'); 
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes'); // AGREGUE ESTA
const adminRoutes = require('./routes/admin.routes'); // Y ESTA TAMBIEN PARA MAS SEGURIDAD

// RUTA BASE PARA CONFIRMAR QUE EL SERVIDOR ESTA VIVO
app.get('/', (req, res) => {
  res.send('El servidor funciona correctamente');
});

// RUTA DE SALUD PARA CONFIRMAR CONEXION A MYSQL (XAMPP)
app.get('/health/db', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ db: 'ok' });
  } catch (error) {
    res.status(500).json({
      db: 'fail',
      error: error.message
    });
  }
});

// RUTAS DE LA APLICACION
app.use('/api/ejemplos', ejemploRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // AGREGUE ESTA
app.use('/api/admin', adminRoutes); // Y ESTA TAMBIEN PARA MAS SEGURIDAD

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escucha en http://localhost:${PORT}`);
});
