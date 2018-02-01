<template>
  <div class="coin-preview-content">
    <div v-if="marketCoin && portfolioCoin">

      <router-link :to="{ name: 'coin', params: { coinName: marketCoin.code } }">

        <div class="module__content-digits --ultra-small --opacity">
          <div v-if="portfolioCoin.quantity">
            <animated-number :value="portfolioCoin.quantity" :type="`quantity`" /> at <animated-number :value="marketCoin.price" :type="`money`" />
          </div>
        </div>

        <!-- Display the current value -->
        <div class="module__content-digits --medium">
            <animated-number :value="currentValue()" :type="`money`" />
        </div>

        <div class="module__content-percent --very-small">
          <div v-if="marketCoin.price_variation">
            <animated-number :value="marketCoin.price_variation" :type="`percent`" :animatedColors="false" :numberColors="true" />
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
              <!-- Variation is the same than the day low / high of the coin itself -->
              <div><animated-number :value="marketCoin.day_low_variation" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
            </div>
          </div>
          <div class="gr-6">
            <div class="module__footer-high">
              <div>HIGH</div>
              <div><animated-number :value="currentHigh()" :type="`money`" /></div>
              <!-- Variation is the same than the day low / high of the coin itself -->
              <div><animated-number :value="marketCoin.day_high_variation" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
            </div>
          </div>
        </div>
      </div>

      </router-link>

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
    }
  },

  computed: {
    portfolioCoin () {
      return this.$store.getters.getPortfolioCoin(this.portfolioCoinProp.id)
    },

    marketCoin () {
      return this.$store.getters.getMarketCoin(this.marketCoinProp.id)
    }
  },

  methods: {
    currentValue () {
      let quantity = this.portfolioCoin.quantity
      let price = this.marketCoin.price
      return quantity * price
    },

    currentLow () {
      let quantity = this.portfolioCoin.quantity
      let price = this.marketCoin.day_low
      return quantity * price
    },

    currentHigh () {
      let quantity = this.portfolioCoin.quantity
      let price = this.marketCoin.day_high
      return quantity * price
    }
  },

  components: {
    AnimatedNumber
  }
}
</script>
