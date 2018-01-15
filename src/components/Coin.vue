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
            <h2>Open Price</h2>
          </div>
          <div class="module__content">
            <div class="module__content-digits">
              <div v-if="marketCoin.day_open">
                <animated-number :value="marketCoin.day_open" :type="`money`" />
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
              <div v-if="marketCoin.market_cap">
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
import CoinHeader from '@/components/CoinHeader'
import AnimatedNumber from '@/components/AnimatedNumber'
import moment from 'moment'

export default {
  data () {
    return {
      marketCoin: {
        market_cap: 0.0,
        price: 0.0
      },
      coinTracking: {
      },
      variation: 0.0
    }
  },

  // watch: {
  //   marketCoin: function (newMarketCoin, oldMarketCoin) {
  //     // Start of animation
  //     var vm = this
  //     function animate () {
  //       if (Tween.update()) {
  //         requestAnimationFrame(animate)
  //       }
  //     }
  //
  //     new Tween.Tween({ marketCap: oldMarketCoin.market_cap })
  //     .easing(Tween.Easing.Quadratic.Out)
  //     .to({ marketCap: newMarketCoin.market_cap }, 500)
  //     .onUpdate(function (obj) {
  //       if (typeof obj.marketCap !== 'undefined') {
  //         vm.marketCoin.market_cap = obj.marketCap.toFixed(0)
  //       }
  //     })
  //     .start()
  //
  //     animate()
  //     // End of animation
  //   }
  // },

  created () {
    var vm = this

    this.$axios
    .get(`coins/${this.$route.params.coin}`)
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
              vm.marketCoin = data.market_coin
            }
          }
        }
      )
      // END
      //
    })
    .catch(e => {
      console.warn(e)
    })
  },

  methods: {
    solveBasePriceTime () {
      let date = moment(this.coinTracking.updated_at).fromNow()
      return `From ${date}`
    },

    solvePriceTime () {
      let date = moment(this.marketCoin.updated_at).fromNow()
      return `From ${date}`
    },

    rawVariation () {
      let digits = (1 - (this.marketCoin.day_open / this.marketCoin.price))
      if (isNaN(digits)) {
        return 0.0
      } else {
        return digits
      }
    }
  },

  components: {
    CoinHeader,
    AnimatedNumber
  }

}
</script>

<style lang="scss" scoped>
</style>
