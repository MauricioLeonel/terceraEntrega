const consultTypeBaseDao = require('../dao/usersDao')



const updateUserNow = async (req,res)=>{
	const userDao = await consultTypeBaseDao('mongo')
	const result = await userDao.getByUserUsername(req.session.username)
	res.render('productos/updateUser',{data:{ruta:'actualizar usuario',result:result}})
}

const updateUser = async(req,res)=>{

	try{
		req.body.id = parseInt(req.params.id)
		console.log(req.body)
		const userDao = await consultTypeBaseDao('mongo')
		const result = await userDao.updateByUserId(req.body)
		console.log(result)
		res.render('productos/dashboard',{data:{ruta:'actualizar usuario',result:result}})

	}catch(e){
		console.log(e)
	}
}
module.exports = {updateUserNow,updateUser}