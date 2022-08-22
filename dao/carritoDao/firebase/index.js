const ContainerFirebase = require('../../../container/containerFirebase');

class Carrito extends ContainerFirebase{
	constructor(){
		super()
	}

	getAllCarrito = async ()=>{
		return await this.getAll('carrito')
	}


	saveCarrito = async(data)=>{
		const result = {...data,producto:[]}
		console.log(data)
			
		return await this.insertData(result,'carrito')
	}
	getByCarritoId = async (element)=>{
		
		try{
			return await this.getById(element,'carrito')
		}catch(e){
			return 'no hay data'
		}
	}
	updateByCarritoId = async (element,id)=>{
		try{
			let carrito = await this.getById(id,'carrito')
			carrito[0].producto.push(element)
			return await this.updateById(...carrito,'carrito')

		}catch(e){
			return e
		}
	}
	borrarByCarritoId = async(id)=>{
		try{
			return await this.deleteById(id,'carrito')
		}catch(e){
			return 'no hubo Carritos'
		}
	}
	borrarByProdCarritoId = async(id,id_prod)=>{
		try{

			const carrito = await this.getById(id,'carrito')
			const producto = carrito[0].producto.filter(e=>e._id != id_prod)
			carrito[0].producto = producto
			console.log(carrito)

			return await this.updateById(...carrito,'carrito')
		}catch(e){
			return e
		}
		
	}
}


module.exports =  Carrito

