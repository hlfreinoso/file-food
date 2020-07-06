import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('TABLES').delete()
    await knex('TABLES').insert([
        {idRestaurant: 1, maxPeople: 2, name: 'Mesa 01'},
        {idRestaurant: 1, maxPeople: 2, name: 'Mesa 02'},
        {idRestaurant: 1, maxPeople: 2, name: 'Mesa 03'},
        {idRestaurant: 1, maxPeople: 2, name: 'Mesa 04'},
        {idRestaurant: 1, maxPeople: 2, name: 'Mesa 05'},
        {idRestaurant: 1, maxPeople: 2, name: 'Mesa 06'},
        {idRestaurant: 1, maxPeople: 2, name: 'Mesa 07'},

        {idRestaurant: 2, maxPeople: 2, name: 'Mesa Casal 01'},
        {idRestaurant: 2, maxPeople: 2, name: 'Mesa Casal 02'},
        {idRestaurant: 2, maxPeople: 4, name: 'Mesa Amigos 01'},
        {idRestaurant: 2, maxPeople: 4, name: 'Mesa Amigos 02'},
        {idRestaurant: 2, maxPeople: 8, name: 'Mesa Familia'}
    ])
}