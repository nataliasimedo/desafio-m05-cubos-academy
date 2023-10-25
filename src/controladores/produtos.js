const knex = require("../conexao")

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {
        const categoriaIdValida = await knex('categorias').where({ id: categoria_id }).first()

        if (!categoriaIdValida) {
            return res.status(404).json({ mensagem: 'A categoria_id informada não foi encontrada.' })
        }

        const produtoExiste = await knex('produtos').where({ descricao }).first()

        if (produtoExiste) {
            return res.status(400).json({ mensagem: 'Um produto com essa descrição já foi cadastrado antes.' })
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

        const categoriaIdValida = await knex('categorias').where({ id: categoria_id }).first();
        if (!categoriaIdValida) {
            return res.status(400).json({ mensagem: 'A categoria_id informada não é válida.' });
        }

        const produtoIgual = await knex('produtos').where({ descricao }).first()

        if (produtoIgual && produtoIgual.id != id) {
            return res.status(400).json({ mensagem: 'Um outro produto com essa descrição já foi cadastrado antes.' })
        }

        await knex("produtos")
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

    try {
        if (categoriaId) {
            const categoriaExistente = await knex('categorias').where({ id: categoriaId }).first();

            if (!categoriaExistente) {
                return res.status(404).json({ mensagem: 'O id de categoria informado não existe.' });
            }

            produtos = await knex("produtos").where("categoria_id", categoriaId).select("*");
        } else {
            produtos = await knex("produtos").select("*");
        }

        return res.json(produtos);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const detalharProduto = async (req, res) => {
    const id = req.params.id;

    try {
        const produto = await knex("produtos").where("id", id).first();

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        return res.json(produto);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const excluirProduto = async (req, res) => {
    const id = req.params.id;
    const produtosPedidos = await knex("pedido_produtos").where("produto_id", id).select("produto_id");
  
    try {
      const produto = await knex("produtos").where("id", id).first();
  
      if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
      }
  
      if (produtosPedidos.length > 0) {
        return res.status(400).json({ mensagem: "Produto não pode ser excluído, pois foi feito algum pedido." });
      }
  
      await knex("produtos").where("id", id).del();
  
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ mensagem: error.message });
    }
  };

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProduto,
    excluirProduto
}