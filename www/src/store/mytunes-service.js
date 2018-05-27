import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
// import store from '../store'

vue.use(vuex)

var api = axios.create({
  baseURL: 'https://itunes.apple.com/search?media=music&term=',
  // url:'',
  timeout: 3000
})
export default new vuex.Store({
  state:{
    songs: [],
    playlist: [],
    activeSong: {}
  },
  mutations:{
    addSongToPlaylist(state, song){
      state.playlist.push(song)
    },
    removeSongFromPlaylist(state, indexToRemove){
      state.playlist.splice(indexToRemove, 1)
    },
    setSongs(state, songs){
      state.songs = songs
    },
    setActiveSong(state, song){
      state.activeSong = song
    }

  },
  actions:{
    addSongToPlaylist({commit, dispatch, state}, song){
      commit('addSongToPlaylist', song)
      router.push({name: 'song'})
    },
    findSongs({commit, dispatch}, query){
      api.get(query)
        .then(res=> {
          commit('setSongs', res.data.results)
        })
    },
    getTracks() { },
    addTrack() { },
    removeTrack() { },
    promoteTrack() { },
    demoteTrack() { }
  }
})