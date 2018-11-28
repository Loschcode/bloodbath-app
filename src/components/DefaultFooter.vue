<template>
  <div class="default-footer">
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
</template>

<script>
import router from '@/router'

export default {
  data () {
    return {
    }
  },

  methods: {
    weatherOn () {
      this.$store.dispatch('updateUserSetting', { changeset: { weather: true } })
    },

    weatherOff () {
      this.$store.dispatch('updateUserSetting', { changeset: { weather: false } })
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
      router.push({ name: 'connect', params: { } })
    },

    tryLogOut () {
      this.$store.commit('unsetCurrentUser')
      window.location.href = '/'
    },

    currentUser () {
      return this.$store.getters.getCurrentUser
    },

    userSetting () {
      return this.$store.getters.getUserSetting
    }
  },

  components: {
  }
}
</script>
