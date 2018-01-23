<template>
  <div class="coin-preview-title">
    <div class="row">
      <div class="gr-2">
        <coin-preview-favorite :userMarketCoinProp="userMarketCoin" />
      </div>
      <div class="gr-10">
        <h2>{{ marketCoin.coin_name }} <span class="module__subtitle">{{ marketCoin.name }}</span></h2>
      </div>
    </div>
  </div>
</template>

<script>
import CoinPreviewFavorite from '@/components/CoinPreviewFavorite'

export default {
  props: [
    'marketCoinProp',
    'userMarketCoinProp'
  ],

  data () {
    return {
    }
  },

  computed: {
    marketCoin () {
      return this.$store.getters.getMarketCoin(this.marketCoinProp.id)
    },

    userMarketCoin () {
      return this.$store.getters.getUserMarketCoin(this.userMarketCoinProp.id)
    }
  },

  components: {
    CoinPreviewFavorite
  }
}
</script>
