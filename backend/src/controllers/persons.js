const personsService = require('../services/persons')

const list = async (req, res) => {
    const { 
        errorMessage, 
        statusCode, 
        value 
    } = await personsService.list()

    const persons = value ? value : { message: errorMessage }

    return res.status(statusCode).json(persons)
}

const create = async (req, res) => {
    const { 
        errorMessage, 
        statusCode, 
        value 
    } = await personsService.create(req.body)

    const person = value ? value : { message: errorMessage }

    return res.status(statusCode).json(person)
}

module.exports = {
    list,
    create
}