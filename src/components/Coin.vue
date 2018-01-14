<template>
  <div class="coin">

    <coin-header :marketCoinProp="marketCoin" />

    <div class="section">

    <!-- Tracker -->
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
            <h2>Base Price</h2>
          </div>
          <div class="module__content">
            <div class="module__content-digits">
              <div v-if="coinTracking.base_price">
              {{ solveBasePrice() }}
              </div>
              <div v-else>
                -
              </div>
            </div>
          </div>
          <div class="module__footer">
            {{ solveBasePriceTime() }}
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
                  {{ solvePrice() }}
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
                <div v-if="rawVariation() < 0">
                  <div class="module__content-percent-negative">{{ solveVariation() }}</div>
                </div>
                <div v-else>
                  <div class="module__content-percent-positive">{{ solveVariation() }}</div>
                </div>

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
              <div v-if="solveMarketCapitalization">
                {{ solveMarketCapitalization() }}
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
import CoinHeader from '@/components/CoinHeader'
import numeral from 'numeral'
import moment from 'moment'

export default {
  data () {
    return {
      marketCoin: {
      },
      coinTracking: {
      },
      variation: 0.0
    }
  },

  created () {
    var self = this

    this.$axios
    .get(`coins/${this.$route.params.coin}`, {params: {token: this.$user.token()}})
    .then(response => {
      this.marketCoin = response.data.market_coin
      this.coinTracking = response.data.coin_tracking

      // THIS WILL PLACED SOMEWHERE ELSE AT SOME POINT
      this.$cable.subscriptions.create(
        { channel: 'MarketCoinChannel', id: this.marketCoin.id },
        {
          connected (data) {
            console.log('connected to market coin channel')
            this.perform('ping')
          },

          received (data) {
            console.log(`action received ${data.action}`)
            if (data.action === 'refresh_market_coin') {
              console.log('refreshing market coin')
              self.marketCoin = data.market_coin
            }
          }
        }
      )
      // END
    })
    .catch(e => {
      this.errors.push(e)
    })
  },

  methods: {
    solveBasePrice () {
      let digits = this.coinTracking.base_price
      return numeral(digits).format('$0,0.000')
    },

    solveBasePriceTime () {
      let date = moment(this.coinTracking.updated_at).fromNow()
      return `From ${date}`
    },

    solvePrice () {
      let digits = this.marketCoin.price
      return numeral(digits).format('$0,0.000')
    },

    solvePriceTime () {
      let date = moment(this.marketCoin.updated_at).fromNow()
      return `From ${date}`
    },

    rawVariation () {
      return (1 - (this.coinTracking.base_price / this.marketCoin.price))
    },

    solveVariation () {
      let rawVariation = this.rawVariation()
      let digits = 0

      if (!isNaN(rawVariation)) {
        digits = rawVariation
      }
      return numeral(digits).format('0,0.00%')
    },

    solveMarketCapitalization () {
      let digits = this.marketCoin.market_cap
      return numeral(digits).format('$0,0')
    }
  },

  components: {
    CoinHeader
  }

}
</script>

<style lang="scss" scoped>
</style>
