<template>
  <div class="auth-routing">
    <div v-if="$user.token()">
      <router-view />
    </div>

    <div v-else>
      <div class="loader">
        Recovering history ...
      </div>
    </div>

  </div>
</template>

<script>
import ActionCable from 'actioncable'
import Vue from 'vue'

export default {

  data () {
    return {
    }
  },

  created () {
    if (!this.$user.token()) {
      this.connectAnonymous()
    }
  },

  methods: {

    connectCable (token) {
      console.log('connect to action cable ...')
      const origin = 'ws://localhost:8000'
      const cable = ActionCable.createConsumer(`${origin}/cable?token=${token}`)
      Vue.prototype.$cable = cable
      console.log('action cable connected.')
    },

    connectAnonymous () {
      console.log('connect anonymous ...')
      this.$axios.post(`connect/anonymous`)
      .then(response => {
        // TODO : same here, just use http verb
        if (response.data.success) {
          return this.connect(response.data.data.token)
        } else {
          return false
        }
      })
      .catch(e => {
        this.errors.push(e)
      })
    },

    /**
     * save as much info as we can into $user
     * using a token
     */
    connect (token) {
      console.log('definitely not logged-in')
      this.$axios.get('/', {params: {token: token}})
      .then(response => {
        console.log(response)
        if (response.data.success) {
          this.$cookie.set('token', token)
          return true
        } else {
          // TODO : improve this using only HTTP to setup errors to avoid double
          return false
        }
      })
      .catch(e => {
        console.log('failed log-in')
        return false
      })
    }
  }
}
</script>
