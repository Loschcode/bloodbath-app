<template>
  <div class="coins">
    <default-header>
      <div slot="left">
        <div class="header__left-title">
          <h1>CryptoScreen</h1>
        </div>
      </div>
      <div slot="center">
        <main-menu />
      </div>
    </default-header>

    <!-- Search -->
    <search-coins />

    <!-- Favorites Coins -->
    <div v-if="Object.keys(favoriteCoins).length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              Favorites Coins
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-3 gr-12@mobile" v-for="favoriteCoin in favoriteCoins">
            <coin-preview :marketCoinProp="favoriteCoin.market_coin" :userMarketCoinProp="favoriteCoin.user_market_coin" />
          </div>
        </div>
      </div>
    </div>

    <!-- Top Coins -->
    <div class="section">
      <div class="row">
        <div class="gr-12">
          <div class="section__title">
            Top Coins
          </div>
        </div>
      </div>

      <div class="row">
        <div class="gr-3 gr-12@mobile" v-for="topCoin in topCoins">
          <coin-preview :marketCoinProp="topCoin.market_coin" :userMarketCoinProp="topCoin.user_market_coin" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
import MainMenu from '@/components/MainMenu'
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
    MainMenu,
    CoinPreview,
    SearchCoins,
    EventBus
  }
}
</script>
