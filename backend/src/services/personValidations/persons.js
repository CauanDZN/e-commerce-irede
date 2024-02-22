const validateFields = (person) => {
    if (!person.name || typeof person.name !== 'string') {
        return 'Name invalid!'
    }

    if (!person.age || typeof person.age !== 'number') {
        return 'Age invalid!'
    }

    if (!Array.isArray(person.phones)) {
        return 'Phones invalid!'
    }

    if (person.phones.some(p => typeof p !== 'number')) {
        return 'Some phone is invalid!'
    }

    return ''
}

module.exports = {
    validateFields
}