const joi = require('joi');

const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.',
        'string.base': 'O campo nome deve ser do tipo texto.'
    }),

    email: joi.string().required().email().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email é obrigatório.',
        'string.base': 'O campo email deve ser do tipo texto.',
        'string.email': 'O campo email deve possuir um formato válido.'
    }),

    cpf: joi.string().required().min(11).max(14).messages({
        'any.required': 'O campo cpf é obrigatório.',
        'string.empty': 'O campo cpf é obrigatório.',
        'string.base': 'O campo cpf deve ser do tipo texto.',
        'string.min': 'O campo cpf deve ter no mínimo 11 caracteres.',
        'string.max': 'O campo cpf aceita no máximo 14 caracteres.'
    }),

    cep: joi.string().min(8).max(10).messages({
        'string.base': 'O campo cep deve ser do tipo texto.',
        'string.min': 'O campo cep deve ter no mínimo 8 caracteres.',
        'string.max': 'O campo cep aceita no máximo 10 caracteres.'
    }),

    rua: joi.string().messages({
        'string.base': 'O campo rua deve ser do tipo texto.'
    }),

    numero: joi.string().messages({
        'string.base': 'O campo numero deve ser do tipo texto.'
    }),

    bairro: joi.string().messages({
        'string.base': 'O campo bairro deve ser do tipo texto.'
    }),

    cidade: joi.string().messages({
        'string.base': 'O campo cidade deve ser do tipo texto.'
    }),

    estado: joi.string().min(2).max(2).messages({
        'string.base': 'O campo estado deve ser do tipo texto.',
        'string.min': 'O campo estado deve ser a sigla do estado.',
        'string.max': 'O campo estado deve ser a sigla do estado.'
    }),
})

module.exports = schemaCliente;