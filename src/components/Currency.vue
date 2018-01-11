<template>
  <div class="currency">

    <currency-header :currencyStateProp="currencyState" />

    <div class="section">
    <!-- Tracker -->
    <div class="row">
      <div class="gr-12">
        <div class="section__title">
          Trackers
        </div>
      </div>
    </div>

    <div class="row">

      <!-- Base Price -->
      <div class="gr-6 gr-12@mobile">
        <div class="module">
          <div class="module__title">
            <h2>Base Price</h2>
          </div>
          <div class="module__content">
            <div class="module__content-digits">
              <div v-if="currencyTracking.base_price">
              ${{ currencyTracking.base_price }}
              </div>
              <div v-else>
                -
              </div>
            </div>
          </div>
          <div class="module__footer">
            From 21/02/2018 18:00 GMT
          </div>
        </div>
      </div>

      <!-- Current Price -->
      <div class="gr-6 gr-12@mobile">
        <div class="module">
          <div class="module__title">
            <h2>Current Price</h2>
          </div>
          <div class="module__content">
            <div class="module__content-digits">
              <div v-if="currencyState.price">
              ${{ currencyState.price }}
              </div>
              <div v-else>
                -
              </div>
            </div>
          </div>
          <div class="module__footer">
            From 21/02/2018 18:00 GMT
          </div>
        </div>
      </div>

      <div class="gr-12">
        <div class="module">
          <div class="module__title">
            <h2>Variation</h2>
          </div>
          <div class="module__content">
            <div class="module__content-percent">
              <div v-if="solveVariation">
                {{ solveVariation() }}%
              </div>
              <div v-else>
                -
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
import _ from 'lodash'
import axios from 'axios'
import CurrencyHeader from '@/components/CurrencyHeader'

export default {
  data () {
    return {
      currencyState: {
      },
      currencyTracking: {
      },
      variation: 0.0,
      errors: []
    }
  },

  created () {
    this.$cable.subscriptions.create({ channel: 'CurrencyStateChannel' })

    axios.get(`currencies/${this.$route.params.currency}`)
    .then(response => {
      this.currencyState = response.data.currency_state
      this.currencyTracking = response.data.currency_tracking
    })
    .catch(e => {
      this.errors.push(e)
    })
  },

  methods: {
    solveVariation () {
      let rawVariation = (100 - (this.currencyTracking.base_price / this.currencyState.price) * 100)
      if (isNaN(rawVariation)) {
        return 0.0
      } else {
        return _.round(rawVariation, 2)
      }
    }
  },

  components: {
    CurrencyHeader
  }

}
</script>

<style lang="scss" scoped>
</style>
