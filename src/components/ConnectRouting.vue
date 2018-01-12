<template>
  <div class="connect-routing">
    <div v-if="valid_token">
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
      valid_token: false
    }
  },

  created () {
    if (this.$user.token()) {
      this.connectAll(this.$user.token())
    } else {
      this.connectAnonymous()
    }
  },

  methods: {

    /**
     * ensure connection on action cable
     * and the classic AJAX
     */
    connectAll (token) {
      this.connectCable(token)
      this.connect(token)
    },

    /**
     * connect to the action cable system
     */
    connectCable (token) {
      console.log('connect to action cable ...')
      const origin = 'ws://localhost:8000'
      const cable = ActionCable.createConsumer(`${origin}/cable?token=${token}`)
      Vue.prototype.$cable = cable
      console.log('action cable connected.')
    },

    /**
     * process the anonymous log-in
     * this will create a new user
     * and connect it completely
     */
    connectAnonymous () {
      console.log('connect anonymous ...')

      this.$axios
      .post(`connect/anonymous`)
      .then(
        (response) => {
          console.log(`token: ${response.data.token}`)
          return this.connectAll(response.data.token)
        },
        this.throwError.bind(this)
      )
    },

    /**
     * save as much info as we can into $user
     * using a token
     * this method on each page refresh
     * to verify the token validity
     */
    connect (token) {
      console.log('check connection ...')

      this.$axios
      .get('/', {params: {token: token}})
      .then(
        (response) => {
          console.log('connected.')
          localStorage.setItem('token', token)
          this.valid_token = true
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
