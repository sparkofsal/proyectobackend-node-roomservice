// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

// "Base de datos" temporal en memoria
let usuarios = [];

// POST /api/auth/register
async function registrarUsuario(req, res) {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si ya existe el usuario
    const usuarioExistente = usuarios.find((u) => u.email === email);
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre,
      email,
      password: passwordEncriptado,
      rol: rol || 'cliente', // por defecto cliente
    };

    usuarios.push(nuevoUsuario);

    // No devolvemos el password en la respuesta
    const { password: _, ...usuarioSinPassword } = nuevoUsuario;

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: usuarioSinPassword,
    });
  } catch (error) {
    console.error('Error en registrarUsuario:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}

// POST /api/auth/login
async function loginUsuario(req, res) {
  try {
    const { email, password } = req.body;

    const usuario = usuarios.find((u) => u.email === email);
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Comparar contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Crear payload para el token
    const payload = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    // Generar token
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({
      mensaje: 'Login exitoso',
      token,
    });
  } catch (error) {
    console.error('Error en loginUsuario:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}

module.exports = {
  registrarUsuario,
  loginUsuario,
};
