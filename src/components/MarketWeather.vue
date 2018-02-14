<template>
  <div class="market-weather">
    <div v-if="coins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              Market weather
            </div>
          </div>
        </div>


        <div @click="flipWeather" class="+pointer">
          <div class="row">
            <div class="gr-12 gr-12@mobile gr-12@tablet">

              <div class="module">
                <div class="module__bubble">

                  <div class="row">
                    <div class="gr-6 gr-centered gr-12@mobile gr-6@tablet">

                      <div class="market-weather__icon">
                        <span :class="`icon-${currentStyle()} coin-weather__${currentStyle()} coin-weather--static`"></span>
                      </div>

                      <div v-if="flipped">
                        <div class="market-weather__title">
                          <span :class="`coin-weather__${currentStyle()}`"><animated-number :value="currentAverage()" :type="`percent`" :animatedColors="true" :numberColors="false" /></span>
                        </div>
                      </div>
                      <div v-else>
                        <div class="market-weather__title">
                          <span><coin-weather :variationProp="currentAverage()" /></span>
                        </div>
                      </div>

                      <div class="market-weather__info">
                        <span>based on the biggest market captializations</span>
                      </div>

                    </div>

                  </div>
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
import AnimatedNumber from '@/components/AnimatedNumber'
import CoinWeather from '@/components/CoinWeather'
import Weather from '@/misc/Weather'

import _ from 'lodash'

export default {
  props: [
    'coinsProp'
  ],

  data () {
    return {
      flipped: false
    }
  },

  computed: {
    coins () {
      return this.coinsProp
    }
  },

  methods: {
    flipWeather () {
      if (this.flipped) {
        this.flipped = false
      } else {
        this.flipped = true
      }
    },

    currentStyle () {
      return Weather.style(this.currentAverage())
    },

    currentAverage () {
      var vm = this
      var priceVariations = []
      this.coins.forEach(function (coin, index, object) {
        let marketCoin = vm.$store.getters.getMarketCoin(coin.market_coin.id)
        if (!_.isNil(marketCoin)) {
          priceVariations.push(marketCoin.price_variation)
        }
      })

      let average = _.sum(priceVariations) / priceVariations.length
      return average
    }

  },

  components: {
    AnimatedNumber,
    CoinWeather
  }
}
</script>
