<template>
  <div class="coin-preview">
    <div v-if="marketCoin">
        <div class="gr-12 gr-12@mobile">
          <div class="module">

            <a @click="clickAction">

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

            </a>

            <div class="module__content">

              <a @click="clickAction">
                <coin-preview-content :userMarketCoinProp="userMarketCoin" :marketCoinProp="marketCoin" />
              </a>

            </div>
            <div class="module__footer">
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import CoinPreviewFavorite from '@/components/CoinPreviewFavorite'
import CoinPreviewContent from '@/components/CoinPreviewContent'
import router from '@/router'

export default {
  props: [
    'contextProp',
    'marketCoinProp',
    'userMarketCoinProp'
  ],

  data () {
    return {
      context: null
    }
  },

  created () {
    this.context = this.contextProp

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
    this.$store.dispatch('unsubscribeMarketCoin', { id: this.marketCoinProp.id })
  },

  methods: {

    clickAction (event) {
      console.log(this.context)
      if (this.context === 'portfolio') {
        event.preventDefault()
        this.createPortfolioCoin()
      } else if (this.context === 'coins') {
        router.push({ name: 'coin', params: { coinName: this.marketCoin.symbol } })
      }
    },

    /**
     * In case of portfolio context, it'll be the action
     */
    createPortfolioCoin (event) {
      this.$store.dispatch('createPortfolioCoin', { changeset: { market_coin_id: this.marketCoin.id } })
    }
  },

  components: {
    CoinPreviewContent,
    CoinPreviewFavorite
  }
}
</script>
