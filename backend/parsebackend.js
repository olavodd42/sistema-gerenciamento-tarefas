const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const protectedRouter = require('./routes/protectedRoutes');
const authRouter = require('./routes/authRoutes');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/tarefas', protectedRouter);
app.use('/api/user', authRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});