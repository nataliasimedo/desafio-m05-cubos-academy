const express = require('express');
const verificaToken = require('./intermediarios/verificaToken');
const usuarios = require('./controladores/usuarios');
const { login } = require('./controladores/login');
const { listarCategorias } = require('./controladores/categorias');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const schemaUsuario = require('./validacoes/schemaUsuario');
const schemaLogin = require('./validacoes/schemaLogin');
const schemaProduto = require('./validacoes/schemaProduto');
const { cadastrarProduto } = require('./controladores/produtos');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validarRequisicao(schemaUsuario), usuarios.cadastrarUsuario);
rotas.post('/login', validarRequisicao(schemaLogin), login);

rotas.use(verificaToken);

rotas.get('/usuario', usuarios.detalharUsuario);
rotas.put('/usuario', validarRequisicao(schemaUsuario), usuarios.editarUsuario);

rotas.post('/produto', validarRequisicao(schemaProduto), cadastrarProduto)

module.exports = rotas;