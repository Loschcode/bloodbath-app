<template>
  <div class="coin-preview">
    <div v-if="marketCoin">

      <a @click="createPortfolioCoin">
        <div class="gr-12 gr-12@mobile">
          <div class="module">
            <div class="module__title">
              <coin-preview-title :userMarketCoinProp="userMarketCoin" :marketCoinProp="marketCoin" />
            </div>
            <div class="module__content">
              <coin-preview-content :userMarketCoinProp="userMarketCoin" :marketCoinProp="marketCoin" />
            </div>
            <div class="module__footer">
              <div class="module__footer-add">
                <span class="icon-plus"></span>
              </div>
            </div>
          </div>
        </div>
      </a>

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
    createPortfolioCoin (event) {
      event.preventDefault()
      this.$store.dispatch('createPortfolioCoin', { changeset: { market_coin_id: this.marketCoin.id } })
    }
  },

  components: {
    CoinPreviewTitle,
    CoinPreviewContent
  }
}
</script>
