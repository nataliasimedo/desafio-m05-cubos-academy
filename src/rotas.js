// Importa o módulo `express` para criar um servidor web
const express = require('express');

// Importa o middleware `verificaToken` para verificar a autenticação do usuário
const verificaToken = require('./intermediarios/verificaToken');

// Importa o controlador `usuarios` para lidar com as rotas relacionadas a usuários
const usuarios = require('./controladores/usuarios');

// Importa o controlador `login` para lidar com a rota de login
const { login } = require('./controladores/login');

// Importa o controlador `listarCategorias` para lidar com a rota de listagem de categorias
const { listarCategorias } = require('./controladores/categorias');

// Cria uma instância do servidor Express
const rotas = express();

// Define a rota para listar as categorias
rotas.get('/categoria', listarCategorias);

// Define a rota para cadastrar um usuário
rotas.post('/usuario', usuarios.cadastrarUsuario);

// Define a rota para fazer login
rotas.post('/login', login);

// Define o middleware `verificaLogin` para todas as rotas protegidas
rotas.use(verificaToken);



// Define a rota para detalhar um usuário
rotas.get('/usuario', usuarios.detalharUsuario);

// Define a rota para atualizar um usuário
rotas.put('/usuario', usuarios.atualizarUsuario);

// Exporta as rotas da aplicação
module.exports = rotas;