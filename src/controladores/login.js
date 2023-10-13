const knex = require("../conexao");
const { validarSenha } = require("../utils/criptografia");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_PASS;

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await knex('usuarios').where({ email }).first();
        if (!usuario) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        const senhaValida = await validarSenha(senha, usuario.senha)
        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        const token = await jwt.sign({ id: usuario.id }, secret, { expiresIn: '8h' });

        const { senha: _, ...usuarioLogado } = usuario;
        return res.json({ usuario: usuarioLogado, token });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    login
}