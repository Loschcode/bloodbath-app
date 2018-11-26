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
import ConnectService from '@/services/ConnectService'
import EventsService from '@/services/EventsService'

import { currentUser } from '@/store/models/User'

export default {

  data () {
    return {
      currentUser: null,
      error: ''
    }
  },

  created () {
    const events = new EventsService(this)
    events.setup()

    const connect = new ConnectService(this, this.userToken)
    connect.perform()
  },

  watch: {
    userToken (newValue, oldValue) {
      const connect = new ConnectService(this)
      connect.connectWith(newValue)
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

  apollo: {
    currentUser
  },

  methods: {
    /**
     * Preloader management
     */
    fullyLoaded () {
      return false
      // return (this.userToken.length > 0 && this.currentUser.id)
    }
  }
}
</script>
