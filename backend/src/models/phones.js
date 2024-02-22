const pgConnection = require('../databases/pgConnection')

const findPhones = async (phones) => {
    const phonesInDB = await pgConnection.query('select * from telefones where telefone in ($1);', [...phones])

    return phonesInDB.rows
}

module.exports = {
    findPhones
}