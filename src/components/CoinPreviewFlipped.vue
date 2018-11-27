<template>
  <div class="coin-preview-flipped">

    <div class="row">
      <div clas="gr-12">
        <div class="coin-preview-flipped__rank">
          <div v-if="marketCoin.rank">
            Rank #{{marketCoin.rank}}
          </div>
          <div v-else>
            Rank >100
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="gr-12">
        <div class="coin-preview-flipped__image">
          <div v-if="marketCoin.logoUrl">
            <img :src="marketCoin.logoUrl" />
          </div>
        </div>

        <div class="module__content-percent --small">
          <div v-if="marketCoin.marketCap">
            <animated-number :value="marketCoin.marketCap" :type="`big-money`" :animatedColors="true" :numberColors="false" />
          </div>
          <div v-else>
            -
          </div>
        </div>
      </div>

      <div class="row">
        <div clas="gr-12">
          <div class="coin-preview-flipped__title">
            Market Capitalization
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
      marketCoin: null
    }
  },

  created () {
    this.marketCoin = this.marketCoinProp
  },

  computed: {
  },

  methods: {
  },

  components: {
    AnimatedNumber
  }
}
</script>
