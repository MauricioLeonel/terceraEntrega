
const ContainerMongo = require('../../../container/containerMongo');

class Users extends ContainerMongo{
	constructor(data){
		super(data)
	}

	getAllUser = async ()=>{
		return await this.getAll()
	}


	saveUser = async(data)=>{
		return await this.insertData(data)
	}
	getByUserId = async (element)=>{
		try{
			return await this.getById(element)
		}catch(e){
			return e
		}
	}
	getByUserUsername = async (element)=>{
		try{
			return await this.getByUsername(element)
		}catch(e){
			return e
		}
	}
	updateByUserId = async (element)=>{
		try{
			return await this.updateById(element)
		}catch(e){			
			return e
		}
	}
	borrarByUserId = async(id)=>{
		try{
			return this.deleteById(id)
		}catch(e){
			return e
		}
	}
}


module.exports =  Users

