<template>
  <div class="coins">
    <div v-if="!fullyLoaded()">

      <div class="loader__full-page">
        <loader-cube>
          <span slot="text">
            Recovering coins history
          </span>
        </loader-cube>
      </div>

    </div>
    <div v-else>

      <default-header>
        <div slot="left">
          <span class="icon-right"></span>  <span>Coins</span>
        </div>
      </default-header>

      <!-- Market Weather -->
      <div v-if="userSetting.weather && topCoins.length">
        <market-weather />
      </div>

      <!-- Search -->
      <div class="row">
        <div class="gr-12">
          <search-coins contextProp="coins" />
        </div>
      </div>

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

      <!-- Footer is here -->
      <default-footer />

    </div>

  </div>
</template>

<script>
import DefaultFooter from '@/components/DefaultFooter'
import DefaultHeader from '@/components/DefaultHeader'
import CoinPreview from '@/components/CoinPreview'
import MarketWeather from '@/components/MarketWeather'
import SearchCoins from '@/components/SearchCoins'
import LoaderCube from '@/components/LoaderCube'

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
      topCoins: 'getTopCoins',
      userSetting: 'getUserSetting'
    })
  },

  mounted () {
  },

  methods: {
    fullyLoaded () {
      return (this.userSetting.id && this.topCoins.length > 0)
    }
  },

  components: {
    DefaultFooter,
    DefaultHeader,
    CoinPreview,
    MarketWeather,
    SearchCoins,
    LoaderCube,
    EventBus
  }
}
</script>
