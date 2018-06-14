const mongoose = require('mongoose')
console.log('-------')
const getAllMovies = async (type, year) => {
  const Movie = mongoose.model('Movie')

  let query = {}
  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }
  if (year) {
    query.year = year
  }
  const movies = await Movie.find(query).sort({
    'meta.createdAt': -1
  })
  return movies
}
const getPlayingMovies = async (type, year) => {
  const Movie = mongoose.model('Movie')

  let query = {}
  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }
  if (year) {
    query.year = year
  }
  query.urlType = 'playing'
  const movies = await Movie.find(query).sort({
    'meta.createdAt': -1
  })
  return movies
}
const getComingMovies = async (type, year) => {
  const Movie = mongoose.model('Movie')

  let query = {}
  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }
  if (year) {
    query.year = year
  }
  query.urlType = 'comming'
  const movies = await Movie.find(query).sort({
    'meta.createdAt': -1
  })
  return movies
}
const getPopularMovies = async (type, year) => {
  const Movie = mongoose.model('Movie')

  let query = {}
  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }
  if (year) {
    query.year = year
  }
  query.urlType = 'popular'
  const movies = await Movie.find(query).sort({
    'meta.createdAt': -1
  })
  return movies
}
module.exports.getAllMovies = getAllMovies
module.exports.getPlayingMovies = getPlayingMovies
module.exports.getComingMovies = getComingMovies
module.exports.getPopularMovies = getPopularMovies