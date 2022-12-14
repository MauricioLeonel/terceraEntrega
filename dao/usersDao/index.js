const mongoDao = require('./mongo');
const modelsMongoUser = require('../../models/modelsMongoUser.js')

const consultTypeBaseDao = (base)=>{
	switch(base){
		// case 'firebase':
		// 	return new firebaseDao();
		// 	break;
		// case 'fs':
		// 	return new fsDao(nameFile);
		// 	break;
		case 'mongo':
			return new mongoDao(modelsMongoUser);
			break;
		// case 'mysql':
		// 	return new mysqlDao(config);
		// 	break;
		// case 'sqlite':
		// 	return new sqliteDao(config2);
		// 	break;
		default:
			throw new Error('no existe esa base de datos')
			break;
	}
}

module.exports = consultTypeBaseDao