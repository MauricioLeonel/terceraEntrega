const { expect } = require('chai')
const supertest = require('supertest')
const request = supertest('http://localhost:8080')

producto =  {
    nombre: 'chevrolet3',
    descripcion: 'para andar bien facha',
    foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/plane-paper-toy-science-school-128.png',
    codigo: '20x300',
    precio: 400,
    stock: 100
  }
 producto2 =  {
    nombre: 'Ford2',
    descripcion: 'va segundo producto test',
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
  productoUpdate2 =  {
    nombre: 'Chevrolet',
    descripcion: 'corvette z06',
    foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/plane-paper-toy-science-school-128.png',
    codigo: '20x300',
    precio: 400,
    stock: 100
  }

describe('Api test',()=>{
	describe('GET Poductos',()=>{
		it('debe devolver un status 200',async()=>{
			let result = await request.get('/api/productos')
			expect(result.status).to.be.equal(200)
		})

		it('debe devolver un objeto con partes de un productos',async()=>{
			let result = await request.get('/api/productos/8')
			expect(result.body[0]).to.include.keys('_id','nombre','descripcion','foto','codigo','precio','stock','timestamp')
		})
	})
	describe('POST Poductos',()=>{
		it('debe devolver un status 200',async()=>{
			let result = await request.post('/api/productos').send(producto)
			expect(result.status).to.be.equal(200)
		})

		it('debe devolver un objeto con partes de un productos',async()=>{
			let result = await request.post('/api/productos').send(producto2)
			expect(result.body).to.include.keys('_id','nombre','descripcion','foto','codigo','precio','stock','timestamp')
		})
	})

	describe('PUT Poductos',()=>{
		it('debe devolver un status 200',async()=>{
			let result = await request.put('/api/productos/9').send(productoUpdate)
			expect(result.status).to.be.equal(200)
		})

		it('debe devolver un mensaje: data actualizada',async()=>{
			let result = await request.put('/api/productos/10').send(productoUpdate2)
			expect(JSON.parse(result.text)).to.be.equals("data actualizada")
		})
	})

	describe('delete Poductos',()=>{
		it('debe devolver un status 200',async()=>{
			let result = await request.delete('/api/productos/9')
			expect(result.status).to.be.equal(200)
		})

		it('debe devolver un mensaje que diga se borro el elemento',async()=>{
			let result = await request.delete('/api/productos/10')
			expect(JSON.parse(result.text)).to.be.equals("se borro el elemento")
		})
	})
})