// const url = 'http://api.douban.com/v2/movie/coming_soon‘
const rp = require('request-promise-native')

async function fetchMovie(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)
    return res
}

;(async () => {
    let movies = [
        {   doubanId: 30200988,
            title: '假如没有遇见你',
            rate: 8.1,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2521436888.jpg' 
        },
        {   doubanId: 27185556,
            title: '上海女子图鉴',
            rate: 6.5,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2519897720.jpg' 
        },
    ]
    movies.map(async (movie) => {
        let movieData = await fetchMovie(movie)
        try{
            movieData = JSON.parse(movieData)
            console.log(movieData)
        } catch(err) {
            console.log(err)
        }
    })  
})()