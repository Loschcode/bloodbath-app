<template>
  <div class="coins">
    <default-header>
      <div slot="left">
        <span class="icon-right"></span> <span>Portfolio</span>
      </div>
    </default-header>

    <!-- Capital weather -->
    <div v-if="userSetting.weather && portfolioCoins.length">
      <portfolio-weather :variationProp="currentTotalVariation()" />
    </div>

    <!-- My capital -->
    <div v-if="portfolioCoins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              Current investment
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-12 gr-centered">

            <div class="gr-12 gr-12@mobile gr-12@tablet">
              <div class="module">
                <div class="module__bubble">

                  <div class="row">
                    <div class="gr-4 gr-centered gr-12@mobile gr-6@tablet">

                      <div class="module__content-digits --extra-big">
                        <portfolio-capital />
                        <div><animated-number :value="currentTotalVariation()" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
                      </div>

                      <div class="module__content-details">
                        <div class="row">
                          <div class="gr-6">
                            <div class="module__footer-low">
                              <div>LOW</div>
                              <div><animated-number :value="currentTotalLow()" :type="`money`" /></div>
                              <!-- Variation is the same than the day low / high of the coin itself -->
                              <div><animated-number :value="currentTotalLowVariation()" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
                            </div>
                          </div>
                          <div class="gr-6">
                            <div class="module__footer-high">
                              <div>HIGH</div>
                              <div><animated-number :value="currentTotalHigh()" :type="`money`" /></div>
                              <!-- Variation is the same than the day low / high of the coin itself -->
                              <div><animated-number :value="currentTotalHighVariation()" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
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
        </div>
      </div>
    </div>

    <!-- My coins -->
    <div v-if="portfolioCoins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              My coins
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="portfolioCoin in portfolioCoins">
            <portfolio-coin :portfolioCoinProp="portfolioCoin" />
          </div>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="row">
      <div class="gr-12">
        <search-coins contextProp="portfolio">
          <div slot="title">
            Add coins
          </div>
        </search-coins>
      </div>
    </div>

    <!-- Suggestion -->
    <div class="inner-footer">
      <a href="mailto:laurent.schaffner.code@gmail.com">
        <span class="icon-contact"></span> Any suggestion or bug report ? Please let me know
      </a>
    </div>


  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'
import DefaultHeader from '@/components/DefaultHeader'
import PortfolioCoin from '@/components/PortfolioCoin'
import PortfolioCapital from '@/components/PortfolioCapital'
import PortfolioWeather from '@/components/PortfolioWeather'
import SearchCoins from '@/components/SearchCoins'
import EventBus from '@/misc/EventBus'
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

  computed: {
    ...mapGetters({
      portfolioCoins: 'getPortfolioCoins',
      userSetting: 'getUserSetting'
    })
  },

  mounted () {
  },

  methods: {
    fullyLoaded () {
      return (this.userSetting.id && this.portfolioCoins.length > 0)
    },

    currentTotalLow () {
      var vm = this
      var total = 0.0
      this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
        let marketCoin = vm.$store.getters.getMarketCoin(portfolioCoin.market_coin_id)
        if (!_.isNil(marketCoin)) {
          total += (marketCoin.day_low * portfolioCoin.quantity)
        }
      })
      return total
    },

    currentTotalHigh () {
      var vm = this
      var total = 0.0
      this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
        let marketCoin = vm.$store.getters.getMarketCoin(portfolioCoin.market_coin_id)
        if (!_.isNil(marketCoin)) {
          total += (marketCoin.day_high * portfolioCoin.quantity)
        }
      })
      return total
    },

    currentTotalVariation () {
      var vm = this
      var variations = []
      var quantities = 0

      this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
        let marketCoin = vm.$store.getters.getMarketCoin(portfolioCoin.market_coin_id)
        if (!_.isNil(marketCoin)) {
          let variation = marketCoin.price_variation * (portfolioCoin.quantity * marketCoin.price)
          variations.push(variation)
          quantities += (portfolioCoin.quantity * marketCoin.price)
        }
      })
      return (_.sum(variations) / quantities)
    },

    currentTotalLowVariation () {
      var vm = this
      var variations = []
      var quantities = 0
      this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
        let marketCoin = vm.$store.getters.getMarketCoin(portfolioCoin.market_coin_id)
        if (!_.isNil(marketCoin)) {
          let variation = marketCoin.day_low_variation * (portfolioCoin.quantity * marketCoin.day_low)
          variations.push(variation)
          quantities += (portfolioCoin.quantity * marketCoin.day_low)
        }
      })
      return (_.sum(variations) / quantities)
    },

    currentTotalHighVariation () {
      var vm = this
      var variations = []
      var quantities = 0
      this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
        let marketCoin = vm.$store.getters.getMarketCoin(portfolioCoin.market_coin_id)
        if (!_.isNil(marketCoin)) {
          let variation = marketCoin.day_high_variation * (portfolioCoin.quantity * marketCoin.day_high)
          variations.push(variation)
          quantities += (portfolioCoin.quantity * marketCoin.day_high)
        }
      })
      return (_.sum(variations) / quantities)
    }
  },

  components: {
    AnimatedNumber,
    DefaultHeader,
    PortfolioCapital,
    PortfolioCoin,
    PortfolioWeather,
    SearchCoins,
    EventBus
  }
}
</script>
