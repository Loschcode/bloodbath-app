<template>
  <div class="connect-routing">
    <!-- Crash error -->
    <div
      v-if="error"
      @click="refreshPage()"
      class="+pointer"
    >
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
      <div v-if="appReady()">
        <!-- Load the correct page -->
        <router-view />
      </div>
      <div v-else>
        <div class="loader__full-page">
          <loader-wave>
            <span slot="quote">Bloodbath: n.m. In financial terms: refers to an investment resulting in massive and unexpected loss.</span>
            <span slot="text">Recovering account details</span>
          </loader-wave>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderWave from '@/components/LoaderWave'
import ConnectService from '@/services/ConnectService'
import EventsService from '@/services/EventsService'
import PageHelper from '@/helpers/PageHelper'

import { currentUser } from '@/store/models/User'

export default {
  data () {
    return {
      currentUser: null,
      error:       ''
    }
  },

  created () {
    Object.assign(this, {
      eventsService:  new EventsService(this),
      connectService: new ConnectService(this, this.userToken)
    })

    this.eventsService.setup()
    this.connectService.perform()
  },

  watch: {
    userToken (newValue, oldValue) {
      new ConnectService(this, newValue).perform()
    }
  },

  computed: {
    userToken () {
      return localStorage.getItem('userToken')
    }
  },

  methods: {
    refreshPage () {
      PageHelper.refreshPage()
    },

    appReady () {
      // TODO make currentUser work
      return this.userToken && this.currentUser
    }
  },

  components: {
    LoaderWave
  },

  apollo: {
    currentUser
  }

}
</script>
