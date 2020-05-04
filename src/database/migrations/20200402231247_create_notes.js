exports.up = (knex) => {
	return knex.schema.createTable('notes', (table) => {
		table.increments()
		table.string('title').notNullable()
		table.string('content').notNullable()
		table.date('created_at').notNullable().defaultTo(knex.fn.now())
		table.date('updated_at').notNullable()

		table.bigInteger('user_id').notNullable()
		table.foreign('user_id').references('id').inTable('users')
	})
}

exports.down = (knex) => {
	return knex.schema.dropTable('users')
}
