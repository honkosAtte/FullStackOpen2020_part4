const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

// test('return 400 Bad Request if title or url are not set', async () => {
//   let blogObject = new Blog({
//     author: 'Dr Moodle',
//   })
//   await blogObject.save()
//   .expect(400)
// })

// test('the fetch fails with an error', async () => {
//   let blogObject = new Blog({
//     author: 'Dr Moodle',
//   })
//   await expect(await blogObject.save()).rejects.toThrow('error');
// });

// test('400', async () => {
//   let blogObject = new Blog({
//     author: 'Dr Moodle',
//   })
//   const response = await blogObject.save()
//   expect('ValidationError: Blog validation failed: url: Path `url` is required., title: Path `title` is required.').toBe('ValidationError: Blog validation failed: url: Path `url` is required., title: Path `title` is required.')
// })

// test('return 400 Bad Request if title or url are not set', async () => {
//   let blogObject = new Blog({
//     author: 'Dr Moodle',
//   })

//   expect.assertions(0);
//   try {
//     await blogObject.save()
//   } catch (e) {
//     console.log('400 error ', e)
//     // expect(e).toMatch('error')
//     expect(400)

//   }
// })

test('return 400 Bad Request if title or url are not set', async () => {
  let blogObject = new Blog({
    // title: 'How I stopped worrying',
    author: 'Dr StrangeLove',
    // url: 'https://www.drStrangeLove.com',
  })
  await expect(blogObject.save()).rejects.toThrow("Blog validation failed: url: Path `url` is required., title: Path `title` is required.")

});

afterAll(() => {
  mongoose.connection.close()
})




