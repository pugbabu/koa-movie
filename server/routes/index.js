const Router = require('koa-router')
const router = new Router()
const {
  getAllMovies,
  getPlayingMovies,
  getComingMovies,
  getPopularMovies
} = require('../service/movie')
const url = '/api/v0/'
router.get(`${url}allMovies`, async (ctx, next) => {
  const movies = await getAllMovies()
  ctx.body = {
    data: {
      movies
    }
  }
})
router.get(`${url}nowplaying`, async (ctx, next) => {
  const movies = await getPlayingMovies()
  ctx.body = {
    data: {
      movies
    }
  }
})
router.get(`${url}comingSoon`, async (ctx, next) => {
  const movies = await getComingMovies()
  ctx.body = {
    data: {
      movies
    }
  }
})
router.get(`${url}latestPopular`, async (ctx, next) => {
  const movies = await getPopularMovies()
  ctx.body = {
    data: {
      movies
    }
  }
})
module.exports = router