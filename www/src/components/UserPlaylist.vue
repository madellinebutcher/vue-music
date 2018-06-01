<template>
  <div class="user-playlist">
    <h4></h4>
    <ul>
        <li v for="song in playlist.songs"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'user-playlist',
    data() {
      return {

      }
    },
    computed: {
        playlist(){
            return this.$store.state.activeList
        }
    },
    methods: {}
  }

</script>

<style>


</style>
