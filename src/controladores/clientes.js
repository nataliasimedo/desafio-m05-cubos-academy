const knex = require("../conexao");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
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
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).returning('*');

        return res.status(201).json(novoCliente[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

const editarCliente = async (req, res) => {
    const { id } = req.params
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

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
        const clientes = await knex('clientes').orderBy('id');
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