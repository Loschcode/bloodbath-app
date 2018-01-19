<template>
  <div class="coin-preview-favorite">
    <div class="module__title-left">
      <div v-if="userMarketCoin.favorite">
        <a @click="removeFavorite">
          <span class="icon-favorite --on"></span>
        </a>
      </div>
      <div v-else>
        <a @click="addFavorite">
          <span class="icon-favorite --off"></span>
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
    'userMarketCoinProp'
  ],

  created () {
    this.userMarketCoin = this.userMarketCoinProp
  },

  destroyed () {
    // EventBus.$off(`userMarketCoin-${this.userMarketCoin.id}`)
  },

  data () {
    return {
      userMarketCoin: {}
    }
  },

  methods: {
    // TODO : improve that a lot
    removeFavorite (event) {
      event.preventDefault()

      this.$axios
      .patch(`user_market_coins/${this.userMarketCoin.id}`, { user_market_coin: { favorite: false } })
      .then(
        (response) => {
          this.userMarketCoin = response.data.user_market_coin
          this.$store.dispatch('fetchFavoriteCoins')
        },
        this.throwError.bind(this)
      )
    },

    // TODO : improve that a lot (like DRY it up and stuff)
    addFavorite (event) {
      event.preventDefault()

      this.$axios
      .patch(`user_market_coins/${this.userMarketCoin.id}`, { user_market_coin: { favorite: true } })
      .then(
        (response) => {
          this.userMarketCoin = response.data.user_market_coin
          this.$store.dispatch('fetchFavoriteCoins')
        },
        this.throwError.bind(this)
      )
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
