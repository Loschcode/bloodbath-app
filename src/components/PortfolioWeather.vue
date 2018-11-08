<template>
  <div v-if="portfolioCoins.length > 0">
    <div :class="`full-weather full-weather__${currentStyle}`">

        <div class="row">
          <div class="gr-12 gr-12@mobile gr-12@tablet">

            <div class="row">
              <div @click="goPortfolio" class="gr-8 gr-centered gr-12@mobile gr-6@tablet +pointer">

                <div class="full-weather__icon">
                  <span :class="`icon-${currentStyle} watchlist-weather__${currentStyle} watchlist-weather--static`"></span>
                </div>

                <div class="full-weather__title">
                  <span><watchlist-weather :variationProp="totalVariation" /></span>
                </div>


                <div class="full-weather__info">
                  <span>based on your total capital</span>
                </div>

                <div class="full-weather__percent">
                  <span :class="`watchlist-weather__${currentStyle}`"><animated-number :value="totalVariation" :type="`percent`" :animatedColors="true" :numberColors="false" /></span>
                </div>

                <div class="full-weather__title">
                  <span><portfolio-capital /></span>
                </div>

              </div>

            </div>

            <div class="row">
              <div class="gr-8 gr-centered gr-12@mobile gr-12@tablet">
                <div class="full-weather__buttons">
                  <a @click="goPortfolio" class="+pointer">Check portfolio details</a>
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
import _ from 'lodash'

import WatchlistWeather from '@/components/WatchlistWeather'

import AnimatedNumber from '@/components/AnimatedNumber'
import CoinWeather from '@/components/CoinWeather'
import PortfolioCapital from '@/components/PortfolioCapital'
import Weather from '@/misc/Weather'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchPortfolioCoins')
  },

  destroyed () {
    /**
     * We manage the unsubscription to each market coin channel
     */
    var vm = this
    this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
      let marketCoin = vm.$store.getters.getMarketCoin(portfolioCoin.market_coin_id)
      if (!_.isNil(marketCoin)) {
        vm.$store.dispatch('unsubscribeMarketCoinChannel', marketCoin)
      }
    })
  },

  mounted () {
  },

  watch: {
  },

  computed: {
    currentStyle () {
      return Weather.style(this.totalVariation)
    },

    ...mapGetters({
      totalVariation: 'getTotalVariation',
      totalCapital: 'getTotalCapital',
      portfolioCoins: 'getPortfolioCoins'
    })
  },

  methods: {
    goPortfolio () {
      router.push({ name: 'portfolio', params: { } })
    },

    goWatchlistWeather () {
      router.push({ name: 'watchlist-weather', params: { } })
    }
  },

  components: {
    WatchlistWeather,
    AnimatedNumber,
    CoinWeather,
    PortfolioCapital
  }
}
</script>
