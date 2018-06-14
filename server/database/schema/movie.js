const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {
  Mixed,
  ObjectId
} = Schema.Types
const movieSchema = new Schema({
  doubanId: {
    type: String,
    unique: true
  },
  // 两张 Schema 的关联关系
  category: [{
    type: ObjectId,
    ref: 'Category' // 指想模型
  }],
  score: Number, //评分
  star: Number, // 星星数
  title: String, //中文名
  poster: String, //海报图
  movieTypes: [String], // 类别
  pubdate: Mixed, // 上线日期
  year: Number,  // 上线年份
  tags: [String], // 标签；惊悚、恐怖...
  wishCount: String, // 想看人数
  country: String, // 影片国家
  trailerUrl: String, // 预告片地址
  urlType: String, // 跳转分类，如正在上映 即将上映 
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})
movieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.createdAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
mongoose.model('Movie', movieSchema)