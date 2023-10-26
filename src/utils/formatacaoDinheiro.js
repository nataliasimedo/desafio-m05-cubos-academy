const formatacaoDinheiro = (valor) => {
    return `R$ ${Math.trunc((valor / 100))},${String(valor % 100).padStart(2, '0')}`
}

module.exports = formatacaoDinheiro