const connectionStringWriter = require('../config/config').DB.connectionWriter
const connectionStringReader = require('../config/config').DB.connectionReader
const promise = require('bluebird')
const mongoskin = require('mongoskin')

for(let value in mongoskin) {
  if(typeof value === 'function') {
    promise.promisifyAll(value)
    promise.promisifyAll(value.prototype)
  }
}

promise.promisifyAll(mongoskin)

exports.baseWriter = mongoskin.db(connectionStringWriter, {w: 1})

exports.baseReader = mongoskin.db(connectionStringReader, {w: 0})