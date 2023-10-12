// Importa o módulo `knex` para acessar o banco de dados
const knex = require("../conexao");

// Importa a função `criptografarSenha` do módulo `utils/criptografia`
const { criptografarSenha } = require("../utils/criptografia");

// Função para cadastrar um novo usuário
const cadastrarUsuario = async (req, res) => {
    // Obtém os dados do usuário do corpo da requisição
    const { nome, email, senha } = req.body;

    // Valida se todos os campos são obrigatórios
    if (!nome || !email || !senha) {
        return res
            .status(400)
            .json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    // Tenta validar se o email já existe no banco de dados
    try {
        const emailExistente = await knex("usuarios").where("email", email).first();

        // Se o email já existir, retorna um erro
        if (emailExistente) {
            return res.status(400).json({ mensagem: "O email já existe." });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ mensagem: "Erro interno do servidor." });
    }

    // Criptografa a senha
    const senhaCriptografada = await criptografarSenha(senha);

    // Insere o novo usuário no banco de dados
    const usuario = await knex("usuarios")
        .insert({ nome, email, senha: senhaCriptografada })
        .returning(["id", "nome", "email"]);

    // Retorna o usuário cadastrado
    return res.status(200).json(usuario);
};

// Função para detalhar um usuário
const detalharUsuario = async (req, res) => {
    try {
		const usuarioAutenticado = {
			id: req.usuario.id,
			nome: req.usuario.nome,
			email: req.usuario.email
		}

		return res.json(usuarioAutenticado);
	} catch (error) {
      console.error(error);
		return res.status(500).json({ mensagem: "Erro interno do servidor." });
	}
};

// Função para atualizar um usuário
const atualizarUsuario = async (req, res) => {

};

// Exporta as funções cadastrarUsuario, detalharUsuario e atualizarUsuario
module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario
};