const knex = require("../conexao");

const listarCategorias = async (req, res) => {
    try {
        const categoriasListadas = await knex("categorias").select("descricao");

        return res.json(categoriasListadas);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

module.exports = {
    listarCategorias,
};