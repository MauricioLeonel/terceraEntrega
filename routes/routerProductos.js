const express= require('express')
const rutas = express.Router()
const {nuevoProducto,consultaProducto,consultarAllProductos,actualizaProducto,borrarProducto}=require('../controllers/controlerProductos.js')
const {autenticacionUser,loginUser} = require('../middleware/autenticacion.js')

//disponible para usuarios y administradores
// Me permite listar todos los productos disponibles ó un producto por su id 
//el signo de pregunta hace que no sea obligatorio
rutas.get('/:id',autenticacionUser,consultaProducto)//loginUser


//obtengo TODOS los producos
rutas.get('/',autenticacionUser,consultarAllProductos)//loginUser

//- Para incorporar productos al listado (disponible para administradores)
rutas.post('/',autenticacionUser,nuevoProducto)//loginUser
//Actualiza un producto por su id (disponible para administradores)
rutas.put('/:id',autenticacionUser,actualizaProducto)//loginUser

//Borra un producto por su id (disponible para administradores)
rutas.delete('/:id',autenticacionUser,borrarProducto)//loginUser


module.exports = rutas