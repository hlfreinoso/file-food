import { Request, Response } from 'express'
import knex from '../database/connection'

class QueuesController {
    async index(request: Request, response: Response) {
        const { idRestaurant, idCustomer } = request.query
        
        const queues = await knex('QUEUES')
                                .where(builder => {
                                    if (idRestaurant) builder.where('idRestaurant', String(idRestaurant))
                                    if (idCustomer) builder.where('idCustomer', String(idCustomer))
                                })
                                .orderBy('idQueue')
        
        return response.json(queues)

    }
    async show(request: Request, response: Response) {

    }
    async store(request: Request, response: Response) {        
        const trx = await knex.transaction()
        const { idCustomer, idRestaurant, numberPeople } = request.body
        
        const queue = {
            idRestaurant, 
            idCustomer, 
            numberPeople
        }
    
        const insertedIds = await trx('QUEUES').insert(queue)
        const ret = {idQueue: insertedIds[0], ...queue}

        await trx.commit()
    
        return response.json(ret)

    }
    async update(request: Request, response: Response) {
        const { id } = request.params
        const queue = request.body

        const ret = await knex('QUEUES').where('idQueue', id).update(queue)  
        
        return response.json(ret)
    }
    
    async destroy(request: Request, response: Response) {
        const { id } = request.params
        const queue = await knex('QUEUES').where('idQueue', id).delete()
        return response.json(queue)
    }
 
}

export default QueuesController