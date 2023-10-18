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

module.exports = {
    cadastrarProduto
}