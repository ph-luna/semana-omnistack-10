const express = require('express') //carrega o servidor express
const mongoose = require('mongoose') //carrega a api de conexao do mongodb
const cors = require('cors') // carrega o servico de acesso de varios endereços
const routes = require('./routes') //carrega o arquivo de rotas
const http = require('http') //carrega o servidor http padrão
const { setupWebSocket } = require('./websocket')


// METODOS HTTP: get, post, put, delete

// Tipos de parametros:

// Query Params: request.query (Filtros, ordenação, paginação ...)
// Router Params: request.params (Indentificar um recurso na alteração ou remoção) 
// Body: request.body (Dados para criação ou alteração de um registro)

const app = express() // instancia o servidor express no app
const server = http.Server(app) // extrai o servidor http de dentro do express

setupWebSocket(server) //envia o servidor para o websocket

// MongoDB (Não-Relacional)
mongoose.connect('mongodb+srv://admin:FfmvW5fvj7FknxcI@cluster0-ipqwy.mongodb.net/projetinho?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(cors())
app.use(express.json()) //permite reconhecer json em request de todos os tipos (post, get etcs)
//para definir um parametro em um unico tipo de request utiliza-se o metodo com respectivo nome do tipo (ex: app.get("parametro") )
app.use(routes) //instancia as rotas no app
server.listen(3333) //define qual porta utilizaremos no servidor
