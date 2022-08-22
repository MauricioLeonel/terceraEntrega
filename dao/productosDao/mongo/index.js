const ContainerMongo = require('../../../container/containerMongo');

class Productos extends ContainerMongo{
	constructor(data){
		super(data)
	}

	getAllProducto = async ()=>{
		return await this.getAll()
	}


	saveProducto = async(data)=>{
		return await this.insertData(data)
	}
	getByProductoId = async (element)=>{
		try{
			return await this.getById(element)
		}catch(e){
			return e
		}
	}
	getByProductoKey = async (element)=>{
		try{
			return await this.getByKey(element)
		}catch(e){
			return e
		}
	}
	updateByProductoId = async (element)=>{
		try{
			return await this.updateById(element)
		}catch(e){			
			return e
		}
	}
	borrarByProductoId = async(id)=>{
		try{
			return this.deleteById(id)
		}catch(e){
			return e
		}
	}
}


module.exports =  Productos

