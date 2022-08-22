const ContainerProductos = require('../../../container/containerSql')

class Productos extends ContainerProductos{
	constructor(data){
		super(data)
		this.init()
	}
	init = async()=>{
		try{
			await this.create('carrito')
		}catch(e){
			await this.getAllCarrito()
		}
	}

	getAllCarrito = async ()=>{
		return await this.getAll('carrito')
	}

	saveCarrito = async(data)=>{
		return await this.insertData(data,'carrito')
	}
	// getByCarritoId = async (element)=>{
	// 	try{
	// 		return await this.getById(element,'carrito')
	// 	}catch(e){
	// 		return 'no hay data'
	// 	}
	// }

	getByCarritoId = async(element)=>{
		try{
			let result = await this.getByProdCarritoId(element,'carri_prod')
			return result
		}catch(e){
			return e
		}
	}
	
	updateByCarritoId = async (element,id)=>{
		try{
			// console.log(element,id)
			let carrito = await this.getById(id,'carrito')

			carrito[0].producto = {}
			carrito[0].producto = element
			// console.log(carrito)
			const data = {
				carrito_id:carrito[0].id,
				producto_id:carrito[0].producto.id,
				nombre:carrito[0].producto.nombre,
				descripcion:carrito[0].producto.descripcion,
				foto:carrito[0].producto.foto,
				codigo:carrito[0].producto.codigo,
				precio:carrito[0].producto.precio,
				stock:carrito[0].producto.stock,// no se porque agrego el stock pero va
				timestamp:carrito[0].producto.timestamp
			}

			return await this.insertData(data,'carri_prod')

			// return await this.deleteById(element,'carri_prod')
		}catch(e){
			return e
		}
	}
	borrarByCarritoId = async(id)=>{
		try{
			return this.deleteById(id)
		}catch(e){
			return 'no hubo Carritos'
		}
	}
	borrarByProdCarritoId = async(id,id_prod)=>{
		try{
			return await this.deleteProdCar(id,id_prod,'carri_prod')
		}catch(e){
			return e
		}
		
	}
}


module.exports =  Productos
