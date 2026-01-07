require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const pool = require('./config/db'); // esto es para la base de datos

const ejemploRoutes = require('./routes/ejemplo.routes'); 
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes'); // AGREGUE ESTA
const adminRoutes = require('./routes/admin.routes'); // Y ESTA TAMBIEN PARA MAS SEGURIDAD

// CACHE SIMPLE EN MEMORIA
let cache = {
  value: null,
  timestamp: null
};
const CACHE_TIME_MS = 10000; // 10 segundos

// RUTA BASE
app.get('/', (req, res) => {
  res.send('El servidor funciona correctamente');
});

// RUTA DE SALUD PARA MYSQL
app.get('/health/db', async (req, res) => {
  console.log('Entrando a /health/db');

  try {
    await pool.query('SELECT 1');
    res.json({ db: 'ok' });
  } catch (error) {
    res.status(500).json({ db: 'fail', error: error.message });
  }
});

// RUTA DE EJEMPLO CON CACHE
app.get('/api/cache/now', (req, res) => {
  const now = Date.now();

  if (cache.value && now - cache.timestamp < CACHE_TIME_MS) {
    console.log('Respondiendo desde CACHE');
    return res.json({
      source: 'cache',
      data: cache.value
    });
  }

  console.log('Generando respuesta NUEVA');
  const data = { time: new Date().toISOString() };

  cache.value = data;
  cache.timestamp = now;

  res.json({
    source: 'new',
    data
  });
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
