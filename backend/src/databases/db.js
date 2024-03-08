const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'cauan',
    password: 'cauan',
    database: 'irede'
})

module.exports = pool