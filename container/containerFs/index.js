const fs = require('fs')

class ContainerFs{
	constructor(file){
		this.file = __dirname +'/'+ file+'.txt';
	}

	getAll = async ()=>{
		const data = await fs.promises.readFile(this.file,'utf8')
		const result = !data ? [] : await JSON.parse(data) 
		return result
	}
	getById = async (id)=>{
		try {
			const data = await this.getAll()
		    const result = data.filter(e=>e.id==id)
		    if(result.length >= 1){
		    	return result
		    }else{
		    	throw new Error('Elemento no encontrado')
		    }
		} catch(e) {
			return e
		}
	}
	save = async (producto)=>{
		try {
			const data = await this.getAll()
			producto.id = data.length > 0  ? data[data.length-1].id+1 : 1
			if(Array.isArray(producto)){
				data.push(...producto)
			}else{
				data.push(producto)
			}
			fs.promises.writeFile(this.file,JSON.stringify(data))
			return data
		} catch(e) {
			return e
		}
	}
	updateById = async (producto)=>{
		try {
		    await this.borrarTodo()
		    await this.save(producto)
		    return 'Los datos fueron actualizados'
		} catch(e) {
			return e
		}

	}
	borrarById = async (id)=>{
		try {
			const data = await this.getAll()
			const result = data.filter(e=>e.id!==id);
			if(data.find(e=>e.id === id)){
				this.borrarTodo()
				this.save(result)
			    return 'Los datos fueron borrados'
			}else{
				throw new Error('no hay data')
			}
			
		} catch(e) {
			return e
		}
	}

	borrarTodo=async ()=>{
		fs.promises.writeFile(this.file,'')
	}

}

module.exports =  ContainerFs

