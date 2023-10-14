const knex = require("../conexao");
const { criptografarSenha } = require("../utils/criptografia");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailExistente = await knex("usuarios").where("email", email).first();

        if (emailExistente) {
            return res.status(400).json({ mensagem: "Já existe usuário cadastrado com o e-mail informado." });
        }

        const senhaCriptografada = await criptografarSenha(senha);

        const usuario = await knex("usuarios")
            .insert({ nome, email, senha: senhaCriptografada })
            .returning(["id", "nome", "email"]);

        return res.status(201).json(usuario[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const detalharUsuario = async (req, res) => {
    try {
        return res.json(req.usuario);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const editarUsuario = async (req, res) => {
    const id = req.usuario.id;
    const { nome, email, senha } = req.body;

    try {
        const existeEmail = await knex('usuarios').select('email').where('id', '!=', id).andWhere({ email }).first();
        if (existeEmail) {
            return res.status(400).json({ mensagem: 'Já existe um usuário cadastrado com o e-mail informado.' });
        }

        const senhaCriptografada = await criptografarSenha(senha);

        const usuarioEditado = await knex('usuarios').where({ id }).update({ nome, email, senha: senhaCriptografada });
        if (!usuarioEditado) {
            return res.status(500).json({ mensagem: 'Ocorreu um erro ao atualizar o usuário' })
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    editarUsuario
};