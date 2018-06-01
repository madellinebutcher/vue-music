import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import store from '../store'



var api = axios.create({
  baseURL: 'https://itunes.apple.com/',
  timeout: 3000
})


var server = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000
})

vue.use(vuex)

function swapUrlSize(url, pixels) {
  var sizeString = `${pixels}x${pixels}`;
  var newURL = url.replace("60x60", sizeString);
  return newURL;
}


export default new vuex.Store({
  state:{
    songs: [],
    playlists: [],
    activeList: {},
    // user: {}
  },
  mutations:{
    addSongToPlaylist(state, song){
      state.playlists.push(song)
    },
    removeSongFromPlaylist(state, indexToRemove){
      state.playlists.splice(indexToRemove, 1)
    },
    setSongs(state, songs){
      state.songs = songs
    },
    addPlaylist(state, playlist){
      state.playlists.push(playlist)
    },
    // setUser(state, user) {
    //   state.user = user
    // },
    setPlaylists(state, lists) {
      state.playlists = lists
    },
    setActivePlaylist(state, list) {
      state.activeList = list
    }
    // setActiveSong(state, song){
    //   state.activeSong = song
    // }

  },
  actions:{
    addSongToPlaylist({commit, dispatch, state}, song){
      commit('addSongToPlaylist', song)
      // router.push({name: 'song'})
    },
    findSongs({commit, dispatch}, query){
      api.get('search?media=music&term=' + query)
        .then(res=> {
          var songList = res.data.results.map(function (song){ 
            return {
            title: song.trackName,
            albumArt: swapUrlSize(song.artworkUrl60, 275), //? song.artworkUrl100.replace('100x100, '250x250') : '/placehold.it/250x250
            artist: song.artistName,
            collection: song.collectionName,
            // price: song.collectionPrice,
            preview: song.previewUrl
            };
          })
      
          commit('setSongs', songList)
        })
    },
    getPlaylists({commit, dispatch, state}, playlist){
      server.get('api/playlists/')
      .then(res=> {
        commit('getPlaylists', playlist)
      })
    },
    removeSongFromPlaylist({dispatch, commit, state}, song){
      var index = state.playlists.findIndex(s=> s.id==song.id)
        commit('removeSongFromPlaylist', index)
    },
    createPlaylist({commit, dispatch}, playlist){
      server.post('api/playlists', playlist)
        .then(res=>{
          commit('addPlaylist', res.data)
        })
    },
    getAllPlaylist({commit, dispatch}, playlist){
      server.get('api/playlists')
        .then(res=> {
          commit('setActivePlaylist',res.data)
        })
    },
    // addUser({dispatch, commit}, user) {
    //   server.post('/api/register', user)
    //    .then(newUser => {
    //      commit('setUser', newUser)
    //      router.push('/')
    //    })
    // },
    // getUser({dispatch, commit}, user) {
    //   server.post('/api/login', user) 
    //    .then(newUser => {
    //      commit('setUser', newUser)
    //      router.push('/')
    //    })
    // },
    // getPlaylists({dispatch, commit, state}){
    //   server.get('/api/playlists/:id?')
    //    .then(lists => {
    //      commit('setPlaylists', lists)
    //    })
    // },
    activePlaylist({dispatch, commit}, list) {
      commit('setActivePlaylist', list)
    }
    // getTracks() { },
    // addTrack() { },
    // removeTrack() { },
    // promoteTrack() { },
    // demoteTrack() { }
  }
})