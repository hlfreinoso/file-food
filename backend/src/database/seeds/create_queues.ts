import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('QUEUES').delete()
    await knex('QUEUES').insert([
        {idCustomer: 1, idRestaurant: 1, numberPeople: 2},
        {idCustomer: 2, idRestaurant: 1, numberPeople: 2},
        {idCustomer: 3, idRestaurant: 1, numberPeople: 2},

        {idCustomer: 2, idRestaurant: 2, numberPeople: 2},
        {idCustomer: 1, idRestaurant: 2, numberPeople: 2},
        {idCustomer: 4, idRestaurant: 2, numberPeople: 2},
        {idCustomer: 3, idRestaurant: 2, numberPeople: 2}
    ])
}
