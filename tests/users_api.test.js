const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')


beforeEach(async () => {
  
  await User.deleteMany({})

})

test('return 200 if invalid User in user creation', async () => {

  await api
  .post('/api/users')
  .send({
    "username": "123", 
    "password": "123"
    })
  .expect(200)

})

test('return 400 if invalid User in user creation', async () => {
  await api
  .post('/api/users')
  .send({
    "username": "12", 
    "password": "12"
    })
  .expect(400)
})

test('return the correct error message if invalid User in user creation', async () => {  
    const response = await api
    .post('/api/users')
    .send({
      "username": "12", 
      "password": "12"
      })

      expect(response.text).toContain('username and password required, password length min 3 chars')
    })

afterAll(() => {
  mongoose.connection.close()
})




