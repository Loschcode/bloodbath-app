<template>
  <div v-if="watchlistWeather">
    <div :class="`full-weather full-weather__${currentStyle}`">

      <div @click="goWatchlist" class="+pointer">
        <div class="row">
          <div class="gr-12 gr-12@mobile gr-12@tablet">

            <div class="row">
              <div class="gr-8 gr-centered gr-12@mobile gr-6@tablet">

                <div class="full-weather__icon">
                  <span :class="`icon-${currentStyle} coin-weather__${currentStyle} coin-weather--static`"></span>
                </div>

                <div class="full-weather__title">
                  <span><coin-weather :variationProp="watchlistWeather" /></span>
                </div>


                <div class="full-weather__info">
                  <span>based on your watchlist</span>
                </div>

                <div class="full-weather__percent">
                  <span :class="`coin-weather__${currentStyle}`"><animated-number :value="watchlistWeather" :type="`percent`" :animatedColors="true" :numberColors="false" /></span>
                </div>

              </div>

            </div>

            <div class="row">
              <div class="gr-3 gr-centered gr-12@mobile gr-12@tablet">
                <div class="full-weather__buttons">
                  <a @click="goWatchlist" class="+pointer">Check watchlist details</a>
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
import router from '@/router'

import CoinWeather from '@/components/CoinWeather'
import WeatherHelper from '@/helpers/WeatherHelper'

import { userWatchlist } from '@/store/models/UserWatchlist'

export default {
  data () {
    return {
    }
  },

  watch: {
    watchlistCoins (newValue, oldValue) {
      if (newValue.length === 0) {
        router.push({ name: 'watchlist', params: { } })
      }
    }
  },

  computed: {
    currentStyle () {
      return WeatherHelper.style(this.userWatchlist.watchlistWeather)
    }
  },

  apollo: {
    userWatchlist
  },

  methods: {
    goWatchlist () {
      router.push({ name: 'watchlist', params: { } })
    }
  },

  components: {
    CoinWeather
  }
}
</script>
