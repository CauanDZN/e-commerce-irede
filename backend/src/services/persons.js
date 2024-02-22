const { personsModel, phonesModel } = require('../models')
const personValidate = require('./personValidations/persons')

const list = async () => {
    const persons = await personsModel.list()
    return {
        errorMessage: null,
        statusCode: 200,
        value: persons
    }
}

const create = async (person) => {
    // validando se os campos passados pelo cliente estão validos
    const errorMessage = personValidate.validateFields(person)
    if (errorMessage) {
        return {
            errorMessage,
            statusCode: 400,
            value: null
        }
    }
    // ---------------------------------------------

    // validando se algum numero ja esta cadastrado
    const phonesInDB = await phonesModel.findPhones(person.phones)
    if (phonesInDB.length > 0) {
        return {
            errorMessage: `Phone ${phonesInDB[0].telefone} already exists!`,
            statusCode: 422,
            value: null
        }
    }
    // ---------------------------------------------

    // criando a pessoa solicitada -----------------
    const newPerson = await personsModel.create(person)
    return {
        errorMessage: null,
        statusCode: 201,
        value: newPerson
    }
    // ---------------------------------------------
}

module.exports = {
    list,
    create
}