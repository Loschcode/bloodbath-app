<template>
  <div class="coin-preview-content">
    <div v-if="marketCoin">

      <div class="module__content-digits --medium">
        <div v-if="marketCoin.price">
          <animated-number :value="marketCoin.price" :type="`money`" />
        </div>
        <div v-else>
          -
        </div>
      </div>

      <div class="module__content-percent --small">
        <div v-if="rawVariation">
          <animated-number :value="rawVariation" :type="`percent`" :animatedColors="false" :numberColors="true" />
        </div>
        <div v-else>
          -
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'

export default {
  props: [
    'marketCoinProp'
  ],

  data () {
    return {
    }
  },

  computed: {
    marketCoin () {
      return this.$store.getters.getMarketCoin(this.marketCoinProp.id)
    },

    /**
     * NOTE : maybe it would just be easier to store it in database ?
     */
    rawVariation () {
      return this.$store.getters.getMarketCoinRawVariation(this.marketCoinProp.id)
    }
  },

  methods: {
    // rawVariation () {
    //   let digits = this.marketCoin.price / this.marketCoin.day_open - 1
    //   if (isNaN(digits)) {
    //     return 0.0
    //   } else {
    //     return digits
    //   }
    // }
  },

  components: {
    AnimatedNumber
  }
}
</script>
