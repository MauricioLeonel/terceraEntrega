const rutas = require('express').Router()
const passport = require('passport')
const {autorizationUser} = require('../middleware/autenticacion.js')
const subirArchivo = require('../middleware/subirArchivo.js')
const {transporter,mailoptions} = require('../utils/nodemailer.js')
const {updateUserNow,updateUser} = require('../controllers/controlerUser.js')

rutas.get('/',autorizationUser,(req,res)=>{
	res.redirect('/register')
})

rutas.get('/register',autorizationUser,(req,res)=>{
	res.render('index')
})

rutas.get('/login',autorizationUser,(req,res)=>{
	res.render('login')
})

rutas.get('/logout',(req,res)=>{
	req.session.destroy((err)=>{
		if(err){
			res.json({message:'no se pudo cerrar la sesion'})
		}
		res.redirect('/login')
	})
})

rutas.post('/register',subirArchivo,passport.authenticate('register',{failureRedirect:'/failed'}),async (req,res)=>{
	mailoptions.subject='Nuevo registro'
		mailoptions.html = `<p>${req.body.username}</p>
		<p>${req.body.nombre}</p>
		<p>${req.body.direccion}</p>
		<p>${req.body.edad}</p>
		<p>${req.body.telefono}</p>
					`
	const sendMail = await transporter.sendMail(mailoptions)
	res.redirect('/login')
})
rutas.post('/login',passport.authenticate('login',{failureRedirect:'/failedUser'}),(req,res)=>{
	
	req.session.username = req.body.username
	res.redirect('/api/productos')
})
rutas.get('/failed',(req,res)=>{
	req.logger.error(`error: /failed - el usuario ya existe`)
	res.json({message:'el usuario ya existe'})
})

rutas.get('/failedUser',(req,res)=>{
	req.logger.error(`error: /failedUser - usuario o contraseña incorrecta`)

	res.json({message:'usuario o contraseña incorrecta'})
})


rutas.get('/updateUser',updateUserNow)
rutas.post('/updateUser/:id',updateUser)



module.exports = rutas