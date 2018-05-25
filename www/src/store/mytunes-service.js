import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

let api = axios.create({
  baseURL: 'https://itunes.apple.com/search?media=music&term=',
  timeout: 3000
})

vue.use(vuex)

export default new vuex.Store({
  state:{
    songs: [],
    playlist: []
  }
  getTracks() { },
  addTrack() { },
  removeTrack() { },
  promoteTrack() { },
  demoteTrack() { }
})