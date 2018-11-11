<template>
  <div class="test">
    {{marketCoin}}
  </div>
</template>

<script>
import MarketCoin from '@/store/models/MarketCoin'

export default {
  // Use a computed property for the component state to keep it reactive
  computed: {
    marketCoin: () => MarketCoin.find(1)
  },

  created () {
    console.log('fetch data')
    this.fetchData()
  },

  methods: {
    async fetchData () {
      console.log('data fetching')
      await MarketCoin.fetch(
        {
          id: '1'
        }
      )
      console.log('data fetched')
    }
  }
}
</script>
