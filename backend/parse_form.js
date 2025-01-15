const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require("crypto");
const db = require("./db");

const app = express();

async function inserirTarefa(id, nome, desc, data_hora, hora_fim, fim) {
  const query = 'INSERT INTO tarefas (id, nome_tarefa, descricao, data_hora, hora_termino, concluido) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const valores = [id, nome, desc, data_hora, hora_fim, fim];

  try {
    const result = await db.query(query, valores);
    console.log('Tarefa inserida:', result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao inserir tarefa:', err.stack);
    throw err;
  }
}

async function editTarefa(id, nome, desc, data_hora, hora_fim) {
  const query = 'UPDATE tarefas SET nome_tarefa = $2, descricao = $3, data_hora = $4, hora_termino = $5 WHERE id = $1 RETURNING *';
  const valores = [id, nome, desc, data_hora, hora_fim];

  try {
    const result = await db.query(query, valores);
    console.log('Tarefa atualizada:', result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err.stack);
    throw err;
  }
}

async function getTableEntries(res) {
  try {
    const result = await db.query('SELECT * FROM tarefas');
    res.send(result.rows); // Array of objects representing table rows
  } catch (err) {
    console.error('Erro ao buscar dados da tabela:', err);
    res.status(500).send({ error: 'Erro ao buscar dados da tabela' });
  }
}

app.use(bodyParser.json());
app.use(cors());

let createPosts = {};
let editPosts = {};

app.get('/api/tarefas', (req, res) => {
  getTableEntries(res);
});

app.post('/create', async (req, res) => {
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
});

app.post('/api/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  const { taskName, taskDescription, taskDate, taskTime, endTime } = req.body;

  // Converter data do formato DD/MM/YYYY para YYYY-MM-DD
  const [day, month, year] = taskDate.split('/');
  const formattedDate = `${year}-${month}-${day}`;

  // Combinar data e hora no formato timestamp
  const taskTimestamp = `${formattedDate} ${taskTime}`;
  const endTimestamp = `${formattedDate} ${endTime}`;

  try {
    const tarefa = await editTarefa(id, taskName, taskDescription, taskTimestamp, endTimestamp);
    editPosts[id] = {
      id,
      taskName,
      taskDescription,
      taskTimestamp,
      endTimestamp
    };
    res.status(200).send(editPosts[id]);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao atualizar tarefa' });
  }
});

app.post('/events', (req, res) => {
  console.log('Evento recebido:', req.body.type);
  res.send({});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});