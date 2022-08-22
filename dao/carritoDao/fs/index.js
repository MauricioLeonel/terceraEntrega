const ContainerFs = require('../../../container/containerFs')

class Carritos extends ContainerFs{
	constructor(file){
		super(file)
	}

	saveCarrito = async (data)=>{

		try{
			const result = [{...data,producto:[]}]
			return await this.save(...result)
		}catch(e){
			return 'no se pudo guardar'
		}
	}

	getAllCarrito = async()=>{
		try{
			return await this.getAll()
		}catch(e){
			return 'no hay data'
		}
	}

	getByCarritoId = async(eleme)=>{
		try{
			return await this.getById(eleme)
		}catch(e){
			return 'no hay data'
		}
	}

	updateByCarritoId = async(element,id)=>{
		try{
			const carrito =await this.getAll()
			let result = carrito.filter(e=> e.id === id ? e.producto.push({...element}) : e)
			return await this.updateById(result)
			
		}catch(e){
			return 'no hay data'
		}
	}

	borrarByCarritoId = async(id)=>{
		try{
			return await this.borrarById(id)
		}catch(e){
			return 'no hay data'
		}
	}
	borrarByProdCarritoId = async(id,id_prod)=>{
		const carrito =await this.getAll()
		let result = carrito.filter(e=>{
			if(e.id === id){
				let prodModi = e.producto.filter(a=>a.id!== id_prod)
				e.producto = prodModi
			}
			return e
		})
		return await this.updateById(result)		
	}

}


module.exports = Carritos