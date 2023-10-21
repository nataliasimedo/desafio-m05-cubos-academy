const express = require('express');

const usuarios = require('./controladores/usuarios');
const { login } = require('./controladores/login');
const { listarCategorias } = require('./controladores/categorias');
const clientes = require('./controladores/clientes');
const { cadastrarProduto, editarProduto, listarProdutos, detalharProduto, excluirProduto } = require('./controladores/produtos');

const validarRequisicao = require('./intermediarios/validarRequisicao');
const validarCpf = require('./intermediarios/validarCpf');
const verificaToken = require('./intermediarios/verificaToken');

const schemaUsuario = require('./validacoes/schemaUsuario');
const schemaLogin = require('./validacoes/schemaLogin');
const schemaCliente = require('./validacoes/schemaCliente');
const schemaProduto = require('./validacoes/schemaProduto');

const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validarRequisicao(schemaUsuario), usuarios.cadastrarUsuario);
rotas.post('/login', validarRequisicao(schemaLogin), login);

rotas.use(verificaToken);

rotas.get('/usuario', usuarios.detalharUsuario);
rotas.put('/usuario', validarRequisicao(schemaUsuario), usuarios.editarUsuario);

rotas.post('/produto', validarRequisicao(schemaProduto), cadastrarProduto);
rotas.put('/produto/:id', validarRequisicao(schemaProduto), editarProduto);
rotas.get('/produto', listarProdutos);
rotas.get('/produto/:id', detalharProduto);
rotas.delete('/produto/:id', excluirProduto);

rotas.post('/cliente', validarRequisicao(schemaCliente), validarCpf, clientes.cadastrarCliente);
rotas.put('/cliente/:id', validarRequisicao(schemaCliente), validarCpf, clientes.editarCliente)
rotas.get('/cliente', clientes.listarClientes);
rotas.get('/cliente/:id', clientes.detalharClientes)

module.exports = rotas;