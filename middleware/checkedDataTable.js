const modelsProductos = require('../models/modelsProductos')
const {config} = require('../db/config')

const productos = new modelsProductos(config)

const checkedDataTable = async (req,res,next)=>{
	try{
		let data2 = await productos.consultarTablaProductos()
	}catch(e){
		await productos.crearTablaProductos()
	}

	next()
}


module.exports = checkedDataTable