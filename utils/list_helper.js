const { xorBy } = require('lodash');
const _ = require('lodash');

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const reducer = (acc, curr) => {
    return acc + curr.likes
  }
  return blogs.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
  const maxLike = Math.max(...blogs.map(blog => blog.likes))
  return blogs.filter(blog => blog.likes === maxLike)[0]
}



const mostBlogs = (blogs) => {
  if (blogs.length < 1) {
    return undefined
  }
  else {
    const mostBlogs = _(blogs).countBy(x => x.author).entries().maxBy(1)
    return { author: mostBlogs[0], blogs: mostBlogs[1] }
  }
}


const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const flattedList = _.map(groupedByAuthor, author => author)
  const temp = []

  flattedList.forEach(row => {
    const sum = _.sumBy(row, r => r.likes)
    const nameForTesti1 = _.map(row, r => r.author)
    temp.push({ author: nameForTesti1[0], likes: sum })
  })

  return _.maxBy(temp, l => l.likes)
}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
