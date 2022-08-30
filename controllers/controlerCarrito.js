// const modelsCarritos = require('../models/carritos.js')
const consultTypeBaseDaoCarrito = require('../dao/carritoDao')
const consultTypeBaseDaoProducto = require('../dao/productosDao')
const {transporter,mailoptions} = require('../utils/nodemailer.js')

const nuevoCarrito = async (req,res)=>{
	const timestamp = Date.now()
	const database = await consultTypeBaseDaoCarrito('mongo')
	const data = await database.saveCarrito({timestamp:new Date(timestamp)})
	res.json(data)
}

const finalizarCarrito = async (req,res)=>{
	const {body:{productos}} = req

	const datosUser = req.user.filter(e=>e.username == req.session.username)

	console.log(datosUser)
	// console.log(req.user.filter(e=>e.username == req.session.username))

	mailoptions.subject=`Nuevo pedido de:${datosUser[0].username} - ${datosUser[0].nombre}`
	mailoptions.html=''
	productos.map(e=>{
		mailoptions.html+=`<p>${e.nombre}</p>`
	})
	await transporter.sendMail(mailoptions)

	const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
	
    client.messages
      .create({
         body: 'el pedido ingreso',
         from: '+13252413165',
         to: '+541137597962'
       })
      .then(
      	message => console.log('mensaje enviado')
      )
      .catch(e=>console.log(e))

     res.send('todo oki')
}

const borraCarrito = async (req,res)=>{
	const database = await consultTypeBaseDaoCarrito('mongo')
	// console.log(req.params)
	const data = await database.borrarByCarritoId(parseInt(req.params.id))
	res.redirect('/api/productos')
	// data.message ? res.json({error:data.message}) : res.redirect('/api/productos')
}

const nuevoProdCarrito = async (req,res)=>{
	const {params:{id},body:{nroCarrito}} = req // este perro ahora es un string
	// const {body:{nroCarrito}} = req
	// console.log(req.body)
	const database = await consultTypeBaseDaoCarrito('mongo')
	const databaseProd = await consultTypeBaseDaoProducto('mongo')
	// console.log(nroCarrito)

	const producto = await databaseProd.getByProductoKey(id)
	const idCarrito = 1 // fuerzo al primer carrito
	if(producto.message){
		res.json({error:producto.message})
	}
	const data = await database.updateByCarritoId(...producto,nroCarrito)
	res.json(data)
}
const obtenerProdCarrito = async (req,res)=>{
	const {params:{id}} = req
	const database = await consultTypeBaseDaoCarrito('mongo')
	const carrito = await database.getByCarritoId(parseInt(id))
	carrito.message ? res.status(401).json({msj:carrito.message}) : res.json(carrito)
}

const borraProdCarrito = async (req,res)=>{
	const {params:{id,id_prod}} = req
	const database = await consultTypeBaseDaoCarrito('mongo')
	const data = await database.borrarByProdCarritoId(parseInt(id),parseInt(id_prod))
	data.message ? res.status(401).json({msj:data.message}) : res.json(data)
}
module.exports = {nuevoCarrito,borraCarrito,nuevoProdCarrito,obtenerProdCarrito,borraProdCarrito,finalizarCarrito}

