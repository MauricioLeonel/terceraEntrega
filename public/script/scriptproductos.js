let nroCarrito

const agregarCarro = async function(){
	// console.log('todo oki')
	if(nroCarrito === undefined){
		const result = await fetch(`http://localhost:8080/api/carritos`,{method:'POST'})
		nroCarrito = await result.json()
	}
	const padre = this.parentNode
	const hijos = padre.childNodes
	for(var i = 0; i < hijos.length; i++){
		if(hijos[i].id == 'codigo' && nroCarrito !== undefined){
			const resultProductos = await fetch(`http://localhost:8080/api/carritos/${hijos[i].outerText.split('-')[1]}/productos`,{
				method:'POST',
				body: JSON.stringify({nroCarrito:nroCarrito._id}), 
			    headers:{
			    	'Content-Type': 'application/json'
			    }})

			nroCarrito = await resultProductos.json()
			carrito[0].innerHTML=''
			nroCarrito.producto?.map(elemento=>{
				carrito[0].innerHTML += `
					<p>${elemento.nombre} - Cant:${elemento.cantidad}</p>
				`
			})
			carrito[0].innerHTML+=`<input type="submit" value="enviar">`

		}
	}
}

const enviarData = async function(e){
	await fetch(`http://localhost:8080/api/carritos/finalizar`,{
		method:'POST',
		body: JSON.stringify({productos:nroCarrito.producto}), 
	    headers:{
	    	'Content-Type': 'application/json'
	    }
	})
}

const borraCarritoAll = async function(){
	await fetch(`http://localhost:8080/api/carritos/${nroCarrito._id}`,{method:'DELETE'})
}

const finalizarCarrito = async function(e){
	e.preventDefault()

	await enviarData()
	await borraCarritoAll()

	location.reload();
}

const agregar = document.querySelectorAll('.agregar')
const carrito = document.getElementsByClassName('Carrito')


carrito[0].addEventListener('submit',finalizarCarrito)

for(var i = 0; i < agregar.length; i++){
	agregar[i].addEventListener('click',agregarCarro)
}

