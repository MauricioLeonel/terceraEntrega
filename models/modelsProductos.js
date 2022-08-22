// const {config} = require('../db/config.js')
const knex = require('knex')

class Modelo extends knex{
	constructor(data){
		super(data)
	}
	
}


module.exports =  Modelo