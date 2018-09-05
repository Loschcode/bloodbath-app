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
        Results ({{ resultCoins.length }})
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
        <div v-if="resultCoins.length">
          <div class="row">
            <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="resultCoin in resultCoins">
              <coin-preview :contextProp='`watchlist`' :marketCoinProp="resultCoin.market_coin" />
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

export default {
  props: [
    'contextProp',
    'focusProp'
  ],

  data () {
    return {
      showResults: false,
      context: null,
      focus: this.focusProp,
      search: ''
    }
  },

  created () {
    this.context = this.contextProp
  },

  mounted () {
    console.log(this.focusProp)
    /**
     * We auto-focus the search area
     */
    if (this.focus) {
      this.$refs.search.focus()
    }
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
        EventBus.$emit('CoinPreviewClick', {context: this.context, marketCoin: firstCoin.market_coin})
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

      this.$store.dispatch('fetchResultCoins', query)
    }
  },

  components: {
    CoinPreview,
    LoaderWave
  }
}
</script>
