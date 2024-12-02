const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
app.use(express.json());

// Conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Verificar conexão com o banco de dados
pool.getConnection()
  .then(() => console.log('Conectado ao banco de dados MySQL'))
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  });

// Rota de registro
app.post('/register', async (req, res) => {
  try {
    
  } catch (error) {

  }
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
