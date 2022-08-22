const ContainerFs = require('../../../container/containerFs')

class Productos extends ContainerFs{
	constructor(file){
		super(file)
	}

	saveProducto = async  (data)=>{
		try{
			return this.save(data)
		}catch(e){
			return 'no se pudo guardar'
		}
	}

	getAllProducto = async ()=>{
		try{
			return await this.getAll()
		}catch(e){
			return 'no hay data'
		}
		
	}

	getByProductoId = async (eleme)=>{
		try{
			return await this.getById(eleme)
		}catch(e){
			return 'no hay data'
		}
	}

	updateByProductoId = async (id)=>{
		try{
			return await this.updateById(id)
		}catch(e){
			return 'no hay data'
		}
	}

	borrarByProductoId = async (id)=>{
		try{
			return await this.borrarById(id)
		}catch(e){
			return 'no hay data'
		}
	}
	// borrarAllProducto = async ()=>{
	// 	this.borrarTodo()
	// }

}


module.exports =  Productos