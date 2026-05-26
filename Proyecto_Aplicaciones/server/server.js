const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const bdd = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'GamingGalaxy'
});

bdd.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err.message);
    return;
  }
  console.log('¡Conectado de forma perfecta a GamingGalaxy en XAMPP!');
});

// Endpoint para los 3 catálogos de productos
app.get('/api/productos/:tipo', (req, res) => {
  const { tipo } = req.params;
  const query = 'SELECT id, title, price, category, image FROM productos WHERE tipo = ?';
  bdd.query(query, [tipo], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Endpoint para validar el Inicio de Sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
  bdd.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      res.json({ success: true, usuario: results[0].nombre });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  });
});

// Endpoint para registrar nuevos usuarios e insertarlos en la BDD
app.post('/api/register', (req, res) => {
  const { nombre, email, password } = req.body;
  const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
  bdd.query(query, [nombre, email, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ success: false, message: 'El correo electrónico ya existe.' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Usuario añadido con éxito' });
  });
});

app.listen(3001, () => {
  console.log('Servidor de Node corriendo universalmente en el puerto 3001');
});