const knex = require("../conexao");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    const uf = estado ? estado.toUpperCase() : estado;

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
            estado: uf
        }).returning(['id', 'nome', 'email', 'cpf']);

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
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = {
    cadastrarCliente,
    listarClientes
}