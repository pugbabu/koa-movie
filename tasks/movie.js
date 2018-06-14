const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Movie = mongoose.model('Movie')
;(async () => {
    const script = resolve(__dirname, '../crawler/index.js')
    const child =  cp.fork(script, [])
    let invoked = false
    
    child.on('error', err => {
        if (invoked) return
        invoked = true
        console.log(err)
    })

    child.on('exit', code => {
        if (invoked) return
        invoked = true
        let err = code === 0 ? null : `exit code: ${code}`
        console.log(err)
    })

    child.on('message', data => {
        let result = data.result
        let res = []
        result.forEach(async item => {
          let movie = await Movie.findOne({
            doubanId: item.doubanId
          })
          if (!movie) {
            movie = new Movie(item)
            res.push(movie.doubanId)
            // console.log(movie)
            console.log('~~~')
            // await movie.save()
            await movie.save(function(err) {// 之前这里一直存不进去，后来把douban-trailer数据库删了，换douban数据库就好了
              if (err) {
                throw new Error(err)
              } else {
                console.log('ok')
              }
            })
          }
        })
        
    })
})()