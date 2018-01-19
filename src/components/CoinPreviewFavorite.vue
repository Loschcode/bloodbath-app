<template>
  <div class="coin-preview-favorite">
    <div v-if="userMarketCoin">
      {{ userMarketCoin.id }}
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
      this.$store.dispatch('updateUserMarketCoin', { id: this.userMarketCoin.id, changeset: { favorite: false } })
    },

    addFavorite (event) {
      event.preventDefault()
      this.$store.dispatch('updateUserMarketCoin', { id: this.userMarketCoin.id, changeset: { favorite: true } })
    }
  },

  computed: {
    userMarketCoin () {
      console.log(this.userMarketCoinProp.id)
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
