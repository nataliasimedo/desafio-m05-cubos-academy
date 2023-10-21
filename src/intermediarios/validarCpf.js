const validarCpf = (req, res, next) => {
    let { cpf } = req.body;

    cpf = cpf.replaceAll('.', '').replaceAll('-', '').trim();

    if (isNaN(cpf)) {
        return res.status(400).json({ mensagem: 'O campo CPF deve ser numérico.' });
    }

    if (cpf.length !== 11) {
        return res.status(400).json({ mensagem: 'CPF inválido. Deve conter exatamente 11 dígitos numéricos.' });
    }

    req.body.cpf = cpf;

    next();
}


module.exports = validarCpf;