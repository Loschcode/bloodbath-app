<template>
  <div class="coin-preview-favorite">
    <div v-if="userMarketCoin">
      <div class="module__title-left">
        <div v-if="userMarketCoin.favorited_at">
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
    this.$store.commit('setUserMarketCoin', this.userMarketCoinProp)
  },

  data () {
    return {
    }
  },

  methods: {
    removeFavorite (event) {
      event.preventDefault()
      this.$store.dispatch('updateUserMarketCoin', { id: this.userMarketCoin.id, changeset: { favorited_at: null } })
    },

    addFavorite (event) {
      event.preventDefault()
      this.$store.dispatch('updateUserMarketCoin', { id: this.userMarketCoin.id, changeset: { favorited_at: true } })
    }
  },

  computed: {
    userMarketCoin () {
      return this.$store.getters.getUserMarketCoins.find((item) => item.id === this.userMarketCoinProp.id)
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
