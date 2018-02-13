<template>
  <div class="portfolio-weather">
    <div class="section">
      <div class="row">
        <div class="gr-12">
          <div class="section__title">
            Weather
          </div>
        </div>
      </div>

      <div class="row">
        <div class="gr-12 gr-12@mobile gr-12@tablet">

          <div class="module">

            <div class="module__bubble">

              <div class="market-weather__title">
                <span><coin-weather :variationProp="variationProp" /></span>
              </div>

              <div class="market-weather__info">
                <span>based on your total capital</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import CoinWeather from '@/components/CoinWeather'

export default {
  props: [
    'variationProp'
  ],

  data () {
    return {
    }
  },

  methods: {
  },

  components: {
    CoinWeather
  }
}
</script>
