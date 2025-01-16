const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const tarefasRouter = require('./routes/tarefas');


app.use(bodyParser.json());
app.use(cors());
app.use('/api/tarefas', tarefasRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});