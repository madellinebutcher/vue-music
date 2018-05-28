<template>
        <ol class="col-sm-6">
          <li v-for="song in list">
            
            <p>{{song.title}}</p>
            <button @click="handleButtonClick(song)">{{buttonText}}</button>
          </li>
        </ol>
</template>
      
      <script>
        export default {
          name: 'songs-list',
          props: {
            list: {
              type: Array,
              required: true
            },
            buttonText: {
              type: String,
              required: true
            },
            handleButtonClick: {
              type: Function,
              required: true
            }
          }
        }
      
      </script>
      