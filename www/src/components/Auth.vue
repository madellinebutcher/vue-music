<!-- <template>
        <div class="Auth">
      
          <div class="login" v-if="showLogin">
            <h1>Login</h1>
            <form v-on:submit.prevent="login" class="form">
              <input class="input" type="text" name="name" placeholder=" username" id="name" v-model="user.username">
              <input class="input" type="text" name="name" placeholder=" displayName" id="name" v-model="user.displayName">
              <button  type="submit">Login</button>
            </form>
            <p class="user">Not a user ?
              <em @click="toggle">Register</em>
            </p>
          </div>
          <div class="register" v-if="!showLogin">
            <h1>Register</h1>
            <form v-on:submit.prevent="register">
              <input class="register" type="text" name="name" id="name" v-model="user.username">
              <input class="input" type="text" name="name" placeholder=" displayName" id="name" v-model="user.displayName">
              <button type="submit">Register</button>
            </form>
            <p>Already a user?
              <em @click="toggle">Login</em>
            </p>
          </div>
    
        </div>
      </template>
      
      
      <script>
        export default {
          name: 'Auth',
          data() {
            return {
              user: {
                username: '',
                displayName: ''
              },
              showLogin: true
            }
          },
          computed: {},
          methods: {
            toggle() {
              this.showLogin = !this.showLogin
            },
            register() {
              this.$store.dispatch('addUser', this.user)
            },
            login() {
              this.$store.dispatch('getUser', this.user)
            }
          }
        }
      </script>
      <style scoped>
      
      </style> -->