<template>
  <div class="watchlist-weather">
    <div v-if="watchlistCoins.length">
      <div class="row">
        <div class="gr-12 gr-12@mobile gr-12@tablet +pointer" @click="goWatchlistWeather">

          <div class="module +no-margin">
            <div class="module__bubble">

              <div class="row">
                  <div class="gr-6 gr-centered gr-12@mobile gr-6@tablet">

                    <div class="market-weather__icon">
                      <span :class="`icon-${currentStyle()} coin-weather__${currentStyle()} coin-weather--static`"></span>
                    </div>

                    <div class="market-weather__title">
                      <span>
                        <coin-weather :variationProp="watchlistWeather" />
                      </span>
                    </div>

                    <div class="market-weather__info">
                      <span>based on your watchlist</span>
                    </div>

                    <div class="market-weather__title">
                      <span :class="`coin-weather__${currentStyle()}`"><animated-number :value="watchlistWeather" :type="`percent`" :animatedColors="true" :numberColors="false" /></span>
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
import { GET_WATCHLIST_COINS_QUERY, GET_WATCHLIST_QUERY } from '@/constants/graphql'

import AnimatedNumber from '@/components/AnimatedNumber'
import CoinWeather from '@/components/CoinWeather'
import WeatherHelper from '@/helpers/WeatherHelper'

import router from '@/router'

export default {
  data () {
    return {
      watchlistCoins:     [],
      watchlistWeather:   0.0
    }
  },

  created () {
  },

  destroyed () {
  },

  computed: {
  },

  methods: {
    goWatchlistWeather () {
      router.push({ name: 'watchlist-weather', params: { } })
    },

    currentStyle () {
      return WeatherHelper.style(this.watchlistWeather)
    }
  },

  apollo: {
    getWatchlist: {
      query: GET_WATCHLIST_QUERY,

      result ({ data }) {
        this.watchlistWeather = data.getWatchlist.watchlistWeather
      },

      variables () {
        return {
        }
      }
    },

    getWatchlistCoins: {
      query: GET_WATCHLIST_COINS_QUERY,

      result ({ data }) {
        this.watchlistCoins = data.getWatchlistCoins
      },

      variables () {
        return {
        }
      }
    }
  },

  components: {
    AnimatedNumber,
    CoinWeather
  }
}
</script>
