const joi = require('joi')

const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descricao é obrigatório.',
        'string.empty': 'O campo descricao é obrigatório.',
        'string.base': 'O campo descricao deve possuir um formato válido.'
    }),

    quantidade_estoque: joi.number().integer().min(0).required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório.',
        'number.base': 'O campo quantidade_estoque deve ser um número inteiro.',
        'number.integer': 'O campo quantidade_estoque deve ser um número inteiro.',
        'number.min': 'O campo quantidade_estoque não pode ser um número negativo.'
    }),

    valor: joi.number().integer().min(0).required().messages({
        'any.required': 'O campo valor é obrigatório.',
        'number.base': 'O campo valor deve ser um número inteiro.',
        'number.integer': 'O campo valor deve ser um número inteiro.',
        'number.min': 'O campo valor não pode ser um número negativo.'
    }),

    categoria_id: joi.number().integer().min(0).required().messages({
        'any.required': 'O campo categoria_id é obrigatório.',
        'number.base': 'O campo categoria_id deve ser um número inteiro.',
        'number.integer': 'O campo categoria_id deve ser um número inteiro.',
        'number.min': 'O campo categoria_id não pode ser um número negativo.'
    })
})

module.exports = schemaProduto