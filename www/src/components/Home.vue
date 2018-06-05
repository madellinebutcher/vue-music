<template>
  <div class="hello">

    <div class="searchbar">
      <form @submit.prevent="findSongs">
        <input type="text" v-model="query">
      </form>
    </div>
    
    <div class="songs-section">

      <div class="results">
        <h4>Results for {{title}}:</h4>
        <div class="row">
          <songs :list="songs" button-text="Add to playlist" :handle-button-click="addSongToPlaylist"></songs>
        </div>
      </div>
      <hr>
      <div class="playlist">
        <input type="text" v-model="playlist.title">
        <button @click="createPlaylist">Create Playlist</button>
        <div class="row">
          <songs :list="playlists" button-text="Remove from playlist" :handle-button-click="removeSongFromPlaylist"></songs>
        </div>
      </div>
    </div>

    <div class="detailed-view">
     
    </div>
    <div v-for="playlist in playlists">
      <p>{{playlist.title}}</p>
      <button @click="setActivePlaylist(playlist)">Choose Playlist</button>
    </div>
  </div>
</template>

<script>
  import songs from './songs'
  import userPlaylist from './userPlaylist'
  export default {
    name: 'Home',
    components: {
      songs,
      userPlaylist
    },
    mounted(){
      this.$store.dispatch('getAllPlaylist')
    },
    data() {
      return {
        query: '',
        title: '',
        playlist:{}
      }
    },
    computed: {
      songs() {
        return this.$store.state.songs
      },
      playlists() {
        return this.$store.state.playlists
      },
      activePlaylist() {
        return this.$store.state.activePlaylist
      }
    },
    methods: {
      findSongs() {
        this.$store.dispatch('findSongs', this.query)
        this.title = this.query
        this.query = ''
      },
      addSongToPlaylist(song) {
        this.$store.dispatch('addSongToPlaylist', {song: song, playlistId: this.activePlaylist._id})
        debugger
      },
      removeSongFromPlaylist(song) {
        this.$store.dispatch('removeSongFromPlaylist', song)
      },
      setActivePlaylist(list) {
        this.$store.dispatch('activePlaylist', list)
      }, 
      createPlaylist(){
        this.$store.dispatch('createPlaylist', this.playlist)
        this.playlist = {}
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .songs-section {
    display: grid;
    grid-template-areas: "results playlist"
  }

  .results {
    grid-area: results
  }

  .playlist {
    grid-area: playlist
  }

  ol {
    list-style-type: none;
  }
</style>