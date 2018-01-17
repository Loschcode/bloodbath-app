<template>
  <div class="coin">
    <default-header>
      <div slot="center">
        <coin-header :marketCoin="marketCoin" />
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

      <!-- Logo -->
      <!-- <div class="gr-2 gr-12@mobile">
        <div class="module">
          <div class="module__logo">
            <img :src="marketCoin.logo_url" />
          </div>
        </div>
      </div> -->

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
import DefaultHeader from '@/components/DefaultHeader'
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
      variation: 0.0,
      channel: null
    }
  },

  created () {
    // var vm = this
    this.$axios
    .get(`coins/${this.$route.params.coin}`)
    .then(response => {
      this.marketCoin = response.data.market_coin
      this.coinTracking = response.data.coin_tracking
      this.channel = this.$drycable.subscribe(this, 'marketCoin')
    })
    .catch(e => {
      console.warn(e)
    })
  },

  destroyed () {
    console.log('unsubscribe')
    this.$drycable.unsubscribe(this.channel)
  },

  methods: {
    solveDayOpenTime () {
      let date = moment().startOf('day').fromNow()
      return `From ${date}`
    },

    solvePriceTime () {
      let date = moment(this.marketCoin.updated_at).fromNow()
      return `From ${date}`
    },

    rawVariation () {
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
  }

}
</script>

<style lang="scss" scoped>
</style>
