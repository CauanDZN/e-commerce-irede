const pgConnection = require('../databases/pgConnection')
const format = require('pg-format')

const list = async () => {
    const persons = await pgConnection.query('select * from pessoas;')

    return persons.rows
}

const create = async (newPerson) => {
    const poolTransaction = await pgConnection.connect()
    try {
        await poolTransaction.query('begin;')

        const result = await poolTransaction.query(
            `insert into pessoas (nome, idade) values ($1, $2) returning id;`, 
            [newPerson.name, newPerson.age]
        )

        const idNewUser = result.rows[0].id

        const phones = newPerson.phones
        if (phones.length > 0) {
            const phonesFormated = phones.map(phone => {
                return [ phone, idNewUser ]
            })

            await poolTransaction.query(
                format('insert into telefones (telefone, id_pessoa) values %L;', phonesFormated)
            )
        }

        await poolTransaction.query('commit;')

        return {
            id: idNewUser,
            ...newPerson
        }
    } catch (error) {
        await poolTransaction.query('rollback;')

        throw error
    } finally {
        poolTransaction.release()
    }
}

const findById = async (id) => {
    const persons = await pgConnection.query('select * from pessoas where id = $1;', [id])

    return persons.rows
}

module.exports = {
    list,
    create,
    findById
}