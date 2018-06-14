// const url = 'http://api.douban.com/v2/movie/coming_soon‘
const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')
async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/${item.doubanId}`
  const res = await rp(url)
  let body
  try {
    body = JSON.parse(res)
  } catch (err) {
    console.log(err)
  }
  console.log(body)
  console.log('/////')
  return body
}

;
(async () => {
  let movies = await Movie.find({
    $or: [{
        summary: { 
          $exists: false
        }
      },
      {
        summary: null
      },
      {
        title: ''
      },
      {
        summary: ''
      },
      {
        year: {
          $exists: false
        }
      }
    ]
  })

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    let movieData = await fetchMovie(movie)
    
    if (movieData) {
      console.log(11)
      let tags = movieData.tags || []
      movie.tags = movie.tags || []
      movie.summary = movieData.summary || ''
      movie.title = movieData.alt_title || movieData.title || ''
      movie.rawTitle = movieData.title || ''
      console.log(22)
      if (movieData.attrs) {
        movie.movieTypes = movieData.attrs.movie_type || []
        movie.year = movieData.year[0] || 6666
        for (let i = 0; i < movie.movieTypes.length; i++) {
          console.log('~~~')
          let item = movie.movieTypes[i]
          let cat = await Category.findOne({
            name: item
          })
          console.log(cat)
          if (!cat) {
            cat = new Category({
              name: item,
              movies: [movie._id]
            })
          } else {
            if (cat.movies.indexOf(movie._id) === -1) {
              cat.movies.push(movie._id)
            }
          }
          console.log('~!~2')
          await cat.save(function(err) {
            if (err) {
              throw new Error(err)
            } else {
              console.log('ok')
            }
          })
          if (!movie.category.length) {
            movie.category.push(cat._id)
          } else {
            if (movie.category.indexOf(cat._id) === -1) {
              movie.category.push(cat._id)
            }
          }
          console.log(33)
        }
        console.log(44)      
        let dates = movieData.attrs.pubdates || []
        let pubdates = []
        dates.map(item => {
          console.log(55)
          if (item && item.split('(').length > 0) {
            let parts = item.split('(')
            let date = parts[0]
            let country = '未知'
            if (parts[1]) {
              country = parts[1].split(')')[0]
            }
            pubdates.push({
              date: new Date(date),
              country
            })
          }
        })
        console.log(66)
        movie.pubdate = pubdates
      }
      tags.forEach(tag => {
        movie.tags.push(tag.name)
      })
      console.log('@@@')
      console.log(movie)
      await movie.save()
    }
  }

})()