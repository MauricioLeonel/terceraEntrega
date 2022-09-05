const containerMongo = require('../../../container/containerMongo')

class DaoMongoChats extends containerMongo{
	constructor(data){
		super(data)
	}

	saveDataChat = async (data)=>{
		return await this.insertData(data)
	}

	getAllChat = async()=>{
		return await this.getAll()
	}
	// getByEmail = async(email)=>{
	// 	return await this.getByData(email)
	// }
	// getById = async(id)=>{
	// 	return await this.getByDataId(id)
	// }
	

}


module.exports = DaoMongoChats