const joi = require('joi')

const schemaPedido = joi.object({
    cliente_id: joi.number().integer().min(0).required().messages({
        'any.required': 'O campo cliente_id é obrigatório.',
        'number.base': 'O campo cliente_id deve ser um número inteiro.',
        'number.integer': 'O campo cliente_id deve ser um número inteiro.',
        'number.min': 'O campo cliente_id não pode ser um número negativo.'
    }),

    observacao: joi.string().max(255).messages({
        'string.base': 'O campo observacao deve ser do tipo texto.',
        'string.max': 'O campo observacao pode ter no máximo 255 caracteres.'
    }),

    pedido_produtos: joi.array().required().min(1).items(joi.object({
        produto_id: joi.number().integer().min(0).required().messages({
            'any.required': 'Em todos produtos o campo produto_id é obrigatório.',
            'number.base': 'Em todos produtos o campo produto_id deve ser um número inteiro.',
            'number.integer': 'Em todos produtos o campo produto_id deve ser um número inteiro.',
            'number.min': 'Em nenhum produto o campo produto_id pode ser um número negativo.'
        }),

        quantidade_produto: joi.number().integer().min(1).required().messages({
            'any.required': 'Em todos produtos o campo quantidade_produto é obrigatório.',
            'number.base': 'Em todos produtos o campo quantidade_produto deve ser um número inteiro.',
            'number.integer': 'Em todos produtos o campo quantidade_produto deve ser um número inteiro.',
            'number.min': 'Em nenhum produto o campo quantidade_produto pode ser um número negativo.'
        })
    })).messages({
        'any.required': 'O campo pedido_produtos é obrigatório.',
        'array.min': 'O campo pedido_produtos teve conter ao menos 1 produto.',
        'object.base': 'Cada item do campo pedido_produtos deve ser um objeto.'
    })
})

module.exports = schemaPedido