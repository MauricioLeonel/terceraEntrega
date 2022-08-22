const ContainerFirebase = require('../../../container/containerFirebase');

class Productos extends ContainerFirebase{
	constructor(){
		super()
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
			return await this.updateById(element,'producto')
		}catch(e){
			return 'no se pudieron actulizar los datos'
		}
	}
	borrarByProductoId = async(id)=>{
		try{
			return await this.deleteById(id,'producto')
		}catch(e){
			return 'no hubo productos'
		}
	}
}


module.exports =  Productos

