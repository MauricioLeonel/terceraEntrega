// const dbmongo = require('../../db/db.js')
const firebaseDao = require('./firebase') 
const fsDao = require('./fs') 
const mongoDao = require('./mongo') 
const mysqlDao = require('./mysql') 
const sqliteDao = require('./sqlite') 
const modelsMongoProductos = require('../../models/modelsMongoProductos');
const {config2,config} = require('../../db/config')
const nameFile = 'productos'


const consultTypeBaseDao = (base)=>{
	switch(base){
		case 'firebase':
			return new firebaseDao();
			break;
		case 'fs':
			return new fsDao(nameFile);
			break;
		case 'mongo':
			return new mongoDao(modelsMongoProductos);
			break;
		case 'mysql':
			return new mysqlDao(config);
			break;
		case 'sqlite':
			return new sqliteDao(config2);
			break;
		default:
			throw new Error('no existe esa base de datos')
			break;
	}
}

module.exports = consultTypeBaseDao