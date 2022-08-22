// const mongoose = require('mongoose');
// const modelsMongoProductos = require('../../models/modelsMongoProductos');

class Container {
	constructor(models){
		this.models = models
	}

	getAll = async()=>{
		const result = await this.models.find()
		return result
	}

	insertData = async(data)=>{
		// console.log(data)
		const id = await this.getAll()
		let id2
		if(id.length > 0){
			id2 = id[id.length-1]._id + 1
		}else{
			id2 = 1
		}
		data = {...data, _id:id2}
		const result = new this.models(data)

		return await result.save()
	}	

	getById = async(element)=>{
		const result = await this.models.find({_id:element})
		if(result.length > 0 ){
			return result
		}else{
			throw new Error('no existe el elemento')
		}
	}

	getByKey = async(element)=>{
		const result = await this.models.find({codigo:element})
		if(result.length > 0 ){
			return result
		}else{
			throw new Error('no existe el elemento')
		}
	}

	getByUsername = async(element)=>{
		const result = await this.models.findOne({username:element})
		// return result
		if(result !== null){
			return result
		}else{
			throw new Error('no existe el elemento')
		}
	}
	updateById = async(element)=>{
		try{
			const {id}=element
			const result = await this.models.findOneAndUpdate({_id:id},
				{
					$set:element
				},
				{
					new:true
				}
			)
			if(result){
				return result
			}else{
				throw new Error('no existe el articulo')
			}
		}catch(e){
			return e
		}
	}
	deleteById = async(id)=>{
		try{
			const result = await this.models.deleteOne({_id:id})
			// console.log(result)
			if(result.deletedCount > 0){
				return 'se borro el elemento'
			}else{
				throw new Error('no existe el elemento')
			}
		}catch(e){
			return e
		}
	}
}

module.exports = Container