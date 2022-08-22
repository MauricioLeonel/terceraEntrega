const Container = require('../../../container/containerMysql')

class Productos extends Container{
	constructor(data){
		super(data)
		this.init()
	}
	init = async()=>{
		try{
			await this.create('producto')
		}catch(e){
			await this.getAllProducto()
		}
	}

	getAllProducto = async ()=>{
		return await this.getAll('producto')
	}

	saveProducto = async(data)=>{
		return await this.insertData(data,'producto')
	}
	getByProductoId = async (element)=>{
		try{
			return await this.getById(element,'producto')
		}catch(e){
			return 'no hay data'
		}
	}
	updateByProductoId = async (element)=>{
		try{
			await this.updateById(element,'producto')
		}catch(e){
			return 'no se pudieron actulizar los datos'
		}
	}
	borrarByProductoId = async(id)=>{
		try{
			this.deleteById(id,'producto')
		}catch(e){
			return 'no hubo productos'
		}
	}
}


module.exports =  Productos

