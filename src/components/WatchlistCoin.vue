<template>
  <div class="watchlist-coin">
    <div v-if="marketCoin && watchlistCoin">

      <div class="gr-12 gr-12@mobile gr-12@tablet">
        <div>
          <coin-preview contextProp="coins" :marketCoinProp="marketCoin" />
        </div>

      </div>

    </div>

    <div v-else>
      <loader-wave>
        <span slot="text"></span>
      </loader-wave>
    </div>

  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'
import CoinPreview from '@/components/CoinPreview'
import LoaderWave from '@/components/LoaderWave'

import { mapGetters } from 'vuex'

export default {
  props: [
    'watchlistCoinProp'
  ],

  data () {
    return {
    }
  },

  created () {
    this.$store.commit('setWatchlistCoin', this.watchlistCoinProp)
    if (this.marketCoin) {
      this.$store.dispatch('subscribeMarketCoinChannel', this.marketCoin)
    }
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketCoinChannel', { id: this.marketCoin.id })
  },

  watch: {
  },

  computed: {
    watchlistCoin () {
      return this.$store.getters.getWatchlistCoin(this.watchlistCoinProp.id)
    },

    marketCoin () {
      return this.$store.getters.getMarketCoin(this.watchlistCoinProp.market_coin_id)
    },

    ...mapGetters({
      userSetting: 'getUserSetting'
    })
  },

  methods: {
  },

  components: {
    AnimatedNumber,
    CoinPreview,
    LoaderWave
  }
}
</script>
