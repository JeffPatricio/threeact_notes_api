exports.seed = (knex) => {
  return knex('notes').del().then(() => {
    return knex('notes').insert([
      { title: 'anotação 1', content: 'esta é uma anotação top', created_at: new Date(), user_id: 1 },
      { title: 'anotação 2', content: 'esta é uma anotação top', created_at: new Date(), user_id: 1 },
      { title: 'anotação 3', content: 'esta é uma anotação top', created_at: new Date(), user_id: 2 },
      { title: 'anotação 4', content: 'esta é uma anotação top', created_at: new Date(), user_id: 2 },
      { title: 'anotação 5', content: 'esta é uma anotação top', created_at: new Date(), user_id: 3 },
      { title: 'anotação 6', content: 'esta é uma anotação top', created_at: new Date(), user_id: 3 },
    ])
  })
}
