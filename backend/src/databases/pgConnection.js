const { Pool } = require('pg')

const connection = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'admin',
    database: 'teste'
})

module.exports = connection
