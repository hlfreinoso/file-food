import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('TABLES', table => {
        table.increments('idTable').primary()

        table.integer('idRestaurant')
            .notNullable()
            .references('idRestaurant')
            .inTable('RESTAURANTS')

        table.string('name')
        table.integer('maxPeople')
        table.string('status').defaultTo('F')
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('TABLES')
}