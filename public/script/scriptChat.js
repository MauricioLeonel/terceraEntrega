const socket = io.connect();

const envioFormuChat= function(e){
	e.preventDefault()
	e.stopPropagation()
	const data = {
		texto: e.target.mensaje.value,
		fecha:new Date(Date.now())
	}

	socket.emit('mensajeChat',data)
}

document.getElementById('formuChat').addEventListener('submit',(e)=>{envioFormuChat(e)})


const envioMensaje = (data)=>{
	const historialChat = document.getElementsByClassName('historialMensaje')

	historialChat[0].innerHTML=''
	historialChat[0].innerHTML+='<h1>Historial</h1>'

	data.map(e=>{
		historialChat[0].innerHTML+=`<p>${e.username} - ${e.texto} - ${e.fecha}</p>`
	})
	
}


socket.on('mensajesChat',envioMensaje)