<template>
  <div class="coin">

    <coin-header :marketCoinProp="marketCoin" />

    <div class="section">
    <!-- Tracker -->
    <div class="row">
      <div class="gr-12">
        <div class="section__title">
          Trackers
        </div>
      </div>
    </div>

    <div class="row">

      <!-- Base Price -->
      <div class="gr-6 gr-12@mobile">
        <div class="module">
          <div class="module__title">
            <h2>Base Price</h2>
          </div>
          <div class="module__content">
            <div class="module__content-digits">
              <div v-if="coinTracking.base_price">
              ${{ solveBasePrice() }}
              </div>
              <div v-else>
                -
              </div>
            </div>
          </div>
          <div class="module__footer">
            From 21/02/2018 18:00 GMT
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
              <div v-if="marketCoin.price">
              ${{ solvePrice() }}
              </div>
              <div v-else>
                -
              </div>
            </div>
          </div>
          <div class="module__footer">
            From 21/02/2018 18:00 GMT
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
              <div v-if="solveVariation">
                {{ solveVariation() }}%
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
import _ from 'lodash'
import CoinHeader from '@/components/CoinHeader'

export default {
  data () {
    return {
      marketCoin: {
      },
      coinTracking: {
      },
      variation: 0.0,
      errors: []
    }
  },

  created () {
    this.$cable.subscriptions.create({ channel: 'CoinStateChannel' })

    this.$axios.get(`coins/${this.$route.params.coin}`, {params: {token: this.$user.token()}})
    .then(response => {
      this.marketCoin = response.data.market_coin
      this.coinTracking = response.data.coin_tracking
    })
    .catch(e => {
      this.errors.push(e)
    })
  },

  methods: {
    solveBasePrice () {
      return _.round(this.coinTracking.base_price, 3)
    },

    solvePrice () {
      return _.round(this.marketCoin.price, 3)
    },

    solveVariation () {
      let rawVariation = (100 - (this.coinTracking.base_price / this.marketCoin.price) * 100)
      if (isNaN(rawVariation)) {
        return 0.0
      } else {
        return _.round(rawVariation, 2)
      }
    }
  },

  components: {
    CoinHeader
  }

}
</script>

<style lang="scss" scoped>
</style>
