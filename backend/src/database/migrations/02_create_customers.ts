import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('CUSTOMERS', table => {
        table.increments('idCustomer').primary()
        table.string('name').notNullable()
        table.string('email')
        table.string('password')
        table.string('thumbnail')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('CUSTOMERS')
}