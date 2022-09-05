const dashboard = (req,res)=>{
	res.render('productos/dashboard',{data:{ruta:'Dashboard',user:req.session.username}})
}


module.exports = {
	dashboard
}