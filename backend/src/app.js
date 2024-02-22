const express = require('express')
const { personsRouter } = require('./routes')

const app = express()

app.use(express.json())

app.use('/persons', personsRouter)

app.listen(3000, () => console.log('Tá de pé!'))