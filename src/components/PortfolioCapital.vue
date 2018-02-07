<template>
  <div class="portfolio-capital">
    <div v-if="currentPortfolio">
      <animated-number :value="currentPortfolio" :type="`money`" />
    </div>
    <div v-else>
      -
    </div>
  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'
import _ from 'lodash'

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
    portfolioCoins (newValue, oldValue) {
      if (newValue && oldValue.length === 0) {
        /**
         * We manage the subscription to each market coin channel
         * at the entrance of the component when it first gets the portfolioCoins
         */
        var vm = this
        this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
          let marketCoin = vm.$store.getters.getMarketCoin(portfolioCoin.market_coin_id)
          if (!_.isNil(marketCoin)) {
            vm.$store.dispatch('subscribeMarketCoinChannel', marketCoin)
          }
        })
      }
    }
  },

  computed: {
    currentPortfolio () {
      var vm = this
      var total = 0.0
      this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
        let marketCoin = vm.$store.getters.getMarketCoin(portfolioCoin.market_coin_id)
        if (!_.isNil(marketCoin)) {
          total += (marketCoin.price * portfolioCoin.quantity)
        }
      })
      return total
    },

    ...mapGetters({
      portfolioCoins: 'getPortfolioCoins'
    })
  },

  components: {
    AnimatedNumber
  }
}
</script>
