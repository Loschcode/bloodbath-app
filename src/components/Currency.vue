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

  created () {
    axios.get(`currencies/xrp`)
    .then(response => {
      console.log('currency fetching')
      this.currencies = response.data
      console.log(response.data)
    })
    .catch(e => {
      this.errors.push(e)
    })
  }

}
</script>

<style lang="scss" scoped>
</style>
