const Modelo = require('../../models/modelsProductos')


class Container extends Modelo{
	constructor(data){
		super(data)
	}
	create = async(tabla)=>{
		switch(tabla){
			case 'producto':
				return await this.schema.createTable('producto',(table)=>{
  					table.increments('id');
					table.string('nombre');
					table.string('descripcion');
					table.string('foto');
					table.string('codigo');
					table.float('precio');
					table.integer('stock');
					table.timestamp('timestamp',{ useTz: true }).defaultTo(this.fn.now());

				})
				break;
			case 'carrito' :
				const result = await this.schema.createTable('carrito',(table)=>{
  					table.increments('id');
					table.timestamp('timestamp',{ useTz: true }).defaultTo(this.fn.now());

				})
				await this.schema.createTable('carri_prod',(table)=>{
					table.integer('carrito_id').unsigned().notNullable();
					table.integer('producto_id').unsigned().notNullable();
					table.foreign('carrito_id').references('id').inTable('carrito')
					table.foreign('producto_id').references('id').inTable('producto')
					table.string('nombre');
					table.string('descripcion');
					table.string('foto');
					table.string('codigo');
					table.float('precio');
					table.integer('stock');
					table.timestamp('timestamp',{ useTz: true }).defaultTo(this.fn.now());
				})
				return result 
				break;

		}
	}

	getAll = async(tabla)=>{
		const result = await this.select('*').from(tabla)
		return result
	}

	insertData = async(data,tabla)=>{
		console.log(data)
		const result = await this.insert(data).into(tabla)
		return result
	}	

	getById = async(element,tabla)=>{
		const result = await this.select('*').from(tabla).where('id',element)
		return result
	}

	getByProdCarritoId = async(element,tabla)=>{
		const result = await this.select('*').from(tabla).where('carrito_id',element)
		return result
	}
	updateById = async(element,tabla)=>{
		try{
			const {nombre,descripcion,codigo,foto,precio,stock,id}=element
			await this(tabla).update({nombre,descripcion,codigo,foto,precio,stock}).where('id',id)
			return 'data actualizada'
		}catch(e){
			return 'hubo un error'
		}
	}
	deleteById = async(id)=>{
		try{
			await this('carrito').where('id',id).del()
			await this('carri_prod').where('carrito_id',id).del()
			return 'los datos fueron borrados'
		}catch(e){
			return 'no se pudieron borrar los productos o carrito'
		}
	}
	deleteProdCar = async(id,id_prod,tabla)=>{
		try{
			await this(tabla).where({carrito_id: id,producto_id:id_prod}).del()
			return 'los datos fueron borrados'

		}catch(e){
			return e
		}
	}
}

module.exports = Container