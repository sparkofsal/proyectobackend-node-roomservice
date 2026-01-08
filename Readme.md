# RoomService Backend – Node.js

Este proyecto es el backend de una aplicación tipo *RoomService*, desarrollado como parte de mi aprendizaje en *Node.js*, *Express* y *MySQL*.

La idea del proyecto es tener una API funcional con:
- autenticación
- rutas protegidas
- conexión a base de datos
- estructura clara y escalable

Todo corre de forma local usando *XAMPP* para MySQL.

## Tecnologías usadas
- Node.js
- Express
- MySQL (XAMPP)
- dotenv (variables de entorno)
- JWT (autenticación)
- bcryptjs (hash de contraseñas)

## Requisitos
Antes de correr el proyecto necesitas tener instalado:
- Node.js
- npm
- XAMPP (con MySQL)
- Git 

## Instalación del proyecto

1. Clona el repositorio:
```bash
git clone https://github.com/sparkofsal/proyectobackend-node-roomservice.git
cd proyectobackend-node-roomservice
npm install

Variables de entorno
Este proyecto usa variables de entorno para la configuración.
En la raíz del proyecto existe un archivo:
.ENV.EXAMPLE
Cópialo y crea tu archivo .env

Ajusta los valores según tu entorno. 

PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=backend_node

JWT_SECRET=dev-secret

Base de datos (XAMPP)

Abre XAMPP
Inicia MySQL
Entra a:

http://localhost/phpmyadmin


Asegúrate de que exista la base de datos con el mismo nombre que DB_NAME
(por ejemplo: backend_node)

Ejecutar el servidor
npm run dev

El servidor se levanta en:

http://localhost:3000

Cómo probar que funciona

GET /
Salud de la base de datos:

GET /health/db

Si /health/db responde correctamente, significa que:
el servidor está activo la conexión a MySQL funciona

También puedes probar las rutas de autenticación, usuarios o admin usando Postman o Thunder Client.

Notas

Este proyecto está pensado como backend base para una app de RoomService y como parte de mi portafolio de backend con Node.js.
Más adelante se puede hacer un frontend con React 
