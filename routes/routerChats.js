const rutas = require('express').Router()
const {consultaChats} = require('../controllers/controlerChats.js')

rutas.get('/',consultaChats)


module.exports = rutas