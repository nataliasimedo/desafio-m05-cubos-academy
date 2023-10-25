const knex = require("../conexao");
const { uploadImagem } = require("../servicos/uploads");

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const produto_imagem = req.file

    try {
        const categoriaIdValida = await knex('categorias').where({ id: categoria_id }).first()

        if (!categoriaIdValida) {
            return res.status(404).json({ mensagem: 'A categoria_id informada não foi encontrada.' })
        }

        const produtoExiste = await knex('produtos').where({ descricao }).first()

        if (produtoExiste) {
            return res.status(400).json({ mensagem: 'Um produto com essa descrição já foi cadastrado antes.' })
        }

        let produto = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).returning('*')

        if (!produto) {
            return res.status(400).json({ mensagem: 'O produto não foi cadastrado.' })
        }

        const idProduto = produto[0].id;

        if (produto_imagem) {
            const { originalname, mimetype, buffer } = produto_imagem
            const imagem = await uploadImagem(
                `${idProduto}/${originalname}`, buffer, mimetype)

            produto = await knex('produtos')
                .where('id', idProduto)
                .update('produto_imagem', imagem)
                .returning('*');
        }

        return res.status(201).json(produto[0])
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const editarProduto = async (req, res) => {
    const id = req.params.id;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const produto_imagem = req.file;

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

        const imagemUrl = produto_imagem ? await uploadImagem(`${id}/${produto_imagem.originalname}`, produto_imagem.buffer, produto_imagem.mimetype) : undefined;

        await knex("produtos")
            .where("id", id)
            .update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: imagemUrl });

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

    try {
        const produto = await knex("produtos").where("id", id).first();

        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
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