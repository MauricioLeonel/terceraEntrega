const passport = require('passport')
const localStrategy = require('passport-local')
const consultTypeBaseDao = require('../dao/usersDao')
const {transporter,mailoptions} = require('../utils/nodemailer.js')

const iniacializarPassport = ()=>{
	passport.use('register',
		new localStrategy(
		{passReqToCallback : true},
		async(req,username,password,cb)=>{
			try {
				const userDao = await consultTypeBaseDao('mongo')
				const result = await userDao.getByUserUsername(username)

				if(result.message){
					req.body.avatar = '/uploads/'+req.file.filename
					const dataNew = await userDao.saveUser(req.body)	
					mailoptions.subject='Nuevo registro'
					mailoptions.html = `<p>${dataNew.username}</p>
					<p>${dataNew.nombre}</p>
					<p>${dataNew.direccion}</p>
					<p>${dataNew.edad}</p>
					<p>${dataNew.telefono}</p>
					`
					const sendMail = await transporter.sendMail(mailoptions)

					return cb(null, dataNew)
				}
				return cb(null,false,{message:'ya existe el usuario'})
			} catch(e) {
				// statements
				return cb(null,e)
			}
		}) 
	)

	passport.use('login',new localStrategy(async(username,password,cb)=>{
		try{
			const userDao = await consultTypeBaseDao('mongo')
			const result = await userDao.getByUserUsername(username)
			// console.log(result)
			if(!result.message && result.isValidatePassword(password,result.password)){
				return cb(null,result)
			}else{
				return cb(null,false,{message:'usuario o contraseña incorrecta'})
			}
		}catch(e){
			return cb(null,e)
		}



	}))
	passport.serializeUser(async (user,cb)=>{
		cb(null,user._id)
	})
	passport.deserializeUser(async (id,cb)=>{
		try {
			const userDao = await consultTypeBaseDao('mongo')
			const results = await userDao.getByUserId(id)
			return cb(null,results)
		} catch(e) {
			cb(null,e)
		}
	})
}

module.exports = iniacializarPassport