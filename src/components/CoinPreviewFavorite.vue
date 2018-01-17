<template>
  <div class="coin-preview-favorite">
    <div class="module__title-left">
      <div v-if="coinTracking.favorite">
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

export default {
  props: [
    'coinTrackingProp'
  ],

  created () {
    this.coinTracking = this.coinTrackingProp
  },

  data () {
    return {
      coinTracking: {}
    }
  },

  methods: {
    // TODO : improve that a lot
    removeFavorite (event) {
      event.preventDefault()

      this.$axios
      .patch(`coin_trackings/${this.coinTracking.id}`, { coin_tracking: { favorite: false } })
      .then(
        (response) => {
          this.coinTracking = response.data.coin_tracking
        },
        this.throwError.bind(this)
      )
    },

    // TODO : improve that a lot (like DRY it up and stuff)
    addFavorite (event) {
      event.preventDefault()

      this.$axios
      .patch(`coin_trackings/${this.coinTracking.id}`, { coin_tracking: { favorite: true } })
      .then(
        (response) => {
          this.coinTracking = response.data.coin_tracking
        },
        this.throwError.bind(this)
      )
    }
  },

  components: {
  },

  mixins: [
    ThrowError
  ]
}
</script>
