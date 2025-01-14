const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();
const crypto = require("crypto");

const db = require("./db");

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

app.use(bodyParser.json());
app.use(cors());

let posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  let id = crypto.randomUUID();
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
    posts[id] = {
      id,
      taskName,
      taskDescription,
      taskTimestamp,
      endTimestamp,
      ended
    };
    res.status(201).send(posts[id]);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao inserir tarefa' });
  }
});

app.post('/events', (req, res) => {
  console.log('res event', req.body.type);
  res.send({});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});