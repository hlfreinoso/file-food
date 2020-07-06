import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('RESTAURANTS', table => {
        table.increments('idRestaurant').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('adress').notNullable()
        table.string('uf', 2).notNullable()
        table.string('city').notNullable()
        table.integer('maxWaitTime').notNullable()
        table.string('password').notNullable()
        table.string('thumbnail')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('RESTAURANTS')
}