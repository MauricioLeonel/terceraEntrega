// const {config} = require('../db/config.js')
const knex = require('knex')

class Carritos extends knex{
	constructor(data){
		super(data)
	}
	crearTablaProductos = async()=>{
		const result = await this.schema.createTable('carrito',(table)=>{
			table.increments();
			table.string('title');
			// table.string('algo')
			table.timestamp('timestamps').defaultTo(this.fn.now());
		})
	}

	consultarTablaProductos = async()=>{
		const result = await this.select('*').from('carrito')
		return result
	}

	insertarDataProductos = async(data)=>{
		const result = await this.insert(data).into('carrito')
		return result
	}	
}


module.exports =  Carritos