const bcrypt = require('bcrypt');

const criptografarSenha = async (senha) => {
    try {
        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash(senha, salt);
    } catch (error) {
        console.error(error.message);
    }
};

const validarSenha = async (senha, senhaCriptografada) => {
    try {
        return await bcrypt.compare(senha, senhaCriptografada);
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = {
    criptografarSenha,
    validarSenha
};