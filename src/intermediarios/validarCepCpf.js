const { cpf } = require('cpf-cnpj-validator')
const axios = require('axios');

const validarCepCpf = async (req, res, next) => {
    const cpfCliente = req.body.cpf.replace('.', '').replace('-', '').trim()
    const { rua, bairro, cidade, estado } = req.body

    try {
        const cpfValido = cpf.isValid(cpfCliente)

        if (!cpfValido) {
            return res.status(400).json({ mensagem: 'CPF inválido.' })
        }

        req.body.cpf = cpf.format(cpfCliente)

        if (req.body.cep) {
            const cepCliente = req.body.cep.replace('.', '').replace('-', '').trim()

            if (isNaN(Number(cepCliente)) || cepCliente.length !== 8) {
                return res.status(400).json({ mensagem: 'CEP inválido.' })
            }

            const endereco = await axios.get(`https://viacep.com.br/ws/${cepCliente}/json/`)

            if (endereco.erro) {
                return res.status(400).json({ mensagem: 'CEP inválido.' })
            }

            req.body.rua = rua ? rua : endereco.data.logradouro
            req.body.bairro = bairro ? bairro : endereco.data.bairro
            req.body.cidade = cidade ? cidade : endereco.data.localidade
            req.body.estado = estado ? estado.toUpperCase() : endereco.data.uf
            req.body.cep = endereco.data.cep
        }

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = validarCepCpf