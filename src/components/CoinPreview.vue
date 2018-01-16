<template>
  <div class="coin-preview">

    <router-link :to="{ name: 'coin', params: { coin: marketCoin.symbol } }">

      <!-- Base Price -->
      <div class="gr-12 gr-12@mobile">
        <div class="module">
          <div class="module__title">
            <h2>{{ marketCoin.name }}</h2>
          </div>
          <div class="module__content">

            <div class="module__content-digits">
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

export default {
  props: [
    'marketCoinProp'
  ],

  created () {
    this.marketCoin = this.marketCoinProp
    this.$drycable.subscribe(this, 'marketCoin')
  },

  data () {
    return {
      marketCoin: {}
    }
  },

  methods: {
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
  }
}
</script>
