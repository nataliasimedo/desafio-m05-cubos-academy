const knex = require("../conexao")

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {
        const categoriaIdValida = await knex('categorias').where({ id: categoria_id }).first()

        if (!categoriaIdValida) {
            return res.status(404).json({ mensagem: 'A categoria_id informada não foi encontrada.' })
        }

        const produto = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).returning('*')

        return res.status(201).json(produto[0])
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const editarProduto = async (req, res) => {
    const id = req.params.id;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const produtoExistente = await knex("produtos").where("id", id).first();

        if (!produtoExistente) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        const produtoEditado = await knex("produtos")
            .where("id", id)
            .update({ descricao, quantidade_estoque, valor, categoria_id });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const listarProdutos = async (req, res) => {
    const categoriaId = req.query.categoria_id;

    let produtos;

    if (categoriaId) {
        const produtoExistente = await knex("produtos").where("categoria_id", categoriaId).first();

        if (!produtoExistente) {
            return res.status(404).json({ mensagem: "Categoria não encontrada." });
        }

        produtos = await knex("produtos").where("categoria_id", categoriaId).select("descricao", "quantidade_estoque", "valor");
    } else {
        produtos = await knex("produtos").select("descricao", "quantidade_estoque", "valor");
    }

    return res.json(produtos);
};

const detalharProduto = async (req, res) => {
    const id = req.params.id;

    const produto = await knex("produtos").where("id", id).first();

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    return res.json(produto);
};

const excluirProduto = async (req, res) => {
    const id = req.params.id;

    const produto = await knex("produtos").where("id", id).first();

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    await knex("produtos").where("id", id).del();

    return res.status(204).send();
};

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProduto,
    excluirProduto
}