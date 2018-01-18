<template>
<div class="section">

  <!-- Search -->
  <div class="row">
    <div class="gr-12">
      <div class="section__title">
        Search
      </div>
    </div>
  </div>

  <div class="row">
    <div class="gr-12">
      <div class="search">
        <input type="text" ref="search" v-on:keyup="searchCoins" v-on:keydown.enter="firstResultCoins" />
      </div>
    </div>
  </div>

  <!-- Results coins -->
  <div v-if="resultCoins">

    <div class="row">
      <div class="gr-12">
        <div class="section__title">
          Results
        </div>
      </div>
    </div>

    <div class="row">
      <div class="gr-12">
        <div v-if="resultLoading">
          <div class="search__loading">
            Loading ...
          </div>
        </div>
        <div v-else>

          <div v-if="resultCoins.length > 0">
            <div class="gr-3 gr-12@mobile" v-for="resultCoin in resultCoins">
              <coin-preview :marketCoinProp="resultCoin.market_coin" :userMarketCoinProp="resultCoin.user_market_coin" />
            </div>
          </div>
          <div v-else>
            <div class="search__no-result">
              No result
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>

</div>
</template>

<script>
import CoinPreview from '@/components/CoinPreview'
import _ from 'lodash'

export default {
  data () {
    return {
      resultCoins: false,
      resultLoading: false
    }
  },

  created () {
  },

  mounted () {
    /**
     * We auto-focus the search area
     */
    this.$refs.search.focus()
  },

  methods: {
    /**
     * When we press enter we can quick re-route
     * to the first result if there is one
     */
    firstResultCoins (event) {
      if (_.size(this.resultCoins) > 0) {
        let firstCoin = this.resultCoins[0]
        this.$router.push({ name: 'coin', params: { coin: firstCoin.market_coin.symbol } })
      }
    },

    searchCoins (event) {
      let query = event.target.value

      if (_.isEmpty(query)) {
        this.resultCoins = false
        return false
      }

      this.resultCoins = {}
      this.resultLoading = true

      this.$axios
      .get(`coins/search`, { params: { query: query } })
      .then(response => {
        this.resultCoins = response.data.result_coins
        this.resultLoading = false
      })
      return true
    }
  },

  components: {
    CoinPreview
  }
}
</script>