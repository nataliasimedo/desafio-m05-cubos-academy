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

const editarCliente = async (req, res, next) => {
    const { id } = req.params
    let { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const cliente = await knex('clientes').where({ id }).first()

        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
        }

        const existeEmail = await knex('clientes').where({ email }).first();

        if (existeEmail && existeEmail.id !== cliente.id) {
            return res.status(400).json({ mensagem: 'Já existe outro cliente cadastrado com o e-mail informado.' });
        }

        const existeCpf = await knex('clientes').where({ cpf }).first();

        if (existeCpf && existeCpf.id !== cliente.id) {
            return res.status(400).json({ mensagem: 'Já existe outro cliente cadastrado com o cpf informado.' });
        }

        await knex('clientes').update({
            nome,
            email,
            cpf,
            cep: cep ? cep : null,
            rua: rua ? rua : null,
            numero: numero ? numero : null,
            bairro: bairro ? bairro : null,
            cidade: cidade ? cidade : null,
            estado: estado ? estado : null
        }).where({ id })

        return res.status(204).send();


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

const detalharClientes = async (req, res) => {
    const { id } = req.params

    try {
        const cliente = await knex('clientes').where({ id }).first()

        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
        }

        return res.status(200).json(cliente)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    cadastrarCliente,
    listarClientes,
    editarCliente,
    detalharClientes
}