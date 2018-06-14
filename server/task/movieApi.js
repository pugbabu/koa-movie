const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')
// const fetchMovie = (item) => {
//   return new Promise((resolve, reject) => {
//     const url = `http://api.douban.com/v2/movie/${item.doubanId}`
//     rp(url).then(res => {
//       res = JSON.parse(res)
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })

//   })
// }
async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/${item.doubanId}`
  const res = await rp(url)
  let body
  try {
    body = JSON.parse(res)
  } catch (err) {
    console.log(err)
  }
  return body
}
// 通过豆瓣电影api获取电影更详细的信息
;
(async () => {
  // let movies = [{ // 模拟数据
  //   doubanId: '30198241',
  //   title: '时间监狱',
  //   poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2524704311.webp'
  // }]
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
        summary: ''
      },
      {
        year: {
          $exists: false
        }
      },
      {
        year: ''
      },
      {
        title: ''
      }
    ]
  })
  console.log(movies, '~~~')
  
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    // let movieData = null
    let movieData = await fetchMovie(movie)
    // fetchMovie(movie).then(r => {
    // movieData = r
    let tags = movieData.tags || []
    movie.tags = []
    movie.summary = movieData.summary || '' // 电影描述
    movie.title = movieData.alt_title || movieData.title || ''
    if (movieData.attrs) {
      let attrs = movieData.attrs
      movie.movieTypes = attrs.movie_type || []
      movie.year = attrs.year[0] || 10000
      for (let i = 0; i < movie.movieTypes.length; i++) {
        let item = movie.movieTypes[i]
        let cat = await Category.findOne({
          name: item
        })
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
        await cat.save(function(err) {
          if (err) {
            throw new Error(err)
          } else {
            console.log('ok')
          }
        })
        if (!movie.category) {
          movie.category.push(cat._id)
        } else {
          if (movie.category.indexOf(cat._id) === -1) {
            movie.category.push(cat._id)
          }
        }
      }

      let dates = attrs.pubdate || [] // 上映日期 格式如[ '2018-06-15(中国大陆)' ]
      let pubdates = []
      dates.map(item => {
        if (item && item.split('(').length > 0) {
          let parts = item.split('(')
          let date = parts[0] // 上映日期
          let country = '未知'
          if (parts[1]) {
            country = parts[1].split(')')[0]
          }
          pubdates.push({
            date,
            country
          })
        }
      })
      movie.pubdate = pubdates

    }
    tags.forEach(tag => {
      movie.tags.push(tag.name)
    })
    console.log(movie, '////')
    // })
    await movie.save()
  }



})()