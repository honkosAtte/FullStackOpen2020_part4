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

describe('favoriteBlog', () => {
  const listWithThreeBlogs = [
    {
      _id: '',
      title: 'One',
      author: '',
      url: '',
      likes: 5,
      __v: 0
    },
    {
      _id: '',
      title: 'Max',
      author: '',
      url: '',
      likes: 10,
      __v: 0
    },
    {
      _id: '',
      title: 'Max2',
      author: '',
      url: '',
      likes: 10,
      __v: 0
    }
  ]

  
  test('when list has only one blog return that one blog', () => {
    const result = listHelper.favoriteBlog([listWithThreeBlogs[0]])
    expect(result).toEqual( { _id: '', title: 'One', author: '', url: '', likes: 5, __v: 0 } )
  })

  test('when list has two or more equals returns the first one which has max likes', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    expect(result).toEqual( { _id: '', title: 'Max', author: '', url: '', likes: 10, __v: 0 } )
  })

  test('when list is empty equals undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

})

describe('mostBlogs', () => {
  const listWithThreeBlogs = [
    {
      _id: '',
      title: '',
      author: 'Jorma',
      url: '',
      likes: 5,
      __v: 0
    },
    {
      _id: '',
      title: '',
      author: 'Jorma',
      url: '',
      likes: 10,
      __v: 0
    },
    {
      _id: '',
      title: '',
      author: 'Kake',
      url: '',
      likes: 5,
      __v: 0
    },
    {
      _id: '',
      title: '',
      author: 'Kake',
      url: '',
      likes: 10,
      __v: 0
    },
    {
      _id: '',
      title: '',
      author: 'Sepi',
      url: '',
      likes: 10,
      __v: 0
    }
  ]

  
  test('when list has only one blog return that one blog author and blog count of 1', () => {
    const result = listHelper.mostBlogs([listWithThreeBlogs[0]])
    expect(result).toEqual( { author: 'Jorma', blogs: 1 } )
  })

  test('when list has two or more equals returns an author with most blogs and the count of blogs', () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs)
    expect(result).toEqual( { author: 'Jorma', blogs: 2 } )
  })

  test('when list is empty equals undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })

})


describe('mostLikesInBlogs', () => {
  const listWithThreeBlogs = [
    {
      _id: '',
      title: '',
      author: 'Jorma',
      url: '',
      likes: 5,
      __v: 0
    },
    {
      _id: '',
      title: '',
      author: 'Jorma',
      url: '',
      likes: 10,
      __v: 0
    },
    {
      _id: '',
      title: '',
      author: 'Kake',
      url: '',
      likes: 5,
      __v: 0
    },
    {
      _id: '',
      title: '',
      author: 'Kake',
      url: '',
      likes: 3,
      __v: 0
    },
    {
      _id: '',
      title: '',
      author: 'Sepi',
      url: '',
      likes: 10,
      __v: 0
    }
  ]

  
  test('when list has only one blog return that one blog author and blog count of 1', () => {
    const result = listHelper.mostLikes([listWithThreeBlogs[0]])
    console.log(result)
    expect(result).toEqual( { author: 'Jorma', likes: 5 } )
  })

  test('when list has two or more equals returns an author with most likes in blogs', () => {
    const result = listHelper.mostLikes(listWithThreeBlogs)
    expect(result).toEqual( { author: 'Jorma', likes: 15 } )
  })

  test('when list is empty equals undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(undefined)
  })

})