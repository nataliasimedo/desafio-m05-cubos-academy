const aws = require('aws-sdk');
const { formatarNome } = require('../utils/imagem-produto');

const endpoint = new aws.Endpoint(process.env.ENDPOINT_BACKBLAZE);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const uploadImagem = async (path, idProduto, buffer, mimetype) => {
    const pathFormatado = formatarNome(path);
    const imagem = await s3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: `produtos/${idProduto}/${pathFormatado}`,
        Body: buffer,
        ContentType: mimetype
    }).promise();

    return `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/${imagem.Key}`;
}

const excluirImagem = async (link) => {
    const pathImagem = `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/`
    const key = link.replace(pathImagem, '')

    await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: key
    }).promise()
}

module.exports = {
    uploadImagem,
    excluirImagem
}