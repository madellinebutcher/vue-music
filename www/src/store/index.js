import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import store from '../store'

vue.use(vuex)

var api = axios.create({
  baseURL: 'https://itunes.apple.com/',
  timeout: 3000
})

var server = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})

function swapUrlSize(url, pixels) {
  var sizeString = `${pixels}x${pixels}`;
  var newURL = url.replace("60x60", sizeString);
  return newURL;
}
// var musicAPI = axios.create({
//   baseURL:
// })
export default new vuex.Store({
  state:{
    songs: [],
    playlists: [],
    activeList: {},
    // user: {}
  },
  mutations:{
    addSongToPlaylist(state, newList){
      state.activeList = newList
    },
    removeSongFromPlaylist(state, indexToRemove){
      state.playlists.splice(indexToRemove, 1)
    },
    setSongs(state, songs){
      state.songs = songs
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
      state.activeList.songs.push(song)
      server.put('/playlists/' + state.activeList.id, state.activeList)
       .then(newList => {
        commit('addSongToPlaylist', newList)
       })
      // router.push({name: ''})
    },
    findSongs({commit, dispatch}, query){
      api.get('search?media=music&term=' + query)
        .then(res=> {
          var songList = res.data.results.map(function (song){ 
            return {
            title: song.trackName,
            albumArt: swapUrlSize(song.artworkUrl60, 275),
            artist: song.artistName,
            collection: song.collectionName,
            // price: song.collectionPrice,
            preview: song.previewUrl
            };
          })
      
          commit('setSongs', songList)
        })
    },
    removeSongFromPlaylist({dispatch, commit, state}, song){
      var index = state.playlists.findIndex(s=> s.id==song.id)
        commit('removeSongFromPlaylist', index)
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
    getPlaylists({dispatch, commit, state}){
      server.get('/api/playlists/:id?')
       .then(lists => {
         commit('setPlaylists', lists)
       }
       )
    },
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