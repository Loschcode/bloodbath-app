<template>
  <div class="coin-action-favorite">
    <div v-if="userMarketCoin">
      <div v-if="userMarketCoin.favorited_at">
        <a @click="removeFavorite" class="+pointer">
          <span class="icon-watch-on"></span>
        </a>
      </div>
      <div v-else>
        <a @click="addFavorite" class="+pointer">
          <span class="icon__disabled icon-watch-on"></span>
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
    'userMarketCoinProp',
    'marketCoinProp'
  ],

  created () {
  },

  data () {
    return {
    }
  },

  methods: {
    removeFavorite (event) {
      event.preventDefault()
      this.$store.dispatch('updateUserMarketCoin', { id: this.userMarketCoin.id, changeset: { favorited_at: null } })
      this.$noty.info(`${this.marketCoin.coin_name} removed from your favorites !`)
    },

    addFavorite (event) {
      event.preventDefault()
      this.$store.dispatch('updateUserMarketCoin', { id: this.userMarketCoin.id, changeset: { favorited_at: true } })
      this.$noty.info(`${this.marketCoin.coin_name} added to your favorites !`)
    }
  },

  computed: {
    userMarketCoin () {
      return this.$store.getters.getUserMarketCoin(this.userMarketCoinProp.id)
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
