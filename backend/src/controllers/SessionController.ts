import { Request, Response } from 'express'
import knex from '../database/connection'

class SessionController {
    async login (request: Request, response: Response) {
        const { type, email, password } = request.body
        let login

        if (type == 'C') {
            login = await knex('CUSTOMERS')
                            .where('email', email)
                            .where('password', password)
                            .first()
        }   
        if (type == 'R') {
            login = await knex('RESTAURANTS')
                            .where('email', email)
                            .where('password', password)
                            .first()
        }

        if (!login) return response.status(401).json({ message: '(401) Unauthorized' })
        
        login.password = '****'

        return response.json(login)
        
    }
}

export default SessionController