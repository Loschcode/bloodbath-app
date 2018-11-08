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
import { GET_WATCHLIST_COINS_QUERY, GET_WATCHLIST_QUERY } from '@/constants/graphql'

import router from '@/router'

import AnimatedNumber from '@/components/AnimatedNumber'
import CoinWeather from '@/components/CoinWeather'
import Weather from '@/misc/Weather'

export default {
  data () {
    return {
      watchlistWeather: 0.0
    }
  },

  created () {
    this.$store.dispatch('fetchWatchlistCoins')
  },

  watch: {
    watchlistCoins (newValue, oldValue) {
      if (newValue.length === 0) {
        router.push({ name: 'watchlist', params: { } })
      }
    }
  },

  destroyed () {
  },

  computed: {
    currentStyle () {
      return Weather.style(this.watchlistWeather)
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

  methods: {
    goWatchlist () {
      router.push({ name: 'watchlist', params: { } })
    }
  },

  components: {
    AnimatedNumber,
    CoinWeather
  }
}
</script>
