import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'issues'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('audit_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('audits')
        .onDelete('CASCADE')

      table.string('type').notNullable()
      table.string('severity').notNullable()
      table.text('element').notNullable()
      table.text('description').notNullable()
      table.text('recommendation').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
