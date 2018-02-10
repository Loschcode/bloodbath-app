<template>
  <div class="market-weather">
    <div v-if="coins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              Market weather {{ currentAverage() }}
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-12 gr-12@mobile gr-12@tablet">

            <div class="module">
              <div class="module__bubble">

                <div class="row">
                  <div class="gr-6 gr-centered gr-12@mobile gr-6@tablet">
                    <div class="market-weather__title">
                      <span class="market__weather__title--bloody">Bloody</span>
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
      coins: this.coinsProp
    }
  },

  computed: {
  },

  methods: {

    currentWeather () {

    },

    currentAverage () {
      let priceVariations = _.map(this.coins, 'market_coin.price_variation')
      let average = _.sum(priceVariations) / priceVariations.length
      return average
    }

  },

  components: {
    AnimatedNumber
  }
}
</script>
