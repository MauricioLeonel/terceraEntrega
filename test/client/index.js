const axios = require('axios')

url = 'http://localhost:8080/api/productos'

producto =  {
    nombre: 'chevrolet3',
    descripcion: 'para andar bien facha',
    foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/plane-paper-toy-science-school-128.png',
    codigo: '20x300',
    precio: 400,
    stock: 100
  }
 productoUpdate =  {
    nombre: 'Ford',
    descripcion: 'para andar bien facha porque ahora es Ford',
    foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/plane-paper-toy-science-school-128.png',
    codigo: '20x300',
    precio: 400,
    stock: 100
  }


const pruebasAxios = async ()=>{
	try{
		// console.log('hola')
		//todos los productos
		const getAllProduct = await axios.get(url)
		console.log(getAllProduct.data)
		//un producto
		const getProductById = await axios.get(`${url}/8`)
		console.log(getProductById.data)
		//nuevo producto
		const postProducto = await axios.post(url,producto)
		console.log(postProducto.data)
		
		//actualizar el producto
		const updateProductoById = await axios.put(`${url}/9`,productoUpdate)
		console.log(updateProductoById.data)

		//borrar el producto
		const deleteProductoById = await axios.delete(`${url}/9`)
		console.log(deleteProductoById.data)

	}catch(e){
		console.log(e.response.data)
	}

}

pruebasAxios()