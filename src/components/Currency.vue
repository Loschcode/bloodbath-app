<template>
  <div>
    Currency is {{ $route.params.currency }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      currency: {},
      errors: []
    }
  },

  // Fetches posts when the component is created.
  created () {
    axios.get(`currencies/xrp`)
    .then(response => {
      this.currencies = response.data
      console.log(this.currencies)
    })
    .catch(e => {
      console.log(this.errors)
      this.errors.push(e)
    })
  }

}
</script>

<style lang="scss" scoped>
</style>
