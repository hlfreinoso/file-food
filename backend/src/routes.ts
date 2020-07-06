import express from 'express'


import SessionController from './controllers/SessionController'
import RestaurantsController from './controllers/RestaurantsController'
import CustomersController from './controllers/CustomersController'
import QueuesController from './controllers/QueuesController'
import TablesController from './controllers/TablesController'

const routes = express.Router()

const sessionController = new SessionController()
const restaurantsController = new RestaurantsController()
const customersController = new CustomersController()
const tablesController = new TablesController()
const queuesController = new QueuesController()


routes.post('/sessions', sessionController.login)


routes.get('/restaurants', restaurantsController.index)
routes.get('/restaurants/:id', restaurantsController.show)
routes.post('/restaurants', restaurantsController.store)
routes.put('/restaurants/:id', restaurantsController.update)

routes.get('/customers', customersController.index)
routes.get('/customers/:id', customersController.show)
routes.post('/customers', customersController.store)
routes.put('/customers/:id', customersController.update)

routes.get('/tables', tablesController.index)
routes.get('/tables/:id', tablesController.show)
routes.post('/tables', tablesController.store)
routes.put('/tables/:id', tablesController.update)
routes.delete('/tables/:id', tablesController.destroy)

routes.get('/queues', queuesController.index)
routes.get('/queues/:id', queuesController.show)
routes.post('/queues', queuesController.store)
routes.put('/queues/:id', queuesController.update)
routes.delete('/queues/:id', queuesController.destroy)

export default routes