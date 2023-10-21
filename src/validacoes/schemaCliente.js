const joi = require('joi');

const schemaCliente = joi.object({
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

    cpf: joi.string().required().min(11).max(14).messages({
        'any.required': 'O campo cpf é obrigatório.',
        'string.empty': 'O campo cpf é obrigatório.',
        'string.base': 'O campo cpf deve possuir um formato válido.',
        'string.min': 'O campo cpf deve ter no mínimo 11 caracteres.',
        'string.max': 'O campo cpf aceita no máximo 14 caracteres.'
    }),

    cep: joi.string().length(8).messages({
        'string.base': 'O campo cep deve possuir um formato válido.',
        'string.length': 'O campo cep deve ter 8 caracteres numéricos.'
    }),

    rua: joi.string().messages({
        'string.base': 'O campo rua deve possuir um formato válido.'
    }),

    numero: joi.string().messages({
        'string.base': 'O campo numero deve ser do tipo texto.'
    }),

    bairro: joi.string().messages({
        'string.base': 'O campo bairro deve possuir um formato válido.'
    }),

    cidade: joi.string().messages({
        'string.base': 'O campo cidade deve possuir um formato válido.'
    }),

    estado: joi.string().min(2).max(2).messages({
        'string.base': 'O campo estado deve possuir um formato válido.',
        'string.min': 'O campo estado deve ser a sigla do estado.',
        'string.max': 'O campo estado deve ser a sigla do estado.'
    }),
})

module.exports = schemaCliente;