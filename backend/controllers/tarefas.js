const crypto = require("crypto");
const db = require("../db");
const bcrypt = require('bcrypt');
const User = require('../models/userAuth');
const jwt = require('jsonwebtoken');
const { startOfWeek, endOfWeek, format, startOfMonth, endOfMonth } = require('date-fns');
let createPosts = {};
let editPosts = {};

// Definindo a função editTarefa
async function editTarefa(id, taskName, taskDescription, taskTimestamp, endTime) {
  try {
    const result = await db.query(
      'UPDATE tarefas SET nome_tarefa = $1, descricao = $2, data_hora = $3, hora_termino = $4 WHERE id = $5 RETURNING *',
      [taskName, taskDescription, taskTimestamp, endTime, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    throw err;
  }
}

async function inserirTarefa(id, taskName, taskDescription, taskTimestamp, endTimestamp, ended) {
  try {
    const result = await db.query(
      'INSERT INTO tarefas (id, nome_tarefa, descricao, data_hora, hora_termino, concluido) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, taskName, taskDescription, taskTimestamp, endTimestamp, ended]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao inserir tarefa:', err);
    throw err;
  }
}

async function postTask(req, res) {
    const id = crypto.randomUUID();
  const { taskName, taskDescription, taskDate, taskTime, endTime } = req.body;
  const ended = false;

  // Converter data do formato DD/MM/YYYY para YYYY-MM-DD
  const [day, month, year] = taskDate.split('/');
  const formattedDate = `${year}-${month}-${day}`;

  // Combinar data e hora no formato timestamp
  const taskTimestamp = `${formattedDate} ${taskTime}`;
  const endTimestamp = `${formattedDate} ${endTime}`;

  try {
    const tarefa = await inserirTarefa(id, taskName, taskDescription, taskTimestamp, endTimestamp, ended);
    createPosts[id] = {
      id,
      taskName,
      taskDescription,
      taskTimestamp,
      endTimestamp,
      ended
    };
    res.status(201).send(createPosts[id]);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao inserir tarefa' });
  }
}
  
  async function putTask(req, res) {
    const { id } = req.params;
  const { taskName, taskDescription, taskTimestamp, endTime } = req.body;

  
  //(taskName, taskDescription, taskTimestamp, endTime);

  // Validação
  if (!taskName || !taskDescription || !taskTimestamp || !endTime) {
    return res.status(400).send({ error: 'Todos os campos são obrigatórios!' });
  }

  try {
    // Atualização no banco de dados
    const tarefa = await editTarefa(id, taskName, taskDescription, taskTimestamp, endTime);
    res.status(200).send(tarefa);
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    res.status(500).send({ error: 'Erro interno ao atualizar tarefa' });
  }
}
  
async function patchTask(req, res) {
  const { id } = req.params;
  const { concluido } = req.body;

  try {
    const result = await db.query(
      'UPDATE tarefas SET concluido = $1 WHERE id = $2 RETURNING *',
      [concluido, id]
    );
    res.status(200).send(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    res.status(500).send({ error: 'Erro ao atualizar tarefa' });
  }
}

  async function getTask(req, res) {
    try {
      const result = await db.query('SELECT * FROM tarefas ORDER BY DATA_HORA ASC');
      res.send(result.rows); // Array of objects representing table rows
    } catch (err) {
      console.error('Erro ao buscar dados da tabela:', err);
      res.status(500).send({ error: 'Erro ao buscar dados da tabela' });
    }
  }
  
  async function getTodayTask(req, res) {
    try {
      const today = format(Date.now(), 'yyyy-MM-dd'); // Correctly formatted date
      const result = await db.query(
        'SELECT * FROM tarefas WHERE DATE(data_hora) = $1 ORDER BY data_hora ASC',
        [today]
      ); // Use a proper formatted date as the parameter
      res.send(result.rows); // Array of objects representing table rows
    } catch (err) {
      console.error('Erro ao buscar dados da tabela:', err);
      res.status(500).send({ error: 'Erro ao buscar dados da tabela' });
    }
  }
  
  async function getWeekTask(req, res) {
    try {
      const weekStart = format(startOfWeek(new Date()), 'yyyy-MM-dd');
      const weekEnd = format(endOfWeek(new Date()), 'yyyy-MM-dd') // Correctly formatted date
      const result = await db.query(
        'SELECT * FROM tarefas WHERE DATE(data_hora) BETWEEN $1 AND $2 ORDER BY data_hora ASC',
        [weekStart, weekEnd]
      ); // Use a proper formatted date as the parameter
      res.send(result.rows); // Array of objects representing table rows
    } catch (err) {
      console.error('Erro ao buscar dados da tabela:', err);
      res.status(500).send({ error: 'Erro ao buscar dados da tabela' });
    }
  }
  
  async function getMonthTask(req, res) {
    try {
      const monthStart = format(startOfMonth(new Date()), 'yyyy-MM-dd');
      const monthEnd = format(endOfMonth(new Date()), 'yyyy-MM-dd') // Correctly formatted date
      const result = await db.query(
        'SELECT * FROM tarefas WHERE DATE(data_hora) BETWEEN $1 AND $2 ORDER BY data_hora ASC',
        [monthStart, monthEnd]
      ); // Use a proper formatted date as the parameter
      res.send(result.rows); // Array of objects representing table rows
    } catch (err) {
      console.error('Erro ao buscar dados da tabela:', err);
      res.status(500).send({ error: 'Erro ao buscar dados da tabela' });
    }
  }

  const { validate: isUuid } = require('uuid');

async function getATask(req, res) {
  const { id } = req.params;
  console.log(req.query);
  // Verificar se o parâmetro é um UUID válido
  if (!isUuid(id)) {
    return getTaskOrdered(req, res);
  }

  try {
    const result = await db.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send({ error: 'Tarefa não encontrada' });
    }

    res.send(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar tarefa:', err);
    res.status(500).send({ error: 'Erro ao buscar tarefa' });
  }
}


  async function deleteTask(req, res) {
    const { id } = req.params;

  try {
    await db.query('DELETE FROM tarefas WHERE id = $1', [id]);
    res.status(204).send({});
  } catch (err) {
    console.error('Erro ao deletar tarefa:', err);
    res.status(500).send({ error: 'Erro ao deletar tarefa' });
  }
}

async function getTaskOrdered(req, res) {
  console.log(req);
  try {
    
    const order = req.query.order;
    let result;
    if (order === 'data') {
      result = await db.query('SELECT * FROM tarefas ORDER BY DATA_HORA ASC');
    } else if (order === 'nome') {
      result = await db.query('SELECT * FROM tarefas ORDER BY NOME_TAREFA ASC');
    } else {
      return res.status(400).send({ error: 'Parâmetro de ordenação inválido' });
    }
    
    res.send(result.rows); // Array of objects representing table rows
  } catch (err) {
    console.error('Erro ao buscar dados da tabela:', err);
    res.status(500).send({ error: 'Erro ao buscar dados da tabela' });
  }
}

async function registerUser(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.build({ email, password: hashedPassword }); // Use .build para criar a instância
    await user.save(); // Salva a instância no banco de dados

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
}


async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Log email for debugging
    console.log(`Login attempt for email: ${email}`);

    // Fetch user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Authentication failed: user not found' });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Authentication failed: invalid password' });
    }

    // Create JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '1h',
    });

    console.log('Login successful, token generated');
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login failed:', error); // Log the exact error
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function protectedRoute(req, res) {
  res.status(200).json({ message: 'Acesso autorizado' });
}

// const User = require('./models/userAuth'); // Certifique-se de que o caminho esteja correto

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll(); // Recupera todas as entradas da tabela Users
    res.send(users); // Exibe os usuários no console
  } catch (error) {
    res.send('Erro ao buscar usuários:', error);
  }
}

async function logoutUser(req, res) {
  res.status(200).json({ message: 'Logout realizado com sucesso' });
}


module.exports = { postTask, putTask, patchTask, getTask, getTodayTask, getWeekTask, getMonthTask, getATask, deleteTask, getTaskOrdered, registerUser, loginUser, protectedRoute, getAllUsers, logoutUser };