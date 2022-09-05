const mongoose = require('mongoose')
const modelsChat = mongoose.Schema({
	_id:{type:Number,required:true},
	username:String,
	texto:String,
	fecha:{ type: Date, default: Date.now }
})


module.exports = mongoose.model('chats',modelsChat)