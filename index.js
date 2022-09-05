const express = require('express')
const path = require('path')
const pug = require('pug')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const inicializarPassport = require('./services/passportLocal.js')
const session = require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
const db = require('./db/db.js')
const configLog = require('./utils/configLog.js')
const log4js = require('log4js')
const os = require('os')
const cluster = require('cluster')
const server = require('http').createServer(app)//pa' el socket
const io = require('socket.io')(server)//pa' el chat


const routerProductos = require('./routes/routerProductos.js')
const routerCarritos = require('./routes/routerCarritos.js')
const routerUser = require('./routes/routerUser.js')
const routerInfo = require('./routes/routerInfo.js')
const routerDashboard = require('./routes/routerDashboard.js')
const routerChats = require('./routes/routerChats.js')



let port = process.env.PORT ? process.env.PORT : '8080'

const typeMode = process.env.typeMode 
//configuramos
log4js.configure(configLog)
//configuramos PROD
const logger = log4js.getLogger('PROD')

db()//esta cosa magica abre la conexion con mongo
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
	resave:false,
	saveUninitialized:false,
	key:'connect_coder',
	secret:'c0d3r_h0us3',
	store: MongoStore.create({
		mongoUrl:process.env.URI_SESSIONDB
	})
}))

app.use(express.static(path.join(__dirname,'public')))
inicializarPassport()
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

if(typeMode === 'cluster' && cluster.isPrimary){
	for(var i = 0; i < os.cpus().length; i++){
		cluster.fork()
	}
}else{
	app.use((req,res,next)=>{
		logger.info(`info: ${req.method} - ${req.path}`)
		req.logger = logger
		req.io = io
		next()
	})
	app.use('/',routerUser)
	app.use('/api/productos',routerProductos)
	app.use('/api/carritos',routerCarritos)
	app.use('/api/info',routerInfo)
	app.use('/api/dashboard',routerDashboard)
	app.use('/api/chats',routerChats)
	app.get('/*',(req,res,next)=>{
			logger.warn(`warn: ${req.method} - ${req.path}`)
			next()
		})

	server.listen(port,()=>{
		console.log('escuchando todo oki')
	})

}

