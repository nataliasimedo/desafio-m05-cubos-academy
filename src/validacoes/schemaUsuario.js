const joi = require('joi')

const schemaUsuario = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.',
        'string.base': 'O campo nome deve possuir um formato válido.'
    }),

    email: joi.string().required().email().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.base': 'O campo email deve possuir um formato válido.',
        'string.email': 'O campo email deve possuir um formato válido.'
    }),

    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.',
        'string.base': 'O campo senha deve possuir um formato válido.'
    })
})

module.exports = schemaUsuario