module.exports = function (arrayAsString) {
    // funcao para quebrar uma string em um array de string separando por virgula
    return arrayAsString.split(',').map( n => n.trim())
}