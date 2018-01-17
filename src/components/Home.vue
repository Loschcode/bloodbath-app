<template>
  <div class="home">
    <default-header>
      <div slot="left">
      </div>
      <div slot="center">
        <h1>CryptoScreen</h1>
      </div>
    </default-header>

    <div class="section">

    <!-- Trendy coins -->
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
          <input autofocus type="text" v-on:keyup="searchCoins" />
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
              <div class="gr-3 gr-12@mobile" v-for="marketCoin in resultCoins">
                <coin-preview :marketCoinProp="marketCoin" />
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


    <div class="section">

    <!-- Trendy coins -->
    <div class="row">
      <div class="gr-12">
        <div class="section__title">
          Top Coins
        </div>
      </div>
    </div>

    <div class="row">
      <div class="gr-3 gr-12@mobile" v-for="marketCoin in topCoins">
        <coin-preview :marketCoinProp="marketCoin" />
      </div>
    </div>

  </div>

  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
import CoinPreview from '@/components/CoinPreview'
import _ from 'lodash'

export default {
  data () {
    return {
      topCoins: {},
      resultCoins: false,
      resultLoading: false
    }
  },

  created () {
    this.$axios
    .get(`coins/top`)
    .then(response => {
      this.topCoins = response.data.market_coins
    })
  },

  methods: {
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
        this.resultCoins = response.data.market_coins
        this.resultLoading = false
      })
      return true
    }
  },

  components: {
    DefaultHeader,
    CoinPreview
  }
}
</script>

<style lang="scss" scoped>
</style>
