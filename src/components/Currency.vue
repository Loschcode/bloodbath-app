<template>
  <div class="currency">

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

      <!-- Base Value -->
      <div class="gr-6 gr-12@mobile">
        <div class="module">
          <div class="module__title">
            <h2>Base Value</h2>
          </div>
          <div class="module__content">
            <div class="module__content-digits">
              ${{ currency.base_value }}
            </div>
          </div>
          <div class="module__footer">
            From 21/02/2018 18:00 GMT
          </div>
        </div>
      </div>

      <!-- Current Value -->
      <div class="gr-6 gr-12@mobile">
        <div class="module">
          <div class="module__title">
            <h2>Current Value</h2>
          </div>
          <div class="module__content">
            <div class="module__content-digits">
              ${{ currency.current_value }}
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
            <h2>Difference</h2>
          </div>
          <div class="module__content">
            <div class="module__content-percent">{{ currency.difference }}%</div>
          </div>
        </div>
      </div>

    </div>

    </div>


  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      currency: {
        name: '-', // $route.params.currency
        base_value: 0.0,
        current_value: 0.0,
        difference: 0.0
      },
      errors: []
    }
  },

  created () {
    axios.get(`currencies/${this.$route.params.currency}`)
    .then(response => {
      this.currency = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }

}
</script>

<style lang="scss" scoped>
</style>
