const knex = require("../conexao");
const { obterDadosEndereco } = require("../utils/endereco");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    let logradouro, bairroAtualizado, localidade, uf;
    try {

        if (cep) {
            const endereco = await obterDadosEndereco(cep, { rua, bairro, cidade, estado });

            if (typeof endereco === 'string') {
                return res.status(400).json({ mensagem: endereco });
            }

            logradouro = rua ? rua : endereco.rua;
            bairroAtualizado = bairro ? bairro : endereco.bairro;
            localidade = cidade ? cidade : endereco.cidade;
            uf = estado ? estado.toUpperCase() : endereco.estado

        }

        const existeEmail = await knex('clientes').where({ email }).first();

        if (existeEmail) {
            return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' });
        }

        const existeCpf = await knex('clientes').where({ cpf }).first();

        if (existeCpf) {
            return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o cpf informado.' });
        }

        const novoCliente = await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep,
            rua: logradouro ? logradouro : rua,
            numero,
            bairro: bairroAtualizado ? bairroAtualizado : bairro,
            cidade: localidade ? localidade : cidade,
            estado: uf ? uf : estado
        }).returning('*');

        return res.status(201).json(novoCliente);


    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes');
        return res.json(clientes);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    cadastrarCliente,
    listarClientes
}