<template>
  <div class="coin-preview">

    <router-link :to="{ name: 'coin', params: { coin: marketCoin.symbol } }">

      <!-- Base Price -->
      <div class="gr-12 gr-12@mobile">
        <div class="module">
          <div class="module__title">
            <div class="row">
              <div class="gr-1">
                <div class="module__title-favorite">
                  <!-- TODO : this should be abstracted as a component in itself -->
                  <div v-if="coinTracking.favorite">
                    <a href="">
                      <span @click="removeFavorite" class="icon-favorite --on"></span>
                    </a>
                  </div>
                  <div v-else>
                    <a href="">
                      <span @click="addFavorite" class="icon-favorite --off"></span>
                    </a>
                  </div>
                  <!-- End of abstraction -->
                </div>
              </div>
              <div class="gr-11">
                <h2>{{ marketCoin.full_name }}</h2>
              </div>
            </div>
          </div>
          <div class="module__content">

            <div class="module__content-digits --medium">
              <div v-if="marketCoin.price">
                <animated-number :value="marketCoin.price" :type="`money`" />
              </div>
              <div v-else>
                -
              </div>
            </div>

            <div class="module__content-percent --small">
              <div v-if="rawVariation()">
                <animated-number :value="rawVariation()" :type="`percent`" :animatedColors="false" :numberColors="true" />
              </div>
              <div v-else>
                -
              </div>
            </div>

          </div>
          <div class="module__footer">
          </div>
        </div>
      </div>

    </router-link>

  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'
import ThrowError from '@/mixins/ThrowError'

export default {
  props: [
    'marketCoinProp'
  ],

  created () {
    this.marketCoin = this.marketCoinProp
    this.channel = this.$drycable.subscribe(this, 'marketCoin')

    this.$axios
    .get(`coins/${this.marketCoinProp.symbol}`)
    .then(
      (response) => {
        // this.marketCoin = response.data.market_coin
        this.coinTracking = response.data.coin_tracking
        // this.channel = this.$drycable.subscribe(this, 'marketCoin')
      },
      this.throwError.bind(this)
    )
  },

  destroyed () {
    this.$drycable.unsubscribe(this.channel)
  },

  data () {
    return {
      marketCoin: {},
      coinTracking: {},
      channel: null
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
    },

    // this is a copy paste (for now) from Coin.vue
    rawVariation () {
      let digits = this.marketCoin.price / this.marketCoin.day_open - 1
      if (isNaN(digits)) {
        return 0.0
      } else {
        return digits
      }
    }
  },

  components: {
    AnimatedNumber
  },

  mixins: [
    ThrowError
  ]
}
</script>
