<template>
  <div class="coin">
    <default-header>
      <div slot="center">
        <div class="header__title">
          <div v-if="marketCoin">
            <coin-header :marketCoin="marketCoin" />
          </div>
        </div>
      </div>
    </default-header>

    <div class="section">

    <!-- Units -->
    <div class="row">
      <div class="gr-12">
        <div class="section__title">
          Units
        </div>
      </div>
    </div>

    <div class="row">

      <!-- Base Price -->
      <div class="gr-6 gr-12@mobile">
        <div class="module">
          <div class="module__title">
            <h2>Open Price</h2>
          </div>
          <div class="module__content">
            <div class="module__content-digits">
              <div v-if="marketCoin">
                <animated-number :value="marketCoin.day_open" :type="`money`" />
              </div>
              <div v-else>
                -
              </div>
            </div>
          </div>
          <div class="module__footer">
            {{ solveDayOpenTime() }}
          </div>
        </div>
      </div>

      <!-- Current Price -->
      <div class="gr-6 gr-12@mobile">
        <div class="module">
          <div class="module__title">
            <h2>Current Price</h2>
          </div>
          <div class="module__content">
            <div class="module__content-digits">
              <div v-if="marketCoin">
                  <animated-number :value="marketCoin.price" :type="`money`" />
              </div>
              <div v-else>
                -
              </div>
            </div>
          </div>
          <div class="module__footer">
            {{ solvePriceTime() }}
          </div>
        </div>
      </div>

      <div class="gr-12">
        <div class="module">
          <div class="module__title">
            <h2>Variation</h2>
          </div>
          <div class="module__content">
            <div class="module__content-percent">
              <div v-if="rawVariation()">
                <animated-number :value="rawVariation()" :type="`percent`" :animatedColors="false" :numberColors="true" />
              </div>
              <div v-else>
                -
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Tracker -->
    <div class="row">
      <div class="gr-12">
        <div class="section__title">
          Market
        </div>
      </div>

      <div class="gr-12">
        <div class="module">
          <div class="module__title">
            <h2>Market Capitalization</h2>
          </div>
          <div class="module__content">
            <div class="module__content-digits">
              <div v-if="marketCoin">
                <animated-number :value="marketCoin.market_cap" :type="`big-money`" />
              </div>
              <div v-else>
                -
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
import DefaultHeader from '@/components/DefaultHeader'
import CoinHeader from '@/components/CoinHeader'
import AnimatedNumber from '@/components/AnimatedNumber'
import ThrowError from '@/mixins/ThrowError'
import moment from 'moment'

export default {
  data () {
    return {
      marketCoinId: null,
      userMarketCoinId: null,
      variation: 0.0
    }
  },

  created () {
    // var vm = this
    this.$store.dispatch('fetchMarketCoin', { id: this.$route.params.coinName })
    .then((response) => {
      /**
       * Once we get the response from the server we can set the IDs
       * So we will be able to call the computed from those fixed data
       * And refresh any model down there
       */
      this.marketCoinId = response.marketCoinId
      this.userMarketCoinId = response.userMarketCoinId
    })
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketCoin', { id: this.marketCoinId })
  },

  computed: {
    marketCoin () {
      return this.$store.getters.getMarketCoin(this.marketCoinId)
    },

    userMarketCoin () {
      return this.$store.getters.getUserMarketCoin(this.userMarketCoinId)
    }
  },

  methods: {
    solveDayOpenTime () {
      if (!this.marketCoin) {
        return null
      }
      let date = moment().subtract(24, 'hour').fromNow()
      return `From ${date}`
    },

    solvePriceTime () {
      if (!this.marketCoin) {
        return null
      }
      let date = moment(this.marketCoin.updated_at).fromNow()
      return `From ${date}`
    },

    rawVariation () {
      if (!this.marketCoin) {
        return null
      }
      let digits = this.marketCoin.price / this.marketCoin.day_open - 1
      if (isNaN(digits)) {
        return 0.0
      } else {
        return digits
      }
    }
  },

  components: {
    DefaultHeader,
    CoinHeader,
    AnimatedNumber
  },

  mixins: [
    ThrowError
  ]

}
</script>

<style lang="scss" scoped>
</style>
