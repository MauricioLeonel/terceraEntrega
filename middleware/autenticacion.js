require('dotenv').config()

const autenticacionUser = (req,res,next)=>{
	const administrador = true
	if(!administrador){
		return res.status(401).json({msj:'usuario no permitido'})
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