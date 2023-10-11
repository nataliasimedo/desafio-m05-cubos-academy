// Importa a biblioteca Knex.js
const knex = require('knex')({
    // Configura a conexão com o banco de dados PostgreSQL
    client: 'pg',
    connection: {
      host: process.env.DB_HOST, // Host do banco de dados
      port: process.env.DB_PORT, // Porta do banco de dados
      user: process.env.DB_USER, // Usuário do banco de dados
      password: process.env.DB_PASS, // Senha do banco de dados
      database: process.env.DB_NAME, // Nome do banco de dados
      ssl: { rejectUnauthorized: false } // Desativa a verificação de SSL
    }
  })
  
  // Exporta a instância do Knex.js
  module.exports = knex