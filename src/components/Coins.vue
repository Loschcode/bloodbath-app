<template>
  <div class="coins">
    <default-header>
      <div slot="left">
      </div>
      <div slot="center">
        <div class="header__title">
        </div>
      </div>
      <div slot="right">
      </div>
    </default-header>

    <!-- Search -->
    <search-coins contextProp="coins" />

    <!-- Favorites Coins -->
    <div v-if="favoriteCoins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              My favorites coins
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="favoriteCoin in favoriteCoins">
            <coin-preview contextProp="coins" :marketCoinProp="favoriteCoin.market_coin" />
          </div>
        </div>
      </div>
    </div>

    <!-- Top Coins -->
    <div v-if="topCoins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              Top coins
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="topCoin in topCoins">
            <coin-preview contextProp="coins" :marketCoinProp="topCoin.market_coin" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
import CoinPreview from '@/components/CoinPreview'
import SearchCoins from '@/components/SearchCoins'
import EventBus from '@/misc/EventBus'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchFavoriteCoins')
    this.$store.dispatch('fetchTopCoins')
  },

  computed: {
    ...mapGetters({
      favoriteCoins: 'getFavoriteCoins',
      topCoins: 'getTopCoins'
    })
  },

  mounted () {
  },

  methods: {
  },

  components: {
    DefaultHeader,
    CoinPreview,
    SearchCoins,
    EventBus
  }
}
</script>
