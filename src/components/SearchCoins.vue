<template>
<div class="section">

  <!-- Search -->
  <div class="row">
    <div class="section__title">
      <slot name="title">
        Add to watchlist
      </slot>
    </div>
  </div>

  <div class="row">
    <div class="search">
      <input ref="search" v-model="search" v-on:keyup="searchCoins" v-on:keydown.enter="firstResultCoins" placeholder="e.g. Bitcoin, Ethereum ..." />
      <div v-if="search">
        <span class="icon-remove search__remove" @click="cleanSearch"></span>
      </div>
    </div>
  </div>

  <!-- Results coins -->
  <div v-if="showResults">

    <div class="row">
      <div class="section__title">
        <div v-if="resultCoins">
          Results ({{ resultCoins.length }})
        </div>
      </div>
    </div>

    <div class="row">

      <div v-if="resultLoading">
        <div class="search__loading">
          <loader-wave>
            <span slot="text"></span>
          </loader-wave>
        </div>
      </div>

      <div v-else>
        <div v-if="resultCoins">
          <div class="row">
            <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="resultCoin in resultCoins" v-bind:key="resultCoin.id">
              <coin-preview :contextProp='context' :searchedProp='true' :marketCoinProp="resultCoin" />
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
import LoaderWave from '@/components/LoaderWave'
import EventBus from '@/misc/EventBus'
import _ from 'lodash'

import { marketCoins } from '@/store/models/MarketCoin'

export default {
  props: [
    'contextProp',
    'focusProp'
  ],

  data () {
    return {
      showResults:             false,
      marketCoins:             null,
      marketCoinsFilter:      {},
      marketCoinsLimit:       4,
      context:                 null,
      focus:                   this.focusProp,
      search:                  ''
    }
  },

  created () {
    this.context = this.contextProp
  },

  mounted () {
    /**
     * We auto-focus the search area
     */
    if (this.focus) {
      this.$refs.search.focus()
    }
  },

  computed: {
    resultCoins () {
      return this.marketCoins
    },
    resultLoading () {
      return false
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
        EventBus.$emit('CoinPreviewClick', {context: this.context, searched: true, marketCoin: firstCoin.market_coin})
      }
    },

    cleanSearch (event) {
      this.search = ''
      this.showResults = false
      this.$refs.search.focus()
    },

    searchCoins (event) {
      /**
       * NOTE : this couldbe totally refactored with the data search made for that.
       */
      this.showResults = true
      let query = event.currentTarget.value

      if (_.isEmpty(query)) {
        this.showResults = false
        return false
      }

      this.marketCoinsFilter = { search: query }

      // query contains the data
    }
  },

  apollo: {
    marketCoins
  },

  components: {
    CoinPreview,
    LoaderWave
  }
}
</script>
