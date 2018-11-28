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
              <div v-if="marketCoin.dayLow">
              <div>Low</div>
                <div><animated-number :value="marketCoin.dayLow" :type="`money`" /></div>
                <div><animated-number :value="marketCoin.dayLowVariation" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
              </div>
            </div>
          </div>
          <div class="gr-6">
            <div class="module__footer-high">
              <div v-if="marketCoin.dayHigh">
              <div>High</div>
                <div><animated-number :value="marketCoin.dayHigh" :type="`money`" /></div>
                <div><animated-number :value="marketCoin.dayHighVariation" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>
</template>

<script>
export default {
  props: [
    'marketCoinProp'
  ],

  data () {
    return {
      marketCoin: null
    }
  },

  created () {
    this.marketCoin = this.marketCoinProp
  },

  components: {
  }
}
</script>
