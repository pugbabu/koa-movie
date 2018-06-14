const Koa = require('koa')
const mongoose = require('mongoose')
const {connect, initSchemas} = require('./database/init')
const {resolve} = require('path')
const router = require('./routes/index')
// console.log(router)
// const R = require('ramda')
// const MIDDLEWARES = ['router']
// const useMiddlewares = (app) => {
//   R.map(
//       R.compose(
//           R.forEachObjIndexed(
//               initWith => initWith(app)
//           ),
//           require,
//           name => resolve(__dirname, `./middlewares/${name}`) 
//       )
//   )(MIDDLEWARES);
// }
;(async () => {
  await connect()
  initSchemas()
  // require('./task/nowplaying') // 测试爬取正在热映数据，并保存到数据库
  // require('./task/comingSoon') // 测试爬取即将上映数据，并保存到数据库
  // require('./task/latestPopular') // 测试爬取即将上映数据，并保存到数据库
  
  // require('./task/movieApi')
  const app = new Koa();
  app
    .use(router.routes())
    .use(router.allowedMethods())
  // await useMiddlewares(app);
  app.listen(4455, () => {
      console.log('Server is running...');
  });

})()
