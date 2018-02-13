<template>
  <div class="row header"> <!-- row-full header was removed as it made display bugs -->
    <div class="gr-4">
      <div class="header__title">
        <slot name="left"></slot>
      </div>
    </div>
    <div class="gr-4">
      <slot name="center">
        <div class="header__site +desktop">
        </div>
      </slot>
    </div>
    <div class="gr-4">
      <div class="header__actions">
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
</template>

<script>
export default {
  props: [],

  computed: {
    userSetting () {
      return this.$store.getters.getUserSetting
    }
  },

  methods: {
    weatherOn () {
      console.log(this.userSetting.weather)
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
