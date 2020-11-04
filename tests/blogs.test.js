const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithTwoBlogs = [
    {
      _id: '',
      title: '',
      author: '',
      url: '',
      likes: 5,
      __v: 0
    },
    {
      _id: '',
      title: '',
      author: '',
      url: '',
      likes: 10,
      __v: 0
    }
  ]

  
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([listWithTwoBlogs[0]])
    expect(result).toBe(5)
  })

  test('when list has two or more equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(15)
  })

  test('when list is empty equals zero likes', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

})