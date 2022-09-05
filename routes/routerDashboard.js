const rutas = require('express').Router();
const controllerDashboard = require('../controllers/controlerDashboard.js')



rutas.get('/',controllerDashboard.dashboard)



module.exports = rutas