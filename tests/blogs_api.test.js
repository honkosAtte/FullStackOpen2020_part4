const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Title Doodle',
    author: 'Dr Doodle',
    url: 'www.drDoodle.com',
  },
  {
    title: 'What is Love',
    author: 'Dr Alban',
    url: 'www.drAlban.com',
    likes: 4
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('id field exits (not _id)', async () => {
  const response = await api.get('/api/blogs')
  const isThereIds = response.body.map(row => row.id)[0]
  expect(isThereIds).toBeDefined()
})

test('can add blogs', async () => {
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('the added blog is the right one', async () => {
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  const response = await api.get('/api/blogs')
  expect(response.body[2].title).toBe('Title Doodle')
})

test('the added blog is the right one', async () => {
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  const response = await api.get('/api/blogs')
  expect(response.body[2].title).toBe('Title Doodle')
})

test('0 is added for propery like if no value is provided', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].likes).toBe(0)
})

test('return 401 UnAuthorized if no auth token', async () => {
  let blogObject = new Blog({
    title: 'How I stopped worrying',
    author: 'Dr StrangeLove',
    url: 'https://www.drStrangeLove.com',
  })
 await api
 .post('/api/blogs')
 .send(blogObject)
 .expect(401)
})

test('return 200 ok if blog added with correct auth token', async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = await api
  .post('/api/users')
  .send({
    "username": "123", 
    "password": "123"
    })

const token = await api
  .post('/api/login')
  .send({
    "username": "123", 
    "password": "123"
    })

 await api
 .post('/api/blogs')
 .set('Content-Type', 'application/json')
 .set('Authorization', `Bearer ${token.body.token}`)
 .send({
  "title": "TEST ",
  "author": "TEST",
  "url": "https://www.testi.com",
})
 .expect(200)
})


afterAll(() => {
  mongoose.connection.close()
})