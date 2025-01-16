const crypto = require("crypto");
const db = require("../db");
const { startOfWeek, endOfWeek, format, startOfMonth, endOfMonth } = require('date-fns');
let createPosts = {};
let editPosts = {};
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

  console.log(taskName, taskDescription, taskTimestamp, endTime);

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
        const tarefa = await updateConcluido(id, concluido);
        res.status(200).send(tarefa);
    } catch (err) {
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

  async function getATask(req, res) {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM tarefas WHERE id = $1', [id]);
        if (result.rows.length === 0) {
        return res.status(404).send({ error: 'Tarefa não encontrada' });
    }

        const task = result.rows[0];
        console.log(task);

        res.send(task);
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

module.exports = { postTask, putTask, patchTask, getTask, getTodayTask, getWeekTask, getMonthTask, getATask, deleteTask };