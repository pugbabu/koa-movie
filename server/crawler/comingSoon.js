const puppeteer = require('puppeteer') // 无头浏览器
const url = 'https://movie.douban.com/cinema/later' // 豆瓣即将上映页面
const sleep = time => {// promise定时函数
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
;(async () => {
  console.log('开始爬取即将上映影片')
  // 模拟用户操作浏览器
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'], // 非沙箱模式
    dumpio: false
  })
  const page = await browser.newPage() // 开启新页面
  await page.goto(url, {
    waitUntil: 'networkidle2' // 网络空闲的时候，加载完毕
  })
  await sleep(3000) // 等待3s
  const result = await page.evaluate(() => {
    let $ = window.$ // 豆瓣使用了jquery,所以我们可以用$来操作
    let items = $('#showing-soon .item') // 电影容器
    let links = []
    if (items.length >= 1) {
      items.each((index, item) => {
        // 提取电影相关信息
        let it = $(item)
        let poster = it.find('.thumb img').attr('src').replace('s_ratio', 'l_ratio')
        let title = it.find('.intro h3 a').text()
        let movieTypes = it.find('.intro ul li:nth-child(2)').text().split('/') // 动作 / 犯罪 / 悬疑
        let wishCount = it.find('.intro ul .last span').text().replace(/[^0-9]/ig, '') //2528人想看
        let country = it.find('.intro ul li:nth-child(3)').text()
        let trailerUrl = it.find('.intro ul a').attr('href')
        let doubanId = it.find('.thumb').attr('href').replace('https://movie.douban.com/subject/', '').replace('/', '')
        doubanId = parseInt(doubanId)
        let urlType = 'comming'
        links.push({
          doubanId, //电影id
          title, //电影名称
          poster, //电影海报
          movieTypes, //电影类型
          wishCount, //想看人数
          country, //国家
          trailerUrl, // 预告地址
          urlType, // 跳转分类，如正在上映 即将上映 
        })  
      })
    }
    return links
  })
  browser.close()
  process.send({result})
  process.exit(0)


})()