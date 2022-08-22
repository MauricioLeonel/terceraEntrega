const db = require('../../db/firebase')

class ContainerProductos extends db {
	constructor(){
		super()
	}

	getAll = async(tabla)=>{
		const result = await this.collection(tabla).get()
		const arr = []
		result.forEach((doc) => {
	        arr.push({...doc.data(),id2:doc.id})
	    });
		return arr
	}

	insertData = async(data,tabla)=>{
		try{
			const id = await this.getAll(tabla)
			let id2
			if(id.length > 0){
				id2 = id[id.length-1]._id + 1
			}else{
				id2 = 1
			}
			data = {...data, _id:id2}
			const result = await this.collection(tabla).add(data)
			return 'se guarda la data' 
		}catch(e){
			return e
		}
	}	

	getById = async(element,tabla)=>{
		const result = await this.getAll(tabla)
		// const result2 = await this.collection('productos','Fkz99pqa9wx6YN4OxhGY')
		return result.filter(e=>e._id === element)
	}
	updateById = async(element,tabla)=>{
	    try{
	   	 	const dataProdActualizar = await this.getById((element.producto ? element._id : element.id), tabla)
		    let doc = await this.collection(tabla).doc(dataProdActualizar[0].id2)
		    let item = await doc.update(element)
		    return 'se pudo actualizar todo'
		}catch(e){
			console.log(e)
			return e
		}
	}

	deleteById = async(id,tabla)=>{
		try{
	   	 	const dataProdBorrar = await this.getById(id,tabla)
		    let doc = await this.collection(tabla).doc(dataProdBorrar[0].id2)
		    let item = await doc.delete()
		    return 'se pudo borrar el producto'
		}catch(e){
			return e
		}
	}

}

module.exports = ContainerProductos