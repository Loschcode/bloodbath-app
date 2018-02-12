<template>
  <div class="coin-weather">
    <span :class="`coin-weather__${currentStyle}`">{{ currentWeather }}</span>
  </div>
</template>

<script>
import _ from 'lodash'

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
      return _.snakeCase(this.currentWeather)
    },

    currentWeather () {
      let variation = this.variation * 100

      /**
      * Positive
      */
      if (variation > 20) {
        return 'To andromeda galaxy'
      } else if (variation > 10) {
        return 'To the moon'
      } else if (variation > 5) {
        return 'Very sunny'
      } else if (variation > 2) {
        return 'Sunny'
      }

      /**
      * Neutral
      */
      if (variation >= -2) {
        return 'Boring'
      }

      /**
      * Negative
      * @type {[type]}
      */
      if (variation < -20) {
        return 'Apocalypse'
      } else if (variation < -10) {
        return 'Very bloody'
      } else if (variation < -5) {
        return 'Bloody'
      } else if (variation < -2) {
        return 'Cloudy'
      }

      return ''
    }
  },

  methods: {
  }
}
</script>
