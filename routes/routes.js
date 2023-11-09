const controllers = require('../controllers/registration')
const express = require('express')

const route = express.Router()

route.post('/register', controllers.register)

module.exports = route