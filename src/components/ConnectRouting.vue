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
import ThrowError from '@/mixins/ThrowError'

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

  mixins: [
    ThrowError
  ],

  methods: {

    /**
     * ensure connection on action cable
     * and the classic AJAX
     */
    connectAll (token) {
      this.connectCable(token)
      this.connectApi(token)
    },

    /**
     * connect to the action cable system
     */
    connectCable (token) {
      console.log('connect to action cable ...')
      const cable = ActionCable.createConsumer(`${Vue.config.cable_domain}/cable?token=${token}`)
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
    connectApi (token) {
      console.log('connection to api ...')

      this.$axios
      .get('/')
      .then(
        (response) => {
          localStorage.setItem('token', token)
          this.valid_token = true
          console.log('api connected.')
          return true
        },
        this.throwError.bind(this)
      )
    }
  }
}
</script>
