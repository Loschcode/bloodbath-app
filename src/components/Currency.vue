<template>
  <div>
    Currency : {{ currency.name }}<br />
    Base Value : {{ currency.base_value }}<br />
    Current Value : {{ currency.current_value }}<br />
    Difference : {{ currency.difference }}%<br />
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
    axios.get(`currencies/xrp`)
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
