<template>
  <div class="connect-routing">
    <div v-if="error">
      <div class="error">
        {{ error }}
      </div>
    </div>
    <div v-else>

      <div v-if="valid_token">
        <router-view />
      </div>
      <div v-else>
        <div class="loader">
          Recovering history ...
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import ActionCable from 'actioncable'
import DryCable from '@/plugins/DryCable'
import Vue from 'vue'
import ThrowError from '@/mixins/ThrowError'
import EventBus from '@/misc/event-bus.js'

export default {

  data () {
    return {
      valid_token: false,
      error: ''
    }
  },

  created () {
    // NOTE : we don't use that as it makes more issues than anything else in the system
    // var vm = this
    // const keyBack = 8
    // window.addEventListener('keyup', function (event) {
    //   // if you press the back key
    //   if (event.keyCode === keyBack) {
    //     // if we don't have the focus on any specific element on the page
    //     if (document.activeElement.tagName.toLowerCase() === 'body') {
    //       vm.$router.go('/')
    //     }
    //   }
    // })

    /**
     * We put a listener to the errorEvent
     */
    EventBus.$on('errorEvent', error => {
      if (error.message === 'Network Error') {
        this.error = 'Network error, please refresh the page.'
      }
    })

    /**
     * We take care of the connection
     */
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

      const cableDomain = 'ws://localhost:8000'
      const cable = ActionCable.createConsumer(`${cableDomain}/cable?token=${token}`)
      Vue.prototype.$cable = cable
      Vue.use(DryCable, cable)
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

      /**
       *  here is the only time we actually force the token beforehand
       */
      this.$axios
      .get('/', {params: {token: token}})
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
