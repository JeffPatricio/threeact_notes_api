exports.seed = (knex) => {
  return knex('users').del().then(() => {
    return knex('users').insert([
      { name: 'Jefferson', nickname: 'Jefsão', email: 'jefferson@gmail.com', password: '12345', email_verified: true },
      { name: 'Edgar', nickname: 'Gaspar', email: 'edgar@gmail.com', password: '12345', email_verified: true },
      { name: 'André', nickname: 'Gordão', email: 'andre@gmail.com', password: '12345', email_verified: true },
    ])
  })
}
