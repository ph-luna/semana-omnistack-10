const {Router} = require('express') //carrega apenas o atributo 'Router' do objeto 'express'
const DevController = require('./controllers/dev-controller')
const SearchController = require('./controllers/search-controller')

const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.get('/search', SearchController.index)
//routes.post('/update', DevController.update)

module.exports = routes