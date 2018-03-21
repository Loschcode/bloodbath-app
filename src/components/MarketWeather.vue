<template>
  <div class="market-weather">
    <div v-if="marketWeather">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              Market weather
            </div>
          </div>
        </div>


        <div class="row">
          <div class="gr-12 gr-12@mobile gr-12@tablet">

            <div class="module">
              <div class="module__bubble">

                <div class="row">
                  <div @click="flipWeather" class="+pointer">
                    <div class="gr-6 gr-centered gr-12@mobile gr-6@tablet">

                      <div class="market-weather__icon">
                        <span :class="`icon-${currentStyle()} coin-weather__${currentStyle()} coin-weather--static`"></span>
                      </div>

                      <div v-if="flipped">
                        <div class="market-weather__title">
                          <span :class="`coin-weather__${currentStyle()}`"><animated-number :value="marketWeather" :type="`percent`" :animatedColors="true" :numberColors="false" /></span>
                        </div>
                      </div>
                      <div v-else>
                        <div class="market-weather__title">
                          <span><coin-weather :variationProp="marketWeather" /></span>
                        </div>
                      </div>

                      <div class="market-weather__info">
                        <span>based on the biggest market captializations</span>
                      </div>

                    </div>

                  </div>
                </div>

                <div class="row">
                  <div class="gr-10">
                    <div class="module__footer-details">
                    </div>
                  </div>
                  <div class="gr-2">
                    <div class="module__footer-action +no-margin-top">
                      <a><span @click="goCoinsFullWeather" class="icon icon-fullscreen"></span></a>
                    </div>
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
      flipped: false
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

    flipWeather () {
      if (this.flipped) {
        this.flipped = false
      } else {
        this.flipped = true
      }
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
