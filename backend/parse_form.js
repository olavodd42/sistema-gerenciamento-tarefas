const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require("crypto");
const db = require("./db");

const app = express();
const {parse, format} = require('date-fns');

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

async function updateConcluido(id, concluido) {
  const query = 'UPDATE tarefas SET concluido = $2 WHERE id = $1 RETURNING *';
  const valores = [id, concluido];

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
    const result = await db.query('SELECT * FROM tarefas ORDER BY DATA_HORA ASC');
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

app.post('/api/tarefas', async (req, res) => {
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

app.put('/api/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  const { taskName, taskDescription, taskTimestamp, endTime } = req.body;

  console.log(taskName, taskDescription, taskTimestamp, endTime);

  // Validação
  if (!taskName || !taskDescription || !taskTimestamp || !endTime) {
    return res.status(400).send({ error: 'Todos os campos são obrigatórios!' });
  }

  try {
    // Processamento de data/hora
    
    // console.log('taskTimestamp:', taskTimestamp);
    // console.log('endTimestamp:', endTimestamp);
    // Atualização no banco de dados
    const tarefa = await editTarefa(id, taskName, taskDescription, taskTimestamp, endTime);
    res.status(200).send(tarefa);
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    res.status(500).send({ error: 'Erro interno ao atualizar tarefa' });
  }
});


app.get('/api/tarefas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send({ error: 'Tarefa não encontrada' });
    }

    const task = result.rows[0];
    console.log(task);

    // Validar e formatar os campos de data e hora
    // try {
    //   task.taskTime = task.data_hora && !isNaN(new Date(task.data_hora).getTime()) 
    //     ? format(new Date(task.data_hora), 'HH:mm') 
    //     : null;
    //   task.endTime = task.hora_fim && !isNaN(new Date(task.hora_fim).getTime()) 
    //     ? format(new Date(task.hora_fim), 'HH:mm') 
    //     : null;
    // } catch (formatError) {
    //   console.error('Erro ao formatar data/hora:', formatError);
    //   return res.status(500).send({ error: 'Erro ao formatar data/hora da tarefa' });
    // }

    res.send(task);
  } catch (err) {
    console.error('Erro ao buscar tarefa:', err);
    res.status(500).send({ error: 'Erro ao buscar tarefa' });
  }
});



app.patch('/api/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  const { concluido } = req.body;

  try {
    const tarefa = await updateConcluido(id, concluido);
    res.status(200).send(tarefa);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao atualizar tarefa' });
  }
});

app.delete('/api/tarefas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM tarefas WHERE id = $1', [id]);
    res.status(204).send({});
  } catch (err) {
    console.error('Erro ao deletar tarefa:', err);
    res.status(500).send({ error: 'Erro ao deletar tarefa' });
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