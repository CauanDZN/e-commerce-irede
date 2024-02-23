const { Pool } = require('pg')

const connection = new Pool({
    host: 'localhost',
    user: 'cauan',
    port: 5432,
    password: 'cauan',
    database: 'irede'
})

module.exports = connection
