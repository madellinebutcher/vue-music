var router = require('express').Router()
var Playlist = require('../models/playlist')
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
  router.get('/api/playlists/:id?', (req, res)=>{
    if(req.params.id){
      Playlist.findById(req.params.id)
        .then(playlist =>{
          return res.status(200).send(playlist)
        })
        .catch(err => {
          return res.status(400).send(err)
        })
    }else{
      Playlist.find({})
        .then(playlist => {
          return res.status(200).send(playlist)
        })
        .catch(err => {
          return res.status(400).send(err)
        })
    }
  })

  // router.get('/api/user-playlists/:_id', (req, res) => {
  //   Playlist.find({
  //     userId: req.params.id
  //   })
  //    .then(lists => {
  //      res.status(200).send(lists)
  //    })
  //    .catch(err => {
  //     res.status(400).send(err)
  //    })
  // })
  
  //ADD
  router.post('/api/playlists', (req, res) => {
    var playlist = req.body
    Playlist.create(playlist)
      .then(newPlaylist => {
        res.status(200).send(newPlaylist)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  
  //EDIT
  //add a single song REQ.BODY will be a song object
  router.put('/api/playlists/:id/songs', (req, res) => {
    Playlist.findById(req.params.id)
    .then(function (playlist){
      playlist.songs.addToSet(req.body)
      playlist.save()
      res.send(playlist)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })
  //update entire song array from entire playlist
  router.put('/api/playlists/:id', (req, res)=>{
    Playlist.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(playlist=>{
        res.send(playlist)
      })
      .catch(err=>{
        res.status(400).send(err)
      })
  })
  
  
  
  //DESTROY
  router.delete('/api/playlists/:id', (req, res, next)=>{
    Playlist.findByIdAndRemove(req.params.id)
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