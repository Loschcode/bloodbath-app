<template>
  <div class="coin-weather">
    <span :class="`coin-weather__${currentStyle}`">{{ currentWeather }}</span>
  </div>
</template>

<script>
import Weather from '@/misc/Weather'

export default {
  props: {
    variationProp: {
      type: Number,
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
      return Weather.style(this.variation)
    },

    currentWeather () {
      return Weather.current(this.variation)
    }
  },

  methods: {
  }
}
</script>
