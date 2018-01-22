<template>
  <div class="coin-preview">

    <router-link :to="{ name: 'coin', params: { coinName: marketCoin.symbol } }">

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

  data () {
    return {
    }
  },

  created () {
    /**
     * TODO : we don't need to fetch through API but just open the socket listener here
     * please work on that.
     * Make something like subscribeMarketCoin (or something)
     */
    this.$store.dispatch('fetchMarketCoin', { id: this.marketCoinProp.id })
  },

  watch: {
  },

  computed: {
    marketCoin () {
      return this.$store.getters.getMarketCoin(this.marketCoinProp.id)
    },

    userMarketCoin () {
      return this.$store.getters.getUserMarketCoin(this.userMarketCoinProp.id)
    }
  },

  destroyed () {
    this.$store.dispatch('destroyMarketCoin', { id: this.marketCoinProp.id })
  },

  methods: {
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
