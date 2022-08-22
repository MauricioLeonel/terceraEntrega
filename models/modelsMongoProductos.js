const mongoose = require('mongoose')


const modelsProducto = mongoose.Schema({
	_id:{type:Number,required:true},
	nombre:String,
	descripcion:String,
	foto:String,
	codigo:String,
	precio:Number,
	stock:Number,
	timestamp:{ type: Date, default: Date.now }
})


module.exports = mongoose.model('productos',modelsProducto)
