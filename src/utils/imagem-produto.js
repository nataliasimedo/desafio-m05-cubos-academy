const formatarNome = (originalname) => {
    const posicaoExtensao = originalname.lastIndexOf('.');
    return `produto-imagem${originalname.slice(posicaoExtensao)}`;
}

module.exports = {
    formatarNome
}