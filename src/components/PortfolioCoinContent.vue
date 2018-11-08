<template>
  <div class="coin-preview-content">
    <div v-if="marketCoin && portfolioCoin">

        <div class="module__content-digits--portfolio-units">
          <div v-if="portfolioCoin.quantity">
            <animated-number :value="portfolioCoin.quantity" :type="`quantity`" /> at <animated-number :value="marketCoin.price" :type="`money`" />
          </div>
        </div>

        <!-- Display the current value -->
        <div class="module__content-digits --medium">
            <animated-number :value="currentValue()" :type="`money`" />
        </div>

        <div class="module__content-percent --very-small">
          <div v-if="marketCoin.priceVariation">
            <animated-number :value="marketCoin.priceVariation" :type="`percent`" :animatedColors="false" :numberColors="true" />
          </div>
          <div v-else>
            -
          </div>
        </div>

      <div class="module__content-details">
        <div class="row">
          <div class="gr-6">
            <div class="module__footer-low">
              <div>LOW</div>
              <div><animated-number :value="currentLow()" :type="`money`" /></div>
              <div><animated-number :value="marketCoin.dayLowVariation" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
            </div>
          </div>
          <div class="gr-6">
            <div class="module__footer-high">
              <div>HIGH</div>
              <div><animated-number :value="currentHigh()" :type="`money`" /></div>
              <div><animated-number :value="marketCoin.dayHighVariation" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
            </div>
          </div>
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
    'marketCoinProp',
    'portfolioCoinProp'
  ],

  data () {
    return {
      marketCoin: null,
      portfolioCoin: null
    }
  },

  created () {
    this.portfolioCoin = this.portfolioCoinProp
    this.marketCoin = this.marketCoinProp
  },

  methods: {
    currentValue () {
      let quantity = this.portfolioCoin.quantity
      let price = this.marketCoin.price
      return quantity * price
    },

    currentLow () {
      let quantity = this.portfolioCoin.quantity
      let price = this.marketCoin.dayLow
      return quantity * price
    },

    currentHigh () {
      let quantity = this.portfolioCoin.quantity
      let price = this.marketCoin.dayHigh
      return quantity * price
    }
  },

  components: {
    AnimatedNumber
  }
}
</script>
