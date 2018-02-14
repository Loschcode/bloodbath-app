<template>
  <div class="row header"> <!-- row-full header was removed as it made display bugs -->
    <div class="gr-5">
      <div class="header__title">
        <slot name="left"></slot>
      </div>
    </div>
    <div class="gr-2">
      <slot name="center">
        <div class="header__site +desktop">
        </div>
      </slot>
    </div>
    <div class="gr-5">
      <div class="header__actions">
        <div v-if="userSetting">
          <slot name="right">
            <div v-if="userSetting.weather">
              <div @click="weatherOff" class="header__actions--selected +pointer">
                <span>Weather : On</span>
              </div>
            </div>
            <div v-else>
              <div @click="weatherOn" class="header__actions--unselected +pointer">
                <span>Weather : Off</span>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [],

  computed: {
    userSetting () {
      console.log(this.$store.getters.getUserSetting.weather)
      return this.$store.getters.getUserSetting
    }
  },

  methods: {
    weatherOn () {
      console.log('set weather on')
      this.$store.dispatch('updateUserSetting', { changeset: { weather: true } })
    },

    weatherOff () {
      console.log('set weather off')
      this.$store.dispatch('updateUserSetting', { changeset: { weather: false } })
    }
  }
}
</script>
