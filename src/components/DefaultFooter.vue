<template>
  <div class="default-footer">
    <div class="row">
      <div class="gr-8">
        <!-- Suggestion -->
        <div class="inner-footer">
          <a href="mailto:laurent.schaffner.code@gmail.com">
            <span class="icon-contact"></span> Any suggestion or bug report ? Please let me know
          </a>
        </div>
      </div>

      <div class="footer__actions">
        <div v-if="userSetting">
          <slot name="right">
            <div v-if="userSetting.weather">
              <div @click="weatherOff" class="footer__actions--selected +pointer">
                <span>Weather : On</span>
              </div>
            </div>
            <div v-else>
              <div @click="weatherOn" class="footer__actions--unselected +pointer">
                <span>Weather : Off</span>
              </div>
            </div>
          </slot>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'

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
    userSetting () {
      return this.$store.getters.getUserSetting
    }
  },

  components: {
    AnimatedNumber
  }
}
</script>
