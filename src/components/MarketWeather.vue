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

                      <div v-if="flipped">
                        <div class="market-weather__title">
                          <span><animated-number :value="currentAverage()" :type="`percent`" :animatedColors="false" :numberColors="true" /></span>
                        </div>
                        <div class="market-weather__info">
                          <span>Average variation of the top coins</span>
                        </div>
                      </div>
                      <div v-else>
                        <div class="market-weather__title">
                          <span :class="`market__weather__title--${currentStyle()}`">{{ currentWeather() }}</span>
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
  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'
import _ from 'lodash'

export default {
  props: [
    'coinsProp'
  ],

  data () {
    return {
      flipped: false,
      coins: this.coinsProp
    }
  },

  computed: {
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
      return _.snakeCase(this.currentWeather())
    },

    currentWeather () {
      let average = this.currentAverage() * 100

      /**
       * Positive
       */
      if (average > 20) {
        return 'To andromeda galaxy'
      } else if (average > 10) {
        return 'To the moon'
      } else if (average > 5) {
        return 'Very sunny'
      } else if (average > 2) {
        return 'Sunny'
      }

      /**
       * Neutral
       */
      if (average >= -2) {
        return 'Boring'
      }

      /**
       * Negative
       * @type {[type]}
       */
      if (average < -20) {
        return 'Apocalypse'
      } else if (average < -10) {
        return 'Very bloody'
      } else if (average < -5) {
        return 'Bloody'
      } else if (average < -2) {
        return 'Cloudy'
      }

      return ''
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
    AnimatedNumber
  }
}
</script>
