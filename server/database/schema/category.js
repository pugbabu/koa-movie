const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {Mixed, ObjectId} = Schema.Types
const categorySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  movies: [{
    type: ObjectId,
    ref: 'Movie'
  }],
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
categorySchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.createdAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
})
mongoose.model('Category', categorySchema)