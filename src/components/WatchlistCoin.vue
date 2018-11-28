<template>
  <div class="watchlist-coin">
    <div v-if="marketCoin && watchlistCoin">

      <div class="gr-12 gr-12@mobile gr-12@tablet">
        <div>
          <coin-preview
            contextProp="coins"
            :marketCoinProp="marketCoin"
            :watchlistCoinProp="watchlistCoin"
          />
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
import CoinPreview from '@/components/CoinPreview'
import LoaderWave from '@/components/LoaderWave'

import { watchlistCoin } from '@/store/models/WatchlistCoin'
import { marketCoin } from '@/store/models/MarketCoin'

export default {
  props: [
    'watchlistCoinProp'
  ],

  data () {
    return {
    }
  },

  created () {
    this.watchlistCoinId = this.watchlistCoinProp.id
    this.marketCoinId = this.watchlistCoinProp.marketCoin.id
  },

  apollo: {
    watchlistCoin,
    marketCoin
  },

  components: {
    CoinPreview,
    LoaderWave
  }
}
</script>
