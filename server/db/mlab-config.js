var mongoose = require('mongoose')
var connectionString = 'mongodb://user:user@ds237707.mlab.com:37707/mjb-vue-music'
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', ()=>{
  console.log('Connected to Database')
})