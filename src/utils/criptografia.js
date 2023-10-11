// Importa o módulo `bcrypt` para criptografar e validar senhas
const bcrypt = require('bcrypt');

// Função para criptografar uma senha
const criptografarSenha = async (senha) => {
    try {
        // Gera um salt aleatório
        const salt = await bcrypt.genSalt(10);

        // Criptografa a senha usando o salt
        return await bcrypt.hash(senha, salt);
    } catch (error) {
        console.error(error.message);
    }
};

// Função para validar uma senha
const validarSenha = async (senha, senhaCriptografada) => {
    try {
        // Compara a senha fornecida com a senha criptografada
        return await bcrypt.compare(senha, senhaCriptografada);
    } catch (error) {
        console.error(error.message);
    }
};

// Exporta as funções criptografarSenha e validarSenha
module.exports = {
    criptografarSenha,
    validarSenha
};