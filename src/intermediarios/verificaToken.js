const jwt = require("jsonwebtoken");
const secret = process.env.JWT_PASS;
const knex = require("../conexao");

const verificaToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
    }

    const token = authorization.split(' ')[1];

    try {
        const tokenValido = await jwt.verify(token, secret);
        const usuario = await knex('usuarios').where({ id: tokenValido.id }).first();

        if (!usuario) {
            return response.status(401).json({ mensagem: 'Não autorizado.' });
        }

        const { senha: _, ...user } = usuario;
        req.usuario = user;
        next();

    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado.' });
    }
}

module.exports = verificaToken