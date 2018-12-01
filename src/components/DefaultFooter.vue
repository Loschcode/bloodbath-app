<template>
  <div class="default-footer">
    <div v-if="appReady()">
      <div class="row">
        <div class="gr-6">
          <div class="inner-footer inner-footer__left">
            <div v-if="isConnected">
              <div class="inner-footer__red">
                <a @click="tryLogOut()">
                  <span class="icon-log-out"></span> Log-out from my account
                </a>
              </div>
            </div>
            <div v-else>
              <a @click="goConnect()">
                <span class="icon-log-in"></span> No account ? Sign up now !
              </a>
            </div>
          </div>
        </div>
        <div class="gr-6">
          <!-- Suggestion -->
          <div class="inner-footer inner-footer__right">
            <a href="mailto:laurent.schaffner.code@gmail.com">
              <span class="icon-contact"></span> Any suggestion or bug report ?
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'

import { currentUser } from '@/store/models/User'
import { userSetting } from '@/store/models/UserSetting'

export default {
  data () {
    return {
    }
  },

  methods: {
    appReady () {
      return this.currentUser && this.userSetting
    },

    weatherOn () {
      // TODO: mutation
    },

    weatherOff () {
      // TODO: mutation
    }
  },

  created () {
  },

  destroyed () {
  },

  computed: {
    isConnected () {
      return this.currentUser.role !== 'anonymous'
    },

    goConnect () {
      router.push({ name: 'connect', params: {} })
    },

    tryLogOut () {
      // TODO: logout from a service or somehting
      window.location.href = '/'
    }
  },

  apollo: {
    currentUser,
    userSetting
  },

  components: {
  }
}
</script>
