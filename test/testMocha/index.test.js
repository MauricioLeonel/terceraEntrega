const chai = require('chai')
const supertest = require('supertest')
const request = supertest('http://localhost:8080')



describe('Api test',()=>{
	describe('GET Poductos',async ()=>{
		const result = await request.get('/api/productos')
		chai.expect(result.status).to.be.equal(200)
	})
})