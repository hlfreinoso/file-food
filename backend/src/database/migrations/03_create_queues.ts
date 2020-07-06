import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('QUEUES', table => {
        table.increments('idQueue').primary()

        table.integer('idRestaurant')
            .notNullable()
            .references('idRestaurant')
            .inTable('RESTAURANTS')

        table.integer('idCustomer')
            .notNullable()
            .references('idCustomer')
            .inTable('CUSTOMERS')
        
        table.integer('numberPeople')
        table.timestamp('regTime').defaultTo(knex.fn.now())
        table.string('status').defaultTo('W')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('QUEUES')
}