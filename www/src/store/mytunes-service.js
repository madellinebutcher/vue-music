import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import store from '../store'

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
  },
  mutations:{
    addSongToPlaylist(state, song){
      state.playlist.push(song)
    }
  },
  actions:{
    addSongToPlaylist({commit, dispatch}, song){
      commit('addSongToPlaylist', song)
      router.push({name: 'song'})
    },
    getTracks() { },
    addTrack() { },
    removeTrack() { },
    promoteTrack() { },
    demoteTrack() { }
  }
})