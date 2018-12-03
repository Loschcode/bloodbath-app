<template>
  <div class="watchlist-coin-remove">
    <div v-if="watchlistCoin">
      <a @click="removeWatchlist" class="+pointer">
        <span class="icon-trash"></span>
      </a>
    </div>
  </div>
</template>

<script>
import EventBus from '@/misc/EventBus'

export default {
  props: [
    'watchlistCoinProp',
    'marketCoinProp'
  ],

  data () {
    return {
      watchlisrCoin: null,
      marketCoin:    null
    }
  },

  created () {
    this.watchlistCoin = this.watchlistCoinProp
    this.marketCoin = this.marketCoinProp
  },

  methods: {
    addWatchlist (event) {
      event.preventDefault()
      this.$store.dispatch('createWatchlistCoin', { changeset: { market_coin_id: this.marketCoin.id } })
      this.$noty.info(`${this.marketCoin.coin_name} added to your your watchlist !`)
    },

    removeWatchlist (event) {
      event.preventDefault()
      this.$store.dispatch('destroyWatchlistCoin', this.watchlistCoin)
      this.$noty.info(`${this.marketCoin.coin_name} removed from your watchlist !`)
    }
  },

  components: {
    EventBus
  },

  mixins: [
  ]
}
</script>
