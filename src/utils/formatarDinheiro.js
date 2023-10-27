const formatarDinheiro = (valorEmCentavos) => {
    const valorFormatado = `${Math.trunc((valorEmCentavos / 100))},${String(valorEmCentavos % 100).padStart(2, '0')}`
    return valorFormatado
}

module.exports = formatarDinheiro