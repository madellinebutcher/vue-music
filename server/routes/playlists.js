var router = require('express').Router()
var Playlists = require('../models/playlist')
// var Users = require('../models/user')
let session = require('../auth/session')


//GET ALL
// router.get('/api/playlists', (req, res, next) => {
//     Playlists.find({
//       userId : req.session.uid
//     })
//       .then(playlist => {
//         res.status(200).send(playlist)
//       })
//       .catch(err => {
//         res.status(400).send(err)
//       })
//   })
  
  //GET BY ID
  router.get('/api/playlists/:id?', (req, res, next)=>{
    if(req.params.id){
      Playlists.findById(req.params.id)
        .then(playlist =>{
          return res.status(200).send(playlist)
        })
        .catch(err => {
          return res.status(400).send(err)
        })
    }else{
      Playlists.find({})
        .then(playlist => {
          res.status(200).send(playlist)
        })
        .catch(err => {
          res.status(400).send(err)
        })
    }
  })
  
  //ADD
  router.post('/api/playlists', (req, res, next) => {
    var playlist = req.body
    Playlists.create(playlist)
      .then(newPlaylist => {
        res.status(200).send(newPlaylist)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  
  //EDIT
  router.put('/api/playlists/:id', (req, res, next) => {
    Playlists.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(playlist => {
        res.status(200).send({message: "Successfully Updated", playlist})
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  
  //DESTROY
  router.delete('/api/playlist/:id', (req, res, next)=>{
    Playlists.findByIdAndRemove(req.params.id)
      .then(data=>{
        res.send("Successfully Deleted Playlist")
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  
  module.exports = {
    router
  }