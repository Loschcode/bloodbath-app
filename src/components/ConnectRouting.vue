<template>
  <div class="connect-routing">

    <!-- Crash error -->
    <div v-if="error" @click="refreshPage()" class="+pointer">
      <div class="error">
        <div class="row">
          <div class="gr-12 gr-centered">
            <div class="error__message">{{ error.message }}</div>
            <div class="error__icon icon-bloody"></div>
          </div>
        </div>
        <div class="row">
          <div class="gr-6 gr-10@tablet gr-12@mobile gr-centered">
            <div class="error__raw">{{ error.raw }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>

      <!-- Loading -->
      <div v-if="!fullyLoaded()">
        <div class="loader__full-page">
          <loader-wave>
            <span slot="quote">
              Bloodbath : n.m. In financial terms: refers to an investment resulting in massive and unexpected loss.
            </span>
            <span slot="text">
              Recovering account details
            </span>
          </loader-wave>
        </div>

      </div>

      <div v-else>

        <!-- Load the correct page -->
        <router-view />

      </div>

    </div>

  </div>
</div>
</template>

<script>
import LoaderWave from '@/components/LoaderWave'
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
     * We put a listener to the rebootEvent
     * when a crash needs a reboot and clear cache / session
     * we use this command
     */
    EventBus.$on('rebootEvent', error => {
      if (error) {
        console.log(error)
        localStorage.clear()
      }
      this.refreshPage()
    })

    /**
     * We put a listener to the crashEvent
     * This kind of error is major and lock the application itself
     * until the person refreshes the page entirely
     */
    EventBus.$on('crashEvent', error => {
      if (error.message === 'Network Error') {
        this.error = {
          message: 'Oh snap ! There is a network error, please refresh the page.',
          raw: error
        }
      } else {
        this.error = {
          message: 'Oh snap ! Something went wrong, please refresh the page.',
          raw: error
        }
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

  components: {
    LoaderWave
  },

  computed: {
    userToken () {
      return localStorage.getItem('userToken')
    }
  },

  methods: {
    refreshPage () {
      window.location.reload()
    },

    /**
     * Preloader management
     */
    fullyLoaded () {
      return (this.userToken.length > 0 && this.currentUser.id)
    },

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
