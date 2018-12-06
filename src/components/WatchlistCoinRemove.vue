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
import WatchlistCoinService from '@/services/WatchlistCoinService'

export default {
  props: [
    'watchlistCoinProp',
    'marketCoinProp'
  ],

  data () {
    return {
      watchlistCoin: null,
      marketCoin:    null
    }
  },

  created () {
    this.watchlistCoin = this.watchlistCoinProp
    this.marketCoin = this.marketCoinProp

    Object.assign(this, {
      watchlistCoinService:  new WatchlistCoinService(this, this.marketCoin)
    })
  },

  methods: {
    addWatchlist (event) {
      event.preventDefault()
      this.watchlistCoinService.create()
    },

    removeWatchlist (event) {
      event.preventDefault()
      this.watchlistCoinService.destroy()
    }
  },

  components: {
    EventBus
  }
}
</script>
