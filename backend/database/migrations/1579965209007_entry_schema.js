'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntrySchema extends Schema {
  up () {
    this.create('entries', (table) => {
      table.increments()
      table.timestamps()
      table.string('content').notNullable()
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('board_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('boards')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('group_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('groups')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('entries')
  }
}

module.exports = EntrySchema
