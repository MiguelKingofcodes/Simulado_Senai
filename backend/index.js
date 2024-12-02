const express = require('express');
const mysql = require('mysql2/promise');

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
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    // Verificar se o email já está cadastrado
    const [userExists] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (userExists.length > 0) {
      return res.status(400).json({ message: 'Este email já está cadastrado.' });
    }

    // Inserir o usuário no banco de dados
    const [result] = await pool.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senha]);

    return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    // Verificar se o usuário existe
    const [user] = await pool.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);

    if (user.length === 0) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    // Retornar o ID do usuário para futuras requisições
    return res.status(200).json({ message: 'Login bem-sucedido!', usuario_id: user[0].id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao realizar login.' });
  }
});

// Rota de cadastro de tarefa
app.post('/tasks', async (req, res) => {
  const { titulo, descricao, usuario_id } = req.body;

  if (!titulo || !descricao || !usuario_id) {
    return res.status(400).json({ message: 'Título, descrição e ID de usuário são obrigatórios.' });
  }

  try {
    // Inserir tarefa no banco de dados
    const [result] = await pool.query('INSERT INTO tarefas (titulo, descricao, usuario_id) VALUES (?, ?, ?)', [titulo, descricao, usuario_id]);

    return res.status(201).json({ message: 'Tarefa cadastrada com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao cadastrar tarefa.' });
  }
});

// Rota para ver as tarefas de um usuário específico
app.get('/tasks', async (req, res) => {
  const { usuario_id } = req.query;

  if (!usuario_id) {
    return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
  }

  try {
    // Buscar tarefas do usuário com o ID fornecido
    const [tasks] = await pool.query('SELECT * FROM tarefas WHERE usuario_id = ?', [usuario_id]);

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar tarefas.' });
  }
});

// Rota para editar tarefa
// Rota para editar tarefa (incluindo o status)
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, usuario_id } = req.body;

  if (!titulo && !descricao && !status) {
    return res.status(400).json({ message: 'Pelo menos um campo (título, descrição ou status) precisa ser fornecido.' });
  }

  try {
    // Verificar se a tarefa existe
    const [task] = await pool.query('SELECT * FROM tarefas WHERE id = ?', [id]);

    if (task.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    // Verificar se a tarefa pertence ao usuário
    if (task[0].usuario_id !== usuario_id) {
      return res.status(403).json({ message: 'Você não tem permissão para editar esta tarefa.' });
    }

    // Atualizar a tarefa
    const [result] = await pool.query('UPDATE tarefas SET titulo = ?, descricao = ?, status = ? WHERE id = ?', [
      titulo || task[0].titulo, 
      descricao || task[0].descricao, 
      status || task[0].status, 
      id
    ]);

    return res.status(200).json({ message: 'Tarefa atualizada com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao editar tarefa.' });
  }
});


// Rota para excluir tarefa
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { usuario_id } = req.body;

  try {
    // Verificar se a tarefa existe
    const [task] = await pool.query('SELECT * FROM tarefas WHERE id = ?', [id]);

    if (task.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    // Verificar se a tarefa pertence ao usuário
    if (task[0].usuario_id !== usuario_id) {
      return res.status(403).json({ message: 'Você não tem permissão para excluir esta tarefa.' });
    }

    // Excluir a tarefa
    const [result] = await pool.query('DELETE FROM tarefas WHERE id = ?', [id]);

    return res.status(200).json({ message: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir tarefa.' });
  }
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
