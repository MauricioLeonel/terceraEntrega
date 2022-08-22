const mongoose = require('mongoose')
require('dotenv').config()

const db = async()=>{
	try{
		return await mongoose.connect(process.env.URI_MONGODB)
	}catch(e){
		// throw new Error('no hay conexion de la base de datos')
		return e
	}	
}


module.exports = db