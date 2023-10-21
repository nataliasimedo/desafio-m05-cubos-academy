const express = require('express');
const verificaToken = require('./intermediarios/verificaToken');
const usuarios = require('./controladores/usuarios');
const { login } = require('./controladores/login');
const { listarCategorias } = require('./controladores/categorias');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const clientes = require('./controladores/clientes');

const schemaUsuario = require('./validacoes/schemaUsuario');
const schemaLogin = require('./validacoes/schemaLogin');
const schemaCliente = require('./validacoes/schemaCliente');
const validarCpf = require('./intermediarios/validarCpf');


const rotas = express();

rotas.get('/categoria', listarCategorias);

rotas.post('/usuario', validarRequisicao(schemaUsuario), usuarios.cadastrarUsuario);
rotas.post('/login', validarRequisicao(schemaLogin), login);

rotas.use(verificaToken);

rotas.get('/usuario', usuarios.detalharUsuario);
rotas.put('/usuario', validarRequisicao(schemaUsuario), usuarios.editarUsuario);

rotas.get('/cliente', clientes.listarClientes);
rotas.post('/cliente', validarRequisicao(schemaCliente), validarCpf, clientes.cadastrarCliente);

module.exports = rotas;