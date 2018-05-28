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

var apiDB = axios.create({
  baseURL: 'mongodb://user:user@ds237707.mlab.com:37707/mjb-vue-music',
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
    playlist: []
    // activeSong: {}
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
    }
    // setActiveSong(state, song){
    //   state.activeSong = song
    // }

  },
  actions:{
    addSongToPlaylist({commit, dispatch, state}, song){
      commit('addSongToPlaylist', song)
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
      var index = state.playlist.findIndex(s=> s.id==song.id)
        commit('removeSongFromPlaylist', index)
    }
    // getTracks() { },
    // addTrack() { },
    // removeTrack() { },
    // promoteTrack() { },
    // demoteTrack() { }
  }
})