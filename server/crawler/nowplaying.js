const puppeteer = require('puppeteer') // 无头浏览器
const url = 'https://movie.douban.com/cinema/nowplaying' // 豆瓣正在热映页面
const sleep = time => {// promise定时函数
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
;(async () => {
  console.log('开始爬取正在热映影片')
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
  await page.waitForSelector('.more') // 等待加载更多按钮出现为止，该按钮class="more"
  // 点击加载更多按钮，i 爬取几页数据
  for (let i = 0; i < 1; i++) {
    await sleep(3000)
    await page.click('.more')
  }
  const result = await page.evaluate(() => {
    let $ = window.$ // 豆瓣使用了jquery,所以我们可以用$来操作
    let items = $('.lists .list-item') // 电影容器
    let links = []
    if (items.length >= 1) {
      items.each((index, item) => {
        // 提取电影相关信息
        let it = $(item)
        let doubanId = it.attr('id')
        let title = it.data('title')
        let score = it.data('score')
        let star = it.data('star')
        let release = it.data('release')
        let duration = it.data('duration')
        let region = it.data('region')
        let director = it.data('director')
        let category = it.data('category')
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')
        let href = it.find('.poster a').attr('href')  
        let urlType = 'playing'  
        links.push({
          doubanId, //电影id
          title, //电影名称
          star, //电影几颗星
          score, //电影评分
          poster, //电影海报
          urlType, // 跳转分类，如正在上映 即将上映 
        })  
      })
    }
    // console.log(links, '~~~')
    return links
  })
  browser.close()
  process.send({result})
  process.exit(0)


})()