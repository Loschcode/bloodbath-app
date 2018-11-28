<template>
  <div v-if="userPortfolio">
    <div :class="`full-weather full-weather__${currentStyle}`">

      <div class="row">
        <div class="gr-12 gr-12@mobile gr-12@tablet">

          <div class="row">
            <div
              @click="goPortfolio"
              class="gr-8 gr-centered gr-12@mobile gr-6@tablet +pointer"
            >

              <div class="full-weather__icon">
                <span :class="`icon-${currentStyle} watchlist-weather__${currentStyle} watchlist-weather--static`"></span>
              </div>

              <div class="full-weather__title">
                <span>
                  <coin-weather :variationProp="userPortfolio.portfolioWeather" /></span>
              </div>

              <div class="full-weather__info">
                <span>based on your total capital</span>
              </div>

              <div class="full-weather__percent">
                <span :class="`watchlist-weather__${currentStyle}`">
                  <animated-number
                    :value="userPortfolio.portfolioWeather"
                    :type="`percent`"
                    :animatedColors="true"
                    :numberColors="false"
                  /></span>
              </div>

              <div class="full-weather__title">
                <span>
                  <portfolio-capital /></span>
              </div>

            </div>

          </div>

          <div class="row">
            <div class="gr-8 gr-centered gr-12@mobile gr-12@tablet">
              <div class="full-weather__buttons">
                <a
                  @click="goPortfolio"
                  class="+pointer"
                >Check portfolio details</a>
              </div>
              <div class="full-weather__links">
                <a @click="goWatchlistWeather">... Or continue to watchlist</a>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import router from '@/router'

import WatchlistWeather from '@/components/WatchlistWeather'

import CoinWeather from '@/components/CoinWeather'
import PortfolioCapital from '@/components/PortfolioCapital'

import WeatherHelper from '@/helpers/WeatherHelper'
import { userPortfolio } from '@/store/models/UserPortfolio'

export default {
  data () {
    return {
    }
  },

  computed: {
    currentStyle () {
      return WeatherHelper.style(this.userPortfolio.portfolioWeather)
    }
  },

  apollo: {
    userPortfolio
  },

  methods: {
    goPortfolio () {
      router.push({ name: 'portfolio', params: {} })
    },

    goWatchlistWeather () {
      router.push({ name: 'watchlist-weather', params: {} })
    }
  },

  components: {
    WatchlistWeather,
    CoinWeather,
    PortfolioCapital
  }
}
</script>
