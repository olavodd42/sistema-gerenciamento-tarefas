// db.js

const { Pool } = require('pg');

// Configuração do pool de conexão
const pool = new Pool({
  user: 'postgres', // Substitua pelo usuário do seu PostgreSQL
  host: '127.0.0.1',   // Endereço do servidor
  database: 'tasks', // Nome do banco de dados
  password: '123456', // Senha do usuário
  port: 5432,           // Porta padrão do PostgreSQL
});

// Testar a conexão
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar ao banco de dados:', err.stack);
  }
  console.log('Conexão bem-sucedida ao banco de dados PostgreSQL');
  release(); // Liberar o cliente
});

module.exports = pool;
