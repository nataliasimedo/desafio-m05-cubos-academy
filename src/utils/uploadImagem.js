const formatarNome = (originalname, extensoes) => {
    let nomeFormatado = originalname.replace(' ', '');
    for (let extensao of extensoes) {
        const ext = originalname.lastIndexOf(extensao);

        if (ext !== -1) {
            nomeFormatado = `produto-imagem.${originalname.slice(ext)}`;
            break;
        }
    }
    return nomeFormatado;
}

module.exports = {
    formatarNome
}