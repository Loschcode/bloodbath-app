<template>
  <div class="auth-routing" v-if="$auth.ready()">
    <div v-if="$auth.check()">
      <router-view />
    </div>

    <div v-else>
      <div class="loader">
        Recovering history ...
      </div>
    </div>

  </div>

  <div v-else>
    <div class="loader">
      Loading ...
    </div>
  </div>
</template>

<script>
import ActionCable from 'actioncable'
import Vue from 'vue'

export default {

  data () {
    return {
      email: '',
      password: ''
    }
  },

  created () {
    this.registerAnonymous()
    // this.doAuth({email: this.email, password: this.password})
  },

  methods: {

    connectCable (credentials) {
      console.log('connect to action cable ...')
      const origin = 'ws://localhost:8000'
      const cable = ActionCable.createConsumer(`${origin}/cable?email=${credentials.email}&password=${credentials.password}`)
      Vue.prototype.$cable = cable
      console.log('action cable connected.')
    },

    registerAnonymous () {
      this.$axios.post(`connect/anonymous`)
      .then(response => {
        if (response.data.success) {
          this.email = response.data.data.email
          this.password = response.data.data.password

          // TODO : this is for test purpose
          this.doAuth({email: this.email, password: this.password})
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
    },

    /**
     * Authenticate the client
     */
    doAuth (credentials) {
      if (!this.$auth.check()) {
        console.log('definitely not logged-in')

        console.log(credentials)
        this.$auth.login({
          data: credentials,
          redirect: false
        })

        .then((res) => {
          console.log('token : ' + this.$auth.token())
          // this.connectCable(credentials)
        }, (res) => {
          console.log('failed log-in')
          this.error = res.data
        })
      }
    }
  }
}
</script>
