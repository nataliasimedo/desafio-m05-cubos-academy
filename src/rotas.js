const express = require('express');

const usuarios = require('./controladores/usuarios');
const { login } = require('./controladores/login');
const { listarCategorias } = require('./controladores/categorias');
const clientes = require('./controladores/clientes');
const { cadastrarProduto, editarProduto, listarProdutos, detalharProduto, excluirProduto } = require('./controladores/produtos');
const cadastrarPedido = require('./controladores/pedidos');

const validarRequisicao = require('./intermediarios/validarRequisicao');
const verificaToken = require('./intermediarios/verificaToken');
const validarCepCpf = require('./intermediarios/validarCepCpf');

const schemaUsuario = require('./validacoes/schemaUsuario');
const schemaLogin = require('./validacoes/schemaLogin');
const schemaCliente = require('./validacoes/schemaCliente');
const schemaProduto = require('./validacoes/schemaProduto');
const schemaPedido = require('./validacoes/schemaPedido');

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

rotas.post('/cliente', validarRequisicao(schemaCliente), validarCepCpf, clientes.cadastrarCliente);
rotas.put('/cliente/:id', validarRequisicao(schemaCliente), validarCepCpf, clientes.editarCliente)
rotas.get('/cliente', clientes.listarClientes);
rotas.get('/cliente/:id', clientes.detalharClientes)

rotas.post('/pedido', validarRequisicao(schemaPedido), cadastrarPedido)

module.exports = rotas;