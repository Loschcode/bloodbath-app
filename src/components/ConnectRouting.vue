<template>
  <div class="connect-routing">
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

    // TODO : to link somewhere (after login ?)
    connectCable (token) {
      console.log('connect to action cable ...')
      const origin = 'ws://localhost:8000'
      const cable = ActionCable.createConsumer(`${origin}/cable?token=${token}`)
      Vue.prototype.$cable = cable
      console.log('action cable connected.')
    },

    connectAnonymous () {
      console.log('connect anonymous ...')

      this.$axios
      .post(`connect/anonymous`)
      .then(
        (response) => {
          console.log(`token: ${response.data.token}`)
          return this.connect(response.data.token)
        },
        this.throwError.bind(this)
      )
    },

    /**
     * save as much info as we can into $user
     * using a token
     */
    connect (token) {
      console.log('definitely not logged-in')

      this.$axios
      .get('/', {params: {token: token}})
      .then(
        (response) => {
          console.log('connected.')
          localStorage.setItem('token', token)
          // this.$cookie.set('token', token)
          return true
        },
        this.throwError.bind(this)
      )
    },

    /**
     * TODO : should be abstracted elsewhere such as in a mixin and used everywhere
     */
    throwError (error) {
      console.log(error.response.data)
      return false
    }
  }
}
</script>
