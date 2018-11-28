<template>
  <div class="watchlist-weather">
    <span :class="`watchlist-weather__${currentStyle}`">{{ currentWeather }}</span>
  </div>
</template>

<script>
import WeatherHelper from '@/helpers/WeatherHelper'

export default {
  props: {
    variationProp: {
      type:     Number,
      required: true
    }
  },

  data () {
    return {
    }
  },

  computed: {
    variation () {
      return this.variationProp
    },

    currentStyle () {
      return WeatherHelper.style(this.variation)
    },

    currentWeather () {
      return WeatherHelper.current(this.variation)
    }
  },

  methods: {
  }
}
</script>
