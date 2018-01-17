<template>
  <div class="coin-preview">

    <router-link :to="{ name: 'coin', params: { coin: marketCoin.symbol } }">

      <!-- Base Price -->
      <div class="gr-12 gr-12@mobile">
        <div class="module">
          <div class="module__title">
            <div class="row">
              <div class="gr-2">
                <coin-preview-favorite :userMarketCoinProp="userMarketCoin" />
              </div>
              <div class="gr-10">
                <h2>{{ marketCoin.coin_name }} <span class="module__subtitle">{{ marketCoin.name }}</span></h2>
              </div>
            </div>
          </div>
          <div class="module__content">

            <div class="module__content-digits --medium">
              <div v-if="marketCoin.price">
                <animated-number :value="marketCoin.price" :type="`money`" />
              </div>
              <div v-else>
                -
              </div>
            </div>

            <div class="module__content-percent --small">
              <div v-if="rawVariation()">
                <animated-number :value="rawVariation()" :type="`percent`" :animatedColors="false" :numberColors="true" />
              </div>
              <div v-else>
                -
              </div>
            </div>

          </div>
          <div class="module__footer">
          </div>
        </div>
      </div>

    </router-link>

  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'
import CoinPreviewFavorite from '@/components/CoinPreviewFavorite'
import ThrowError from '@/mixins/ThrowError'

export default {
  props: [
    'marketCoinProp',
    'userMarketCoinProp'
  ],

  created () {
    this.marketCoin = this.marketCoinProp
    this.userMarketCoin = this.userMarketCoinProp
    this.channel = this.$drycable.subscribe(this, 'marketCoin')
  },

  destroyed () {
    this.$drycable.unsubscribe(this.channel)
  },

  data () {
    return {
      marketCoin: {},
      userMarketCoin: {},
      channel: null
    }
  },

  methods: {
    // TODO : improve that a lot
    removeFavorite (event) {
      event.preventDefault()

      this.$axios
      .patch(`user_market_coins/${this.userMarketCoin.id}`, { user_market_coin: { favorite: false } })
      .then(
        (response) => {
          this.userMarketCoin = response.data.user_market_coin
        },
        this.throwError.bind(this)
      )
    },

    // TODO : improve that a lot (like DRY it up and stuff)
    addFavorite (event) {
      event.preventDefault()

      this.$axios
      .patch(`user_market_coins/${this.userMarketCoin.id}`, { user_market_coin: { favorite: true } })
      .then(
        (response) => {
          this.userMarketCoin = response.data.user_market_coin
        },
        this.throwError.bind(this)
      )
    },

    // this is a copy paste (for now) from Coin.vue
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
    AnimatedNumber,
    CoinPreviewFavorite
  },

  mixins: [
    ThrowError
  ]
}
</script>
