// Importa o módulo `knex` para acessar o banco de dados
const knex = require("../conexao");

// Lista todas as categorias do banco de dados
const listarCategorias = async (req, res) => {
    try {
        // Obtém a descrição de todas as categorias
        const categoriasListadas = await knex("categorias").select("descricao");

        // Retorna a lista de categorias
        return res.json(categoriasListadas);
    } catch (error) {
        // Imprime o erro no console
        const message = error.message;
        console.error(message);

        // Retorna um erro interno do servidor
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};

// Exporta a função `listarCategorias`
module.exports = {
    listarCategorias,
};