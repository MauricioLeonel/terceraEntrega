const express= require('express')
const rutas = express.Router()
const {nuevoCarrito,borraCarrito,nuevoProdCarrito,obtenerProdCarrito,borraProdCarrito,finalizarCarrito} = require('../controllers/controlerCarrito')
// Me permite listar todos los productos guardados en el carrito
rutas.get('/:id/productos',obtenerProdCarrito)

// Crea un carrito y devuelve su id
rutas.post('/',nuevoCarrito)

rutas.post('/finalizar',finalizarCarrito)

//Para incorporar productos al carrito por su id de producto
rutas.post('/:id/productos',nuevoProdCarrito)

//- Vacía un carrito y lo elimina.

rutas.delete('/:id',borraCarrito)

// Eliminar un producto del carrito por su id de carrito y de producto

rutas.delete('/:id/productos/:id_prod',borraProdCarrito)


module.exports = rutas