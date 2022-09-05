const consultTypeBaseDao = require('../dao/usersDao')
require('dotenv').config()

const autenticacionUser = async (req,res,next)=>{
	// const administrador = true
	const userDao = await consultTypeBaseDao('mongo')
	const result = await userDao.getByUserUsername(req.session.username)

	if(!result.administrador){
		// return res.status(401).json({msj:'usuario no permitido'})
		return res.render('noauthorized',{data:{ruta:'No autorizado: VOLVER->'}})
	}
	next()
}


// const KEY = process.env.KEY

const autorizationUser = (req,res,next)=>{
	if(req.session.username && req.cookies.connect_coder){
		 res.redirect('/api/productos')
	}else{
		next()
	}
}

const loginUser = (req,res,next)=>{
	if(!req.session.username || !req.cookies.connect_coder){
		 // res.redirect('/api/productos')
		 res.redirect('/login')
	}else{
		next()
	}
}

module.exports = {autenticacionUser,autorizationUser,loginUser}