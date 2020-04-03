exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('name').notNullable()
    table.string('nickname')
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.boolean('email_verified').notNullable()
    table.string('token_recover_password')
    table.unique('email')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
