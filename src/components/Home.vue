<template>
  <div class="home">
    <default-header>
      <div slot="left">
      </div>
      <div slot="center">
        <h1>CryptoScreen</h1>
      </div>
    </default-header>


    <div class="section">

    <!-- Trendy coins -->
    <div class="row">
      <div class="gr-12">
        <div class="section__title">
          Top Coins
        </div>
      </div>
    </div>

    <div class="row">
      <div class="gr-3 gr-12@mobile" v-for="marketCoin in topCoins">
        <coin-preview :marketCoinProp="marketCoin" />
      </div>
    </div>

  </div>

  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
import CoinPreview from '@/components/CoinPreview'
export default {
  data () {
    return {
      topCoins: {}
    }
  },

  created () {
    this.$axios
    .get(`coins/top`)
    .then(response => {
      this.topCoins = response.data.market_coins
    })
  },

  components: {
    DefaultHeader,
    CoinPreview
  }
}
</script>

<style lang="scss" scoped>
</style>
