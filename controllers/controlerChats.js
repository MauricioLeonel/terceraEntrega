const consultTypeBaseDao = require('../dao/chatsDao')

const consultaChats = (req,res)=>{
	req.io.on('connection',async function(cliente){
		cliente.on('mensajeChat',async(data)=>{
			data.username = req.session.username
			try{
				if(data.texto===''){
					throw new Error('el campo no puede estar vacio')
				}
				const chats = await consultTypeBaseDao('mongo')
				await chats.saveDataChat(data)

				const resultNewChat = await chats.getAllChat()
				console.log(resultNewChat)
				req.io.sockets.emit('mensajesChat',resultNewChat)
			}catch(e){
				req.logger.error(`error: /api/chats - ${e.message}`)
			}

		})

		const chats = await consultTypeBaseDao('mongo')
		const resultNewChat = await chats.getAllChat()
		req.io.sockets.emit('mensajesChat',resultNewChat)

	})

	res.render('chat',{data:{ruta:'chat'}})
}


module.exports= {consultaChats}