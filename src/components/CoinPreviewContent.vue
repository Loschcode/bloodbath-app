<template>
  <div class="coin-preview-content">
    <div class="module__content-digits --medium">
      <div v-if="marketCoinProp.price">
        <animated-number :value="marketCoinProp.price" :type="`money`" />
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

  methods: {
    rawVariation () {
      let digits = this.marketCoinProp.price / this.marketCoinProp.day_open - 1
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
