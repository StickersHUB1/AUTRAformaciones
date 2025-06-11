const express = require('express');
const path = require('path');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// Conexión a MongoDB
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
}
connectDB();

// Ruta de login
app.post('/login', async (req, res) => {
  const { studentCode, password } = req.body;
  if (!studentCode || !password) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }
  try {
    const db = client.db('autra');
    const user = await db.collection('users').findOne({ studentCode: studentCode.toUpperCase() });
    if (!user) {
      return res.json({ success: false, message: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.json({ success: true, studentCode: user.studentCode });
    } else {
      return res.json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Ruta raíz para servir login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/login.html'));
});

// Maneja rutas no definidas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));