<template>
  <div class="test">
    {{watchlistCoin}}
  </div>
</template>

<script>
import { watchlistCoin } from '@/store/models/watchlistCoin'

export default {
  data () {
    return {
      watchlistCoinId: null
    }
  },

  created () {
    this.watchlistCoinId = 108
  },

  apollo: {
    watchlistCoin
  }
}
</script>
