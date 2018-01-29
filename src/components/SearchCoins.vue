<template>
<div class="section">

  <!-- Search -->
  <div class="row">
    <div class="section__title">
      <slot name="title">
        Search coins
      </slot>
    </div>
  </div>

  <div class="row">
    <div class="search">
      <input type="text" ref="search" v-on:keyup="searchCoins" v-on:keydown.enter="firstResultCoins" placeholder="e.g. Bitcoin, Ethereum ..." />
    </div>
  </div>

  <!-- Results coins -->
  <div v-if="showResults">

    <div class="row">
      <div class="section__title">
        Results ({{ resultCoins.length }})
      </div>
    </div>

    <div class="row">

      <div v-if="resultLoading">
        <div class="search__loading">
          Loading ...
        </div>
      </div>

      <div v-else>
        <div v-if="resultCoins.length">
          <div class="row">
            <div class="gr-3 gr-12@mobile" v-for="resultCoin in resultCoins">
              <coin-preview :contextProp='context' :marketCoinProp="resultCoin.market_coin" />
            </div>
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
</template>

<script>
import CoinPreview from '@/components/CoinPreview'
import _ from 'lodash'

export default {
  props: [
    'contextProp'
  ],

  data () {
    return {
      showResults: false,
      context: null
    }
  },

  created () {
    this.context = this.contextProp
  },

  mounted () {
    /**
     * We auto-focus the search area
     */
    this.$refs.search.focus()
  },

  computed: {
    resultLoading () {
      return this.$store.getters.getResultLoading
    },

    resultCoins () {
      return this.$store.getters.getResultCoins
    }
  },

  methods: {
    /**
     * When we press enter we can quick re-route
     * to the first result if there is one
     */
    firstResultCoins (event) {
      if (_.size(this.resultCoins) > 0) {
        let firstCoin = this.resultCoins[0]
        this.$router.push({ name: 'coin', params: { coinName: firstCoin.market_coin.code } })
      }
    },

    searchCoins (event) {
      this.showResults = true
      let query = event.target.value

      if (_.isEmpty(query)) {
        this.showResults = false
        return false
      }

      this.$store.dispatch('fetchResultCoins', query)
    }
  },

  components: {
    CoinPreview
  }
}
</script>
