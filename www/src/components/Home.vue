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
          <songs :list="songs" button-text="Add to playlist" :handle-button-click="addSong"></songs>>
        </div>
      </div>
      <hr>
      <div class="playlist">
        <div class="row">
          <songs :list="playlist" button-text="Remove from playlist" :handle-button-click="removeSong"></songs>
        </div>
      </div>
    </div>

    <div class="detailed-view">
      details here
    </div>

  </div>
</template>

<script>
  import Playlist from './Playlist.vue'
  export default {
    name: 'Home',
    components: {
      songs
    },
    data() {
      return {
        query: '',
        title: ''
      }
    },
    computed: {
      songs() {
        return this.$store.state.songs
      },
      playlist() {
        return this.$store.state.playlist
      },
      activeSong() {
        return this.$store.state.activeSong
      }
    },
    methods: {
      findSongs() {
        this.$store.dispatch('findSongs', this.query)
        this.title = this.query
        this.query = ''
      },
      addSongToPlaylist(song) {
        this.$store.dispatch('addSong', song)
      },
      removeSongFromPlaylist(song) {
        this.$store.dispatch('removeSong', song)
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
    grid-area: watchlist
  }
</style>