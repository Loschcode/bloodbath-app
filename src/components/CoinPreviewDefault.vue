<template>
  <div class="coin-preview">
    <div v-if="marketCoin">
      <router-link :to="{ name: 'coin', params: { coinName: marketCoin.symbol } }">

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
import CoinPreviewFavorite from '@/components/CoinPreviewFavorite'
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
    this.$store.dispatch('unsubscribeMarketCoin', { id: this.marketCoinProp.id })
  },

  methods: {
  },

  components: {
    CoinPreviewContent,
    CoinPreviewFavorite
  }
}
</script>
