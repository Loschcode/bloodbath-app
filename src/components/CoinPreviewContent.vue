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
        <div v-if="marketCoin.price_variation">
          <!-- <span class="module__content-percent-small">
            <animated-number :value="marketCoin.day_low_variation" :type="`percent`" :animatedColors="false" :numberColors="true" />
          </span> -->
          <animated-number :value="marketCoin.price_variation" :type="`percent`" :animatedColors="false" :numberColors="true" />
          <!-- <span class="module__content-percent-small">
            <animated-number :value="marketCoin.day_high_variation" :type="`percent`" :animatedColors="false" :numberColors="true" />
          </span> -->
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
    }
  },

  methods: {
  },

  components: {
    AnimatedNumber
  }
}
</script>
