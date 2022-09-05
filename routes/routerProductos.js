const express= require('express')
const rutas = express.Router()
const {nuevoProducto,consultaProducto,consultarAllProductos,actualizaProducto,borrarProducto,nuevoProductoRender}=require('../controllers/controlerProductos.js')
const {autenticacionUser,loginUser} = require('../middleware/autenticacion.js')




//obtengo TODOS los producos
rutas.get('/',loginUser,consultarAllProductos)//loginUser


rutas.get('/new', autenticacionUser,loginUser,nuevoProductoRender)


//disponible para usuarios y administradores
// Me permite listar todos los productos disponibles ó un producto por su id 
//el signo de pregunta hace que no sea obligatorio
rutas.get('/:id',loginUser,consultaProducto)





//ruta que envia el form de nuevo produto

//- Para incorporar productos al listado (disponible para administradores)
rutas.post('/',loginUser,nuevoProducto)
//Actualiza un producto por su id (disponible para administradores)
rutas.put('/:id',loginUser,actualizaProducto)

//Borra un producto por su id (disponible para administradores)
rutas.delete('/:id',loginUser,borrarProducto)


module.exports = rutas