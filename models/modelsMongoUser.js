const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const schemaUser = mongoose.Schema({
	_id:{type:Number,required:true},
	username:String,
	password:String,
	nombre:String,
	direccion:String,
	edad:String,
	telefono:String,
	avatar:String,
	administrador:{type:Boolean,default: false}
})

schemaUser.pre('save',function(next){
	if(!this.isModified('password')){
		return next()
	}else{
		this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(10))
		return next()
	}
})

schemaUser.methods.isValidatePassword = function(password,hash){
	let comp = bcrypt.compareSync(password,hash)
	return comp 
}


module.exports = mongoose.model('user',schemaUser)
