<template>
  <div>
    <div class="row row-full footer-placeholder"></div>
    <div class="row row-full footer">
      <div class="gr-4">
        <div class="footer__right-border">
          <router-link :to="{ name: 'coins' }">
            <div class="footer__title">Coins</div>
            <div class="footer__content">
              <div class="footer__content-digits">
                <div v-if="defaultMarketCoin">
                  <animated-number :value="defaultMarketCoin.price" :type="`money`" /> {{ defaultMarketCoin.name }}
                </div>
                <div v-else>
                  -
                </div>
              </diV>
            </div>
          </router-link>
        </div>
      </div>
      <div class="gr-4">
        <router-link :to="{ name: 'portfolio' }">
          <div class="footer__title">Portfolio</div>
          <div class="footer__content">
            <div class="footer__content-digits">
              <div v-if="currentPortfolio">
                <animated-number :value="currentPortfolio" :type="`money`" />
              </div>
              <div v-else>
                -
              </div>
            </div>
          </div>
          </router-link>
        </div>
        <div class="gr-4">
          <router-link :to="{ name: 'coins' }">
            <div class="footer__left-border">
              <div class="footer__title">My account</div>
              <div class="footer__content">You are not logged-in</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </template>

<script>
import animatedNumber from '@/components/AnimatedNumber'
import _ from 'lodash'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchMarketCoin', { id: this.$user.data().user_setting.default_market_coin_id })
    // to get total of folio
    this.$store.dispatch('fetchPortfolioCoins')
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketCoin', { id: this.$user.data().user_setting.default_market_coin_id })
  },

  computed: {
    defaultMarketCoin () {
      return this.$store.getters.getMarketCoin(this.$user.data().user_setting.default_market_coin_id)
    },

    currentPortfolio () {
      var vm = this
      var total = 0.0
      this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
        let marketCoin = vm.$store.getters.getMarketCoin(portfolioCoin.market_coin.id)
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
    animatedNumber
  }
}
</script>
