🎮 Gaming Galaxy - Aplicación Móvil
Aplicación móvil de comercio electrónico desarrollada con React Native para la tienda de videojuegos "Gaming Galaxy", que permite digitalizar la venta de productos y la gestión del inventario.

📋 Descripción del Proyecto
Gaming Galaxy es una aplicación móvil diseñada para digitalizar el proceso de ventas de una tienda de videojuegos. Ofrece a los usuarios una plataforma intuitiva para navegar por los productos, consultar disponibilidad de stock y realizar compras desde cualquier lugar.

🚀 Características Principales
Autenticación segura – Sistema de inicio de sesión y registro de usuarios

Catálogo dinámico de productos – Organizado por categorías (Juegos, Consolas, Accesorios)

Tarjetas visuales de productos – Muestran nombre, categoría, precio (en soles) e imagen referencial

Carrito de compras – Agregar, visualizar y gestionar compras

Información actualizada – Stock y precios en tiempo real

🎯 Objetivos
Objetivo General
Desarrollar una aplicación móvil utilizando React Native que digitalice los procesos de venta y gestión de productos a través de una plataforma segura, intuitiva y accesible.

Objetivos Específicos
Implementar un sistema de autenticación que garantice un acceso seguro mediante la validación de credenciales

Desarrollar un catálogo dinámico y responsivo organizado por categorías

Diseñar una interfaz intuitiva y amigable con tiempos de respuesta rápidos

Mostrar información actualizada sobre categorías, precios y disponibilidad de stock

🛠️ Tecnologías Utilizadas
Frontend: React Native

Backend: Node.js

Base de Datos: MySQL (GamingGalaxy)

Prototipado: Figma

📁 Estructura del Proyecto
text
├── App.js                 # Entrada principal de la aplicación
├── components/
│   ├── GameCard.js        # Componente de tarjeta de producto
│   └── TopMenu.js         # Menú de navegación
├── screens/
│   ├── LoginScreen.js     # Pantalla de autenticación
│   ├── GamesCatalogScreen.js
│   ├── ConsolesCatalogScreen.js
│   └── AccessoriesCatalogScreen.js
└── server/
    └── server.js          # Servidor backend
🗄️ Esquema de Base de Datos
Tablas
Productos: id, nombre, categoría, precio, stock, imagen_url

Usuarios: id, nombre_usuario, correo, contraseña_hash

🎨 Prototipo de Diseño
Versión actual: Figma Design

📱 Pantallas Principales
🔐 Inicio de Sesión y Registro
Autenticación segura de usuarios

Registro de nuevos usuarios

🎮 Catálogo de Juegos
Navegación por videojuegos

Agregar productos al carrito

🕹️ Catálogo de Consolas
Visualización de consolas disponibles

Gestión del carrito

🎧 Catálogo de Accesorios
Exploración de accesorios gaming

Administración del carrito de compras

🚀 Instalación y Ejecución
Requisitos Previos
Node.js instalado

Base de datos MySQL

Entorno de desarrollo React Native

Instalación
bash
# Clonar el repositorio
git clone [URL]

# Instalar dependencias
npm install

# Iniciar el servidor backend
cd server
node server.js

# Ejecutar la aplicación
npx expo start
👥 Autores
Autor	Participación
Huamán Santos, Ramiro Alessandro	100%
Espinoza Cermeño, Jesús Fernando	100%
📅 Lima, Perú - Julio 2026
🏫 Universidad Tecnológica del Perú - Facultad de Ingeniería y Sistemas
📚 Curso: Desarrollo de Aplicaciones Móviles
👨‍🏫 Docente: Cota Sencara, David William

