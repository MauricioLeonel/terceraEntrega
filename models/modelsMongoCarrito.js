const mongoose = require('mongoose')

const modelsCarrito = mongoose.Schema({
	_id:{type:Number,required:true},
	timestamp:{ type: Date, default: Date.now },
	producto:[mongoose.Schema({
	_id:{type:Number,required:true},
	nombre:String,
	descripcion:String,
	foto:String,
	codigo:String,
	precio:Number,
	stock:Number,
	cantidad:Number,
	timestamp:{ type: Date, default: Date.now }
})]
})


module.exports = mongoose.model('carrito',modelsCarrito)
