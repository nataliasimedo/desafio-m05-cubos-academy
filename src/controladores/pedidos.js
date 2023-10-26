const knex = require("../conexao");
const transport = require('../email')
const formatacaoDinheiro = require("../utils/formatacaoDinheiro");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body
  let valor_total = 0
  let listaDeProdutos = []
  let produtosHtml = ''

  try {
    const cliente = await knex('clientes').where({ id: cliente_id }).first()

    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
    }

    for (const item of pedido_produtos) {
      const produto = await knex('produtos').where({ id: item.produto_id }).first()

      if (!produto) {
        return res.status(404).json({ mensagem: `Não foi encontrado o produto de id ${item.produto_id}.` })
      }

      if (item.quantidade_produto > produto.quantidade_estoque) {
        return res.status(400).json({ mensagem: `O produto de id ${produto.id} não possui estoque suficiente.` })
      }

      valor_total += item.quantidade_produto * produto.valor

      const { id, ...dadosProduto } = produto
      listaDeProdutos.push({ ...item, ...dadosProduto })
    }

    const pedido = await knex('pedidos').insert({
      cliente_id,
      observacao,
      valor_total
    }).returning('*')

    for (const item of listaDeProdutos) {
      await knex('pedido_produtos').insert({
        pedido_id: pedido[0].id,
        produto_id: item.produto_id,
        quantidade_produto: item.quantidade_produto,
        valor_produto: item.valor
      })

      await knex('produtos').update({
        quantidade_estoque: item.quantidade_estoque - item.quantidade_produto
      }).where({ id: item.produto_id })

      const produtoInserido = await knex('produtos').where({ id: item.produto_id }).returning('*').first()

      produtosHtml += `
            <h2>${produtoInserido.descricao}</h2>
            <p>   Quantidade: ${item.quantidade_produto}</p>
            <p>   Valor unitário: ${formatacaoDinheiro(item.valor)}</p>
    `
    }

    const cabecalhoHtml = `
    <p>${cliente.nome}, verificamos que foi realizado um novo pedido no valor de ${formatacaoDinheiro(valor_total)}.</p>
    <p>id do pedido: ${pedido[0].id}</p>
    <h1>Produtos</h1>
    `

    const html = cabecalhoHtml + produtosHtml + '<p>Code Fusion</p>'

    transport.sendMail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: `${cliente.nome} <${cliente.email}>`,
      subject: `Novo pedido para ${cliente.nome}`,
      html
    })

    return res.status(201).json(pedido)
  } catch (error) {
    return res.status(500).json({ mensagem: error.message })
  }
}

module.exports = cadastrarPedido