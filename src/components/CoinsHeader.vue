<template>
  <div class="market-weather">
    <div v-if="marketWeather">
      <div class="row">
        <div class="gr-12 gr-12@mobile gr-12@tablet +pointer" @click="goCoinsFullWeather">

          <div class="module +no-margin">
            <div class="module__bubble">

              <div class="row">
                  <div class="gr-6 gr-centered gr-12@mobile gr-6@tablet">

                    <div class="market-weather__icon">
                      <span :class="`icon-${currentStyle()} coin-weather__${currentStyle()} coin-weather--static`"></span>
                    </div>

                    <div class="market-weather__title">
                      <span><coin-weather :variationProp="marketWeather" /></span>
                    </div>

                    <div class="market-weather__info">
                      <span>based on the biggest market captializations</span>
                    </div>

                    <div class="market-weather__title">
                      <span :class="`coin-weather__${currentStyle()}`"><animated-number :value="marketWeather" :type="`percent`" :animatedColors="true" :numberColors="false" /></span>
                    </div>
                  </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'
import CoinWeather from '@/components/CoinWeather'
import Weather from '@/misc/Weather'

import router from '@/router'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchMarketWeather')
    this.$store.dispatch('subscribeMarketWeatherChannel')
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketWeatherChannel')
  },

  computed: {
    marketWeather () {
      return this.$store.getters.getMarketWeather
    }
  },

  methods: {
    goCoinsFullWeather () {
      router.push({ name: 'coins-full-weather', params: { } })
    },

    currentStyle () {
      return Weather.style(this.marketWeather)
    }
  },

  components: {
    AnimatedNumber,
    CoinWeather
  }
}
</script>
