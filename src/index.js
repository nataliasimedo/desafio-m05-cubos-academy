// Importa o módulo `dotenv` para carregar as variáveis de ambiente
require('dotenv').config();

// Importa o módulo `express` para criar um servidor web
const express = require('express');

// Importa o arquivo `rotas.js` que contém as rotas da aplicação
const rotas = require('./rotas');

// Importa o módulo `cors` para habilitar o compartilhamento de recursos de origem cruzada (CORS)
const cors = require('cors');

// Cria uma instância do servidor Express
const app = express();

// Habilita o middleware para parsear requisições JSON
app.use(express.json());

// Habilita o middleware para CORS
app.use(cors());

// Define as rotas da aplicação
app.use(rotas);

// Obtém a porta da variável de ambiente `PORT` ou usa a porta 3000 por padrão
const port = process.env.PORT || 3000;

// Inicia o servidor na porta especificada
app.listen(port, () => console.log(`Servidor rodando na porta: ${port} 🚀`));