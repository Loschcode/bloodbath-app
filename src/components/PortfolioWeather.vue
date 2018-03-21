<template>
  <div class="portfolio-weather">
    <div class="section">
      <div class="row">
        <div class="gr-12">
          <div class="section__title">
            Investment Weather
          </div>
        </div>
      </div>

      <div class="row">
        <div class="gr-12 gr-12@mobile gr-12@tablet">

          <div class="module">
            <div class="module__bubble">
              <div class="row">
                <div class="gr-6 gr-centered gr-12@mobile gr-6@tablet">
                  <div class="market-weather__icon">
                    <span :class="`icon-${currentStyle()} coin-weather__${currentStyle()} coin-weather--static`"></span>
                  </div>

                  <div class="market-weather__title">
                    <span><coin-weather :variationProp="variationProp" /></span>
                  </div>

                  <div class="market-weather__info">
                    <span>based on your total capital</span>
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
                  <a><span @click="goPortfolioFullWeather" class="icon icon-fullscreen"></span></a>
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
import CoinWeather from '@/components/CoinWeather'
import Weather from '@/misc/Weather'

import router from '@/router'

export default {
  props: [
    'variationProp'
  ],

  data () {
    return {
    }
  },

  methods: {
    goPortfolioFullWeather () {
      router.push({ name: 'portfolio-full-weather', params: { } })
    },

    currentStyle () {
      return Weather.style(this.variationProp)
    }
  },

  components: {
    CoinWeather
  }
}
</script>
