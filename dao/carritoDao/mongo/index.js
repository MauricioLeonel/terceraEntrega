const ContainerMongo = require('../../../container/containerMongo');

class Carrito extends ContainerMongo{
	constructor(data){
		super(data)
	}

	getAllCarrito = async ()=>{
		return await this.getAll()
	}


	saveCarrito = async(data)=>{
		return await this.insertData(data)
	}
	getByCarritoId = async (element)=>{
		try{
			return await this.getById(element)
		}catch(e){
			return e
		}
	}
	updateByCarritoId = async (element,id_prod)=>{
		// console.log(element,id_prod)
		try{
			let carrito = await this.getById(id_prod,'carrito')

			if(carrito[0].producto.findIndex(e=>e._id === element._id) === -1){
				carrito[0].producto.push(element)
				return await this.updateById(...carrito,'carrito')
			}

			carrito[0].producto.map(e=>{
				if(e._id === element._id){
					e.cantidad +=1
				}
			})

			return await this.updateById(...carrito,'carrito')

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

			const carrito = await this.getById(id,'carrito')
			const producto = carrito[0].producto.filter(e=>e._id != id_prod)
			carrito[0].producto = producto
			// console.log(carrito)

			return await this.updateById(...carrito,'carrito')
		}catch(e){
			return e
		}
		
	}
}


module.exports =  Carrito



// return 'oki'

			//filtro 
			// const result = element.producto.filter(e=> e._id !== parseInt(id_prod) )
			// //asigno completo
			// element.producto = result
			// //actualizo
			// return await this.updateById(element)
