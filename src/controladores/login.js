const knex = require("../conexao");
const { validarSenha } = require("../utils/criptografia");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_PASS;

const login = async (req, res) => {
    const { email, senha } = req.body;

    //valida se as credenciais estão sendo passadas
    if (!email || !senha) {
        return res.status(401).json({ mensagem: "É preciso se autenticar." })
    }

    try {
        //verifica se existe um usuario com o email informado
        const usuario = await knex('usuarios').where({ email }).first();
        if (!usuario) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }
        //valida a senha
        const senhaValida = await validarSenha(senha, usuario.senha)
        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        //gera token de autenticacao para o usuario validado
        const token = await jwt.sign({ id: usuario.id }, secret, { expiresIn: '8h' });

        const { senha: _, ...usuarioLogado } = usuario;
        return res.json({ usuario: usuarioLogado, token });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    login
}