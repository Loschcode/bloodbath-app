<template>
  <div class="connect-routing">
    <div v-if="error">
      <div class="error">
        {{ error }}
      </div>
    </div>
    <div v-else>

      <!-- If everything is valid we route -->
      <div v-if="userToken && currentUser">
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
import _ from 'lodash'

export default {

  data () {
    return {
      error: ''
    }
  },

  created () {
    /**
     * We put a listener to the crashEvent
     * This kind of error is major and lock the application itself
     * until the person refreshes the page entirely
     */
    EventBus.$on('crashEvent', error => {
      if (error.message === 'Network Error') {
        this.error = 'Oh snap ! There is a network error, please refresh the page.'
      }
    })

    /**
     * We put a listener to the errorEvent
     * This kind of errors is minor and dispatch an error message
     */
    EventBus.$on('errorEvent', error => {
      this.$noty.error(error)
    })

    /**
     * We take care of the connection
     */
    this.connectToken(this.userToken)
  },

  watch: {
    userToken (newValue, oldValue) {
      /**
       * If the token is not null we try to connect the modules
       * Otherwise we log-in as anonymous
       */
      this.connectToken(newValue)
    }
  },

  mixins: [
    ThrowError
  ],

  components: {
    DefaultFooter
  },

  computed: {
    userToken () {
      return this.$store.getters.getUserToken
    },

    currentUser () {
      return this.$store.getters.getCurrentUser
    }
  },

  methods: {

    /**
     * If there's a token or not, we manage to connect the current user
     * This will be fired when the token change or on startup
     */
    connectToken (token) {
      if (!_.isNil(token)) {
        this.connectAll(token)
      } else {
        this.connectAnonymous()
      }
    },

    /**
     * ensure connection on action cable
     * and the classic AJAX
     */
    connectAll (token) {
      console.log('token : ' + token)
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
      this.$store.dispatch('createAnonymousUser')
    },

    /**
     * save as much info as we can into $user
     * using a token
     * this method on each page refresh
     * to verify the token validity
     */
    connectApi (token) {
      /**
       *  here is the only time we actually force the token beforehand
       */
      console.log('connection to api ...')
      this.$store.dispatch('fetchCurrentUser', {token: token})
    }
  }
}
</script>
