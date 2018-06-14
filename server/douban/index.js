const axios = require('axios')
const url = 'http://api.douban.com/v2/movie'
const getMovieInTheaters = async () => {
  return axios.get(`${url}/in_theaters`, {
    start: 1
  }).then(res => {
    console.log(res.data.subjects.length)
  })
}
getMovieInTheaters()