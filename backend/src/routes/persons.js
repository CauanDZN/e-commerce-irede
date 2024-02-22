const express = require('express')
const personsController = require('../controllers/persons')

const router = express.Router()

router.get('/', personsController.list)
router.post('/', personsController.create)

module.exports = router