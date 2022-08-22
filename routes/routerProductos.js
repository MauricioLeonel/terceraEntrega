const express= require('express')
const rutas = express.Router()
const {nuevoProducto,consultaProducto,consultarAllProductos,actualizaProducto,borrarProducto}=require('../controllers/controlerProductos.js')
const {autenticacionUser,loginUser} = require('../middleware/autenticacion.js')

//disponible para usuarios y administradores
// Me permite listar todos los productos disponibles ó un producto por su id 
//el signo de pregunta hace que no sea obligatorio
rutas.get('/:id',autenticacionUser,loginUser,consultaProducto)


//obtengo TODOS los producos
rutas.get('/',autenticacionUser,loginUser,consultarAllProductos)//loginUser

//- Para incorporar productos al listado (disponible para administradores)
rutas.post('/',autenticacionUser,loginUser,nuevoProducto)
//Actualiza un producto por su id (disponible para administradores)
rutas.put('/:id',autenticacionUser,loginUser,actualizaProducto)

//Borra un producto por su id (disponible para administradores)
rutas.delete('/:id',autenticacionUser,loginUser,borrarProducto)


module.exports = rutas