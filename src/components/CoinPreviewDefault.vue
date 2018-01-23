<template>
  <div class="coin-preview">
    <div v-if="marketCoin">
      <router-link :to="{ name: 'coin', params: { coinName: marketCoin.symbol } }">

        <div class="gr-12 gr-12@mobile">
          <div class="module">
            <div class="module__title">
              <coin-preview-title :userMarketCoinProp="userMarketCoin" :marketCoinProp="marketCoin" />
            </div>
            <div class="module__content">
              <coin-preview-content :userMarketCoinProp="userMarketCoin" :marketCoinProp="marketCoin" />
            </div>
            <div class="module__footer">
            </div>
          </div>
        </div>

      </router-link>
    </div>
  </div>
</template>

<script>
import CoinPreviewTitle from '@/components/CoinPreviewTitle'
import CoinPreviewContent from '@/components/CoinPreviewContent'

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
    this.$store.commit('setMarketCoin', this.marketCoinProp)
    this.$store.commit('setUserMarketCoin', this.userMarketCoinProp)
    this.$store.dispatch('listenMarketCoin', this.marketCoinProp)
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
  },

  components: {
    CoinPreviewTitle,
    CoinPreviewContent
  }
}
</script>
