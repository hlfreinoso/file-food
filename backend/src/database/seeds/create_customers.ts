import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('CUSTOMERS').delete()
    await knex('CUSTOMERS').insert([
        { name: 'Dionei', email: 'dioneifaque@gmail.com', password: '123'},
        { name: 'Heitor', email: 'heitor@gmail.com', password: '123'},
        { name: 'Ramon', email: 'ramon@gmail.com', password: '123'},
        { name: 'luiz', email: 'luiz@gmail.com', password: '123'},
        { name: 'Manu', email: 'manu@gmail.com', password: '123'},
        { name: 'José', email: 'jose@gmail.com', password: '123'},
    ])
}