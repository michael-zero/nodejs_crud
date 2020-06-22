
exports.up = knex => knex.schema.createTable('users', table => {
    table.string('id').primary(), 
    table.string('nome').notNullable(),
    table.string('email').notNullable().unique(),
    table.string('cpf').notNullable().unique()
})

exports.down = knex => knex.schema.dropTable('users');
