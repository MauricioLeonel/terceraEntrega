//un solo index que hace switch
const consultTypeBaseDaoProducto = require('../dao/productosDao')


const nuevoProducto = async (req,res)=>{
	const timestamp = Date.now()
	const {body:{nombre, descripcion, codigo, foto, precio, stock}} = req
	const database = await consultTypeBaseDaoProducto('mongo')
	const result = await database.saveProducto({timestamp:new Date(timestamp) , nombre, descripcion, codigo, foto, precio, stock})
	// res.json(result)
	res.redirect('productos/new')
}

const nuevoProductoRender=async (req,res)=>{
	res.render('productos/newProducto',{data:{ruta:'Nuevo Producto'}})
}

const consultaProducto = async (req,res)=>{
	const {id} = req.params	
	const database = await consultTypeBaseDaoProducto('mongo')
	const result = await database.getByProductoId(parseInt(id))
	result.message ? res.status(404).json({Error:result.message}) : res.json(result)
}

const consultarAllProductos = async (req,res)=>{
	const database = await consultTypeBaseDaoProducto('mongo')
	const result = await database.getAllProducto()
	
	const data = JSON.stringify(result)

	const data2 = JSON.parse(data)
	// console.log(data2)
	res.render('productos/producto',{data2,data:{ruta:'Productos'}})	
}


const actualizaProducto = async (req,res)=>{
	const database = await consultTypeBaseDaoProducto('mongo')
	req.body = {...req.body,id:parseInt(req.params.id)}
	const result = await database.updateByProductoId(req.body)
	result.message ? res.status(404).json({Error:result.message}) : res.json('data actualizada')
	
}
const borrarProducto = async (req,res)=>{
	const database = await consultTypeBaseDaoProducto('mongo')
	const result = await database.borrarByProductoId(parseInt(req.params.id))
	result.message ? res.status(404).json({Error:result.message}) : res.json(result)
}


module.exports = {nuevoProducto,consultaProducto,consultarAllProductos,actualizaProducto,borrarProducto,nuevoProductoRender}