const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { taskName, taskDescription, taskDate, taskTime, endTime } = req.body;
  const ended = false;

  posts[id] = {
    id,
    taskName,
    taskDescription,
    taskDate,
    taskTime,
    endTime,
    ended
  };

  res.status(201).send(posts[id]);
});

app.post('/events',(req,res)=>{
  console.log('res event',req.body.type)
  res.send({});
})


app.listen(4000, () => {
  console.log('Listening on 4000');
});