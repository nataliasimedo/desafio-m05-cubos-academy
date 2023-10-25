const knex = require("../conexao");
const transport = require('../email')
const compiladorHtml = require('../utils/compiladorHtml')

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body
    let valor_total = 0
    let listaDeProdutos = []

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
        }

        const valorPedidoFormatado = `${Math.trunc((valor_total / 100))},${valor_total % 100}`
        const html = await compiladorHtml('./src/templates/pedido.html', {
            nomeCliente: cliente.nome,
            idPedido: pedido[0].id,
            valorPedido: valorPedidoFormatado
        })

        transport.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${cliente.nome} <${cliente.email}>`,
            subject: 'Novo pedido',
            html
        })

        return res.status(201).json(pedido)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const listarPedidos = async (req, res) => {
    try {
      const clienteId = req.query.cliente_id;
      let pedidos;
  
      if (clienteId) {
        pedidos = await knex('pedidos')
          .where('cliente_id', clienteId)
          .select('pedidos.id', 'pedidos.valor_total', 'pedidos.observacao', 'pedidos.cliente_id')
          .join('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
          .select('pedido_produtos.id', 'pedido_produtos.quantidade_produto', 'pedido_produtos.valor_produto', 'pedido_produtos.pedido_id', 'pedido_produtos.produto_id');
      } else {
        pedidos = await knex('pedidos')
          .select('pedidos.id', 'pedidos.valor_total', 'pedidos.observacao', 'pedidos.cliente_id')
          .join('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
          .select('pedido_produtos.id', 'pedido_produtos.quantidade_produto', 'pedido_produtos.valor_produto', 'pedido_produtos.pedido_id', 'pedido_produtos.produto_id');
      }
  
      const formattedPedidos = pedidos.map((pedido) => ({
        pedido: {
          id: pedido.id,
          valor_total: pedido.valor_total,
          observacao: pedido.observacao || null,
          cliente_id: pedido.cliente_id,
        },
        pedido_produtos: pedido.pedido_produtos.map((pedido_produto) => ({
          id: pedido_produto.id,
          quantidade_produto: pedido_produto.quantidade_produto,
          valor_produto: pedido_produto.valor_produto,
          pedido_id: pedido_produto.pedido_id,
          produto_id: pedido_produto.produto_id,
        })),
      }));
  
      res.status(200).json(formattedPedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
  

module.exports = {
    cadastrarPedido,
    listarPedidos
}