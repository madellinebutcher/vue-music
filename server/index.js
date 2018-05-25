var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())
//Fire up database connection
require('./db/mlab-config')


//REGISTER MIDDLEWEAR
app.use(bp.json())
app.use(bp.urlencoded({
  extended: true
}))

let auth = require('./auth/routes')
app.use(auth.router)
app.use(auth.session)

//routes
var playlists = require ('./routes/playlists')


app.use(playlists.router)



app.get('*', (req, res, next)=>{
  res.status(404).send({
    error:'No matching routes'
  })
})

app.listen(port, ()=>{
  console.log('server running on port', port)
})