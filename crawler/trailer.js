const puppeteer = require('puppeteer')
const base = 'https://movie.douban.com/subject/'
const videoBase = 'https://movie.douban.com/trailer/231093/#content'
const doubanId = '27133303'


const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('开始爬取')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(base + doubanId, {
    waitUntil: 'networkidle2'
  })

  await sleep(1000)
  const result = await page.evaluate(() => {
    let $ = window.$
    let it = $('.related-pic-video')
    if (it && it.length > 0) {
        let link = it.attr('href')
        let cover = it.find('img').attr('src')
        return {
            link,
            cover
        }
    }
    return {}
  })
  let video 
  if (result.link) {
      await page.goto(result.link, {
          waitUntil: 'networkidle2'
      })
      await sleep(2000)
      video = await page.evaluate(() => {
          let $ = window.$
          let it = $('source')
          if (it && it.length > 0) {
              return it.attr('src')
          }
          return ''
      })
  }
  const data = {
      video,
      doubanId,
      cover: result.cover
  }
  browser.close()
  process.send(data)
  process.exit(0)  
})()