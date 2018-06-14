const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATIMES = 5
const LOCK_TIME = 2 * 60 * 60 * 1000  
const UserSchema = new Schema({
     username: {
       unique: true,
       type: String,
       required: true
     },
     email: {
       unique: true,
       type: String,
       required: true
       
     },
     password: {
       unique: true,
       type: String
     },
     loginAttempts: {
        type: Number,
        required: true,
        default: 0
     },
     lockUtil: Number,
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
UserSchema.virtual('isLocked').get(() => {
  return !!(this.lockUtil && this.lockUtil > Date.now())
})
UserSchema.pre('save', function(next)    {
  if (this.isNew) {
    this.meta.createdAt = this.meta.createdAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error)
      this.password = hash
      next()
    })
  })
  next()
})
UserSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  incLoginAttepts: (user) => {
    return new Promise((resolve, reject) => {
      if (this.lockUtil && this.lockUtil < Date.now()) {
        this.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUtil: 1
          }
        }, (err) => {
          if (!err) resolve(true)
           else  reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATIMES && !this.isLocked) {
          updates.$set = {
            lockUtil: Date.now() + LOCK_TIME
          }
        }
        this.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })  
  }
}



mongoose.model('User', UserSchema)