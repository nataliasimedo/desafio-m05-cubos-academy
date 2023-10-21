const axios = require('axios');

const obterDadosEndereco = async (cep, dadosEndereco) => {
    try {
        const endereco = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        if (!("erro" in endereco.data)) {
            dadosEndereco.rua = endereco.data.logradouro;
            dadosEndereco.bairro = endereco.data.bairro;
            dadosEndereco.cidade = endereco.data.localidade;
            dadosEndereco.estado = endereco.data.uf;
            return dadosEndereco;
        } else {
            return 'CEP inválido.';
        }

    } catch (error) {
        console.error(error.message);
    }
};

module.exports = {
    obterDadosEndereco
}