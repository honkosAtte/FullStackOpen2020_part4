const dummy = (blogs) => 1

const totalLikes = (blogs) => {
if (blogs === []) {
  return 0
}

  const reducer = (acc, curr) => {
    return acc + curr.likes
  }
  return blogs.reduce(reducer, 0)

}

module.exports = { dummy, totalLikes }
