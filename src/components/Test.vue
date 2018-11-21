<template>
  <div class="test">
    WATCHLIST_COIN: {{watchlistCoin}}

    <br />

    {{currentUser}}
  </div>
</template>

<script>
import { watchlistCoin } from '@/store/models/WatchlistCoin'
import { currentUser } from '@/store/models/CurrentUser'

export default {
  data () {
    return {
      watchlistCoinId: 108
    }
  },
  created () {
  },
  apollo: {
    watchlistCoin,
    currentUser
  }
}
</script>
