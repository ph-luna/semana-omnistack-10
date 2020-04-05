const axios = require('axios') //carrega o objeto axios
const Dev = require('../models/dev') //carrega o arquivo dev.js
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

// FUNÇÕES BASICAS DE UM CONTROLLER
// index: mostra uma lista de todos os recurso
// show: mostrar apenas um recursos com suas informações detalhadas
// store: criar um novo recurso 
// update: alterar dados de um recurso ja existente
// destroy: excluir o recurso e todos os seus dados

module.exports = {

    async index(request, response){
        const devs = await Dev.find()
        
        return response.json(devs)
    },

    async store(request, response) {
        const {github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if(!dev){

            const githubResponse = await axios.get(`http://api.github.com/users/${github_username}`)
            
            const { name = login, avatar_url, bio} = githubResponse.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            // Filtrar as conexões que estão há no maximo 10km de distancia
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas

            const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray)
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }


        return response.json(dev)
    }

    /*async update(request, response) {
        /*const { github_username, techs, name, avatar_url, bio, latitude, longitude } = request.body


        const techsArray = parseStringAsArray(techs)

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        

        /*await Dev.updateOne({github_username},{
            $set: {
                techs: techsArray,
                name,
                avatar_url,
                bio,
                location
            }
        })

       // return response({ message: "dev atualizado" })
    }*/
}