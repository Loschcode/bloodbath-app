<template>
  <div class="connect-routing">
    <div v-if="error">
      <div class="error">
        {{ error }}
      </div>
    </div>
    <div v-else>

      <!-- If everything is valid we route -->
      <div v-if="valid_token">
        <!-- Load the correct page -->
        <router-view />
        <!-- Footer is here -->
        <default-footer />
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
import DefaultFooter from '@/components/DefaultFooter'
import ThrowError from '@/mixins/ThrowError'
import EventBus from '@/misc/EventBus'
import Cable from '@/misc/Cable'

export default {

  data () {
    return {
      valid_token: false,
      error: ''
    }
  },

  created () {
    /**
     * We put a listener to the errorEvent
     */
    EventBus.$on('errorEvent', error => {
      if (error.message === 'Network Error') {
        this.error = 'Oh snap ! There is a network error, please refresh the page.'
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

  components: {
    DefaultFooter
  },

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
      Cable.connect(token)
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
      .get('/user', {params: {token: token}})
      .then(
        (response) => {
          this.$user.set(response.data.user)
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
