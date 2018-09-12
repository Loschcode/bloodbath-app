<template>
  <div class="coin-action-favorite">
    <div v-if="watchlistCoin">
      <a @click="removeWatchlist" class="+pointer">
        <span class="icon-trash"></span>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import ThrowError from '@/mixins/ThrowError'
import EventBus from '@/misc/EventBus'

export default {
  props: [
    'watchlistCoinProp',
    'marketCoinProp'
  ],

  created () {
  },

  data () {
    return {
    }
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

  computed: {
    watchlistCoin () {
      return this.$store.getters.getWatchlistCoin(this.watchlistCoinProp.id)
    },

    marketCoin () {
      return this.$store.getters.getMarketCoin(this.marketCoinProp.id)
    }
  },

  components: {
    EventBus
  },

  mixins: [
    ThrowError
  ]
}
</script>
