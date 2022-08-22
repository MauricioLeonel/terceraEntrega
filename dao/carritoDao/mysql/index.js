const Container = require('../../../container/containerMysql')

class Carrito extends Container{
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

	saveProdCarrito = async(element)=>{
		try{
			const data = {
				carrito_id:element.id,
				producto_id:element.producto.id,
				nombre:element.producto.nombre,
				descripcion:element.producto.descripcion,
				foto:element.producto.foto,
				codigo:element.producto.codigo,
				precio:element.producto.precio,
				stock:element.producto.stock,// no se porque agrego el stock pero va
				timestamp:element.producto.timestamp
			}
			return await this.insertData(data,'carri_prod')
		}catch(e){
			return 'no se pudieron actulizar los datos'
		}
	}

	getByCarritoId = async(element)=>{
		try{
			let result = await this.getByProdCarritoId(element,'carri_prod')
			return result
		}catch(e){
			return e
		}
	}

	getByCarritoJoinId = async (element)=>{
		try{
			return await this.getByIdJoin(element,'carri_prod')
		}catch(e){
			return 'no hay data'
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
			return e
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


module.exports =  Carrito

