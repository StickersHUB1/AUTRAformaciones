// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

dotenv.config();
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/login', async (req, res) => {
  const { studentCode, password } = req.body;
  try {
    await client.connect();
    const db = client.db('autra');
    const user = await db.collection('users').findOne({ studentCode: studentCode.toUpperCase() });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, studentCode });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  } finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));